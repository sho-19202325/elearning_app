import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class QuestionList extends Component {
    render() { 
        return ( 
            <div className="card-container m-1 p-2 rounded shadow-lg text-center">
                <h3>{this.props.questionList.title}</h3>
                <p><span>[1 words]</span>{this.props.questionList.description}</p>
                <Button color="primary" variant="contained" onClick={this.props.createLesson(this.props.questionList.id)}>answer this question list</Button>    
            </div>
         );
    }
}
 
export default QuestionList;