import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { User } from "../models/Users";

interface ITopNavProps {
  logoutUser: () => void;
  loggedInUser: User | null;
}
export class NavbarComponent extends React.Component<ITopNavProps, any> {
  render() {
    return (
      <div>
        {/*just writing the name of a prop is shorthand for prop={true}*/}
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">NameError Ltd.</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                to="/home"
                color="secondary"
                className="nav-link"
                activeClassName="active"
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                color="secondary"
                hidden={!this.props.loggedInUser}
                className="nav-link"
                to="/users"
              >
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                color="secondary"
                activeClassName="active"
                hidden={!this.props.loggedInUser}
                className="nav-link"
                to="/reimbursement"
              >
                Reimbursement
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                color="secondary"
                activeClassName="active"
                hidden={!!this.props.loggedInUser}
                className="nav-link"
                to="/login"
              >
                login
              </NavLink>
            </NavItem>
            {/* <NavItem
              tag={() => {
                return (
                  <Button
                    hidden={!this.props.loggedInUser}
                    onClick={this.props.logoutUser}
                    color="secondary"
                  >
                    Logout
                  </Button>
                );
              }}

            /> */}
            <NavItem>
              <NavLink
                activeClassName="active"
                hidden={!this.props.loggedInUser}
                className="nav-link"
                to="/login"
                onClick={this.props.logoutUser}
              >
                logout
              </NavLink>
            </NavItem>
            {/* tag=
            {() => {
              return (
                <Button
                  hidden={!this.props.loggedInUser}
                  onClick={this.props.logoutUser}
                  color="secondary"
                >
                  Logout
                </Button>
              );
            }}
            /> */}
            {/* <NavLink to="/logout" onClick={this.props.logoutUser} >logout</NavLink> */}
          </Nav>
        </Navbar>
      </div>
    );
  }
}
