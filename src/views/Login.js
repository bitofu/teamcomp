import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { login } from '../helpers/auth';
import LoginForm from 'grommet/components/LoginForm';
import Logo from 'grommet/components/icons/base/Cloud';
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
          logo={<Logo size='xlarge' />}
          title='TeamComp'
          secondaryText='Please log into TeamComp'
          forgotPassword={
            <Anchor path="forgotPassword" label="Forgot Password?" />
          }
          rememberMe={false}
          usernameType="email" />
      </Box>
    )
  }
}

export default Login;
