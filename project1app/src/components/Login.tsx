import React from 'react';
import { User } from '../models/Users';
import { Form, FormGroup, Label, Col, Input, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
import { login } from '../apis/Login';

//the updateUser prop takes a function that takes a user and returns voide
// it will match updateUser in App.
interface ILoginComponentProps {
  updateUser: (user: User) => void;
}

interface ILoginComponentState {
  username: string;
  password: string;
  isError: boolean;
  errorMessage: string;
}

export class LoginComponent extends React.Component<ILoginComponentProps, ILoginComponentState> {

  constructor(props: ILoginComponentProps) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isError: false,
      errorMessage: '',
    }
  }

  //We'll need a few functions to modify individual pieces of our state
  // These take change events
  setUsername = (un: any) => {
    this.setState({
      username: un.currentTarget.value,
    })
  }

  setPassword = (pw: any) => {
    this.setState({
      password: pw.currentTarget.value,
    })
  }

  clearError = () => {
    this.setState({
      errorMessage: '',
      isError: false,
    })
  }

  attemptLogin = async (event: any) => {
    event.preventDefault();
    console.log(event);
    try {
      const loggedInUser: User = await login(this.state.username, this.state.password);
      this.props.updateUser(loggedInUser);
      this.setState({
        username: '',
        password: '',
        errorMessage:"login succesful",
      });
    } catch (error) {
      this.setState({
        password: '',
        isError: true,
        errorMessage: error.message,
      })
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.attemptLogin}>
          <FormGroup row>
            <Label for="username" sm={2}>Username</Label>
            <Col sm={6}>
              {/* onChange lets Input change state, value lets Input display state */}
              <Input onChange={this.setUsername} value={this.state.username} type="text" name="username" id="username" placeholder="your username" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={2}>Password</Label>
            <Col sm={6}>
              <Input onChange={this.setPassword} value={this.state.password} type="password" name="password" id="password" required />
            </Col>
          </FormGroup>
          <Button color="info">Submit</Button>
        </Form>
        <Toast isOpen={this.state.isError}>
          <ToastHeader icon="danger" toggle={this.clearError}>
            Error!
        </ToastHeader>
          <ToastBody>
            {this.state.errorMessage}
          </ToastBody>

        </Toast>
      </div>
    );
  }

}