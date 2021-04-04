import { React, Component } from 'react';
import './Navbar.css';

class Navbar extends Component {

    async componentDidMount() {
        console.log(this.props.account)
    }
    render() {
        return (
            <div className="navbar-wrapper">
                <h2 className="title">SCVS Demo</h2>
                <p className="role">VOTER</p>
                <p className="address">{this.props.account}</p>
            </div>
        )
    }
}

export default Navbar;