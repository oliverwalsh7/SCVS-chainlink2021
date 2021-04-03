import React from 'react';
import './AdminHome.css';

function AdminHome() {
    return (
        <div className="admin-home-page-wrapper">
            <p style={{fontSize: 32}}>Welcome, <b>NAME PLACEHOLDER</b></p>
            <p>Manage elections:</p>
            <div className="elections">
                <div className="in-progress">
                    <p style={{textDecoration: "underline"}}>In Progress:</p>
                    <p>ELECTION LINK PLACEHOLDER</p>
                </div>
                <div className="scheduled">
                    <p style={{textDecoration: "underline"}}>Scheduled:</p>
                    <p>ELECTION LINK PLACEHOLDER</p>
                </div>
                <div className="concluded">
                    <p style={{textDecoration: "underline"}}>Concluded:</p>
                    <p>ELECTION LINK PLACEHOLDER</p>
                </div>
            </div>
        </div>
    )
}

export default AdminHome;