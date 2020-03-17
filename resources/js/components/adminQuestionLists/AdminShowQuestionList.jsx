import React, { Component } from 'react';
import AdminQuestions from './AdminQuestions';
import { IconButton, Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import { Radio, FormControl, FormLabel, RadioGroup, FormControlLabel } from '@material-ui/core';

function RenderQuestions(props) {
    const questions = [];
    if(this.state.questions[0] !== undefined) {
        for(let i=0;i<this.state.questions.length;i++){
            questions.push(
                <tr key={i} className="card-container p-2 rounded shadow-lg text-center">
                    <td className="p-4">{this.state.questions[i].statement}</td>
                    <td className="p-4">{this.state.questions[i].answer}</td>
                    <td className="p-4">
                        <IconButton color="inherit" variant="contained" >
                            <EditIcon /> 
                        </IconButton>
                    </td>
                    <td className="p-4">
                        <IconButton color="inherit" variant="contained" >
                            <DeleteIcon />
                        </IconButton>
                    </td>
                </tr>                 
            );
        }
    }

    return <tbody>{questions}</tbody>;
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
        console.log(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createQuestion(statement, answer);
    }

    const createQuestion = (statement, answer) => {
        axios.post('/api/questionList/' + this.props.questionList_id + '/questions', {statement: statement, answer: answer}, {
            headers: {
                'Accept' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then (response =>  {
            console.log(response.data);
            setStatement('');
            setAnswer(1);
            setOpen(false);
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

class AdminShowQuestionList extends Component {
    constructor(props) {
        super(props)
        RenderQuestions = RenderQuestions.bind(this);
        AddQuestions = AddQuestions.bind(this);
        this.state = {
            questions: []
        }
    }

    componentDidMount() {
        var question_data = [];
        for(var i=1;i<=10;i++) {
            question_data.push({id: i, statement: `this is question ${i}`, answer: `this is answer ${i}`});
        };        
        this.setState({ questions: question_data});
    }

    render() { 
        return ( 
            <div className="container">
                <AddQuestions />                
                <table className="col-md-10 mx-auto mt-4">
                    <thead className="w-100 card-container">
                        <tr className="text-center">
                            <th className="p-4 w-50">statement</th>
                            <th className="p-4 w-50">answer</th>
                            <th className="p-4 w-50">Edit</th>
                            <th className="p-4 w-50">Delete</th>
                        </tr>         
                    </thead>
                    <RenderQuestions />
                </table> 
            </div>
         );
    }
}
 
export default AdminShowQuestionList;