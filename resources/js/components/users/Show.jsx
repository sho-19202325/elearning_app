import React, { Component } from 'react';
import History from './../History';
import ShowProfile from './ShowProfile';

class Show extends Component {
    render() {  
        const findUser = id => this.props.users.find(user => user.id == id);        
        const showUser = findUser(this.props.user_id);

        return ( 
            <div className={"container my-5 home-container"}>
                <div className="row">
                    <div className="col-md-6">
                        <ShowProfile user={showUser} />
                    </div>
                    <div className="col-md-6">
                        <div className={"card-container mx-auto text-center rounded shadow-lg"}>         
                            <h3 className={"my-3"}>You are not following this user!</h3>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Show;