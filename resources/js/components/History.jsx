import React, { Component } from 'react'
import HistoryChild from './HistoryChild';

class History extends Component {

    render() {
        const historyChildren = this.props.history.map((history, index) =>
            <HistoryChild history={history} key={index}/>
        );        

        return ( 
            <div className={"user-feed-container mx-auto text-center rounded shadow-lg"}>         
                <h3 className={"my-3"}>Recently History</h3>
                {historyChildren}
            </div>
         );
    }
}
 
export default History;