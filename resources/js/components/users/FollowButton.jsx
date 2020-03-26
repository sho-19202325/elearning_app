import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class FollowButton extends Component {
    render() { 
        if(this.props.authUser.id == this.props.user.id) {
            return <div></div>;
        } else {
            if(this.props.isFollow(this.props.authUser.id, this.props.user.id)) {
                return (
                    <Button 
                        color="secondary" 
                        variant="contained" 
                        onClick={() => this.props.unfollow(this.props.user.id)}
                    >
                        unfollow
                    </Button>
                    );
            } else {
                return (
                    <Button 
                        color="primary" 
                        variant="contained" 
                        onClick={() => this.props.follow(this.props.user.id)}
                    >
                        follow
                    </Button>); 
            }
        }
    }
}
 
export default FollowButton;