import React, { Component } from 'react';
import History from './../History';
import ShowProfile from './ShowProfile';
import ActivityList from './ActivityList';

function RenderActivity(props) {
    if(props.isFollow(props.authUser.id, props.user.id)) {
        return <ActivityList />;
    } else {
        return <h3 className={"my-3"}>You are not following this user!</h3>;
    }
}

class Show extends Component {
    render() {  
        const findUser = id => this.props.users.find(user => user.id == id);        
        const showUser = findUser(this.props.user_id);

        return ( 
            <div className={"container my-5 home-container"}>
                <div className="row">
                    <div className="col-md-6">
                        <ShowProfile 
                            authUser={this.props.authUser}
                            user={showUser}
                            relationships={this.props.relationships}
                            isFollow={this.props.isFollow}
                            follow={this.props.follow}
                            unfollow={this.props.unfollow}
                         />
                    </div>
                    <div className="col-md-6">
                        <div className={"card-container mx-auto text-center rounded shadow-lg"}>         
                            <RenderActivity
                                authUser={this.props.authUser}
                                user={showUser}
                                isFollow={this.props.isFollow}
                            />
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Show;