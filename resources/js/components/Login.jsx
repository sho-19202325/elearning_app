import React, { Component } from 'react'
import { TextField } from '@material-ui/core';
import { Container, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class Login extends Component {
    render() { 
        return ( 
            <Container className={'w-50 p-5'}>
                <h1 className={"text-center"}>ログイン</h1>
                <form action="#">
                    <Row>
                        <TextField required id="standard-required" label="メールアドレス" type="email" className={"mx-auto my-3 col-md-7"}/>    
                    </Row>
                    <Row>
                        <TextField required id="standard-password" label="パスワード" type="password" className={"mx-auto my-3 col-md-7"}/>    
                    </Row>  
                    <Row>
                        <Button variant="primary" className="mx-auto mt-3">ログイン</Button>    
                    </Row>            
                </form>

            </Container>
         );
    }
}
 
export default Login;