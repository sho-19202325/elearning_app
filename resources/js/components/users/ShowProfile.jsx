import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class ShowProfile extends Component {
    render() { 
        return (
            <div className="container">
                <div className={"card-container rounded shadow-lg col-md-8 mb-3"}>                                    
                    <img src={"/images/" + this.props.user.avatar} alt="avatar image" className={"profile-image mx-auto my-3"}/>
                    <h3 className="text-center">{ this.props.user.name }</h3>
                    <Button variant="contained" color="primary" style={{display: "block"}} className="mx-auto">follow</Button>
                    <div className={"user-relationships p-2 text-center"}>
                        <div className="row">
                            <div className={"col-md-6 px-auto py-5"}>0 follower</div>
                            <div className={"col-md-6 px-auto py-5"}>0 following</div>
                        </div>
                    </div>
                </div>
            </div> 
         );
    }
}
 
export default ShowProfile;