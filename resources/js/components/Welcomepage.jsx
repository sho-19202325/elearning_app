import React, { Component } from 'react'

import { Button, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Welcomebg from './../../images/elearning.png'; 

class Welcome extends Component {
    
    render() { 
        return ( 
            <div className={"row h-100"}>
                <Image src={Welcomebg} className={"h-100 col-md-12 no-padding"}/>
            </div>                
         );
    }
}
 
export default Welcome;