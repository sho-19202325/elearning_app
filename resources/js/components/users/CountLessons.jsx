import React, { Component } from 'react'

class CountLessons extends Component {
    render() { 
        return ( 
            <div className="container my-3">
                <div className={"card-container col-md-8 text-center"}>
                    <h3>learned</h3>
                    <div>{this.props.lessons.length} Lessons</div>
                </div>                            
            </div>
         );
    }
}
 
export default CountLessons;