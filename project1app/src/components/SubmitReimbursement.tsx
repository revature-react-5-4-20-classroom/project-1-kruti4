import React from "react";
import Reimbursement from "../models/Reimbursement";
import { submitReimbursement } from "../apis/Reimbursement";
interface INewReimbursementFormProps {
  addReimbursement: () => void;
}
export class submitNewReimbursement extends React.Component<
  INewReimbursementFormProps,
  Reimbursement
> {
  constructor(props: any) {
    super(props);
    // this.state = {
    //     dvalue:null,
    //   }
    // Reimbursement;
   
  }
  formSubmit = async () => {
    const reOb: Reimbursement = new Reimbursement(
      0,
      this.state.author,
      this.state.amount,
      new Date().toISOString().substring(0, 10),
      new Date().toISOString().substring(0, 10),
      this.state.description,
      this.state.resolver,
      2,
      this.state.type,
    );
    Response: await submitReimbursement(reOb);
    // reimbursementId,
    // author,
    // amount,
    // dateSubmitted,
    // dateResolved,
    // description,
    // resolver,
    // status,
    // type
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
        <form onSubmit={this.formSubmit}>
          <label>Reimbursement type:</label>
          <select
            id="type"
            required
            onChange={this.bindInputChangeToState}
            name="type"
          >
            <option value="1" selected>Lodging</option>
            <option value="2">Travel</option>
            <option value="3">Food</option>
            <option value="4">Other</option>
          </select>
          <label htmlFor="">Amount:$</label>
          <input type="number" id="amount" name="amount" required onChange={this.bindInputChangeToState} />
          {/* <label htmlFor="">Recipt image</label>
          <input type="file" required /> */}
          <label htmlFor="">Date:</label>
          <input
            type="date"
            name="dateSubmitted"
            id="dateSubmitted"
            value={new Date().toISOString().substring(0, 10)}
            disabled
          ></input>
          {/* <label htmlFor="">Date:</label> */}
          <input
            type="date"
            name="dateResolved"
            id="dateResolved"
            value={new Date().toISOString().substring(0, 10)}
            hidden
          ></input>
          <label htmlFor="">Discription</label>
          <input type="text" id="description" name="description" required onChange={this.bindInputChangeToState}/>
          <label htmlFor="">Resolver</label>
          <input type="number" id="resolver" name="resolver" required onChange={this.bindInputChangeToState}/>

          <button type="submit">Submit</button>
        </form>
      </>
    );
  }
}
