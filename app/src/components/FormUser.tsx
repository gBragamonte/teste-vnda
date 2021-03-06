import { TextField, MenuItem, CircularProgress, Button } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import axios, { AxiosRequestConfig } from "axios";
import * as React from "react";
import { useActions } from "../actions";
import * as UserActions from "../actions/user";
import { history } from "../configureStore";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";

const keyLabels: {[k: string]: any} = {
  name: 'Nome',
  email: 'Email',
  external_code: 'Código Externo',
  role: 'Função',
  tags: 'Tags'
};

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


function FormUser (props: React.ComponentProps<any>) {

  const [values, setValues] = React.useState<State>(initialState);
  const userActions = useActions(UserActions);
  const classes = useStyles();

  const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.value });
	};

  const handleSetValues = (key: keyof State, val: any) => setValues({ ...values, [key]: val });

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
				for (const key in response.errors) {
          alert(`${keyLabels[key]} ${response.errors[key]}`);
        }
				return;
			} else cb(response);
		})
		.catch(e => console.error(e))
		.finally(() => handleSetValues('loading', false))
  }
  
  const handleChipInputUpdate = (sEvent: any) => {
		let value = sEvent.currentTarget.value;
		if (value.search(',') <= -1) return;
		handleSetValues('tags', [...values.tags, value.replace(/,/g, '')]);
  }
  
  React.useEffect(() => {
    console.log(props)
  }, [])
  
  return (
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
  )
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

export default FormUser;