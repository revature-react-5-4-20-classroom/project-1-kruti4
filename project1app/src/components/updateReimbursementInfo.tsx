import React from "react";
import Reimbursement from "../models/Reimbursement";
import { updateReimburement } from "../apis/Reimbursement";
import { Container, Row, Col } from "reactstrap";
interface IUpdateReimbursementFormProps {
  addReimbursement: () => void;
}
export class UpdateReimburement extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      reimbursementId: this.props.reimbursement.reimbursemetId,
      author: this.props.reimbursement.author,
      amount: this.props.reimbursement.amount,
      dateSubmitted: this.props.reimbursement.dateSubmited,
      dateResolved: this.props.reimbursement.dateResolved,
      description: this.props.reimbursement.description,
      resolver: this.props.reimbursement.resolver,
      status: this.props.reimbursement.status,
      type: this.props.reimbursement.type,
      responce: "",
    };
  }
  formSubmit = async (event: any) => {
    event.preventDefault();
    const reOb: Reimbursement = new Reimbursement(
      this.props.reimbursement.reimbursementId,
      this.props.reimbursement.author,
      this.props.reimbursement.amount,
      "2020",
      new Date().toISOString().substring(0, 10),
      this.props.reimbursement.description,
      this.props.reimbursement.resolver,
      this.state.status,
      this.props.reimbursement.type
    );
    this.setState({
      Response: await updateReimburement(reOb),
    });
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
  printdata = (event: any) => {
    event.preventDefault();
    console.log(
      this.props.reimbursement.reimbursementId,
      this.props.reimbursement.author,
      this.props.reimbursement.amount,
      "2020",
      new Date().toISOString().substring(0, 10),
      this.props.reimbursement.description,
      this.props.reimbursement.resolver,
      this.props.reimbursement.status,
      this.props.reimbursement.type
    );
    console.log("types of all data");
    console.log(
      typeof this.props.reimbursement.reimbursementId,
      typeof this.props.reimbursement.author,
      typeof this.props.reimbursement.amount,
      typeof "2020",
      typeof new Date().toISOString().substring(0, 10),
      typeof this.props.reimbursement.description,
      typeof this.props.reimbursement.resolver,
      typeof this.props.reimbursement.status,
      typeof this.props.reimbursement.type
    );
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
      <Container>
        <Row>
          <Col></Col>
        </Row>
      </Container>
        <form onSubmit={this.formSubmit}>
          <label>Reimbursement type:</label>
          <select
            id="type"
            required
            onChange={this.bindInputChangeToState}
            name="type"
            defaultValue={this.props.reimbursement.type}
            disabled
          >
            <option defaultValue="1">Lodging</option>
            <option value="2">Travel</option>
            <option value="3">Food</option>
            <option value="4">Other</option>
          </select>
          <label htmlFor="">Amount:$</label>
          <input
            disabled
            type="number"
            id="amount"
            name="amount"
            defaultValue={this.props.reimbursement.amount}
            required
            onChange={this.bindInputChangeToState}
          />
          {/* <label htmlFor="">Recipt image</label>
          <input type="file" required /> */}
          <label htmlFor="">Date:</label>
          <input
            type="string"
            name="dateSubmitted"
            id="dateSubmitted"
            value={this.props.reimbursement.dateSubmitted}
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
            value={this.props.reimbursement.description}
            disabled
            onChange={this.bindInputChangeToState}
          />
          <label htmlFor="">Resolver</label>
          <input
            type="number"
            id="resolver"
            name="resolver"
            required
            defaultValue={this.props.reimbursement.resolver}
            disabled
            onChange={this.bindInputChangeToState}
          />
          <button
            type="submit"
            onClick={this.bindInputChangeToState}
            name="status"
            value="1"
          >
            Aproved
          </button>
          <button
            type="submit"
            onClick={this.bindInputChangeToState}
            name="status"
            value="3"
          >
            Declined
          </button>
          {/* <button type="submit">Submit</button> */}
        </form>
      </>
    );
  }
}
