import React from 'react';
import { NavbarComponent } from './components/Navigation';
import { LoginComponent } from './components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { User } from './models/Users';

interface IAppState {
  loggedInUser: User | null;
}

export class App extends React.Component<any, IAppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      loggedInUser: null,
    }
  }

  updateUser = (user: User) => {
    console.log(user);
    this.setState({
      loggedInUser: user,
    })
  }

  render() {
    return (
      <>
        <div>
          <h3>hello</h3>
          <h1>Hello {this.state.loggedInUser ? this.state.loggedInUser.username : 'guest'}</h1>
        </div>
        <Router>

          <NavbarComponent />
          <Switch>
            {/* <Route path='/home' >

            </Route> */}

            <Route path='/users'>

            </Route>
            <Route path="/reimbursement">

            </Route>
            <Route path='/login' >
              <LoginComponent updateUser={this.updateUser} />
            </Route>

            <Route path='/logout' >

            </Route>

          </Switch>
        </Router>

      </>
    );
  }
}

export default App;
