import axios from 'axios';

const urlBase = 'http://localhost:3001';

export const fetchUsersFromAPI = () => axios.get(`${urlBase}/users`);