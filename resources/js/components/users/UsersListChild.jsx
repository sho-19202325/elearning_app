import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class UsersListChild extends Component {
    render() { 
        return ( 
            <div className="card-container py-4 pl-3 rounded shadow-lg container">               
                <div className="row">
                    <div className="col-md-2">
                        <Avatar alt="avatar" src={"images/" + this.props.user.avatar} className="mlauto" style={{height: 50, width: 50}} />                        
                    </div>
                    <div className="col-md-8 py-1">
                        <Link to={"/user/" + this.props.user.id}>
                            <h3>{this.props.user.name}</h3>
                        </Link>
                    </div>
                    <div className="col-md-2">
                        <Button color="primary" variant="contained" >follow</Button>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default UsersListChild;