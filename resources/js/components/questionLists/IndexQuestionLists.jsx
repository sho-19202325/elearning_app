import React, { Component } from 'react';
import QuestionList from './QuestionList';
import { authorizedAxios } from './../../modules/Rest';

async function createLesson(questionList_id) {
    const response = await authorizedAxios("post", '/api/lesson/', {questionList_id: questionList_id});
    let lessons = this.state.lessons;
    lessons[this.state.lessons.length] = response.data.lesson;
    this.props.handleChange("lessons", lessons);
}

async function createAnswer(lesson_id, question_id, choice) {
    const data = {lesson_id: lesson_id, question_id: question_id, choice: choice}
    const response = await authorizedAxios("post", '/api/answer/', data);
    let answers = this.state.answers;
    answers[this.state.answers.length] = response.data.answer;
    this.props.handleChange("answers", answers)
}

class IndexQuestionLists extends Component {
    constructor(props) {
        super(props)
        createLesson = createLesson.bind(this);
        createAnswer = createAnswer.bind(this);
        this.state = {
            lessons: [],
            answers: [],
        }
    }  

    handleSubmit(e, questionList_id) {
        e.preventDefault();
        createLesson(questionList_id);
    }

    render() { 
        const questionsLists = this.props.questionLists.map((questionList, index) =>
            <div className="col-md-6" key={index}>
                <QuestionList 
                    questionList={questionList} 
                    handleSubmit={this.handleSubmit}
                    createAnswer={createAnswer}
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