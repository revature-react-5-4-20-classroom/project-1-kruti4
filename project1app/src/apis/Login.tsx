import axios from 'axios';

import { User } from '../models/Users';
import { FailedLoginError } from '../errors/DisplayErrorMessage';

const loginClient = axios.create({
    baseURL: 'http://3.21.28.108:3000',
    // If you don't have the following line, your login won't work!
    withCredentials: true,
});

export async function login(un: string, pw: string): Promise<User> {
    try {
        const response = await loginClient.post('/login', { username: un, password: pw });
        
        
        const {  userId, userName, password,firstName,lastName, email, role  } = response.data;
        console.log("server responce api "+userId);
        return new User( userId, userName, password,firstName,lastName, email, role );
    } catch (e) {
        if (e.response.status === 401) {
            throw new FailedLoginError('Failed to authenticate', un);
        } else {
            // We could throw a different custom error, this exposes a little too much to the user.
            throw e;
        }
    }

}