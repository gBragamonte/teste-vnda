import axios from 'axios';
import { useSelector } from "react-redux";
import { useActions } from "../actions";
import { RootState } from "../reducers";
import * as UserActions from "../actions/user";

const urlBase = 'http://localhost:3001';

export const fetchUsersFromAPI = () => axios.get(`${urlBase}/users`);