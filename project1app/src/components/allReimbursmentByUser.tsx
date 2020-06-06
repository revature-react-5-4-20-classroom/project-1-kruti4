import React from "react";
// import { reactstrap } from "reactstrap";

import { getAllReimbursementByUserId } from "../apis/Reimbursement";
import Reimbursement from "../models/Reimbursement";
import { ObjectTable } from "./userDisplayTable";
import { Spinner } from "reactstrap";
// import { Container, Row, CardDeck, Card } from "reactstrap";
interface IAllReimbursementByUserState {
  responce: Reimbursement[];
  isData: Boolean;
}

export class AllReimbursementByUser extends React.Component<
  any,
  IAllReimbursementByUserState
> {
  constructor(props: Reimbursement) {
    super(props);
    this.state = {
      //   user_id: 0,
      //   username: "",
      //   email: "",
      responce: [],
      isData: false,
    };
  }

  getData = async (id: any) => {
    console.log("id is" + id.currentTarget.value);
    try {
      await this.setState({
        responce: await getAllReimbursementByUserId(id.currentTarget.value),
        isData: true,
      });
      // {this.state.responce !== []?this.state
      //   isData: false;
      // }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <>
        <br />
        <label htmlFor="">Enter User Id</label>
        <input onChange={this.getData} type="text" />
        {/* <select onChange={this.getData} name="User">
          <option value="1" selected>
            Approved
          </option>
          <option value="2">Pending</option>
          <option value="3">Denied</option>
        </select> */}
        <h4>get all reimbursement</h4>
        <div style={{ display: this.state.isData ? "block" : "none" }}>
          {this.state.isData ? (
            // <ObjectTable objects={this.state.responce} />
            <h2>data arrived</h2>
          ) : (
            <Spinner />
          )}
        </div>
      </>
    );
  }
}

// for only one object
///const arr = []
// Object.keys(MyObject).forEach(key => arr.push({name: key, value: MyObject[key]}))
// console.log(arr[0].name, arr[0].value) //id, jarvaniv (I prefer Zac)
