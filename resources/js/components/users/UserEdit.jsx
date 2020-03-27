import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';

class UserEdit extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.isEditing) {
            return (        
                <div>
                    <div className="row">
                        <TextField className="col-md-8 mx-auto" required label="name" name="name" onChange={e => this.props.handleChange(e)} value={this.props.name} autoFocus/>                        
                    </div>
                    <div className="row">
                    <TextField className="col-md-8 mx-auto" required type="email" name="email" label="email" onChange={e => this.props.handleChange(e)} value={this.props.email} />                        
                    </div>
                </div>
                );
        } else {
            return  <h3 className={"text-center"}>{this.props.name}</h3>;
        }
    }    
}
 
export default UserEdit;