// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import * as React from "react";

interface Props {
	open: boolean;
	msg: string;
	onClose: () => void;
	onConfirm: () => void;
}

function ConfirmDialog(props: Props) {
	var { open, msg, onClose, onConfirm } = props;

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{msg}</DialogTitle>
			<DialogActions>
				<Button color="secondary" onClick={onClose}>Cancelar</Button>
				<Button color="primary" onClick={onConfirm}>Sim</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ConfirmDialog;
