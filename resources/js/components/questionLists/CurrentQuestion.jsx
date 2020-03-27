import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class CurrentQuestion extends Component {
    constructor(props) {
        super(props)
        this.handleAnswer = this.handleAnswer.bind(this);
    }

    handleAnswer(e, choice) {
        e.preventDefault();
        this.props.createAnswer(this.props.lesson.id, this.props.question.id, choice);
    }

    render() { 
        const findOptions = id => this.props.options.filter(option => option.question_id == id);
        const options = findOptions(this.props.question.id); 

        if(options[0] != undefined) {
            return ( 
                <div>
                    <p>{this.props.questionList.title} {this.props.currentQuestionNumber}/{this.props.questions_number}</p>
                    <h3 className="bg-light p-5 my-3">Q{this.props.currentQuestionNumber}, {this.props.question.statement}</h3>
                    <div className="row">
                        <Button color="primary" variant="contained" className="col-md-8 mx-auto" onClick={(e) => this.handleAnswer(e, 1)}>1: {options[0].content}</Button>                    
                    </div>
                    <div className="row my-3">
                        <Button color="primary" variant="contained" className="col-md-8 mx-auto" onClick={(e) => this.handleAnswer(e, 2)}>2: {options[1].content}</Button>
                    </div>
                    <div className="row">
                        <Button color="primary" variant="contained" className="col-md-8 mx-auto" onClick={(e) => this.handleAnswer(e, 3)}>3: {options[2].content}</Button>
                    </div>  
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}
 
export default CurrentQuestion;