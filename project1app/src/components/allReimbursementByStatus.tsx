import React from "react";
// import { reactstrap } from "reactstrap";

import { getAllReimbursementByStatusId } from "../apis/Reimbursement";
import Reimbursement from "../models/Reimbursement";
// import { ObjectTable } from "./userDisplayTable";
import { Spinner } from "reactstrap";
import { ReimbursementDisplayTable } from "./reimbursementDisplayTable";
// import { Container, Row, CardDeck, Card } from "reactstrap";

export class AllReimbursementByStatus extends React.Component<any, any> {
  constructor(props: Reimbursement) {
    super(props);
    this.state = {
      //   user_id: 0,
      //   username: "",
      //   email: "",
      idArg: 1,
      responce: "any",
      isData: false,
    };
  }
  async componentDidMount() {
    this.setState({
      responce: await getAllReimbursementByStatusId(2),
      isData: true,
    });
  }
  // updateid(id:any){
  //   this.setState({

  // });}

  getData = async (id: any) => {
    console.log("id is" + id.currentTarget.value);

    await this.setState({
      responce: await getAllReimbursementByStatusId(id.currentTarget.value),
      isData: true,
    });
  };

  render() {
    return (
      <>
        <div>
          <label htmlFor="">select reimbursement status</label>
          <select defaultValue="2" onChange={this.getData} name="status">
            <option value="2" >
              Pending
            </option>
            <option value="1">Approved</option>
            <option value="3">Denied</option>
          </select>
          {/* <h4>get all reimbursement</h4> */}

          <div style={{ display: this.state.isData ? "block" : "none" }}>
            {this.state.isData ? (
              <ReimbursementDisplayTable objects={this.state.responce} loggedInUser={this.props.loggedInUser} />
              // <h2>data is here</h2>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </>
    );
  }
}

// for only one object
///const arr = []
// Object.keys(MyObject).forEach(key => arr.push({name: key, value: MyObject[key]}))
// console.log(arr[0].name, arr[0].value) //id, jarvaniv (I prefer Zac)
