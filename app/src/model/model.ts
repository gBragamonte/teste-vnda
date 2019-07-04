
export interface User {
    id: number;
    name: string;
    email: string;
    external_code: number;
    role: number;
    tags: string[];
}

export enum ActionType {
    FILL_USERS,
    ADD_USER,
    UPDATE_USER,
    DELETE_USER
}

export interface Action<T> {
    type: ActionType;
    payload: T;
}