import React, { Component } from 'react';
import QuestionList from './QuestionList';

class IndexQuestionLists extends Component {

    render() { 
        const questionsList = this.props.questions.map((question, index) =>
            <div className="col-md-6" key={index}>
                <QuestionList question={question} />                
            </div>
        );     

        return ( 
            <div className="container">
                <div className="row">
                    {questionsList}
                </div>
            </div>
         );
    }
}
 
export default IndexQuestionLists;