import axios from 'axios';
import { FailedLoginError } from '../errors/DisplayErrorMessage';
import Reimbursement from '../models/Reimbursement';

const reimbursementClient = axios.create({
    baseURL: 'http://3.21.28.108:3000',
    // If you don't have the following line, your login won't work!
    withCredentials: true,
});


export async function getAllReimbursement(): Promise<Reimbursement[]> {
    const response = await reimbursementClient.get('/reimbursement');
    return response.data.map((reimObj: any) => {
        const { reimbursement_id, author, amount, date_submitted, date_resolved, description,resolver, status, type } = reimObj;
        return new Reimbursement(reimbursement_id, author, amount, date_submitted, date_resolved, description,resolver, status, type);
    });
}