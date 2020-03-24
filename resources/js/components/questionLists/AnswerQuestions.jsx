import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import CurrentQuestion from './CurrentQuestion';
import { authorizedAxios } from './../../modules/Rest';

async function createLesson(questionList_id) {
    const response = await authorizedAxios("post", '/api/lesson/', {questionList_id: questionList_id});
    let lessons = this.props.lessons;
    lessons[this.props.lessons.length] = response.data.lesson;
    this.props.handleChange("lessons", lessons);
}

async function createAnswer(lesson_id, question_id, choice) {
    const data = {question_id: question_id, choice: choice}
    const response = await authorizedAxios("post", '/api/lesson/' + lesson_id + '/answer/', data);
    let answers = this.props.answers;
    answers[this.props.answers.length] = response.data.answer;
    this.props.handleChange("answers", answers)
}

class AnswerQuestions extends Component {
    constructor(props) {
        super(props);
        createAnswer = createAnswer.bind(this);
        createLesson = createLesson.bind(this);
    }

    render() { 
        const findQuestionList = id => this.props.questionLists.find(questionList => questionList.id == id);
        const questionList = findQuestionList(this.props.questionList_id);
        const findQuestions = id => this.props.questions.filter(question => question.question_list_id == id);  
        const questions = findQuestions(this.props.questionList_id);
        const findLesson = (user_id, questionList_id) => 
        this.props.lessons.find(
            lesson => lesson.user_id == user_id && lesson.question_list_id == questionList_id 
        );
        const lesson = findLesson(this.props.user.id, this.props.questionList_id);

        if(questions[0] != undefined){
            return ( 
                <div className="container card-container my-5 p-5 w-50">
                    <CurrentQuestion 
                        questionList={questionList}
                        question={questions[0]}
                        questions_number={questions.length}
                        options={this.props.options}
                        lesson={lesson}
                        createAnswer={createAnswer}
                    />
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}
 
export default AnswerQuestions;