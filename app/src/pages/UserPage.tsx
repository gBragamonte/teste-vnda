import * as React from "react";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import {
	Button,
	Grid,
	Typography,
	Breadcrumbs,
	Link,
	TextField,
	MenuItem
} from "@material-ui/core";
import { history } from "../configureStore";
import axios, { AxiosRequestConfig } from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from "../reducers";
import { useSelector } from "react-redux";
import { useActions } from "../actions";
import * as UserActions from "../actions/user";
import ChipInput from 'material-ui-chip-input';

interface State {
	id: any;
	title: string;
	loading: boolean;
	name: string;
	email: string;
	external_code: any;
	role: any;
	tags: string[];
}

const initialState = {
	id: false,
	title: 'Novo',
	loading: false,
	name: '',
	email: '',
	external_code: '',
	role: 0,
	tags: [],
}

function UserPage({ match }: RouteComponentProps<any>) {
	
	const classes = useStyles();

	const [values, setValues] = React.useState<State>(initialState);

	const usersList = useSelector((state: RootState) => state.usersList);

	const userActions = useActions(UserActions);

	const clearForm = () => setValues(initialState);

	const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.value });
	};

	const handleSetValues = (key: keyof State, val: any) => setValues({ ...values, [key]: val });

	const keyLabels = {
		name: 'Nome',
		email: 'Email',
		external_code: 'Codigo externo',
		role: 'Funcao',
		tags: 'Tags'
	};
	
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		handleSetValues('loading', true);

		let creating = !values.id ? true : false;

		const config: AxiosRequestConfig = {
			url: 'http://localhost:3001/users' + ( creating ? '' : `/${values.id}`),
			method: creating ? 'POST' : 'PATCH',
			data: values
		};

		const createCb = (user: any) => {
			userActions.addUser(user);
			history.push('/users');
		}
		const updateCb = (user: any) => {
			userActions.updateUser(
			(({ id, email, name, external_code, role, tags }) => ({ id, email, name, external_code, role, tags }))(values));
			alert('Salvo com sucesso!');
		}

		const cb = creating ? createCb : updateCb;

		axios(config)
		.then(all => {
			let response = all.data;
			if (!!response.errors) {
				console.log(response);
				for (const key in response.errors) { alert(`${key} ${response.errors[key]}`); }
				return;
			} else cb(response);
		})
		.catch(e => console.error(e))
		.finally(() => handleSetValues('loading', false))
	}

	React.useEffect(() => {
		let uid = match.params.id || false;

		console.log(match, usersList);
		if (uid) {
			let user = usersList.find(u => u.id === parseInt(uid));
			if (!user) {
				alert('Usuario nao encontrado!');
				// return history.push('/users');
			} else setValues({...values, ...user, title: user.email});
		}
	}, []);

	const handleChipInputUpdate = (sEvent: any) => {
		let value = sEvent.currentTarget.value;
		if (value.search(',') <= -1) return;
		handleSetValues('tags', [...values.tags, value.replace(/,/g, '')]);
	}

  return (
		<Grid container className={classes.root}>
			<Grid item xs={6}>
      <Breadcrumbs aria-label="Breadcrumb">
          <Link color="inherit" href="#" onClick={() => history.push('/users')} >Usuarios</Link>
          <Typography variant="h5" color="textPrimary">{values.title}</Typography>
        </Breadcrumbs>
			</Grid>
			<Grid item xs={12}>
				{/* <Paper> */}
					<form onSubmit={handleSubmit}>
					
						<div>
							<TextField
									label={keyLabels['name']}
									value={values.name}
									onChange={handleChange('name')}
									margin="normal"
									variant="outlined"
								/>
						</div>

						<div>
							<TextField
								label={keyLabels['email']}
								type="email"
								value={values.email}
								onChange={handleChange('email')}
								margin="normal"
								variant="outlined"
								required
							/>
						</div>

						<div>
							<TextField
								label={keyLabels['external_code']}
								value={values.external_code}
								onChange={handleChange('external_code')}
								margin="normal"
								variant="outlined"
							/>
						</div>

						<div>
							<TextField
								select
								label={keyLabels['role']}
								value={values.role}
								onChange={handleChange('role')}
								margin="normal"
								variant="outlined"
							>
								<MenuItem value={0}>Gestor</MenuItem>
								<MenuItem value={1}>Agente</MenuItem>
								<MenuItem value={2}>Local</MenuItem>
							</TextField>
						</div>

						<div>
							<ChipInput
								label={keyLabels['tags']}
								value={values.tags}
								// defaultValue={['foo', 'bar']}
								onChange={(chips) => handleSetValues('tags', chips)}
								onUpdateInput={handleChipInputUpdate}
								clearInputValueOnChange={true}
								margin="normal"
								variant="outlined"
								helperText="Separe por vírgulas"
							/>
						</div>

						<div className={classes.mt2} >
							{
								values.loading
								? <CircularProgress className={classes.progress} />
								: <Button type="submit" color="primary" variant="contained">Salvar</Button>
							}
						</div>

					</form>
					{/* <FormControl>
						<InputLabel htmlFor="my-input">Email</InputLabel>
						<Input id="my-input" aria-describedby="my-helper-text" />
					</FormControl> */}
				{/* </Paper> */}
			</Grid>
		</Grid>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		padding: 20,
		[theme.breakpoints.down("md")]: {
			paddingTop: 50,
			paddingLeft: 15,
			paddingRight: 15,
		},
	},

	buttonContainer: {
		width: "100%",
		display: "flex",
		justifyContent: "flex-end",
	},

	button: {
		marginBottom: 15,
	},

	progress: {
		margin: theme.spacing(2),
	},

	mt2: {
		marginTop: 20
	}
}));

export default UserPage;