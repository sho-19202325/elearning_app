import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import { authorizedAxios } from './../../modules/Rest';

async function createLesson(questionList_id) {
    const response = await authorizedAxios("post", '/api/lesson/', {questionList_id: questionList_id});
    let lessons = this.props.lessons;
    lessons[lessons.length] = response.data.lesson;
    this.props.handleChange("lessons", lessons);
    this.props.history.push('/lesson/' + response.data.lesson.id + '/questionList/' + questionList_id);    
}

function LessonButton(props) {
    const questions = props.questions.filter(question =>
        question.question_list_id == props.questionList.id
    )

    if(props.lesson == undefined) {
        return <Button color="primary" variant="contained" onClick={(e) => this.handleSubmit(e, props.questionList.id)}>try this question</Button>;
    } else {
        const answers = props.answers.filter(answer =>
            answer.lesson_id == props.lesson.id
        );        
        
        if(answers[0] != undefined && questions[0] != undefined && answers.length == questions.length) {
            return (
                <Link to={"/lesson/" + props.lesson.id + "/questionList/" + props.questionList.id}>
                    <Button color="primary" variant="contained">show result</Button>
                </Link>
            )
        } else {
            return (
            <Link to={"/lesson/" + props.lesson.id + "/questionList/" + props.questionList.id}>
                <Button color="primary" variant="contained">continue to answer</Button>
            </Link>
            );   
        }
    }
}

class QuestionList extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        createLesson = createLesson.bind(this);
        LessonButton = LessonButton.bind(this);
    }

    handleSubmit(e, questionList_id) {
        e.preventDefault();
        createLesson(questionList_id);
    }

    render() { 
        const lesson = this.props.lessons.find(lesson => 
            lesson.user_id == this.props.user.id && lesson.question_list_id == this.props.questionList.id
        );

        return ( 
            <div className="card-container m-1 p-2 rounded shadow-lg text-center">
                <h3>{this.props.questionList.title}</h3>
                <p><span>[1 words]</span>{this.props.questionList.description}</p>
                <LessonButton 
                    lesson={lesson}
                    answers={this.props.answers}
                    questions={this.props.questions}
                    questionList={this.props.questionList}
                />
            </div>
         );
    }
}
 
export default withRouter(QuestionList);