import React, { Component } from 'react'

function RenderQuestions(props) {
    const questions = [];
    if(this.state.questions[0] !== undefined) {
        for(let i=0;i<this.state.questions.length;i++){
            questionLists.push(
                <li key={i}><AdminQuestions question={this.state.questions[i]} /></li>                
            );
        }
    }

    return <div>{questionLists}</div>;
}

class AdminShowQuestionList extends Component {
    constructor(props) {
        super(props)
        RenderQuestions = RenderQuestions.bind(this);
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
        console.log(this.state.quetsions)
    }

    render() { 
        return ( 
            <div>
                <RenderQuestions />
            </div>
         );
    }
}
 
export default AdminShowQuestionList;