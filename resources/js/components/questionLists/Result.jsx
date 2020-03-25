import React, { Component } from 'react'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OptionList from './../adminQuestionLists/OptionList';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

function ResultIcon(props) {
    if(props.answer.choice == props.question.answer) {
        return <CheckCircleIcon color="primary" />;
    } else {
        return <CancelIcon color="secondary" />;
    }
}

class Result extends Component {
    constructor(props) {
        super(props)
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            isExpanded: false,
        }
    }

    handleOpen() {
        this.setState({ isExpanded: true });
    }

    handleClose() {
        this.setState({ isExpanded: false });
    }

    render() { 
        if(this.props.options != undefined && this.props.options[0] != undefined) {
            return ( 
                <MuiExpansionPanel onMouseOver={this.handleOpen} onMouseOut={this.handleClose} expanded={this.state.isExpanded} square className="card-container container rounded shadow-lg text-center" >
                <MuiExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} className="row py-4" >
                    <div>
                        <ResultIcon 
                            answer={this.props.answer}
                            question={this.props.question}
                        />                    
                    </div>
                    <div className="col-md-5 my-auto">
                        {this.props.question.statement}
                    </div>
                    <div className="col-md-3 my-auto">{this.props.question.answer}: {this.props.options[this.props.question.answer-1].content}</div>
                    <div className="col-md-3 my-auto">
                        {this.props.answer.choice}: {this.props.options[this.props.answer.choice-1].content}
                    </div>                                      
                </MuiExpansionPanelSummary>
                <MuiExpansionPanelDetails>
                    <div className="container card-container p-0 bg-light">
                        <OptionList options={this.props.options}/>
                    </div>                         
                </MuiExpansionPanelDetails>
                </MuiExpansionPanel>
            );
        } else {
            return <div></div>;
        }
    }
}
 
export default Result;