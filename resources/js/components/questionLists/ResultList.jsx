import React, { Component } from 'react';
import Result from './Result';
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';

function RenderResults(props) {
    const results = [];
    if(props.answers != undefined &&  props.options[0] != undefined) {
        for(let i=0;i< props.answers.length;i++){
            let options = props.options.filter(option => option.question_id == props.questions[i].id)
            results.push(
                <Result  
                    key={i} 
                    question={props.questions[i]}
                    answer={props.answers[i]} 
                    options={options}      
                />              
            );
        }
    }

    return <div>{results}</div>;
}

class ResultList extends Component {
    constructor(props) {
        super(props)
        RenderResults = RenderResults.bind(this);
    }

    render() { 
        let countCorrect = 0;
        for(let i=0;i < this.props.questions.length; i++) {
            if(this.props.questions[i].answer == this.props.answers[i].choice) {
                countCorrect += 1
            }
        }
        let score = Math.round(countCorrect/this.props.questions.length*100)

        return ( 
            <div className="container w-75">
                <div className="card-container p-4 my-3">
                    <h3>Result: {this.props.questionList.title}</h3>
                    <h3>Your score is {score} point!({countCorrect}/{this.props.questions.length})</h3>
                </div>
                <div className="card-container rounded shadow-lg text-center container py-4">
                    <div className="row">
                        <div className="col-md-5 my-auto">
                            Question    
                        </div>
                        <div className="col-md-3 my-auto">
                            Answer
                        </div>
                        <div className="col-md-3 my-auto">
                            Your Choice
                        </div>                        
                    </div>
                </div>
                <RenderResults 
                    answers={this.props.answers}
                    questions={this.props.questions}
                    options={this.props.options}
                />
                <Link to="/questions">
                    <Button style={{background: 'white', display:'block'}} variant="contained" className="ml-auto my-3">
                        <ArrowBackIcon /> Back to select questions
                    </Button>                     
                </Link>
            </div>
         );
    }
}
 
export default ResultList;