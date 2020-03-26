import React, { Component } from 'react'
import ActivityListChild from './ActivityListChild';

class ActivityList extends Component {

    render() {
        if(this.props.activities != undefined) {
            if(this.props.activities.length == 0) {
                return (
                    <div className={"card-container mx-auto text-center rounded shadow-lg"}>         
                        <h3 className={"my-3"}>Activities</h3>
                        <p>There is no actitivities yet</p>
                    </div>                  
                )
            }
            
            const ActivityListChildren = this.props.activities.map((activity, index) =>
                <ActivityListChild 
                    key={index}
                    activity={activity} 
                    authUser={this.props.authUser}
                    lessons={this.props.lessons}
                    questionLists={this.props.questionLists}
                    relationships={this.props.relationships}
                    users={this.props.users} 
                />
            );        

            return ( 
                <div className={"card-container mx-auto text-center rounded shadow-lg"}>         
                    <h3 className={"my-3"}>Activities</h3>
                    {ActivityListChildren}
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}
 
export default ActivityList;