import React, { Component } from 'react'
import Switch from '@material-ui/core/Switch';
import EditIcon from '@material-ui/icons/Edit';
import FlipCameraIosIcon from '@material-ui/icons/FlipCameraIos';
import UserEdit from './users/UserEdit';

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
            name: this.props.user.name,
            email: this.props.user.email,
            avatar: this.props.user.avatar,
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

    updateUser(name, email) {
        axios.patch('/api/update', {name: name, email: email}, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(response => {
            console.log(response)
            this.setState({name: response.data.user.name, email: response.data.user.email})
            })
        .catch(error => {
            console.log(response)
            })
    }

    sendFile(e) {   
        e.preventDefault();
        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);
        axios.post('/api/changeAvatar', formData, {
            headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(response => {
            this.handleAvatar(response.data.user.avatar);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() { 
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
                        <div className={"col-md-6 px-auto py-5"}>0 follower</div>
                        <div className={"col-md-6 px-auto py-5"}>0 following</div>
                    </div>
                </div>
                </div>
            </div>
         );
    }
}
 
export default UserProfile;