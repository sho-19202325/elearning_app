import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { Container, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        } 
    }

    onChangename(e, content) {
        this.setState({content: e.target.value})
    }

    onChangeemail(e) {
        this.setState({email: e.target.value})
    }

    onChangepassword(e) {
        this.setState({password: e.target.value})
    }

    onChangepassword_confirmation(e) {
        this.setState({password_confirmation: e.target.value})
    }

    registerUser = (name, email, password, password_confirmation) {
        axios.post('http://192.168.99.100:90/login',  {data: [name, email, password, password_confirmation]})
    }

    render() { 
        return ( 
            <Container className={'w-50 p-5'}>
                <h1 className={"text-center"}>新規登録</h1>
                <form action="#">
                    <Row>
                        <TextField required id="standard-required" label="ユーザー名" className={"mx-auto my-3 col-md-7"} onChange={e => this.onChangename(e)}/>
                    </Row>
                    <Row>
                        <TextField required id="standard-required" label="メールアドレス" type="email" className={"mx-auto my-3 col-md-7"} onChange={e => this.onChangeemail(e)}/>    
                    </Row>
                    <Row>
                        <TextField required id="standard-password" label="パスワード" type="password" className={"mx-auto my-3 col-md-7"}  onChange={e => this.onChangepassword(e)}/>    
                    </Row>
                    <Row>
                        <TextField required id="standard-password" label="パスワード確認" type="password" className={"mx-auto my-3 col-md-7"} onChange={e => this.onChangepassword_confirmation(e)} /> 
                    </Row>        
                    <Row>
                        <Button variant="danger" className="mx-auto mt-3" onClick>登録</Button>    
                    </Row>            
                </form>

            </Container>
         );
    }
}
 
export default Signup;