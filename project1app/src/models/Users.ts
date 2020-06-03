import Role from "./Roles";
export class User {
  id: number;
  username: string;
  password: string;
  firstname:string;
  lastname:string;
  email: string;
  role: Role;

  constructor(id: number, username: string, password: string, firstname:string,lastname:string, email: string, role: Role) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.firstname=firstname;
    this.lastname=lastname;
    this.email = email;
    this.role = role;
  }
}

//user class to store user table data in to object form
// import Role from "./Roles"
// export class User {
//   userId: number;// primary key
//   userName: string; // not null, unique
//   password: string; // not null
 
//   email: string; // not null
//   role: Role; // not null

//   constructor(userId: number, userName: string, password: string, firstName: string, lastName: string, email: string, role: Role) {
//     this.userId = userId;
//     this.userName = userName;
//     this.password = password;
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.email = email;
//     this.role = role;
//   }
// }
