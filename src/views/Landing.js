import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Footer from 'grommet/components/Footer';
import Heading from 'grommet/components/Heading';
import Hero from 'grommet/components/Hero';
import Paragraph from 'grommet/components/Paragraph';
import Video from 'grommet/components/Video';
import GrommetIcon from 'grommet/components/icons/base/BrandGrommetOutline';
import Image from 'grommet/components/Image';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormattedMessage from 'grommet/components/FormattedMessage';

class Landing extends Component {
  constructor(props, context) {
    super(props, context);

    this._onSubmit = this._onSubmit.bind(this);
    this._onEmailChange = this._onEmailChange.bind(this);
    this._onChange = this._onChange.bind(this);

    this.state = {
      email: props.defaultValues.email
    };
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

  _validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  _onSubmit (event) {
    event.preventDefault();
    let { email } = this.state;

    email = email.trim();

    const isValidEmail = this._validateEmail(email);

    if (isValidEmail) {
      // Store email
    } else {
      alert('Please enter a valid email');
    }
  }

  render() {
    return (
      <Box>
        <Box>
          <Hero background={
            <Video autoPlay={true}
              showControls={false}
              loop={true}
              muted={true}
              fit='cover'>
              <source src='https://overwatchleague.com/vid/owl-announce.webm'
                type='video/webm' />
            </Video>}
            backgroundColorIndex='dark'
            size='medium'>
            <Box justify='center'
                align='center'>
              <Box pad="large">
                <GrommetIcon className="brand-logo-landing" />
              </Box>
              <Box pad="large">
                <Heading strong={true} tag='h1' align='center'>
                  Paid Fantasy eSports is Back
                </Heading>
                <Heading strong={true} tag='h3' align='center'>
                  Build Your TeamComp. Dominate Your League.
                </Heading>
              </Box>
              {/* <Button label='Notify Me'
                href='#'
                className='button'
                primary={true}
                secondary={false}
                accent={false}
                plain={false} /> */}
            </Box>
          </Hero>
        </Box>

        <Box align="center"
            pad="large"
            colorIndex="light-2"
            direction="row"
            flex="grow">
          <Box pad="large" basis='1/2'>
            <Heading tag="h2" strong={true}>
              Collect, build, play & win.
            </Heading>
            <Paragraph className="paragraph-fix" size="large">
              TeamComp brings a brand new experience to paid fantasy eSports.
              Combining elements from your favourite collectable card games and ultimate team builders, you can now watch and win rewards from matches at much higher level.
            </Paragraph>
          </Box>
          <Box pad="large" basis='1/2'>
            <Heading tag="h2" strong={true}>
              Sumo accumsan mel ignota hendrerit.
            </Heading>
            <Paragraph className="paragraph-fix" size="large">
              Lorem ipsum dolor sit amet, dicat sonet congue ei mei, est summo
              copiosae facilisi an. Sumo accumsan mel ea, eu ignota hendrerit
              consequuntur me.
            </Paragraph>
          </Box>
        </Box>

        <Box align="center" pad="large" texture="https://overwatchleague.com/img/bg-path.jpg" colorIndex="dark" direction="row" flex="grow">
          <Box pad="large" basis='1/2'>
            <Heading tag="h2" strong={true}>
              Sumo accumsan mel ignota hendrerit.
            </Heading>
            <Paragraph className="paragraph-fix" size="large">
              Lorem ipsum dolor sit amet, dicat sonet congue ei mei, est summo
              copiosae facilisi an. Sumo accumsan mel ea, eu ignota hendrerit
              consequuntur me.
            </Paragraph>
          </Box>
          <Box pad="large" basis='1/2'>
            <Heading tag="h2" strong={true}>
              All your favourite players. In their absolute prime.
            </Heading>
            <Paragraph className="paragraph-fix" size="large">
              Lorem ipsum dolor sit amet, dicat sonet congue ei mei, est summo
              copiosae facilisi an. Sumo accumsan mel ea, eu ignota hendrerit
              consequuntur me.
            </Paragraph>
          </Box>
        </Box>

        <Box align="center" pad="large" colorIndex="light-2">
          <Box pad="large" align="center">
            <Heading tag="h2" strong={true}>
              The biggest eSports titles.
            </Heading>
            <Paragraph className="paragraph-fix" size="large" align="center">
              We support many of your favourite titles. Join one or all.
            </Paragraph>
            <br />
            <br />
            <Box direction="row" flex="grow">
              <Box basis="1/4" pad="medium" justify="center">
                <Image src='https://upload.wikimedia.org/wikipedia/en/7/77/League_of_Legends_logo.png' />
              </Box>
              <Box basis="1/4" pad="medium" justify="center">
                <Image src='http://img03.deviantart.net/6059/i/2016/155/4/0/overwatch_logo_by_feeerieke-da4xuzp.png' />
              </Box>
              <Box basis="1/4" pad="medium" justify="center">
                <Image src='http://vignette3.wikia.nocookie.net/logopedia/images/c/c8/CSGO.png/revision/latest/scale-to-width-down/640?cb=20150828062634' />
              </Box>
              <Box basis="1/4" pad="medium" justify="center">
                <Image src='http://vignette3.wikia.nocookie.net/theamazingworldofgumball/images/d/dd/Logo_Dota_2.png/revision/latest/scale-to-width-down/639?cb=20130329094246' />
              </Box>
            </Box>
          </Box>
        </Box>

        <Footer full="horizontal">
          <Box colorIndex="grey-2" pad="large" align="center" full="horizontal">
            <Form pad="medium" onSubmit={this._onSubmit}>
              <Box align="center">
                <Heading strong={true} tag='h2'>Stay in the Loop!</Heading>
                <Paragraph align="center" margin="none">We will update and notify you when we go live</Paragraph>
              </Box>
              <fieldset>
                <FormField htmlFor="email" label={<FormattedMessage id="Email" defaultMessage="Email" />}>
                  <input type="email" ref={ref => this.emailRef = ref}
                    value={this.state.email}
                    onChange={this._onEmailChange} />
                </FormField>
              </fieldset>
              <Footer size="small" direction="column"
                align="stretch"
                pad={{vertical: 'none', between: 'medium'}}>
                <Button primary={true} fill={true} className="button"
                  type="submit" label="Submit"
                  onClick={this._onSubmit} />
              </Footer>
            </Form>
          </Box>
        </Footer>
      </Box>
    );
  }
}

Landing.propTypes = {
  defaultValues: PropTypes.shape({
    email: PropTypes.string
  }),
  onSubmit: PropTypes.func,
  onChange: PropTypes.func
};

Landing.defaultProps = {
  defaultValues: {
    email: ''
  }
};

export default Landing;
