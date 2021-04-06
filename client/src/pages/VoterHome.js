import { React, Component } from 'react';
import './VoterHome.css';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class VoterHome extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
      }

    render() {
        return (
            <div className="voter-home-page-wrapper">
                <p style={{fontSize: 32}}>Welcome, <b>{this.props.fname}&nbsp;{this.props.lname}</b></p>
                <p>Your elections:</p>
                <div className="election-dropdowns">
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <p>Title &nbsp;&nbsp;&nbsp;</p>
                            <p style={{float: "right"}}>Voted/not voted placeholder</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <p>Content</p>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        )
    }
}

export default VoterHome;