import React from "react";
// import { reactstrap } from "reactstrap";

import { getAllReimbursementByUserId } from "../apis/Reimbursement";
import Reimbursement from "../models/Reimbursement";

import { Spinner } from "reactstrap";
import { ReimbursementDisplayTable } from "./reimbursementDisplayTable";
// import { Container, Row, CardDeck, Card } from "reactstrap";
interface IAllReimbursementByUserState {
  responce: Reimbursement[];
  isData: Boolean;
  errorMessage:string;
}

export class AllReimbursementByUser extends React.Component<
  any,
  IAllReimbursementByUserState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      //   user_id: 0,
      //   username: "",
      //   email: "",
      responce: [],
      isData: false,
      errorMessage:"",
    };
  }

  // componentDidMount = async () => {
  //   try {
  //     const id=this.props.loggedUser.userId;
  //     console.log("did mount"+id);
  //     await this.setState({
       
  //       responce: await getAllReimbursementByUserId(id),
  //       isData: true,
  //     });
  //     // {this.state.responce !== []?this.state
  //     //   isData: false;
  //     // }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

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
      this.setState({
        errorMessage:"Not Authorized for this",
        isData: false,
      });
    }
  };

  render() {
    return (
      <>
        <br />
        <label htmlFor="">User Id</label>
        <input
          onChange={this.getData}
          
          // disabled={
          //   this.props.loggedInUser.role == "finance-manager" ? false : true
          // }
          type="number"
        />
        {/*       
        <h4>get all reimbursement</h4> */}
        <div style={{ display: this.state.isData ? "block" : "none" }}>
          {this.state.isData ? (
            <ReimbursementDisplayTable
              objects={this.state.responce}
              loggedInUser={this.props.loggedInUser}
            />
          ) : (
            <Spinner />
          )}
        </div>
          <h2 style={{ display: !this.state.isData ? "block" : "none" }}>{this.state.errorMessage}</h2>
      </>
    );
  }
}

// for only one object
///const arr = []
// Object.keys(MyObject).forEach(key => arr.push({name: key, value: MyObject[key]}))
// console.log(arr[0].name, arr[0].value) //id, jarvaniv (I prefer Zac)
