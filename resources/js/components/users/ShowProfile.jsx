import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import FollowButton from './FollowButton';
import { Link } from 'react-router-dom';

class ShowProfile extends Component {
    render() { 
        let passiveRelationships = this.props.relationships.filter(relationship =>
            relationship.followed_id == this.props.user.id    
        )        
        let activeRelationships = this.props.relationships.filter(relationship =>
            relationship.follower_id == this.props.user.id    
        )

        return (
            <div className="container">
                <div className={"card-container rounded shadow-lg col-md-8 mb-3"}>                                    
                    <img src={"/images/" + this.props.user.avatar} alt="avatar image" className={"profile-image mx-auto my-3"}/>
                    <h3 className="text-center">{ this.props.user.name }</h3>
                    <div className="text-center">
                        <FollowButton 
                            authUser={this.props.authUser}
                            user={this.props.user}
                            isFollow={this.props.isFollow}
                            follow={this.props.follow}
                            unfollow={this.props.unfollow}
                        />                        
                    </div>
                    <div className={"user-relationships p-2 text-center"}>
                    <div className="row">
                        <div className={"col-md-6 px-auto py-5"}>
                            <Link to={"/user/" + this.props.user.id + "/followers"}>
                                {passiveRelationships.length} follower                                
                            </Link>
                        </div>
                        <div className={"col-md-6 px-auto py-5"}>
                            <Link to={"/user/" + this.props.user.id + "/followingUsers"}>
                                {activeRelationships.length} following                                
                            </Link>
                        </div>
                    </div>
                    </div>
                </div>
            </div> 
         );
    }
}
 
export default ShowProfile;