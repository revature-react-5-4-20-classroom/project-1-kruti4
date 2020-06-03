import React from "react";
// import { reactstrap } from "reactstrap";
import { User } from "../models/Users";
import { getAllUsers, getUsersById } from "../apis/Users";
import { Container, Row, CardDeck, Card } from "reactstrap";
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
      responce: "any",
      parsed: (d: string) => {
        return JSON.parse(d);
      },
      flag: true,
      flag2: false,
    };
  }
  async componentDidMount() {
    //This runs after the component has added an element to the actual DOM for the first time.
    // In other words, this runs once the component is done being created.
    // Send requests here!
    this.setState({
      responce: await getUsersById(1),
    });
  }
  getAllUsersData = async () => {
    this.setState({
      responce: await getAllUsers(),
      flag2: true,
    });
  };
  //   parseData=(d:string)=>{
  //       const data = JSON.parse(d);

  //         this.state.parsed=data,

  //   }
  //   getAllUserInfo = async () => {
  //     const AllUser: User[] =
  //     console.log("all users info" + AllUser);
  //   };
  // async componentDidUpdate() {
  //     //This runs when the component updates on the actual DOM
  //     this.setState({
  //         responce: await getAllUsers()
  //     });
  //   }
  getUserById = async (id: any) => {
    this.setState({
      responce: await getUsersById(id.currentTarget.value),
      flag: true,
    });
  };
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
          <input type="text" onChange={this.getUserById} />
        </div>
        {/* <h5> {this.state.responce}</h5> */}
        {/* <h5>{this.state.parsed(this.state.responce)}</h5> */}
        {
          // for(let i in JSON.parse(JSON.stringify(this.state.responce))){
          // }
        }

        {/* {this.state.map((user:User,i:number) => {
        //   return (
        //     <tr key={i}>
        //       <td>{user.email}</td>
        //     </tr>
        //   );
        })} */}

        <Container
          fluid={true}
          style={{ display: this.state.flag ? "block" : "none" }}
        >
          <Row>
            <CardDeck className=" no-gutters ">
              {/* {this.state.responce.map((postData: User) => { */}
              {/* console.log(postData); */}

              <Card key={this.state.responce.id}>
                <p>{this.state.responce.id}</p>
                <p>{this.state.responce.firstname}</p>
                <p>{this.state.responce.lastname}</p>
                <p>{this.state.responce.username}</p>
                <p>{this.state.responce.password}</p>
                <p>{this.state.responce.email}</p>
                {/* <p>{this.state.responce.role.role}</p> */}
                {/* <Card.Img variant="top" src={postData.image} />

        <p>{postData.email}</p>
                    <p>{postData.username}</p>
         </Card.Title>
											<Card.Subtitle className={style.tag}>
												{postData.tag + " "}
											</Card.Subtitle>
		<Card.Text className={style.para}>
{postData.body}
											</Card.Text>  */}
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
