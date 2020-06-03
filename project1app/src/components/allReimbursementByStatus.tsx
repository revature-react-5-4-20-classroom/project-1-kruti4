import React from "react";
// import { reactstrap } from "reactstrap";

import { getAllReimbursementByStatusId } from "../apis/Reimbursement";
import Reimbursement from "../models/Reimbursement";
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
      parsed: (d: string) => {
        return JSON.parse(d);
      },
    };
  }
  async componentDidMount() {
    this.setState({
      responce: JSON.stringify(await getAllReimbursementByStatusId(1)),
    });
  }
  // updateid(id:any){
  //   this.setState({

  // });}

  getData = async (id: any) => {
    console.log("id is" + id.currentTarget.value);

    await this.setState({
      responce: JSON.stringify(
        await getAllReimbursementByStatusId(id.currentTarget.value)
      ),
    });
  };

  render() {
    return (
      <>
        <br />
        <label htmlFor="">select reimbursement status</label>
        <select onChange={this.getData} name="status">
          <option value="1" selected>
            Approved
          </option>
          <option value="2">Pending</option>
          <option value="3">Denied</option>
        </select>
        <h4>get all reimbursement</h4>
     
        <h5> {this.state.responce}</h5>
      </>
    );
  }
}

// for only one object
///const arr = []
// Object.keys(MyObject).forEach(key => arr.push({name: key, value: MyObject[key]}))
// console.log(arr[0].name, arr[0].value) //id, jarvaniv (I prefer Zac)
