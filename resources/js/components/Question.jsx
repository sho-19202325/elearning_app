import React, { Component } from 'react'

class Question extends Component {
    render() { 
        return ( 
            <div className="card-container m-1 p-2 rounded shadow-lg text-center">
                <h3>{this.props.question.title}</h3>
                <p><span>[1 words]</span>{this.props.question.description}</p>
            </div>
         );
    }
}
 
export default Question;