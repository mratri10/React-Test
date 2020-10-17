import React, { Component } from 'react';
import { Provider } from 'react-redux';
import SQLITE from './src';
import store from './src/store';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (  
      <Provider store ={store}>
        <SQLITE />
      </Provider>
    );
  }
}
 
export default App;