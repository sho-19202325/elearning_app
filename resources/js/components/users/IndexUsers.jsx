import React, { Component } from 'react';
import Axios from 'axios';
import UsersListChild from './UsersListChild';

function RenderUsersList() {
    let usersList = [];
    if(this.state.users[0] !== undefined) {
        for(let i=0;i<this.state.users.length;i++){
            usersList.push(
                <li key={i}><UsersListChild user={this.state.users[i]} /></li>                
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
                        <RenderUsersList />
                    </ul> 
                </div>
            </div>
         );
    }
}
 
export default IndexUsers;