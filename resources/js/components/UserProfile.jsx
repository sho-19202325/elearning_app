import React, { Component } from 'react'
import Switch from '@material-ui/core/Switch';
import EditIcon from '@material-ui/icons/Edit';
import FlipCameraIosIcon from '@material-ui/icons/FlipCameraIos';
import UserEdit from './users/UserEdit';
import { authorizedAxios } from './../modules/Rest';
import { Link } from 'react-router-dom';

function ChangeAvatarButton() {
    const buttonStyle = {
        position: 'absolute',
        top: '35%',
        left: '42%',
        margin:0,
        padding:0,
        fontSize: 50,
    }
    
    if (this.state.isEditing) {
        return (
        <label style={ buttonStyle }>
            <FlipCameraIosIcon fontSize="inherit" />
            <input type="file" ref={this.fileInput} name="file" onChange={e => this.sendFile(e)} style={{display: 'none' }}/>                        
        </label> 
        )
    } else {
        return <div></div>;
    }
}

class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAvatar = this.handleAvatar.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.updateUser = this.updateUser.bind(this);   
        this.sendFile = this.sendFile.bind(this);
        ChangeAvatarButton = ChangeAvatarButton.bind(this);     
        this.state = {
            name: this.props.authUser.name,
            email: this.props.authUser.email,
            avatar: this.props.authUser.avatar,
            isEditing: false,
        }
    }

    handleSwitch(e) {
        if(this.state.isEditing) {
            this.handleSubmit(e);
        } else {
        }
        this.setState({isEditing: !this.state.isEditing});         
    }    

    handleChange(e) {      
        this.setState({[e.target.name]: e.target.value});
    }

    handleAvatar(avatar) {
        this.setState({avatar: avatar});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.updateUser(this.state.name, this.state.email);
    }

    async updateUser(name, email) {
        const data = { name: name, email: email }
        const response = await authorizedAxios("patch", '/api/update', data);
        this.setState({ name: response.data.user.name, email: response.data.user.email })
    }

    async sendFile(e) {   
        e.preventDefault();
        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);
        const response = await authorizedAxios("post", '/api/changeAvatar', formData);
        this.handleAvatar(response.data.user.avatar);
    }

    render() { 
        let passiveRelationships = this.props.relationships.filter(relationship =>
            relationship.followed_id == this.props.authUser.id    
        )        
        let activeRelationships = this.props.relationships.filter(relationship =>
            relationship.follower_id == this.props.authUser.id    
        )
        return ( 
            <div className="container">
                <div className={"card-container rounded shadow-lg col-md-8 mb-3"}>
                <div className="text-right">
                    <Switch color="secondary" onChange={e => this.handleSwitch(e)}/>
                    <EditIcon color="inherit" />
                </div>            
                <div style={{position: 'relative'}}> 
                    <ChangeAvatarButton />                             
                    <img src={"images/" + this.state.avatar} alt="avatar image" className={"profile-image mx-auto my-3"}/>
                </div>
                <UserEdit
                    id={this.state.id} 
                    name={this.state.name}
                    email={this.state.email}
                    isEditing={this.state.isEditing} 
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />                  
                <div className={"user-relationships p-2 text-center"}>
                    <div className="row">
                        <div className={"col-md-6 px-auto py-5"}>
                            <Link to={"/user/" + this.props.authUser.id + "/followers"}>
                                {passiveRelationships.length} follower                                
                            </Link>
                        </div>
                        <div className={"col-md-6 px-auto py-5"}>
                            <Link to={"/user/" + this.props.authUser.id + "/followingUsers"}>
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
 
export default UserProfile;