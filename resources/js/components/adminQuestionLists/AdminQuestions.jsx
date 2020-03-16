import React, { Component } from 'react'

class AdminQuestion extends Component {
    render() { 
        return ( 
            <div className="card-container m-1 p-2 rounded shadow-lg text-center">
                <h3>{this.props.question.statement}</h3>
                <p>{this.props.quetsion.answer}</p>
            </div>   
         );
    }
}
 
export default AdminQuestion;