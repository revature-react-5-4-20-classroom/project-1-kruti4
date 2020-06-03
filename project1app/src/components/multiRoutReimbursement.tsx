import React from "react";
import { Switch, Route, Router } from "react-router";

import { AllReimbursementByStatus } from "./allReimbursementByStatus";
import {AllReimbursementByUser} from "./allReimbursmentByUser";
import { Nav, Navbar, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import { submitNewReimbursement } from "./SubmitReimbursement";

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
              <NavLink to='/reimbursement/status'>Status Id</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/reimbursement/author/userId">User Id</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/reimbursement/'>Submit New Request</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      
        <Switch>
          <Route
            path={`${this.props.match.path}/status`}
            component={AllReimbursementByStatus}
          />
          <Route
            path={`${this.props.match.path}/author/userId`}
            component={AllReimbursementByUser}
          />
          <Route
            path={`${this.props.match.path}`}
            component={submitNewReimbursement}
          />

        </Switch>
      </>
    );
  }
}
