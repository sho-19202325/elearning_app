import React, { Component } from 'react'

class AdminQuestion extends Component {
    render() { 
        return ( 
            <tr className="card-container p-2 rounded shadow-lg text-center">
                <td>{this.props.question.statement}</td>
                <td>{this.props.question.answer}</td>
            </tr>   
         );
    }
}
 
export default AdminQuestion;