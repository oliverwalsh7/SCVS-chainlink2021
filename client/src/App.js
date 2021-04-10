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
      ssn: '',
      registered: false,
      citizen: {
        
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.getCitizen = this.getCitizen.bind(this);
    this.postAddress = this.postAddress.bind(this);
    this.register = this.register.bind(this);
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

  async getCitizen(type) {

    var url = new URL("http://localhost:8081/")
    var params = { 
      "ssn": this.state.ssn,
      "fname": this.state.fname,
      "lname": this.state.lname,
      "dob": this.state.dob,
      "type": type,
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    const resp = await fetch(url,  {
      method: "get",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-Type": "application/json"
      },
    }).then((resp) => resp.json()).then(resp => {
      console.log(resp)
      this.setState({citizen: resp})
    })

    return resp
  }

  postAddress = async() => {
    var url = new URL("http://localhost:8081/")
    var params = { 
      "ssn": this.state.ssn,
      "fname": this.state.fname,
      "lname": this.state.lname,
      "dob": this.state.dob,
      "address": this.state.account,
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    let response = await fetch(url,  {
      method: "post",
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-Type": "application/json"
      }
      })
      
    let data = await response.json()
    console.log("SUCCESSFUL POST")
    console.log(data)
  }

  register = async() => {
    console.log(`${this.state.fname} ${this.state.lname} ${this.state.dob} ${this.state.ssn}`)
    let resp = await this.getCitizen(1)
    console.log(resp)
  }

  render() {
    return (
      <div className="App">
          <Navbar account={this.state.account} town={this.state.town} />
          {/* <button onClick={this.getCitizen}>GET</button>
          <button onClick={this.postAddress}>POST</button> */}

          {/* <VoterHome /> */}
          {/* <AdminHome /> */}
          <button onClick={async () => this.getCitizen(2)}>get rando</button>
          <button onClick={async () => console.log(this.state.citizen)}> Please </button>

      </div>
    );
  }
}

export default App;