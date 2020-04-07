import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import FollowButton from './FollowButton';

function UserShowLink(props) {
    if(props.authUser.id == props.user.id) {
        return (
            <Link to="/">
                <h3>{props.user.name}</h3>
            </Link>
        ) 
    } else {
        return (
            <Link to={"/user/" + props.user.id}>
                <h3>{props.user.name}</h3>
            </Link>            
        )
    }
}

class UsersListChild extends Component {
    render() { 
        if (this.props.user != undefined) {
            return ( 
                <div className="card-container py-4 pl-3 rounded shadow-lg container">               
                    <div className="row">
                        <div className="col-md-2">
                            <Avatar alt="avatar" src={"images/" + this.props.user.avatar} className="ml-auto" style={{height: 50, width: 50}} />                        
                        </div>
                        <div className="col-md-6 py-1">
                        <UserShowLink 
                            authUser={this.props.authUser}
                            user={this.props.user}
                        /> 
                        </div>
                        <div className="col-md-3 ml-auto my-auto text-right">
                            <FollowButton 
                                authUser={this.props.authUser}
                                user={this.props.user}
                                isFollow={this.props.isFollow}
                                follow={this.props.follow}
                                unfollow={this.props.unfollow}
                            />
                        </div>
                    </div>
                </div>
         );
        } else {
            return <div></div>;
        }
    }
}
 
export default UsersListChild;