import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { login } from '../actions/Auth';
import LoginForm from 'grommet/components/LoginForm';
import GrommetIcon from 'grommet/components/icons/base/BrandGrommetOutline';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';

class Login extends Component {
  handleSubmit(fields) {
    console.log(fields);
    login(fields.username, fields.password).then( () => {
      browserHistory.push('lobby');
    });
  }

  render () {
    return (
      <Box align='center' justify='center'>
        <LoginForm onSubmit={this.handleSubmit}
          logo={<GrommetIcon className="brand-logo" size="xlarge" />}
          title='TeamComp'
          secondaryText='Please log into TeamComp'
          forgotPassword={
            <Anchor className="teamcomp-blue" path="forgotPassword" label="Forgot Password?" />
          }
          rememberMe={false}
          usernameType="email" />
      </Box>
    )
  }
}

export default Login;
