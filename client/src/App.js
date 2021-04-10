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
      town: '',
      fname: '',
      lname: '',
      dob: '',
      ssn: '',
      registered: false,
      citizen: {
        
      },
      statusMessage: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.getCitizen = this.getCitizen.bind(this);
    this.postAddress = this.postAddress.bind(this);
    this.register = this.register.bind(this);
    this.bind = this.fillRandom.bind(this);
  }

  async componentWillMount() {
    console.log("start")
    await this.loadWeb3()
    await this.loadBlockchainData()
    await this.verifyMetaMaskAdr();
    if (this.state.citizen.ssn) {
      this.setState({
        fname: this.state.citizen.first_name,
        lname: this.state.citizen.last_name,
        dob: this.state.citizen.dob,
        ssn: this.state.citizen.ssn,
        registered: true
      })
      console.log(this.state)
    }
    console.log("end")
  }

  verifyMetaMaskAdr = async () => {
    await this.getCitizen(3)
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
      "address": this.state.account,
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
      if (this.state.citizen.count == 1) {
        this.setState({ registered: true })
      }
      return resp
    })
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
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Content-Type": "application/json"
      }
      }).then((resp) => resp.json()).then(resp => {
        console.log(resp)
        this.setState({citizen: resp})
        return resp
      })
  }

  register = async() => {
    await this.getCitizen(1)
    if (this.state.citizen.ssn) {
      this.setState({ statusMessage: 'Click register again.'})
    } else if (this.state.citizen.count != 1) {
      this.setState({ statusMessage: 'Error: either you spelled something wrong or this citizen is already registered with another address.'})
    } else {
      this.setState({ statusMessage: 'Registering...'})
      await this.postAddress()
      this.setState({ statusMessage: ''})
    }
  }

  fillRandom = async() => {
    await this.getCitizen(2)
    console.log(this.state.citizen)
    if(this.state.citizen.dob) {
      this.setState({
        fname: this.state.citizen.first_name,
        lname: this.state.citizen.last_name,
        ssn: this.state.citizen.ssn,
        dob: this.state.citizen.dob.substring(0, 10)
      })
    }
  }

  render() {
    return (
      <div className="App">
          <Navbar account={this.state.account} town={this.state.town} />
          {/* <button onClick={this.getCitizen}>GET</button>
          <button onClick={this.postAddress}>POST</button> */}

          {/* <VoterHome /> */}
          {/* <AdminHome /> */}
          {
            this.state.registered ?
            <VoterHome 
              fname={this.state.fname}
              lname={this.state.lname}
            /> :
            <div>
              <Register
                handle={this.handleChange}
                register={this.register}
                key={this.state.ssn}
                fname={this.state.fname}
                lname={this.state.lname}
                ssn={this.state.ssn}
                dob={this.state.dob}
              />
              <button onClick={async () => this.fillRandom()}>Random Citizen</button>
            </div>
          }
          <p>{this.state.statusMessage}</p>
      </div>
    );
  }
}

export default App;