import React, { Component } from 'react';
import QuestionList from './QuestionList';
import { authorizedAxios } from './../../modules/Rest';

class IndexQuestionLists extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            lessons: [],
            answers: [],
        }
    }

    componentDidMount() {
        this.setInfomations();    
    }

    async setInfomations() {
        let response = authorizedAxios("get", '/api/lessons');
        this.setState({ lessons: response.data.lessons });
        response = authorizedAxios("get", '/api/answers');
        this.setState({ answer: response.data.lessons });
    }

    async createLesson(questionList_id) {
        const response = await authorizedAxios("post", '/api/lesson/', {questionList_id: questionList_id});
        let lessons = this.state.lessons;
        lessons[this.state.lessons.length] = response.data.lesson;
        this.setState({lessons: lessons});
    }

    async createAnswer(lesson_id, question_id, choice) {
        const data = {lesson_id: lesson_id, question_id: question_id, choice: choice}
        const response = await authorizedAxios("post", '/api/answer/', data);
        let answers = this.state.answers;
        answers[this.state.answers.length] = response.data.answer;
        this.setState({answers: answers});
    }

    render() { 
        const questionsLists = this.props.questionLists.map((questionList, index) =>
            <div className="col-md-6" key={index}>
                <QuestionList 
                    questionList={questionList} 
                    createLesson={this.props.createLesson}
                    createAnswer={this.props.createAnswer}
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