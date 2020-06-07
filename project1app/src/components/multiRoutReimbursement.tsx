import React from "react";
import { Switch, Route, Router } from "react-router";

import { AllReimbursementByStatus } from "./allReimbursementByStatus";
import { AllReimbursementByUser } from "./allReimbursmentByUser";
import { Nav, Navbar, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import { SubmitNewReimbursement } from "./SubmitReimbursement";

export class MultiRoute extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      pathUrl: "",
    };
  }

  render() {
    return (
      <>
        <Navbar color="light" light expand="md">
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                to="/reimbursement/status"
                hidden={!this.props.loggedInUser}
              >
                Status Id
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="/reimbursement/author/userId"
                hidden={!this.props.loggedInUser}
              >
                User Id
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/reimbursement" hidden={!this.props.loggedInUser}>
                Submit New Request
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>

        <Switch>
          <Route path={`${this.props.path}/status`}>
            {this.props.loggedInUser &&
            this.props.loggedInUser.role === "finance-manager" ? (
              <AllReimbursementByStatus
                path={`${this.props.path}/status`}
                loggedInUser={this.props.loggedInUser}
              />
            ) : (
              <h4>Only Finance Manager can see all users</h4>
            )}
            {/* <AllReimbursementByStatus path={`${this.props.path}/status`} loggedInUser={this.props.loggedInUser}/> */}
          </Route>

          <Route path={`${this.props.path}/author/userId`}>
            {this.props.loggedInUser && true ? (
              <AllReimbursementByUser
                path={`${this.props.path}/author/userId`}
                loggedInUser={this.props.loggedInUser}
              />
            ) : (
              <h4>Please Login</h4>
            )}
          </Route>

          <Route path={`${this.props.path}`}>
            <SubmitNewReimbursement loggedInUser={this.props.loggedInUser} path={`${this.props.path}`}/>
          </Route>
        </Switch>
      </>
    );
  }
}
