import React, { Component } from 'react'

class CountLessons extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="container">
            <div className={"lesson-count-container col-md-8 text-center"}>
                <h3>learned</h3>
                <div>13 words</div>
            </div>                            
        </div>
         );
    }
}
 
export default CountLessons;