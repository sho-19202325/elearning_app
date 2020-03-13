import React, { Component } from 'react'

import { Button, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Welcomebg from './../../images/elearning.png'; 

class Welcome extends Component {
    
    render() { 
        return ( 
            <div className={"row h-100"}>
                <Image src={Welcomebg} className={"h-100 col-md-12 p-0"}/>
                <Link to="/signup">
                    <Button variant="danger" className={"welcome-btn"}>
                        新規登録
                    </Button>
                </Link>                   
                <Link to="/login">
                    <Button variant="primary" className={"welcome-btn"}>
                        ログイン
                    </Button>
                </Link>
            </div>                
         );
    }
}
 
export default Welcome;