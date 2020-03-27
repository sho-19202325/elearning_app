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

async function createQuestion(questionList_id, statement, answer) {
    const data = {statement: statement, answer: answer};
    const response = await authorizedAxios("post", '/api/questionList/' + questionList_id + '/question', data);
    console.log(response);
    this.handleNewQuestion(response.data.question);
    createOption(questionList_id, response.data.question.id);
}

async function createOption(questionList_id, question_id) {
    const data = {options:[this.state.content1, this.state.content2, this.state.content3]};
    const response = await authorizedAxios("post", '/api/question/' + question_id + '/option', data);
    this.handleNewOption(response.data.options);
    if(this.props.questionList_id !== questionList_id) {
        location.reload();
    }
}

function RenderQuestions(props) {
    const questions = [];
    if(props.showQuestions !== undefined && this.state.options[0] != undefined) {
        for(let i=0;i<props.showQuestions.length;i++){
            let question = props.showQuestions[i];  
            let options = this.state.options.filter(option => option.question_id == question.id);
            questions.push(
                <AdmingQuestionChild 
                    key={i} 
                    question={question} 
                    questionList_id={this.props.questionList_id} 
                    options={options}    
                />              
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
        createQuestion(props.questionList_id, statement, answer);
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
                            <div className="col-md-1 mt-2">
                                <FormControlLabel required checked={answer == 1} name="question-answer" value="1" control={<Radio />} onClick={e => handleAnswer(e) } />
                            </div>
                            <TextField label="Option" onChange={e=>this.handleContent(1, e)} className="col-md-10" />                
                        </div>
                        <div className="row">
                            <div className="col-md-1 mt-2">
                                <FormControlLabel required checked={answer == 2} name="question-answer" value="2" control={<Radio />} onClick={e => handleAnswer(e) } />
                            </div>
                            <TextField label="Option" onChange={e=>this.handleContent(2, e)} className="col-md-10" />                
                        </div>
                        <div className="row">
                            <div className="col-md-1 mt-2">
                                <FormControlLabel required checked={answer == 3} name="question-answer" value="3" control={<Radio />} onClick={e => handleAnswer(e) } />
                            </div>
                            <TextField label="Option" onChange={e=>this.handleContent(3, e)} className="col-md-10" />                
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

function RenderCreatedQuestions(props) {
    let createdQuestions = []
    for(let i=0;i < this.state.newQuestions.length;i++) {
        if (this.state.newQuestions[i].question_list_id == props.questionList_id && this.state.newOptions[0] != undefined){
            createdQuestions.unshift(
                <AdmingQuestionChild 
                    key={i} 
                    question={this.state.newQuestions[i]} 
                    questionList_id={props.questionList_id}
                    options={this.state.newOptions[i]}                    
                />  
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
        createOption = createOption.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.handleContent = this.handleContent.bind(this);
        this.setOptions = this.setOptions.bind(this);
        this.state = {
            newQuestions: [],
            newOptions: [],
            options: [],
            content1: "",
            content2: "",
            content3: "",
        }
    }

    handleContent(num, e) {
        this.setState({["content" + num]: e.target.value});
    }

    handleNewQuestion(newQuestion) {
        let newQuestions = this.state.newQuestions;
        newQuestions[newQuestions.length] = newQuestion;

        this.setState({ newQuestions: newQuestions });        
    }

    handleNewOption(newOption) {
        let newOptions = this.state.newOptions;
        newOptions[newOptions.length] = newOption;    
        this.setState({ newOptions: newOptions });    
    }

    deleteQuestion(id) {
        authorizedAxios("delete", '/api/questionList/' + this.props.questionList_id + '/question/' + id);
    }

    componentDidMount() {
        this.setOptions();
    }

    async setOptions() {
        const response = await authorizedAxios("get", '/api/options' );
        this.setState({ options: response.data.options });
    }

    render() {         
        if(this.props.questions !== undefined){
        const findQuestions = id => this.props.questions.filter(question => question.question_list_id == id);  
        const showQuestions = findQuestions(this.props.questionList_id);
        return ( 
            <div className="container w-75">
                <AddQuestions questionList_id={this.props.questionList_id}/>                
                <div className="col-md-12 mt-4">
                    <div className="card-container row text-center">
                        <div className="p-4 col-md-3">statement</div>
                        <div className="p-4 col-md-3">answer</div>
                        <div className="p-4 col-md-3">Edit</div>
                        <div className="p-4 col-md-3">Delete</div>
                    </div>
                    <RenderCreatedQuestions questionList_id={this.props.questionList_id} />
                    <RenderQuestions showQuestions={showQuestions} />
                </div> 
            </div>
         );} else {
             return <div></div>;
         }
    }
}
 
export default AdminShowQuestionList;