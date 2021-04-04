import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar.js';
import Register from './pages/Register.js';
import VoterHome from './pages/VoterHome.js';
import AdminHome from './pages/AdminHome.js';
import Web3 from 'web3';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '',
    }
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected')
    }
    console.log(this.state.address)
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
  }

  render() {
    return (
      <div className="App">
          <Navbar account={this.state.account}/>
          <AdminHome />
      </div>
    );
  }
}

export default App;
