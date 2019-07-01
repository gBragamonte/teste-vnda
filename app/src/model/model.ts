
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export interface User {
    id: number;
    name: string;
    email: string;
    external_code: number;
    role: number;
    tags: string[];
}

export enum ActionType {
    ADD_TODO,
    DELETE_TODO,
    COMPLETE_TODO,
    UNCOMPLETE_TODO,
    FILL_USERS,
    ADD_USER,
    UPDATE_USER,
    DELETE_USER
}

export interface Action<T> {
    type: ActionType;
    payload: T;
}