// prettier-ignore
import { AppBar, Divider, Drawer as DrawerMui, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, withWidth } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { WithWidth } from "@material-ui/core/withWidth";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { connect } from "react-redux";
import { Route, RouteComponentProps, Router } from "react-router-dom";
import { history } from "./configureStore";
import { Todo } from "./model/model";
import HomePage from "./pages/HomePage";
import UsersListPage from "./pages/UsersListPage";
import UserPage from "./pages/UserPage";
import { RootState } from "./reducers/index";
import withRoot from "./withRoot";

function Routes() {
	const classes = useStyles();

	return (
		<div className={classes.content}>
			<Route exact={true} path="/" component={HomePage} />
			<Route exact={true} path="/users" component={UsersListPage} />
			<Route exact={true} path="/users/new" component={UserPage} />
			<Route exact={true} path="/users/:id/edit" component={UserPage} />
		</div>
	);
}

function Drawer(props: { history: any }) {
	
	const classes = useStyles();

	const [currRoute, setcurrRoute] = React.useState(history.location.pathname);

	history.listen((location) => setcurrRoute(location.pathname));

	return (
		<div>
			<div className={classes.drawerHeader} />
			<Divider />
			<List>
				<ListItem button selected={currRoute === '/'} onClick={() => history.push("/")} >
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Inicio" />
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem button selected={currRoute === '/users'} onClick={() => history.push("/users")}>
					<ListItemIcon>
						<PeopleIcon />
					</ListItemIcon>
					<ListItemText primary="Usuários" />
				</ListItem>
			</List>
		</div>
	);
}

interface Props extends RouteComponentProps<void>, WithWidth {
	todoList: Todo[];
}

function App(props?: Props) {
	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = React.useState(true);

	if (!props) {
		return null;
	}

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<Router history={history}>
			<div className={classes.root}>
				<div className={classes.appFrame}>
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={handleDrawerToggle}
								className={classes.navIconHide}
							>
								<MenuIcon />
							</IconButton>
						</Toolbar>
					</AppBar>
					<Hidden mdUp>
						<DrawerMui
							variant="temporary"
							anchor={"left"}
							open={mobileOpen}
							classes={{
								paper: classes.drawerPaper,
							}}
							onClose={handleDrawerToggle}
							ModalProps={{
								keepMounted: false, // Better open performance on mobile.
							}}
						>
							<Drawer history={history} />
						</DrawerMui>
					</Hidden>
					<Hidden smDown>
						<DrawerMui
							variant="permanent"
							open
							classes={{
								paper: classes.drawerPaper,
							}}
						>
							<Drawer history={history} />
						</DrawerMui>
					</Hidden>
					<Routes />
				</div>
			</div>
		</Router>
	);
}


const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		height: "100%",
		zIndex: 1,
		overflow: "hidden",
	},
	appFrame: {
		position: "relative",
		display: "flex",
		width: "100%",
		height: "100%",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		position: "absolute",
	},
	navIconHide: {
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	drawerHeader: theme.mixins.toolbar,
	drawerPaper: {
		width: 250,
		backgroundColor: theme.palette.background.default,
		[theme.breakpoints.up("md")]: {
			width: drawerWidth,
			position: "relative",
			height: "100%",
		},
	},
	content: {
		backgroundColor: theme.palette.background.default,
		width: "100%",
		height: "calc(100% - 56px)",
		marginTop: 56,
		[theme.breakpoints.up("sm")]: {
			height: "calc(100% - 64px)",
			marginTop: 64,
		},
	},
}));

function mapStateToProps(state: RootState) {
	return {
		todoList: state.todoList,
	};
}

export default connect(mapStateToProps)(withRoot(withWidth()(App)));
