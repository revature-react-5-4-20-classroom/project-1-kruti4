import React from "react";
import { NavbarComponent } from "./components/Navigation";
import { LoginComponent } from "./components/Login";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { User } from "./models/Users";
import { AllUsers } from "./components/allUsers";
import { MultiRoute } from "./components/multiRoutReimbursement";
import { Jumbotron } from "reactstrap";

interface IAppState {
  loggedInUser: User | null;
}

export class App extends React.Component<any, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loggedInUser: null,
    };
  }

  updateUser = (user: User) => {
    console.log(user);
    this.setState({
      loggedInUser: user,
    });
  };
  logoutUser = () => {
    this.setState({
      loggedInUser: null,
    });
  };
  render() {
    return (
      <>
        <div className="App">
          {/* <h3>hello</h3>
          <h1>
            Hello{" "}
            {this.state.loggedInUser
              ? this.state.loggedInUser.userName
              : "guest"}
          </h1> */}

          <Router>
            <NavbarComponent
              logoutUser={this.logoutUser}
              loggedInUser={this.state.loggedInUser}
            />
            <Jumbotron>
              <h1 className="display-4">
                <span role="img">$ Expense Reimbursement System $</span>
              </h1>
            </Jumbotron>
            <Switch>
              <Route exact path="/">
                {this.state.loggedInUser ? (
                  <Redirect to="/home" />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
              <Route
                path="/login"
                render={(props: any) => {
                  return (
                    <LoginComponent
                      {...props}
                      path="/login"
                      updateUser={this.updateUser}
                    />
                  );
                }}
              />
              {/* // <LoginComponent updateUser={this.updateUser} /> */}
              {/* </Route> */}
              <Route path="/home">
                <h2>
                  Welcome{" "}
                  {this.state.loggedInUser
                    ? `${this.state.loggedInUser.userName}!`
                    : "guest!"}
                </h2>
              </Route>
              <Route loggedInUser={this.state.loggedInUser} path="/users">
                {this.state.loggedInUser && true ? (
                  <AllUsers
                    loggedInUser={this.state.loggedInUser}
                    path="/users"
                  />
                ) : (
                  <h4>Please Login</h4>
                )}
              </Route>
              <Route>
                <MultiRoute
                  loggedInUser={this.state.loggedInUser}
                  path="/reimbursement"
                />
              </Route>
              <Route path="/logout"></Route>
            </Switch>
          </Router>
        </div>
      </>
    );
  }
}

export default App;
