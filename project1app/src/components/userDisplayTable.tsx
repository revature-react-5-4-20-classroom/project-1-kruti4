import React from "react";
import { Table, Button } from "reactstrap";
import { UpdateUser } from "./updateUserInfo";
import { User } from "../models/Users";

interface IObjectTableProps {
  objects: User[];
  loggedInUser: User;
}

/** Quick reactstrap table that builds a table out of props.objects.  All objects should have the same fields in order.*/
export class UserDisplayTable extends React.Component<IObjectTableProps, any> {
  constructor(props: IObjectTableProps) {
    super(props);
    this.state = {
      userObj: "",
      flag: false,
    };
  }
  bindInputChangeToState = (changeEvent: any) => {
    //@ts-ignore
    this.setState({
      [changeEvent.currentTarget.name]: changeEvent.currentTarget.value,
    });
  };
  render() {
    return (
      <>
        <Table striped>
          <thead>
            <tr>
              {/* Generate one column header for each key on the first object in props.objects */}
              {Object.keys(this.props.objects[0]).map((key: any) => {
                return <th key={key}>{key}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {/* Generate one row per object with a cell for each value on the object */}
            {this.props.objects.map((obj: any, index: number) => {
              return (
                <>
                  <tr key={index}>
                    {Object.values(obj).map((value: any, index: number) => {
                      return <td key={index}>{value}</td>;
                    })}
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
}
