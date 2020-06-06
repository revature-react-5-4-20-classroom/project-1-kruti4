import React from "react";
import { ObjectTable } from "./userDisplayTable";
import { updateUser } from "../apis/Users";
import { User } from "../models/Users";
import { FormGroup, Form, Label, Container, Row, Col, Input } from "reactstrap";
interface IUpdateUserState {
  userId: number;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  roleid: number;
  responce: any;
}
interface IUpdateUserProps {
  userId: number;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  roleid: number;
}

export class UpdateUser extends React.Component<any, IUpdateUserState> {
  constructor(props: IUpdateUserState) {
    super(props);
    this.state = {
      userId: this.props.loggedInUser.userId,
      userName: this.props.loggedInUser.userName,
      password: this.props.loggedInUser.password,
      firstName: this.props.loggedInUser.firstName,
      lastName: this.props.loggedInUser.lastName,
      email: this.props.loggedInUser.email,
      role: this.props.loggedInUser.role,
      roleid: this.props.loggedInUser.roleid,
      responce: "",
    };
  }
  // componentDidMount = () => {
  //   this.setState({});
  // npm };
  update = async (event:any) => {
    event.preventDefault()
    const uObj = new User(
      this.props.user.userId,
      this.state.userName,
      this.state.password,
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.props.user.role,
      this.props.user.roleid
    );
    this.setState({
      responce: await updateUser(uObj),
    });
  };
  initialBind = () => {
    this.setState({
      userId: this.props.user.userId,
      userName: this.state.userName,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      role: this.props.user.role,
      roleid: this.props.user.roleid,
    });
  };

  bindInputChangeToState = (changeEvent: any) => {
    //@ts-ignore
    this.setState({
      [changeEvent.currentTarget.name]: changeEvent.currentTarget.value,
    });
  };
  render() {
    return (
      <>
        <Container className="right">
          <Row>
            <Col md={{ size: 6, offset: 3 }}>
              <Form
                onSubmit={this.update}
                onLoadStart={this.bindInputChangeToState}
              >
                <FormGroup>
                  <Label htmlFor="">username: </Label>
                  <Input
                    type="text"
                    defaultValue={this.props.user.userName}
                    disabled
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="">First Name: </Label>
                  <Input
                    type="text"
                    name="firstName"
                    defaultValue={this.props.user.firstName}
                    onChange={this.bindInputChangeToState}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="">Last Name: </Label>
                  <Input
                    type="text"
                    name="lastName"
                    defaultValue={this.props.user.lastName}
                    onChange={this.bindInputChangeToState}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="">Email: </Label>
                  <Input
                    type="text"
                    name="email"
                    defaultValue={this.props.user.email}
                    onChange={this.bindInputChangeToState}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="">password:: </Label>
                  <Input
                    type="text"
                    name="password"
                    defaultValue={this.props.user.password}
                    onChange={this.bindInputChangeToState}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="">Role: </Label>
                  <Input
                    type="text"
                    name="role"
                    defaultValue={this.props.user.role}
                    disabled
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="">Role Id: </Label>
                  <Input
                    type="text"
                    name="roleid"
                    defaultValue={this.props.user.roleid}
                    disabled
                  />
                </FormGroup>
                <FormGroup>
                  <button type="submit">Update</button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
