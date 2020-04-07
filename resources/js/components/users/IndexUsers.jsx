import React, { Component } from 'react';
import UsersListChild from './UsersListChild';

function RenderUsersList(props) {
    let usersList = [];
    if(props.users[0] !== undefined) {
        for(let i=0;i<props.users.length;i++){
            usersList.push(
                <li key={i}>
                    <UsersListChild 
                        authUser={props.authUser}
                        user={props.users[i]}
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

class IndexUsers extends Component {
    constructor(props) {
        super(props)
        RenderUsersList = RenderUsersList.bind(this);
    }

    render() { 
        return ( 
            <div className="container my-5">
                <div className="row">
                    <ul className="col-md-8 mx-auto">
                        <RenderUsersList 
                            authUser={this.props.authUser}
                            users={this.props.users}
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
 
export default IndexUsers;