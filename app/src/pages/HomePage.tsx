import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps<void> {}

function HomePage(props: Props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography variant="h4" gutterBottom>
				Bem-vindo ao painel administrativo
			</Typography>
			<Typography variant="h5" gutterBottom>
				Selecione um dos menus ao lado para navegar
			</Typography>
		</div>
	);
}

const useStyles = makeStyles({
	root: {
		height: "100%",
		textAlign: "center",
		paddingTop: 20,
		paddingLeft: 15,
		paddingRight: 15,
	},

	centerContainer: {
		flex: 1,
		height: "90%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
	},

	button: {
		marginTop: 20,
	},
});

export default HomePage;
