import React, { Component } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton'; 
import axios from 'axios';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { TextField, Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import DeleteConfirmation from './DeleteConfirmation';
import { authorizedAxios } from './../../modules/Rest';
import ListIcon from '@material-ui/icons/List';
import { Link } from 'react-router-dom';

class AdminQuestionList extends Component {
    constructor(props) {
        super(props)
        this.handleIsEditing = this.handleIsEditing.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSetPresentValue = this.handleSetPresentValue.bind(this);
        this.handleStartEdit = this.handleStartEdit.bind(this);
        this.handleCancelEdit = this.handleCancelEdit.bind(this);
        this.deleteQuestionList = this.deleteQuestionList.bind(this);
        this.state = {
            isEditing: false,
            title: this.props.questionList.title,
            description: this.props.questionList.description,
            isDeleted: false,
            previousTitle: "",
            previousDescription: "",
        }
    }

    handleIsEditing() {
        this.setState({isEditing: !this.state.isEditing});
    }

    handleSetPresentValue() {
        this.setState({previousTitle: this.state.title, previousDescription: this.state.description});
    }

    handleStartEdit() {
        this.handleSetPresentValue();        
        this.handleIsEditing();
    }

    handleCancelEdit() {
        this.setState({title: this.state.previousTitle, description: this.state.previousDescription});
        this.handleIsEditing();
    }

    handleTitle(e) {
        this.setState({title: e.target.value});
    }

    handleDescription(e) {
        this.setState({description: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.updateQuestionList(this.props.questionList.id, this.state.title, this.state.description);
        this.handleIsEditing();
    }

    updateQuestionList(id, title, description) {
        const data = {title: title, description: description}
        authorizedAxios("patch", "/api/questionList/" + id, data);
    }

    deleteQuestionList(id) {
        authorizedAxios("delete", '/api/questionList/' + id);
        this.setState({isDeleted: true})
    }

    render() { 
        if(this.state.isEditing) {
            return (
                <div className="card-container py-3 pl-3 rounded shadow-lg container">            
                    <div className="container">
                        <form onSubmit={e=>this.handleSubmit(e)}>
                            <div className="row">
                                <TextField label="Title" onChange={e=>this.handleTitle(e)} id="addQuestionListTitle" className="col-md-8 ml-3" value={this.state.title} autoFocus/>  
                                <div className="col-md-2 my-auto">
                                    <Button type="submit" color="primary" variant="contained" className="ml-auto" >
                                        <CheckIcon />
                                        Save
                                    </Button>                               
                                </div>                                                    
                            </div>
                            <div className="row">
                                <TextField label="Description" onChange={e=>this.handleDescription(e)} className="col-md-8 ml-3" value={this.state.description} />
                                <div className="col-md-2 my-auto">
                                    <Button type="button" style={{background: 'white'}} onClick={this.handleCancelEdit}>
                                        <ArrowBackIcon/>
                                        Cancel
                                    </Button>                              
                                </div>                                               
                            </div>
                        </form>  
                    </div>   
                </div>
            );
        } 
        else if (this.state.isDeleted) {
            return <div></div>;
        }
        else {
            return (
                <div className="card-container py-3 pl-3 rounded shadow-lg container">               
                    <div className="row">
                        <div className="col-md-8">
                            <h3>{this.state.title}</h3>
                            <p><span>[0 words]</span>{this.state.description}</p>
                        </div>  
                        <div className="col-md-4">
                            <div className="row my-3">
                                <div className="col-md-3 pr-0">
                                    <Link to={"/admin/questionList/" + this.props.questionList.id +"/questions"}>
                                        <IconButton color="inherit">
                                            <ListIcon />    
                                        </IconButton>  
                                    </Link>                              
                                </div>                                  
                                <div className="col-md-3 ml-3 pr-0">
                                    <IconButton color="inherit" onClick={this.handleStartEdit}>
                                        <EditIcon />
                                    </IconButton>                                
                                </div>
                                <div className="col-md-3">
                                    <DeleteConfirmation deleteTarget={this.props.questionList} deleteMethod={this.deleteQuestionList} confirmationContent={["title", "description"]}/>                                              
                                </div>      
                            </div>   
                        </div>                            
                    </div>
                </div>
            );
        }  
        
    }
}
 
export default AdminQuestionList;