import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import CurrentQuestion from './CurrentQuestion';
import { authorizedAxios } from './../../modules/Rest';
import ResultList from './ResultList';

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
        this.handleCurrentQuestionNumber = this.handleCurrentQuestionNumber.bind(this);
        this.state = {
            currentQuestionNumber: 1,
        }
    }

    handleCurrentQuestionNumber() {
        this.setState({ currentQuestionNumber: this.state.currentQuestionNumber + 1 });
    }

    render() { 
        const findQuestionList = id => this.props.questionLists.find(questionList => questionList.id == id);
        const questionList = findQuestionList(this.props.questionList_id);
        const findQuestions = id => this.props.questions.filter(question => question.question_list_id == id);  
        const questions = findQuestions(this.props.questionList_id);
        const findLesson = (user_id, questionList_id) => 
        this.props.lessons.find(
            lesson => lesson.id == this.props.lesson_id 
        );
        const lesson = findLesson(this.props.user.id, this.props.questionList_id);
        const answers = this.props.answers.filter(answer => answer.lesson_id == this.props.lesson_id);

        if(questions[0] != undefined && answers.length == questions.length){
           return (
           <ResultList
                questionList={questionList} 
                questions={questions}
                answers={answers}
                options={this.props.options}
           />
           )
        } else if (questions[answers.length] != undefined && lesson != undefined){
            console.log(questions)
            return ( 
                <div className="container card-container my-5 p-5 w-50">
                    <CurrentQuestion 
                        questionList={questionList}
                        question={questions[answers.length]}
                        questions_number={questions.length}
                        currentQuestionNumber={answers.length+1}
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