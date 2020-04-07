import React, { Component } from 'react';
import UsersListChild from './UsersListChild';

function RenderAuthUser(props) {
    let relationship = props.relationships.find(relationship =>
        relationship.follower_id == props.authUser.id
    )
    if(relationship != undefined) {
    return ( 
        <li>
            <UsersListChild
                authUser={props.authUser}
                user={props.authUser}
                isFollow={props.isFollow} 
                follow={props.follow}
                unfollow={props.unfollow}
            />
        </li>
     );
    } else {
        return <li key={this.props.key}></li>;
    }
}

function RenderUsersList(props) {
    let usersList = [];
    if(props.users[0] !== undefined) {
        for(let i=0;i<props.relationships.length;i++){
            let follower = props.users.find(user =>
                user.id == props.relationships[i].follower_id    
            )
            usersList.push(
                <li key={i}>
                    <UsersListChild 
                        authUser={props.authUser}
                        user={follower}
                        isFollow={props.isFollow} 
                        follow={props.follow}
                        unfollow={props.unfollow}
                    />
                </li>                
            );
        }
    }

    return <div>{usersList}</div>;
}

class IndexFollowers extends Component {
    constructor(props) {
        super(props)
        RenderUsersList = RenderUsersList.bind(this);
        RenderAuthUser = RenderAuthUser.bind(this);
    }

    render() {  
        let relationships = this.props.relationships.filter(relationship =>
            relationship.followed_id == (this.props.authUser.id == this.props.user_id ? this.props.authUser.id : this.props.user_id)
        ); 

        return ( 
            <div className="container my-5">
                <div className="row">
                    <ul className="col-md-8 mx-auto">
                        <RenderAuthUser 
                            authUser={this.props.authUser}
                            relationships={relationships}
                            isFollow={this.props.isFollow} 
                            follow={this.props.follow}
                            unfollow={this.props.unfollow}
                        />
                        <RenderUsersList 
                            authUser={this.props.authUser}
                            users={this.props.users}
                            relationships={relationships}
                            isFollow={this.props.isFollow} 
                            follow={this.props.follow}
                            unfollow={this.props.unfollow}
                        />
                    </ul> 
                </div>
            </div>
        );
    }
}
 
export default IndexFollowers;