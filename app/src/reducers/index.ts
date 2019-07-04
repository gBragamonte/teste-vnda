import { History } from "history";
import { combineReducers } from "redux";
import { User } from "../model/model";
import * as userReducer from "./user";

export interface RootState {
	usersList: User[];
}

export default (history: History) =>
	combineReducers({
		...userReducer
	});
