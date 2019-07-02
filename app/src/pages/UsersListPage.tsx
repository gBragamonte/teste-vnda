import { Button, Grid, Typography, Breadcrumbs, Paper, Container } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import UsersTable from "../components/UsersTable";

import { history } from "../configureStore";
import clsx from 'clsx';

interface Props extends RouteComponentProps<void> {}

function UsersListPage(props: Props) {
	
	const classes = useStyles();

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	return (
		<main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container>
						<Grid item xs={6}>
							<Typography variant="h4" align="right" color="textPrimary">Usuarios</Typography>
						</Grid>
						<Grid item xs={6}>
							<div className={classes.buttonContainer}>
								<Button
									className={classes.button}
									variant="contained"
									color="primary"
									onClick={() => history.push('/users/new')}
								>Novo</Button>
							</div>
						</Grid>
            {/* Chart */}
            <Grid item xs={12}>
								<UsersTable />
            </Grid>
          </Grid>
        </Container>
      </main>
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

	content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
	},
	
	appBarSpacer: theme.mixins.toolbar,

	container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },

	buttonContainer: {
		width: "100%",
		display: "flex",
		justifyContent: "flex-end",
	},

	button: {
		marginBottom: 15,
	},

	paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
	},

	fixedHeight: {
    height: 240,
  },
	
}));

export default UsersListPage;
