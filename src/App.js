import React from 'react';
import GrommetApp from 'grommet/components/App';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <GrommetApp centered={false}>
        <Header />
        {this.props.children}
      </GrommetApp>
    );
  }
}

export default App;
