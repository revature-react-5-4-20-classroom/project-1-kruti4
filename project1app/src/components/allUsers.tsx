import React from "react";
// import { reactstrap } from "reactstrap";
import { User } from "../models/Users";
import { getAllUsers, getUsersById } from "../apis/Users";
import {
  Container,
  Row,
  CardDeck,
  Card,
  Spinner,
  Col,
  Button,
  Input,
  Label,
  CardBody,
  CardFooter,
  CardText,
  CardHeader,
} from "reactstrap";
import { UserDisplayTable } from "./userDisplayTable";
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
  getAllUsersData = async (event: any) => {
    event.preventDefault();
    this.setState({
      allUser: await getAllUsers(),
      flag2: true,
      flag: false,
    });
  };
  getUserById = async (id: any) => {
    id.preventDefault();
    this.setState({
      responceLoggedUser: await getUsersById(id.currentTarget.value),
      flag: true,
      flag2: false,
    });
  };
  updateUser = async (event: any) => {
    event.preventDefault();
    this.setState({
      // responce: await getUsersById(this.props.loggedInUser.userId),
      formFlag: true,
    });
  };
  render() {
    return (
      <>
        <div style={{ display: !this.state.formFlag ? "block" : "none" }}>
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
                <Button onClick={this.getAllUsersData}>All Users</Button>
                <div style={{ display: this.state.flag2 ? "block" : "none" }}>
                  <Label htmlFor="">User Id</Label>
                  <Input type="number" onChange={this.getUserById} />
                </div>
                <div style={{ display: this.state.flag2 ? "block" : "none" }}>
                  {this.state.flag2 ? (
                    <UserDisplayTable
                      objects={this.state.allUser}
                      loggedInUser={this.props.loggedInUser}
                    />
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
                <h3>Your Information</h3>

                <Card key={this.state.responceLoggedUser.userId}>
                  <CardHeader>
                    <strong>
                      {" "}
                      {this.state.responceLoggedUser.firstName}{" "}
                      {this.state.responceLoggedUser.lastName}{" "}
                    </strong>
                  </CardHeader>

                  <CardBody>
                    <CardText>
                      <p>
                        <strong>User Id:</strong>
                        {this.state.responceLoggedUser.userId}
                      </p>
                      <p>
                        <strong>First Name:</strong>{" "}
                        {this.state.responceLoggedUser.firstName}
                      </p>
                      <p>
                        <strong>Last Name:</strong>{" "}
                        {this.state.responceLoggedUser.lastName}
                      </p>
                      <p>
                        <strong>Username:</strong>{" "}
                        {this.state.responceLoggedUser.userName}
                      </p>
                      <p>
                        <strong>Password: </strong>
                        {this.state.responceLoggedUser.password}
                      </p>
                      <p>
                        <strong>Email: </strong>
                        {this.state.responceLoggedUser.email}
                      </p>
                      <p>
                        <strong>Role: </strong>
                        {this.state.responceLoggedUser.role}
                      </p>
                    </CardText>
                  </CardBody>

                  <Button
                    style={{
                      display:
                        this.props.loggedInUser.userId ==
                        this.state.responceLoggedUser.userId
                          ? "block"
                          : "none",
                    }}
                    onClick={this.updateUser}
                    color="secondary"
                  >
                    update Information
                  </Button>
                </Card>
              </Col>
            </Row>
            <br />
          </Container>
        </div>
        <div style={{ display: this.state.formFlag ? "block" : "none" }}>
          <UpdateUser
            {...this.props}
            user={this.state.responceLoggedUser}
            loggedInUser={this.props.loggedInUser}
          />
        </div>
        <h2 style={{ display: !this.props.loggedInUser ? "block" : "none" }}>
          You Need to Login
        </h2>
      </>
    );
  }
}
