import React, { Component } from 'react';
import axios from 'axios';
import AdminQuestionList from './AdminQuestionList';
import { Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CheckIcon from '@material-ui/icons/Check';

function AddQuestionsList(props) { 
    const [open, setOpen] = React.useState(false);   
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createQuestionList(title, description);
    }

    const createQuestionList = (title, description) => {
        axios.post('/api/questionLists', {title: title, description: description}, {
            headers: {
                'Accept' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then (response =>  {
            console.log(response.data);
            setTitle('');
            setDescription('');
            setOpen(false);
            this.handleNewQuestionList(response.data.questionList);
            console.log(this.state.newQuestionLists);
        })
        .catch (error => {
            console.log(error);
        })
    }

    if(open) {
        return (
            <div>
                <Button style={{background: 'white', display:'block'}} variant="contained" className="ml-auto my-3" onClick={handleClose}>
                    <RemoveIcon />
                    Cancel
                </Button> 
                <div className="card-container py-3 px-5 pl-3 rounded shadow-lg">
                    <form onSubmit={e=>handleSubmit(e)}>
                        <div className="row">
                            <TextField label="Title" onChange={e=>handleTitle(e)} id="addQuestionListTitle" value={title} className="col-md-6" autoFocus/>                            
                        </div>
                        <div className="row">
                            <TextField label="Description" onChange={e=>handleDescription(e)} value={description} className="col-md-6"/>
                            <Button type="submit" style={{background: 'white'}} variant="contained" className="ml-auto">
                                <CheckIcon />
                                Save
                            </Button>                                                        
                        </div>
                    </form>
                </div>                
            </div>
        );
    } 
    else {
        return (
            <Button style={{background: 'white', display:'block'}} variant="contained" className="ml-auto my-3" onClick={handleOpen}>
                <AddIcon />
                Add new List
            </Button>                        
        );
    }
}

function RenderQuestionLists(props) {
    const questionLists = [];
    if(this.props.questionLists[0] !== undefined) {
        for(let i=0;i<this.props.questionLists.length;i++){
            questionLists.push(
                <li key={i}><AdminQuestionList questionList={this.props.questionLists[i]} /></li>                
            );
        }
    }

    return <div>{questionLists}</div>;
}

function RenderCreatedQuestionLists() {
    let createdQuestionLists = []
    for(let i=0;i < this.state.newQuestionLists.length;i++) {
        createdQuestionLists.unshift(
            <li key={i}><AdminQuestionList questionList={this.state.newQuestionLists[i]} /></li>
        )
    }

    return <div>{createdQuestionLists}</div>;
}

class IndexAdminQuestionLists extends Component {
    constructor(props){
        super(props)
        AddQuestionsList = AddQuestionsList.bind(this);
        RenderQuestionLists = RenderQuestionLists.bind(this);
        RenderCreatedQuestionLists = RenderCreatedQuestionLists.bind(this);
        this.state = {
            newQuestionLists: [],
        }
    }

    handleNewQuestionList(newQuestionList) {
        let newLists = this.state.newQuestionLists;
        newLists[newLists.length] = newQuestionList;
        this.setState({newQuestionLists: newLists});
    }

    render() { 
        return ( 
            <div className="container my-5">
                <div className="row">
                    <ul className="col-md-10 mx-auto">
                        <AddQuestionsList handleNewQuestionList={this.handleNewQuestionList} />
                        <RenderCreatedQuestionLists />
                        <RenderQuestionLists />
                    </ul> 
                </div>
            </div>
        )
    }
}
 
export default IndexAdminQuestionLists;