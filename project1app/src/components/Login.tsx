import React from "react";
import { User } from "../models/Users";
import {
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
  Toast,
  ToastHeader,
  ToastBody,
  Container,
  Row,
} from "reactstrap";
import { login } from "../apis/Login";

//the updateUser prop takes a function that takes a user and returns voide
// it will match updateUser in App.
interface ILoginComponentProps {
  updateUser: (user: User) => void;
}

interface ILoginComponentState {
  userName: string;
  password: string;
  isError: boolean;
  errorMessage: string;
}

export class LoginComponent extends React.Component<any, ILoginComponentState> {
  constructor(props: ILoginComponentProps) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      isError: false,
      errorMessage: "",
    };
  }

  //We'll need a few functions to modify individual pieces of our state
  // These take change events
  setuserName = (un: any) => {
    this.setState({
      userName: un.currentTarget.value,
    });
  };

  setPassword = (pw: any) => {
    this.setState({
      password: pw.currentTarget.value,
    });
  };

  clearError = () => {
    this.setState({
      errorMessage: "",
      isError: false,
    });
  };

  attemptLogin = async (event: any) => {
    event.preventDefault();
    // console.log(event);
    try {
      const loggedInUser: User = await login(
        this.state.userName,
        this.state.password
      );
      this.props.updateUser(loggedInUser);
      this.props.history.push("/home");
      // this.setState({
      //   // userName: '',
      //   // password: '',
      //   errorMessage:"login succesful",
      // });
    } catch (error) {
      this.setState({
        password: "",
        isError: true,
        errorMessage: error.message,
      });
    }
  };
  //  submitEvent.preventDefault();
  // try {
  //   const loggedInUser: User = await login(
  //     this.state.userName,
  //     this.state.password
  //   );
  //   this.props.updateUser(loggedInUser);
  //   this.props.history.push("/home");
  // } catch (error) {
  //   toast(error.message, { type: "error" });
  //   this.setState({
  //     password: "",
  //   });
  // }

  render() {
    return (
      <div className="center">
        <Container>
          <Row>
            <Col md={{ size: 6, offset: 3 }}>
              <h3>Login</h3>
              <br/>
              <Form onSubmit={this.attemptLogin}>
                <FormGroup >
                  <Label for="userName">userName: </Label>

                  {/* onChange lets Input change state, value lets Input display state */}
                  <Input
                    onChange={this.setuserName}
                    value={this.state.userName}
                    type="text"
                    name="userName"
                    id="userName"
                    placeholder="your userName"
                  />
                </FormGroup>
                <FormGroup >
                  <Label for="password">Password:</Label>

                  <Input
                    onChange={this.setPassword}
                    value={this.state.password}
                    type="password"
                    name="password"
                    id="password"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Button color="secondary">Submit</Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
        {/* <Toast isOpen={this.state.isError}>
          <ToastHeader icon="danger" toggle={this.clearError}>
            Error!
          </ToastHeader>
          <ToastBody>{this.state.errorMessage}</ToastBody>
        </Toast> */}
      </div>
    );
  }
}
