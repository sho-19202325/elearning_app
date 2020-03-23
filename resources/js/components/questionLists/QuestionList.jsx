import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class QuestionList extends Component {
    render() { 
        return ( 
            <div className="card-container m-1 p-2 rounded shadow-lg text-center">
                <h3>{this.props.question.title}</h3>
                <p><span>[1 words]</span>{this.props.question.description}</p>
                <Button color="primary" variant="contained">answer this question list</Button>    
            </div>
         );
    }
}
 
export default QuestionList;