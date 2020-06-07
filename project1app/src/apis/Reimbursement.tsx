import axios from "axios";
import { FailedLoginError } from "../errors/DisplayErrorMessage";
import Reimbursement from "../models/Reimbursement";

const reimbursementClient = axios.create({
  baseURL: "http://3.21.28.108:3000",
  // If you don't have the following line, your login won't work!
  withCredentials: true,
});

export async function getAllReimbursementByStatusId(
  id: number
): Promise<Reimbursement[]> {
  const response = await reimbursementClient.get(
    "/reimbursements/status/" + id
  );
  return response.data.map((reimObj: any) => {
    const {
      reimbursementId,
      author,
      amount,
      dateSubmitted,
      dateResolved,
      description,
      resolver,
      status,
      type,
    } = reimObj;
    return new Reimbursement(
      reimbursementId,
      author,
      amount,
      dateSubmitted,
      dateResolved,
      description,
      resolver,
      status,
      type
    );
  });
}

export async function getAllReimbursementByUserId(
  uid: number
): Promise<Reimbursement[]> {
  const response = await reimbursementClient.get(
    "/reimbursements/author/userId/" + uid
  );
  return response.data.map((reimObj: any) => {
    const {
      reimbursementId,
      author,
      amount,
      dateSubmitted,
      dateResolved,
      description,
      resolver,
      status,
      type,
    } = reimObj;
    return new Reimbursement(
      reimbursementId,
      author,
      amount,
      dateSubmitted,
      dateResolved,
      description,
      resolver,
      status,
      type
    );
  });
}

export async function submitReimbursement(
  reim: Reimbursement
): Promise<Reimbursement> {
  try {
    const response = await reimbursementClient.post("/reimbursements",{
      reimbursementId:0,
      author: reim.author,
      amount: reim.amount,
      dateSubmitted:reim.dateSubmitted,
      dateResolved: reim.dateResolved,
      description: reim.description,
      resolver: reim.resolver,
      status: 2,
      type: reim.type,
    });
    const {
      reimbursementId,
      author,
      amount,
      dateSubmitted,
      dateResolved,
      description,
      resolver,
      status,
      type,
    } = response.data;
     return new Reimbursement(
      reimbursementId,
      author,
      amount,
      dateSubmitted,
      dateResolved,
      description,
      resolver,
      status,
      type
    );
  } catch (e) {
    if (e.response.status === 401) {
      throw new Error(`Failed to authenticate with username`);
    } else {
      console.log(e);
      throw new Error("There was a problem logging in");
      
    }
  }
}

export async function updateReimburement(
  reim: Reimbursement
): Promise<Reimbursement> {
  const response = await reimbursementClient.patch("/reimbursements", {
    reimbursementId: reim.reimbursementId,
    author: reim.author,
    amount: reim.amount,
    dateSubmitted: reim.dateSubmitted,
    dateResolved: new Date(),
    description: reim.description,
    resolver: reim.resolver,
    status: reim.status,
    type: reim.type,
  });
  const {
    reimbursementId,
    author,
    amount,
    dateSubmitted,
    dateResolved,
    description,
    resolver,
    status,
    type,
  } = response.data;

  return new Reimbursement(
    reimbursementId,
    author,
    amount,
    dateSubmitted,
    dateResolved,
    description,
    resolver,
    status,
    type
  );
}
