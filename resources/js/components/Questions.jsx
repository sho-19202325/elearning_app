import React, { Component } from 'react';
import Question from './Question';

class Questions extends Component {
    constructor(props){
        super(props)
        this.state = {
            questions: []
        }
    }

    componentDidMount() {
        // get questions data from laravel api and set it to state but now it is still sample data
        var questions_data = [];
        for(var i=0;i<10;i++) {
            questions_data[i] = { id: i+1, title:  `sample${i+1}` , description: `description${i+1}`};
        };        
        this.setState({ questions: questions_data});
    }

    render() { 
        const questionsList = this.state.questions.map((question, index) =>
            <div className="col-md-6" key={index}>
                <Question question={question} />                
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
 
export default Questions;