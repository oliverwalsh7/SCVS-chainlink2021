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
      town: 'placeholder',
      fname: '',
      lname: '',
      dob: '',
      ssn: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.getCitizen = this.getCitizen.bind(this);
    this.postAddress = this.postAddress.bind(this);
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

  handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    });
  };

  getCitizen = async() => {

    var url = new URL("http://localhost:8081/")
    var params = { 
      "ssn": "233-72-0360",
      "fname": "Abrahan",
      "lname": "Darinton",
      "dob": "1944-02-10",
      "type": 2,
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    let response = await fetch(url,  {
      method: "get",
      mode: "no-cors",
      headers: {
          "Content-Type": "application/json"
      }
      })
      
    let data = await response.json()
    console.log(data)
  }

  postAddress = async() => {
    var url = new URL("http://localhost:8081/")
    var params = { 
      "ssn": "233-72-0360",
      "fname": "Abrahan",
      "lname": "Darinton",
      "dob": "1944-02-10",
      "address": this.state.account,
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    let response = await fetch(url,  {
      method: "post",
      mode: "no-cors",
      headers: {
          "Content-Type": "application/json"
      }
      })
      
    let data = await response.json()
    console.log(data)
  }

  render() {
    return (
      <div className="App">
          <Navbar account={this.state.account} town={this.state.town} />
          {/* <button onClick={this.getCitizen}>GET</button>
          <button onClick={this.postAddress}>POST</button> */}

          <Register handle={this.handleChange} />
          {/* <VoterHome /> */}
          {/* <AdminHome /> */}

      </div>
    );
  }
}

export default App;