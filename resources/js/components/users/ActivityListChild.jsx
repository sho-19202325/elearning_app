import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class ActivityListChild extends Component {
    render() {       
        if(this.props.activity.activitable_type == 'App\\Lesson') {
            const lesson = this.props.lessons.find(lesson =>
                lesson.id == this.props.activity.activitable_id    
            );
            const questionList = this.props.questionLists.find(questionList =>
                 questionList.id == lesson.question_list_id
            );
            return (
                <Link to={"/lesson/" + lesson.id + "/questionList/" + lesson.question_list_id}>  
                    <p className="py-4 mx-4 bg-light text-success border border-secondary rounded">
                        Learned {questionList.title}.<br/>
                        <small className="text-muted">({moment(this.props.activity.created_at).fromNow()})</small>
                    </p>
                </Link>
            )
        } else {
            const relationship = this.props.relationships.find(relationship =>
                relationship.id == this.props.activity.activitable_id
            );


            if(relationship != undefined){
                const follower = this.props.authUser.id == relationship.follower_id
                ? this.props.authUser : this.props.users.find(user => user.id == relationship.follower_id );
                return (
                    <Link to={this.props.authUser.id == follower.id ? "/" : "/user/" + follower.id}>
                        <p className="py-4 mx-4 bg-light text-primary border border-secondary rounded">
                            {follower.name} followed.<br/>
                            <small className="text-muted">({moment(this.props.activity.created_at).fromNow()})</small>                
                        </p>  
                    </Link>
                );
            } else {
                    return <div></div>;
            }
        }
    }
}
 
export default ActivityListChild;