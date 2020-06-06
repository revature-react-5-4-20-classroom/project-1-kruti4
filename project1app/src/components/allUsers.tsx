import React from "react";
// import { reactstrap } from "reactstrap";
import { User } from "../models/Users";
import { getAllUsers, getUsersById } from "../apis/Users";
import { Container, Row, CardDeck, Card, Spinner, Col } from "reactstrap";
import { ObjectTable } from "./userDisplayTable";
import { UpdateUser } from "./updateUserInfo";
interface IAllUsersState {
  responceLoggedUser: User;
  allUser: any;
  responceById: User;
  flag: boolean;
  flag2: boolean;
  formFlag: boolean;
}

export class AllUsers extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      //   user_id: 0,
      //   username: "",
      //   email: "",
      responceLoggedUser: "",
      allUser: "",
      responceById: "",

      flag: false,
      flag2: false,
      formFlag: false,
    };
  }
  async componentDidMount() {
    //This runs after the component has added an element to the actual DOM for the first time.
    // In other words, this runs once the component is done being created.
    // Send requests here!
    this.setState({
      responceLoggedUser: await getUsersById(this.props.loggedInUser.userId),
      flag: true,
      flag2: false,
    });
  }
  getAllUsersData = async () => {
    this.setState({
      allUser: await getAllUsers(),
      flag2: true,
      flag: false,
    });
  };
  getUserById = async (id: any) => {
    this.setState({
      allUser: await getUsersById(id.currentTarget.value),
      flag: true,
      flag2: false,
    });
  };
  updateUser = async () => {
    this.setState({
      // responce: await getUsersById(this.props.loggedInUser.userId),
      formFlag: true,
    });
  };
  render() {
    return (
      <>
        <h2>{typeof this.props}</h2>
        <div style={{ display: !this.state.formFlag ? "block" : "none" }}>
          {/* <h4>get all users</h4> */}
          {/* <h5>{typeof this.state.responce}</h5> */}
          <Container
            style={{
              display:
                this.props.loggedInUser &&
                this.props.loggedInUser.role === "finance-manager"
                  ? "block"
                  : "none",
            }}
          >
            <Row>
              <Col>
                <button onClick={this.getAllUsersData}>
                  get All Users Information
                </button>
                <div style={{ display: this.state.flag2 ? "block" : "none" }}>
                  <label htmlFor="">Enter User Id</label>
                  <input type="text" onChange={this.getUserById} />
                </div>
                <div style={{ display: this.state.flag2 ? "block" : "none" }}>
                  {this.state.flag2 ? (
                    <ObjectTable objects={this.state.allUser} />
                  ) : (
                    <Spinner />
                  )}
                </div>
              </Col>
            </Row>
          </Container>

          <Container
            md={{ size: 6 }}
            // fluid={true}
            style={{
              display:
                this.props.loggedInUser && this.state.flag ? "block" : "none",
            }}
          >
            <Row>
              <Col md={{ size: 4 }}>
                <CardDeck className=" no-gutters ">
                  <Card key={this.state.responceLoggedUser.userId}>
                    <p>{this.state.responceLoggedUser.userId}</p>
                    <p>{this.state.responceLoggedUser.firstName}</p>
                    <p>{this.state.responceLoggedUser.lastName}</p>
                    <p>{this.state.responceLoggedUser.userName}</p>
                    <p>{this.state.responceLoggedUser.password}</p>
                    <p>{this.state.responceLoggedUser.email}</p>
                    <p>{this.state.responceLoggedUser.role}</p>
                    <button onClick={this.updateUser}>update</button>
                  </Card>
                </CardDeck>
              </Col>
            </Row>
          </Container>
        </div>
        <div style={{ display: this.state.formFlag ? "block" : "none" }}>
          <UpdateUser  {...this.props} user={this.state.responceLoggedUser} loggedInUser={this.props.loggedInUser} />
        </div>
        <h2 style={{ display: !this.props.loggedInUser ? "block" : "none" }}>
          You Need to Login
        </h2>
      </>
    );
  }
}
