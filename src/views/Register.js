import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { register } from '../actions/Auth';

import GrommetIcon from 'grommet/components/icons/base/BrandGrommetOutline';
import Button from 'grommet/components/Button';
import FormattedMessage from 'grommet/components/FormattedMessage';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Box from 'grommet/components/Box';

class Register extends Component {
  constructor(props, context) {
    super(props, context);

    this._onSubmit = this._onSubmit.bind(this);
    this._onEmailChange = this._onEmailChange.bind(this);
    this._onPasswordChange = this._onPasswordChange.bind(this);
    this._onChange = this._onChange.bind(this);

    this.state = {
      password: '',
      email: ''
    };
  }

  componentDidMount () {
    if (this.emailRef) {
      this.emailRef.focus();
    }
  }

  _onChange (args) {
    const { onChange } = this.props;

    if (onChange) {
      onChange(args);
    }
  }

  _onEmailChange (event) {
    const email = event.target.value;
    this.setState({ email });
    this._onChange({ event, email });
  }

  _onPasswordChange (event) {
    const password = event.target.value;
    this.setState({ password });
    this._onChange({ event, password });
  }

  _validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  _onSubmit (event) {
    event.preventDefault();
    let { password, email } = this.state;

    email = email.trim();
    password = password.trim();

    const isValidEmail = this._validateEmail(email);

    if (isValidEmail) {
      register(email, password).then(res => {
        console.log(res);
        browserHistory.push('lobby');
      });
    } else {
      alert('Please enter a valid email');
    }
  }

  render () {
    // const errorsNode = errors.map((error, index) => {
    //   let errorComponent;
    //   if (error) {
    //     errorComponent = (
    //       <div key={index} className='error'>
    //         <FormattedMessage id={error} defaultMessage={error} />
    //       </div>
    //     );
    //   }
    //   return errorComponent;
    // });

    return (
      <Box align='center' justify='center'>
        <Form pad="medium" onSubmit={this._onSubmit}>
          <Box align="center">
            <GrommetIcon className="brand-logo" size="xlarge" />
            <Heading strong={true}>TeamComp</Heading>
            <Paragraph align="center" margin="none">Please sign up to TeamComp</Paragraph>
          </Box>
          <fieldset>
            <FormField htmlFor="email" label={<FormattedMessage id="Email" defaultMessage="Email" />}>
              <input type="email" ref={ref => this.emailRef = ref}
                value={this.state.email}
                onChange={this._onEmailChange} />
            </FormField>
            <FormField htmlFor="password" label={<FormattedMessage id="Password" defaultMessage="Password" />}>
              <input type="password" value={this.state.password}
                onChange={this._onPasswordChange} />
            </FormField>
            {/* {errorsNode} */}
          </fieldset>
          <Footer size="small" direction="column"
            align="stretch"
            pad={{vertical: 'none', between: 'medium'}}>
            <Button primary={true} fill={true} className="button"
              type="submit" label="Sign Up"
              onClick={this._onSubmit} />
          </Footer>
        </Form>
      </Box>
    );
  }
}

export default Register;
