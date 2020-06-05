import React from "react";
// import { reactstrap } from "reactstrap";
import { User } from "../models/Users";
import { getAllUsers, getUsersById } from "../apis/Users";
import { Container, Row, CardDeck, Card, Spinner } from "reactstrap";
import { ObjectTable } from "./object-table";
import { UpdateUser } from "./updateUserInfo";
interface IAllUsersState {
  user_id: number;
  username: string;
  email: string;
}

export class AllUsers extends React.Component<User, any> {
  constructor(props: User) {
    super(props);
    this.state = {
      //   user_id: 0,
      //   username: "",
      //   email: "",
      responce: " ",
      parsed: (d: string) => {
        return JSON.parse(d);
      },
      flag: false,
      flag2: false,
    };
  }
  async componentDidMount() {
    //This runs after the component has added an element to the actual DOM for the first time.
    // In other words, this runs once the component is done being created.
    // Send requests here!
    this.setState({
      responce: await getUsersById(1),
      flag: true,
      flag2: false,
    });
  }
  getAllUsersData = async () => {
    this.setState({
      responce: await getAllUsers(),
      flag2: true,
      flag: false,
    });
  };
  getUserById = async (id: any) => {
    this.setState({
      responce: await getUsersById(id.currentTarget.value),
      flag: true,
      flag2: false,
    });
 
  };
  updateUser(){
    
  }
  render() {
    return (
      <>
        <h4>get all users</h4>
        <h5>{typeof this.state.responce}</h5>
        <button onClick={this.getAllUsersData}>
          get All Users Information
        </button>
        <div style={{ display: this.state.flag2 ? "block" : "none" }}>
          <label htmlFor="">Enter User Id</label>
          <input type="text" onChange={this.getUserById}  />

        </div>
        <div style={{ display: this.state.flag2 ? "block" : "none" }}>
          {this.state.flag2 ? (
            <ObjectTable objects={this.state.responce} />
          ) : (
            <Spinner />
          )}
        </div>

        <Container
          fluid={true}
          style={{ display: this.state.flag ? "block" : "none" }}
        >
          <Row>
            <CardDeck className=" no-gutters ">
              <Card key={this.state.responce.id}>
                <p>{this.state.responce.id}</p>
                <p>{this.state.responce.firstName}</p>
                <p>{this.state.responce.lastName}</p>
                <p>{this.state.responce.userName}</p>
                <p>{this.state.responce.password}</p>
                <p>{this.state.responce.email}</p>
                <p>{this.state.responce.role}</p>
<button onClick={this.updateUser} >update</button>
              </Card>

            </CardDeck>
          </Row>
        </Container>
      </>
    );
  }
}

// for only one object
///const arr = []
// Object.keys(MyObject).forEach(key => arr.push({name: key, value: MyObject[key]}))
// console.log(arr[0].name, arr[0].value) //id, jarvaniv (I prefer Zac)
// import React from "react";
// // import { reactstrap } from "reactstrap";
// import { User } from "../models/Users";
// import { getAllUsers, getUsersById } from "../apis/Users";
// import {
//   Container,
//   Row,
//   CardDeck,
//   Card,
//   Table,
//   Toast,
//   Spinner,
// } from "reactstrap";
// import { ObjectTable } from "./object-table";
// interface IAllUsersState {
//   user_id: number;
//   username: string;
//   email: string;
// }

// export class AllUsers extends React.Component<User, any> {
//   constructor(props: User) {
//     super(props);
//     this.state = {
//       //   user_id: 0,
//       //   username: "",
//       //   email: "",
//       responce: "any",
//       parsed: (d: string) => {
//         return JSON.parse(d);
//       },
//       flag: false,
//       flag2: false,
//       usersLoaded: false,
//     };
//   }
//   async componentDidMount() {
//     //This runs after the component has added an element to the actual DOM for the first time.
//     // In other words, this runs once the component is done being created.
//     // Send requests here!
//     try {
//       this.setState({
//         responce: await getUsersById(1),
//         flag: true,
//       });
//       } catch (e) {
//           console.log(e.message, {type:"error"});
//       }
//     }
//   getAllUsersData = async () => {
//     try {
//       this.setState({
//         responce: await getAllUsers(),
//         usersLoaded: true,
//         flag:false,
//         flag2:true
//       });
//     } catch (e) {
//       console.log(e.message, { type: "error" });
//     }
//   };
//   //   parseData=(d:string)=>{
//   //       const data = JSON.parse(d);

//   //         this.state.parsed=data,

//   //   }
//   //   getAllUserInfo = async () => {
//   //     const AllUser: User[] =
//   //     console.log("all users info" + AllUser);
//   //   };
//   // async componentDidUpdate() {
//   //     //This runs when the component updates on the actual DOM
//   //     this.setState({
//   //         responce: await getAllUsers()
//   //     });
//   //   }
//   getUserById = async (id: any) => {
//     this.setState({
//       responce: await getUsersById(id.currentTarget.value),
//       flag: true,
//     });
//   };
//   render() {
//     return (
//       <>
//         <h4>get all users</h4>
//         <h5>{typeof this.state.responce}</h5>
//         <button onClick={this.getAllUsersData}>
//           get All Users Information
//         </button>
//         <div style={{ display: this.state.flag2 ? "block" : "none" }}>
//           <label htmlFor="">Enter User Id</label>
//           <input type="text" onChange={this.getUserById} />
//         </div>

//          <div style={{ display: this.state.booksLoaded ? "block" : "none" }}>
//           {this.state.booksLoaded ? (
//             <ObjectTable objects={this.state.responce} />
//           ) : (
//             <Spinner />
//           )}
//         </div>
//         <Container
//           fluid={true}
//           style={{ display: this.state.flag ? "block" : "none" }}
//         >
//           <Row>
//             <CardDeck className=" no-gutters ">
//               <Card key={this.state.responce.id}>
//                 <p>{this.state.responce.id}</p>
//                 <p>{this.state.responce.firstname}</p>
//                 <p>{this.state.responce.lastname}</p>
//                 <p>{this.state.responce.username}</p>
//                 <p>{this.state.responce.password}</p>
//                 <p>{this.state.responce.email}</p>
//                 <p>{this.state.responce.role}</p>
//               </Card>
//             </CardDeck>
//           </Row>
//         </Container>
//       </>
//     );
//   }
// }

// for only one object
///const arr = []
// Object.keys(MyObject).forEach(key => arr.push({name: key, value: MyObject[key]}))
// console.log(arr[0].name, arr[0].value) //id, jarvaniv (I prefer Zac)
