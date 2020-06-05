import axios from "axios";
import { User } from "../models/Users";
import { FailedLoginError } from "../errors/DisplayErrorMessage";
import Role from "../models/Roles";

const userClient = axios.create({
  baseURL: "http://3.21.28.108:3000",
  // If you don't have the following line, your login won't work!
  withCredentials: true,
});

export async function getAllUsers(): Promise<User[]> {
  const response = await userClient.get("/users");
  console.log("server responce" + response.data);
  //   let c: string = response.data.role.role;\
  let c: string;
  return response.data.map((userObj: any) => {
    c = userObj.role.role;
    const { userId, userName, password, firstName, lastName, email } = userObj;
    return new User(userId, userName, password, firstName, lastName, email, c);
  });
}

export async function getUsersById(id: number): Promise<User> {
  const response = await userClient.get("/users/" + id);
  console.log("server responce" + response.data);
  let c: string = response.data.role.role;
  const {
    userId,
    userName,
    password,
    firstName,
    lastName,
    email,
  } = response.data;
  return new User(userId, userName, password, firstName, lastName, email, c);
  //     const { userId, username, password, email, role } = userObj;
  //     return new User(userId, username, password, email, role);
  // });
}

// export async function updateUser(u:User,id:number) :Promise<User>{
//   const response = await userClient.patch("/users/",{
//   userId:u.userId,
//   userName:u.userName,
//   password: u.password,
//   firstName:u.firstName,
//   lastName:u.lastName,
//   email:u.email,
//   role:{role:u.role,roleid:id}
// });
// console.log("server responce" + response.data);
// let c: string = response.data.role.role;
// const {
//   userId,
//   userName,
//   password,
//   firstName,
//   lastName,
//   email,

// } = response.data;
// return new User(userId, userName, password, firstName, lastName, email, c);
// }}
