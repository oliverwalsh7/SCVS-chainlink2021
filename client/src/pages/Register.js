import { React, Component } from 'react';
import './Register.css';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return (
            <div className="registration-page-wrapper">
                <p style={{fontSize: 32}}>This address has not yet been registered to vote.</p>
                <p>Register to vote using this address (note: only one address can be registered per citizen):</p>
                <form>
                    <div className="field">
                        <label for="fname">First name:</label>
                        <input type="text" id="fname" name="fname" value={this.state.firstName} onChange={this.props.handle} /><br />
                    </div>
                    <div className="field">
                        <label for="lname">Last name:</label>
                        <input type="text" id="lname" name="lname" value={this.state.lname} onChange={this.props.handle}/><br />
                    </div>
                    <div className="field">
                        <label for="dob">Date of birth:</label>
                        <input type="date" id="dob" name="dob" value={this.state.dob} onChange={this.props.handle}/><br />
                    </div>
                    <div className="field">
                        <label for="ssn">SSN:</label>
                        <input type="text" id="ssn" name="ssn" maxlength="11" placeholder="###-##-####" value={this.state.ssn} onChange={this.props.handle} />
                    </div>
                </form>
                <button onClick={this.props.register}>Register</button>
            </div>
        )
    }
}

export default Register;