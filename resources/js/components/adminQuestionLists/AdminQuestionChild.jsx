import React, { Component } from 'react';
import { Button, IconButton, TextField, Radio, RadioGroup, FormControlLabel} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import DeleteConfirmation from './DeleteConfirmation';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { authorizedAxios } from './../../modules/Rest';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OptionList from './OptionList';

class AdminQuestionChild extends Component {
    constructor(props) {
        super(props)
        this.handleIsEditing = this.handleIsEditing.bind(this);
        this.handleIsDeleted = this.handleIsDeleted.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);   
        this.updateQuestion = this.updateQuestion.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancelEdit = this.handleCancelEdit.bind(this);
        this.handleSetPresentValue = this.handleSetPresentValue.bind(this);
        this.handleStartEdit = this.handleStartEdit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.updateOptions = this.updateOptions.bind(this);
        this.state = {
            isEditing: false,
            isDeleted: false,
            statement: this.props.question.statement,
            answer: this.props.question.answer,
            previousStatement: "",
            previousAnswer: "",
            isExpanded: false,
            options: this.props.options,
            option1: "",
            option2: "",
            option3: "",
        }
    }

    handleSetPresentValue() {
        this.setState({
            previousStatement: this.state.statement,
            previousAnswer: this.state.answer,
        });
    }

    handleIsEditing() {
        this.setState({isEditing: !this.state.isEditing});
    }

    handleStartEdit() {
        this.handleSetPresentValue();        
        this.handleIsEditing();
    }

    handleCancelEdit() {
        this.setState({
            statement: this.state.previousStatement,
            answer: this.state.previousAnswer,
        })
        this.handleIsEditing();
    }

    handleIsDeleted() {
        this.setState({ isDeleted: !this.state.isDeleted});
    }

    handleChange(name, e) {
        this.setState({ [name]: e.target.value })
    }

    handleUpdate(e) {
        e.preventDefault();
        this.updateQuestion(this.props.question.id, this.state.statement, this.state.answer);
        this.updateOptions(this.props.question.id);
        this.setState({options: [{ content: this.state.option1 }, { content: this.state.option2 }, { content: this.state.option3 }]});
        this.handleIsEditing();
    }

    handleOpen() {
        this.setState({ isExpanded: true});
    }

    handleClose() {
        this.setState({ isExpanded: false});
    }

    updateQuestion(id, statement, answer) {
        const data = { statement: statement, answer: answer }
        authorizedAxios("patch", '/api/questionList/' + this.props.questionList_id + '/question/' + id, data)
    }

    updateOptions(question_id) {
        const data = { options: [this.state.option1, this.state.option2, this.state.option3] }
        authorizedAxios("patch", '/api/question/' + question_id + '/options', data);
        this.setState({options: [
            {content: this.state.option1},
            {content: this.state.option2},
            {content: this.state.option3},
        ]});
    }

    deleteQuestion(id) {
        authorizedAxios("delete", '/api/questionList/' + this.props.questionList_id + '/question/' + id);
        this.setState({ isDeleted: true });
    }

    componentDidMount() {
        if(this.state.options[0] != undefined){
        this.setState({
            option1: this.props.options[0].content,
            option2: this.props.options[1].content,
            option3: this.props.options[2].content,
        })}
    }

    render() { 
        if(this.state.isDeleted) {
            return <div></div>;
        } else if (this.state.isEditing) {
            return (
                <div className="container card-container">
                    <div className="col-md-10 mx-auto py-3">
                        <form onSubmit={e=>this.handleUpdate(e)}>
                            <div className="row">
                                <TextField label="Statement" onChange={e=>this.handleChange("statement",e)} className="col-md-12" value={this.state.statement} autoFocus/>                            
                            </div>
                            <RadioGroup aria-label="answer" name="customized-radios" value={this.state.answer.toString()}>
                                <div className="row">
                                    <div className="col-md-1 mt-2">
                                        <FormControlLabel checked={this.state.answer == 1} name="question-answer" value="1" control={<Radio />} onClick={e => this.handleChange("answer", e) } />
                                    </div>
                                    <TextField required label="Option1" value={this.state.option1} onChange={e=>this.handleChange("option1", e)} className="col-md-10" />                
                                </div>
                                <div className="row">
                                    <div className="col-md-1 mt-2">
                                        <FormControlLabel checked={this.state.answer == 2} name="question-answer" value="2" control={<Radio />} onClick={e => this.handleChange("answer", e) } />
                                    </div>
                                    <TextField required label="Option2" value={this.state.option2} onChange={e=>this.handleChange("option2", e)} className="col-md-10" />                
                                </div>
                                <div className="row">
                                    <div className="col-md-1 mt-2">
                                        <FormControlLabel checked={this.state.answer == 3} name="question-answer" value="3" control={<Radio />} onClick={e => this.handleChange("answer", e) } />
                                    </div>
                                    <TextField required label="Option3" value={this.state.option3} onChange={e=>this.handleChange("option3", e)} className="col-md-10" />                
                                </div>                        
                            </RadioGroup>                                          
                            <div className="row">
                                <Button type="submit" color="primary" variant="contained" className="col-md-2 ml-auto mr-2">
                                    <CheckIcon />
                                    Save
                                </Button>  
                                <Button type="button" style={{background: 'white'}} className="col-md-2 mr-2" onClick={this.handleCancelEdit}>
                                    <ArrowBackIcon/>
                                    Cancel
                                </Button>                     
                            </div>
                        </form>     
                    </div>                       
                </div>
            )
        } else {
            return ( 
                <MuiExpansionPanel onMouseOver={this.handleOpen} onMouseOut={this.handleClose} expanded={this.state.isExpanded} square className="card-container container rounded shadow-lg text-center" >
                    <MuiExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} className="row" >
                        <div className="col-md-3 my-auto">{this.state.statement}</div>
                        <div className="col-md-3 my-auto">{this.state.answer}</div>
                        <div className="col-md-3 p-4">
                            <IconButton color="inherit" variant="contained" onClick={this.handleStartEdit}>
                                <EditIcon /> 
                            </IconButton>
                        </div>
                        <div className="col-md-3 p-4">
                            <DeleteConfirmation deleteTarget={this.props.question} deleteMethod={this.deleteQuestion} confirmationContent={["statement", "answer"]}/>  
                        </div>                        
                    </MuiExpansionPanelSummary>
                    <MuiExpansionPanelDetails>
                        <div className="container card-container p-0 bg-light">
                            <OptionList options={this.state.options}/>
                        </div>                         
                    </MuiExpansionPanelDetails>
                </MuiExpansionPanel>
            );
        }
    }
}
 
export default AdminQuestionChild;