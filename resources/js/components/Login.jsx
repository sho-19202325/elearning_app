import React, { Component } from 'react'
import { TextField } from '@material-ui/core';
import { Container, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import useHistory from 'react-router-dom';
import { Redirect } from 'react-router-dom';


var token = localStorage.getItem('token');

class Login extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: '',
            password: '',
            isLoggedIn: false,
        }
    }

    onChangeEmail(e) {
        this.setState({email: e.target.value});
    }

    onChangePassword(e) {
        this.setState({password: e.target.value});
    }

    handleSubmit(e) {  
        e.preventDefault();        
        this.login(this.state.email, this.state.password);
        this.setState({email: '', password: ''});
    }

    checktoken() {
        console.log(localStorage.getItem('token') == '');
    }

    login(email, password) {
        axios.post('/api/login', {email: email, password: password},
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

    render() { 
        return ( 
            <Container className={'w-50 p-5 my-3 bg-light border rounded shadow-lg'}>
                <h1 className={"text-center"}>ログイン</h1>
                <form action="/" onSubmit={e => this.handleSubmit(e)}>
                    <Row>
                        <TextField required label="メールアドレス" type="email" className={"mx-auto my-3 col-md-7"} onChange={e => this.onChangeEmail(e)} value={ this.state.email } />    
                    </Row>
                    <Row>
                        <TextField required label="パスワード" type="password" className={"mx-auto my-3 col-md-7"} onChange={e => this.onChangePassword(e)} value={ this.state.password } />    
                    </Row>  
                    <Row>
                        <Button type="submit" variant="primary" className="mx-auto mt-3">ログイン</Button>        
                    </Row>            
                </form>

            </Container>
         );
    }
}
 
export default Login;   