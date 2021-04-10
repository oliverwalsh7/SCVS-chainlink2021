import { React, Component } from 'react';
import './Navbar.css';

class Navbar extends Component {

    constructor(props) {
        super(props)
      }

    render() {
        return (
            <div className="navbar-wrapper">
                <div style={{display: "flex"}}>
                    <h2 className="title">LINKTOPIA</h2>
                    <p>&nbsp;{this.props.town}</p>
                </div>
                <p className="role">VOTER</p>
                <p className="address">{this.props.account}</p>
            </div>
        )
    }
}

export default Navbar;