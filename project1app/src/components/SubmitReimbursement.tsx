import React from "react";

export class submitNewReimbursement extends React.Component<any, any> {
  constructor(props:any) 
  {
    super(props);
    // this.state = {
    //     dvalue:null,
    //   }
  };
  formSubmit = () => {};
  
  render() {
    return (
        
      <>
        <form onSubmit={this.formSubmit}>
          <label>Reimbursement type:</label>
          <select name="" id="" required>
            <option value="1">Lodging</option>
            <option value="2">Travel</option>
            <option value="3">Food</option>
            <option value="4">Other</option>
          </select>
          <label htmlFor="">Amount:$</label>
          <input type="number" required />
          <label htmlFor="">Recipt image</label>
          <input type="file" required />
          <label htmlFor="">Date:</label>
          <input type="date" name="" id="today"  value={new Date().toISOString().substring(0, 10)} disabled>
        
          </input>
          <label htmlFor="">Discription</label>
          <input type="text" required />
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }
}
