import React, { Component } from 'react'

class HistoryChild extends Component {
    render() { 
        return ( 
            <p>{this.props.history}</p>
         );
    }
}
 
export default HistoryChild;