// prettier-ignore
import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../actions";
import * as UserActions from "../actions/user";
import { User } from "../model/model";
import { RootState } from "../reducers";
import ConfirmDialog from "../components/ConfirmDialog";
import axios from 'axios';
import { history } from "../configureStore";
import LinearProgress from '@material-ui/core/LinearProgress';
import { fetchUsersFromAPI } from '../resources/user';

interface Props {}

function UsersTable(props: Props) {
	const classes = useStyles();
	const usersList = useSelector((state: RootState) => state.usersList);
  const userActions = useActions(UserActions);

  const [openDialog, setOpenDialog] = React.useState(false);
  const [msgDialog, setMsgDialog] = React.useState('');
	const [deleteUserId, setDeleteUserId] = React.useState();
	const [loading, setLoading] = React.useState(false);

	
	
	// like componentDidMounted
	React.useEffect(() => {
		
		if (!usersList.length) {
			setLoading(true);
			fetchUsersFromAPI()
			.then(response => {
				userActions.fillUsers(response.data);
				setLoading(false);
			});
		}

	}, [usersList, userActions]);
	
	// window.console.log('users table mounted');

	const handleCloseDialog = () => { setOpenDialog(false); };
  
  const handleConfirmDialog = () => {
		setLoading(true);
		handleCloseDialog();
		axios.delete(`http://localhost:3001/users/${deleteUserId}`)
		.then(response => {
			userActions.deleteUser(deleteUserId);
			setLoading(false);
		})
  }
  
  const confirmDelete = (id: number) => {
    setMsgDialog('Tem certeza que deseja excluir este usuario?');
    setOpenDialog(true);
    setDeleteUserId(id);
  }

	return (
		<Paper className={classes.paper}>
			{loading ? <LinearProgress /> : ''}
			
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell padding="default">Nome</TableCell>
						<TableCell padding="default">Email</TableCell>
						<TableCell padding="default">Código Externo</TableCell>
						<TableCell padding="default">Ações</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{usersList.map((u: User) => {
						return (
							<TableRow key={u.id} hover>
								<TableCell>{u.name}</TableCell>
								<TableCell>{u.email}</TableCell>
								<TableCell>{u.external_code}</TableCell>
								<TableCell>
									<IconButton
										title="Editar"
										aria-label="Editar"
										color="primary"
										onClick={() => history.push(`/users/${u.id}/edit`)}
									>
										<EditIcon />
									</IconButton>
									<IconButton
										title="Excluir"
										aria-label="Excluir"
										color="secondary"
										onClick={() => confirmDelete(u.id)}
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
      {/*  */}
      <ConfirmDialog
        open={openDialog}
        msg={msgDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog}
      />
		</Paper>
	);
}

const useStyles = makeStyles({
	paper: {
		width: "100%",
		minWidth: 260,
		display: "inline-block",
	},
	table: {
		width: "100%",
	},
});

export default UsersTable;
