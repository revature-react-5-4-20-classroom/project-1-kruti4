import React from "react";
import { Table, Button } from "reactstrap";
// import { UpdateUser } from "./updateUserInfo";
import { User } from "../models/Users";
import Reimbursement from "../models/Reimbursement";
import { UpdateReimburement } from "./updateReimbursementInfo";

interface IObjectTableProps {
  objects: Reimbursement[];
  loggedInUser: User;
}

/** Quick reactstrap table that builds a table out of props.objects.  All objects should have the same fields in order.*/
export class ReimbursementDisplayTable extends React.Component<
  IObjectTableProps,
  any
> {
  constructor(props: IObjectTableProps) {
    super(props);
    this.state = {
      ReimbursementrObj: "",
      flag: false,
    };
  }
  callUpdate = (event: any) => {
    // event.preventDefault();
    // console.log(event);

    this.setState({
      ReimbursementrObj: event,
      flag: true,
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
        <Table striped style={{ display: !this.state.flag ? "block" : "none" }}>
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
                <tr>
                  {Object.values(obj).map((value: any, index: number) => {
                    return <td key={index}>{value}</td>;
                  })}
                  <td
                    style={{
                      display:
                        this.props.loggedInUser.role === "finance-manager"
                          ? "block"
                          : "none",
                    }}
                  >
                    <Button
                      value={obj}
                      hidden={obj.status != 2}
                      onClick={(e) => {
                        e.preventDefault();
                        this.callUpdate(obj);
                      }}
                      // name="ReimbursementrObj"
                      // object={obj}
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <div style={{ display: this.state.flag ? "block" : "none" }}>
          <UpdateReimburement
            reimbursement={this.state.ReimbursementrObj}
            loggedInUser={this.props.loggedInUser}
          />
        </div>
      </>
    );
  }
}
