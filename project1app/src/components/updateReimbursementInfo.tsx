import React from "react";
import Reimbursement from "../models/Reimbursement";
import { updateReimburement } from "../apis/Reimbursement";
import {
  Container,
  Row,
  Col,
  Form,
  Label,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
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
    try{
      this.setState({
        Response: await updateReimburement(reOb),
      });
    }catch(e){
      console.log(e)
    }
    
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
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <h3>Update Reimbursement</h3>
              <br/>
              <Form onSubmit={this.formSubmit}>
                <FormGroup>
                  <Label>Reimbursement type:</Label>
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
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="">Amount: $</Label>
                  <Input
                    disabled
                    type="number"
                    id="amount"
                    name="amount"
                    defaultValue={this.props.reimbursement.amount}
                    required
                    onChange={this.bindInputChangeToState}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="">Submite Date:</Label>
                  <Input
                  disabled
                    type="text"
                    name="dateSubmitted"
                    id="dateSubmitted"
                    value={this.props.reimbursement.dateSubmitted}
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="">Resolve date:</Label>
                  <input
                    type="date"
                    name="dateResolved"
                    id="dateResolved"
                    value={new Date().toISOString().substring(0, 10)}
                    disabled
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="">Discription:</Label>
                  <Input
                    type="text"
                    id="description"
                    name="description"
                    required
                    value={this.props.reimbursement.description}
                    disabled
                    onChange={this.bindInputChangeToState}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="">Resolver</Label>
                  <Input
                    type="number"
                    id="resolver"
                    name="resolver"
                    required
                    defaultValue={this.props.reimbursement.resolver}
                    disabled
                    onChange={this.bindInputChangeToState}
                  />
                </FormGroup>
                <Row>
                  <Col sm={{ size: 'auto', offset: 0 }}>
                    <Button
                      type="submit"
                      onClick={this.bindInputChangeToState}
                      name="status"
                      value="1"
                    
                    >
                      Approve
                    </Button>
                  </Col>

                  <Col md={{ size: 'auto', offset: 0 }}>
                    <Button
                      type="submit"
                      onClick={this.bindInputChangeToState}
                      name="status"
                      value="3"
                    >
                      Reject
                    </Button>
                  </Col>
                </Row>
                {/* <button type="submit">Submit</button> */}
              </Form>
            </Col>
          </Row>
        </Container>
        <br/>
      </>
    );
  }
}
