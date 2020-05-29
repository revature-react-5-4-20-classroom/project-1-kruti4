import axios from 'axios';
import { User } from '../models/Users';
import { FailedLoginError } from '../errors/DisplayErrorMessage';

const userClient = axios.create({
    baseURL: 'http://3.21.28.108:3000',
    // If you don't have the following line, your login won't work!
    withCredentials: true,
});


export async function getAllUsers(): Promise<User[]> {
    const response = await userClient.get('/users');
    console.log("server responce"+response.data);
    
    return response.data.map((userObj: any) => {
        const { userId, username, password, email, role } = userObj;
        return new User(userId, username, password, email, role);
    });
}