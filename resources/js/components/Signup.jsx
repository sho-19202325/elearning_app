import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { Container, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);        
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        } 
    }

    onChangename(e) {
        this.setState({name: e.target.value})
    }

    onChangeEmail(e) {
        this.setState({email: e.target.value})
    }
    
    onChangepassword(e) {
        this.setState({password: e.target.value})
    }

    onChangepassword_confirmation(e) {
        this.setState({password_confirmation: e.target.value})
    }

    registerUser (name, email, password, password_confirmation) {
        axios.post('/api/user',  {name: name, email: email, password: password, password_confirmation: password_confirmation},
        { 
            headers: {
            'Content-Type': 'application/json',
            }
        })
            .then(response => {
            console.log(response);
            localStorage.setItem('token', response.data.token);
            window.location.replace("/");
        })
            .catch(error => {
            console.log(error);
        })
    }

    handleSubmit(e) {
        e.preventDefault(); 
        this.registerUser(this.state.name, this.state.email, this.state.password, this.state.password_confirmation)
        this.setState({name: '', email: '', password: '', password_confirmation: ''})
    }

    render() { 
        return ( 
            <Container className={'w-50 p-5 my-3 bg-light border rounded shadow-lg'}>
                <h1 className={"text-center"}>新規登録</h1>
                <form action="/" onSubmit={e => this.handleSubmit(e)}>
                    <Row>
                        <TextField required label="ユーザー名" className={"mx-auto my-3 col-md-7"} onChange={e => this.onChangename(e)}/>
                    </Row>
                    <Row>
                        <TextField required label="メールアドレス" type="email" className={"mx-auto my-3 col-md-7"} onChange={e => this.onChangeEmail(e)}/>    
                    </Row>
                    <Row>
                        <TextField required label="パスワード" id="password" type="password" className={"mx-auto my-3 col-md-7"}  onChange={e => this.onChangepassword(e)}/>    
                    </Row>
                    <Row>
                        <TextField  required label="パスワード確認" id="password_confirmation" type="password" className={"mx-auto my-3 col-md-7"} onChange={e => this.onChangepassword_confirmation(e)} /> 
                    </Row>        
                    <Row>
                        <Button type="submit" variant="danger" className="mx-auto mt-3">Sign Up!</Button>    
                    </Row>            
                </form>

            </Container>
         );
    }
}
 
export default Signup;