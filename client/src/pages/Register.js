import React from 'react';
import './Register.css';

function Register() {
    return (
        <div className="registration-page-wrapper">
            <p style={{fontSize: 32}}>This address has not yet been registered to vote.</p>
            <p>Register to vote using this address (note: only one address can be registered per citizen):</p>
            <form>
                <div className="field">
                    <label for="fname">First name:</label>
                    <input type="text" id="fname" name="fname" /><br />
                </div>
                <div className="field">
                    <label for="lname">Last name:</label>
                    <input type="text" id="lname" name="lname" /><br />
                </div>
                <div className="field">
                    <label for="dob">Date of birth:</label>
                    <input type="date" id="dob" name="dob" /><br />
                </div>
                <div className="field">
                    <label for="ssn">SSN:</label>
                    <input type="text" id="ssn" name="ssn" maxlength="9" placeholder="#########" />
                </div>
            </form>
            <button>Register</button>
        </div>
    )
}

export default Register;