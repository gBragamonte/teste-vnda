import { Button, Grid, Typography, Breadcrumbs } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import UsersTable from "../components/UsersTable";

import { history } from "../configureStore";

interface Props extends RouteComponentProps<void> {}

function UsersListPage(props: Props) {
	const classes = useStyles();

	return (
		<Grid container className={classes.root}>
			<Grid item xs={6}>
      <Breadcrumbs aria-label="Breadcrumb">
          <Typography variant="h5" color="textPrimary">Usuarios</Typography>
        </Breadcrumbs>
			</Grid>
			<Grid item xs={6}>
				<div className={classes.buttonContainer}>
					<Button
						className={classes.button}
						variant="contained"
						color="primary"
						onClick={() => history.push('/users/new')}
					>
						Novo
					</Button>

				</div>
			</Grid>
			<Grid item xs={12}>
        <UsersTable />
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
}));

export default UsersListPage;
