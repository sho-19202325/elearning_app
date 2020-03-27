import React, { Component } from 'react';
import { Button, IconButton, TextField, Radio, RadioGroup, FormControlLabel} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import DeleteConfirmation from './DeleteConfirmation';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { authorizedAxios } from './../../modules/Rest';

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
        this.state = {
            isEditing: false,
            isDeleted: false,
            statement: this.props.question.statement,
            answer: this.props.question.answer,
            previousStatement: "",
            previousAnswer: "",
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
        this.handleIsEditing();
    }

    updateQuestion(id, statement, answer) {
        const data = { statement: statement, answer: answer }
        authorizedAxios("patch", '/api/questionList/' + this.props.questionList_id + '/question/' + id, data)
    }

    deleteQuestion(id) {
        authorizedAxios("delete", '/api/questionList/' + this.props.questionList_id + '/question/' + id);
        this.setState({ isDeleted: true });
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
                            <div className="row">
                                <RadioGroup aria-label="answer" name="customized-radios" value={this.state.answer.toString()}>
                                    <FormControlLabel value="1" control={<Radio />} onClick={e => this.handleChange("answer", e) }/>
                                    <FormControlLabel value="2" control={<Radio />} onClick={e => this.handleChange("answer", e) }/>
                                    <FormControlLabel value="3" control={<Radio />} onClick={e => this.handleChange("answer", e) }/>
                                </RadioGroup>                                          
                            </div>
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
                <div className="card-container rounded shadow-lg text-center row">
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
                </div>   
            );
        }
    }
}
 
export default AdminQuestionChild;