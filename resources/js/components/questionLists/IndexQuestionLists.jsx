import React, { Component } from 'react';
import QuestionList from './QuestionList';

class IndexQuestionLists extends Component {

    render() { 
        const questionsLists = this.props.questionLists.map((questionList, index) =>
            <div className="col-md-6" key={index}>
                <QuestionList 
                    user={this.props.user}
                    questionList={questionList}
                    questions={this.props.questions} 
                    lessons={this.props.lessons}
                    answers={this.props.answers}
                    handleChange={this.props.handleChange}
                    activities={this.props.activities}
                />                
            </div>
        );     

        return ( 
            <div className="container">
                <div className="row">
                    {questionsLists}
                </div>
            </div>
         );
    }
}
 
export default IndexQuestionLists;