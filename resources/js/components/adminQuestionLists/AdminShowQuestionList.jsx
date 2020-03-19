import React, { Component } from 'react';
import AdmingQuestionChild from './AdminQuestionChild';
import { IconButton, Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import { Radio, FormControl, FormLabel, RadioGroup, FormControlLabel } from '@material-ui/core';
import DeleteConfirmation from './DeleteConfirmation.jsx';
import { authorizedAxios } from './../../modules/Rest';

async function createQuestion(statement, answer) {
    const data = {statement: statement, answer: answer};
    const response = await authorizedAxios("post", '/api/questionList/' + this.props.questionList_id + '/question', data);
    console.log(response);
    this.handleNewQuestion(response.data.question);
}

function RenderQuestions(props) {
    const questions = [];
    console.log(props.showQuestions);
    if(props.showQuestions !== undefined) {
        for(let i=0;i<props.showQuestions.length;i++){
            questions.push(
                <AdmingQuestionChild key={i} question={props.showQuestions[i]} questionList_id={this.props.questionList_id} />              
            );
        }
    }

    return <div>{questions}</div>;
}

function AddQuestions(props) { 
    const [open, setOpen] = React.useState(false);   
    const [statement, setStatement] = React.useState('');
    const [answer, setAnswer] = React.useState(1);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleStatement = (e) => {
        setStatement(e.target.value);
    }

    const handleAnswer = (e) => {
        setAnswer(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createQuestion(statement, answer);
        setStatement('');
        setAnswer(1);
        handleClose();
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
                            <TextField label="Statement" onChange={e=>handleStatement(e)} className="col-md-6" autoFocus/>                            
                        </div>
                        <div className="row">
                            <RadioGroup defaultValue="1" aria-label="gender" name="customized-radios">
                                <FormControlLabel value="1" control={<Radio />} onClick={e => handleAnswer(e) }/>
                                <FormControlLabel value="2" control={<Radio />} onClick={e => handleAnswer(e) }/>
                                <FormControlLabel value="3" control={<Radio />} onClick={e => handleAnswer(e) }/>
                            </RadioGroup>                                          
                        </div>
                        <div className="row">
                            <Button type="submit" style={{background: 'white'}} variant="contained" className="col-md-8 mx-auto">
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
                Add New Quesion
            </Button>                        
        );
    }
}

function RenderCreatedQuestions() {
    let createdQuestions = []
    for(let i=0;i < this.state.newQuestions.length;i++) {
        if (this.state.newQuestions[i].question_list_id == this.props.questionList_id){
            createdQuestions.unshift(
                <AdmingQuestionChild key={i} question={this.state.newQuestions[i]} questionList_id={this.props.questionList_id} />  
            )
        }
    }

    return <div>{createdQuestions}</div>;
}

class AdminShowQuestionList extends Component {
    constructor(props) {
        super(props)
        RenderQuestions = RenderQuestions.bind(this);
        AddQuestions = AddQuestions.bind(this);
        RenderCreatedQuestions = RenderCreatedQuestions.bind(this);
        createQuestion = createQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.state = {
            newQuestions: [],
        }
    }

    handleNewQuestion(newQuestion) {
        let newQuestions = this.state.newQuestions;
        newQuestions[newQuestions.length] = newQuestion;
        this.setState({newQuestions: newQuestions});
    }

    deleteQuestion(id) {
        authorizedAxios("delete", '/api/questionList/' + this.props.questionList_id + '/question/' + id);
    }

    render() { 
        if(this.props.questions !== undefined){
        const findQuestions = id => this.props.questions.filter(question => question.question_list_id == id);  
        const showQuestions = findQuestions(this.props.questionList_id);
        console.log(this.state.newQuestions);
        return ( 
            <div className="container w-75">
                <AddQuestions />                
                <div className="col-md-12 mt-4">
                    <div className="card-container row text-center">
                        <div className="p-4 col-md-3">statement</div>
                        <div className="p-4 col-md-3">answer</div>
                        <div className="p-4 col-md-3">Edit</div>
                        <div className="p-4 col-md-3">Delete</div>
                    </div>
                    <RenderCreatedQuestions />
                    <RenderQuestions showQuestions={showQuestions} />
                </div> 
            </div>
         );} else {
             return <div></div>;
         }
    }
}
 
export default AdminShowQuestionList;