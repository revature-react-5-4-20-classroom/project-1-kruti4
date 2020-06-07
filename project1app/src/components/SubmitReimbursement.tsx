import React from "react";
import Reimbursement from "../models/Reimbursement";
import { submitReimbursement } from "../apis/Reimbursement";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
interface INewReimbursementFormProps {
  addReimbursement: () => void;
}
interface INewReimbursementFormStates {
  reimbursementId: number;
  author: number;
  amount: number;
  dateSubmitted: string;
  dateResolved: string;
  description: string;
  resolver: number;
  status: number;
  type: number;
}
export class SubmitNewReimbursement extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      reimbursementId: 0,
      author: this.props.loggedInUser.userId,
      amount: 0,
      dateSubmitted: "",
      dateResolved: "",
      resolver: 2,
      status: 2,
      type: 4,
    };
  }
  formSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const reOb = new Reimbursement(
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
      this.setState({
        response: await submitReimbursement(reOb),
      });
      this.clearForm();
      console.log("Reimbursement Submited" + typeof reOb.dateResolved);
    } catch (e) {
      console.log(e.message);
    }
  };
  // printdata=(event:any)=>{
  //   event.preventDefault();
  //   console.log(typeof(0),
  //   this.state.author,
  //   this.state.amount,
  //   new Date().toISOString().substring(0, 10),
  //   new Date().toISOString().substring(0, 10),
  //   this.state.description,
  //   this.state.resolver,
  //   typeof(2),
  //   this.state.type);
  //   console.log("types of all data");
  //   console.log(typeof(0),
  //   typeof(this.state.author),
  //   typeof(this.state.amount),
  //   typeof(new Date().toISOString().substring(0, 10)),
  //   typeof(new Date().toISOString().substring(0, 10)),
  //   typeof(this.state.description),
  //   typeof(this.state.resolver),
  //   typeof(2),
  //   typeof(this.state.type));
  // }
  clearForm = () => {
    this.setState({
      reimbursementId: "",
      author: "",
      amount: "",
      dateSubmitted: "",
      dateResolved: "",
      description: "",
      resolver: "",
      status: "",
      type: "",
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
        <Container>
          <Row>
            <Col md={{ size: 6, offset: 3 }}>
              <Form onSubmit={this.formSubmit}>
                <FormGroup>
                  <Label>Reimbursement type: </Label>
                  <select
                    id="type"
                    required
                    onChange={this.bindInputChangeToState}
                    name="type"
                  >
                    <option defaultValue="1">Lodging</option>
                    <option value="2">Travel</option>
                    <option value="3">Food</option>
                    <option value="4">Other</option>
                  </select>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="">Amount:$</Label>
                  <Input
                    type="number"
                    id="amount"
                    name="amount"
                    value={this.state.amount}
                    required
                    onChange={this.bindInputChangeToState}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="">Date:</label>
                  <Input
                    value={this.state.dateSubmited}
                    type="date"
                    name="dateSubmitted"
                    id="dateSubmitted"
                    defaultValue={new Date().toISOString().substring(0, 10)}
                    disabled
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                  value={this.state.dateResolved}
                    type="date"
                    name="dateResolved"
                    id="dateResolved"
                    defaultValue={new Date().toISOString().substring(0, 10)}
                    hidden
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="">Description</Label>
                  <Input
                  value={this.state.description}
                    type="text"
                    id="description"
                    name="description"
                    required
                    onChange={this.bindInputChangeToState}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="">Resolver</Label>
                  <Input
                  value={this.state.resolver}
                    type="number"
                    id="resolver"
                    name="resolver"
                    required
                    onChange={this.bindInputChangeToState}
                  />
                </FormGroup>
                
                  <Button type="submit">Submit</Button>
                
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
