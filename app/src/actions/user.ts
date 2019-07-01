import { Action, ActionType, User } from "../model/model";

export function fetchUsers () {}

export function fillUsers (users: User[]): Action<User[]> {
	return {
		type: ActionType.FILL_USERS,
		payload: users
	};
}

export function addUser(user: User): Action<User> {
	return {
		type: ActionType.ADD_USER,
		payload: user,
	};
}

export function updateUser(user: User): Action<User> {
	return {
		type: ActionType.UPDATE_USER,
		payload: user,
	};
}

export function deleteUser(userId: number): Action<number> {
	return {
		type: ActionType.DELETE_USER,
		payload: userId,
	};
}
