import React, { Component } from 'react'
import axios from 'axios';
import './../../sass/user.scss';
import UserProfile from './UserProfile';
import History from './History';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            history: []
        }
    }

    componentDidMount() {
        // get user data from laravel api and set it to state
        axios.get('api/user', {
            headers: {
                'Accept' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(response => {
            console.log(response.data);
            this.setState({user: response.data});
        })
        .catch(error => {
            console.log(error);
        })

        // get history data from laravel api and set it to state but now it is still sample data
        var history_data = [];
        for(var i=1;i<=10;i++) {
            history_data.push(`lesson # ${i} was finished`);
        };        
        this.setState({ history: history_data});
        
    }

    render() { 
        return ( 
            <div className={"container my-5 home-container"}>
                <div className="row">
                    <div className="col-md-6">
                        <UserProfile user={this.state.user} />
                        <div className="container">
                            <div className={"card-container col-md-8 text-center"}>
                                <h3>learned</h3>
                                <div>13 words</div>
                            </div>                            
                        </div>
                    </div>
                    <div className="col-md-6">
                        <History history={this.state.history} />
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Home;