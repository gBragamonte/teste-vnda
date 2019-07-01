import { Action, ActionType, User } from "../model/model";
import createReducer from "./createReducer";

export const usersList = createReducer<User[]>([], {
	[ActionType.FILL_USERS](state: User[], action: Action<User>) {
		return action.payload;
	},
	[ActionType.ADD_USER](state: User[], action: Action<User>) {
    return [...state, action.payload];
	},
	[ActionType.UPDATE_USER](state: User[], action: Action<User>) {
		console.log(state, action);
		return state.map(u => {
			if (u.id === action.payload.id) return {...u, ...action.payload};
			return u;
		})
	},
	[ActionType.DELETE_USER](state: User[], action: Action<number>) {
		return state.filter(t => t.id !== action.payload);
	},
});
