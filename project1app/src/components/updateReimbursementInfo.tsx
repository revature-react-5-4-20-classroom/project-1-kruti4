import React from "react";
import Reimbursement from "../models/Reimbursement";
import { updateReimburement } from "../apis/Reimbursement";
interface IUpdateReimbursementFormProps {
  addReimbursement: () => void;
}
export class UpdateReimburement extends React.Component<
  Reimbursement,
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
      this.state.type
    );
    Response: await updateReimburement(reOb);
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
            value={this.props.type} disabled>
            <option value="1">
              Lodging
            </option>
            <option value="2">Travel</option>
            <option value="3">Food</option>
            <option value="4">Other</option>
          </select>
          <label htmlFor="">Amount:$</label>
          <input disabled
            type="number"
            id="amount"
            name="amount"
            value={this.props.amount}
            required
            onChange={this.bindInputChangeToState}
          />
          {/* <label htmlFor="">Recipt image</label>
          <input type="file" required /> */}
          <label htmlFor="">Date:</label>
          <input
            type="date"
            name="dateSubmitted"
            id="dateSubmitted"
            value={this.props.dateSubmitted}
            disabled
          ></input>
          {/* <label htmlFor="">Date:</label> */}
          <input
            type="date"
            name="dateResolved"
            id="dateResolved"
            value={new Date().toISOString().substring(0, 10)}
            disabled
          ></input>
          <label htmlFor="">Discription</label>
          <input
            type="text"
            id="description"
            name="description"
            required
            value={this.props.description}
            disabled
            onChange={this.bindInputChangeToState}
          />
          <label htmlFor="">Resolver</label>
          <input
            type="number"
            id="resolver"
            name="resolver"
            required
            value={this.props.resolver}
            disabled
            onChange={this.bindInputChangeToState}
          />
          <button type="submit" onClick={this.bindInputChangeToState} value="1" >Aproved</button>
          <button type="submit" onClick={this.bindInputChangeToState} value="3">Declined</button>
          {/* <button type="submit">Submit</button> */}
        </form>
      </>
    );
  }
}
