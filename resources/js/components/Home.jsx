import React, { Component } from 'react'
import axios from 'axios';
import './../../sass/user.scss';
import UserProfile from './UserProfile';
import ActivityList from './users/ActivityList';
import CountLessons from './users/CountLessons';

class Home extends Component {
    render() { 
        return ( 
            <div className={"container my-5 home-container"}>
                <div className="row">
                    <div className="col-md-6">
                        <UserProfile 
                            authUser={this.props.authUser}
                            relationships={this.props.relationships} 
                        />
                        <CountLessons 
                            lessons={this.props.lessons}
                        />
                    </div>
                    <div className="col-md-6">
                        <ActivityList
                            activities={this.props.activities} 
                            authUser={this.props.authUser}
                            lessons={this.props.lessons}
                            questionLists={this.props.questionLists}
                            relationships={this.props.relationships}
                            users={this.props.users}     
                        />
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Home;