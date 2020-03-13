import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import Header from './Header';
import Welcome from './Welcomepage';
import './../../sass/welcome.scss';
import Home from './Home';
import Questions from './Questions';
import axios from 'axios';
import IndexAdminQuestionLists from './adminQuestionLists/IndexAdminQuestionLists';
import IndexUsers from './users/IndexUsers';

function RenderHome() {
    if (localStorage.getItem('token') == ''){
        return <Welcome />;
    } else {
        return <Home user={this.state.user}/>;
    }
}



 class Index extends Component {
    constructor(props) {
        super(props)
        RenderHome = RenderHome.bind(this);
        this.state = {
            user: {},
            questionLists: [],
        }
    }

    componentDidMount() {
        // get user data from laravel api and set it to state
        if(localStorage.getItem('token')){
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

            axios.get('api/questionLists', {
                headers: {
                    'Accept' : 'application/json',
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            })
            .then(response => {
                console.log(response.data.questionLists);
                let questionLists = response.data.questionLists;
                questionLists = questionLists.sort(function(a, b) {
                   return (a.id > b.id) ? -1 : 1;
               });   
                this.setState({ questionLists: questionLists });           
            })
            .catch(error => {
                console.log(error);
            })            
        }
    }



    render() {
        
        return (
            <div className={ "h-100" }> 
              <Router>
                <header>
                  <Header user={this.state.user} />
                </header>
                <div className={"main-container"}>
                    <div className={"container-fluid h-100"}>
                        <Switch>  
                            <Route path="/signup">
                                <Signup />
                            </Route>   
                            <Route path="/login">
                                <Login />
                            </Route>   
                            <Route path="/questions">
                                <Questions />
                            </Route>          
                            <Route path="/adminList">
                                <IndexAdminQuestionLists questionLists={this.state.questionLists} />
                            </Route>                  
                            <Route path="/users">
                                <IndexUsers />
                            </Route>                  
                            <Route path="/">
                                <RenderHome />
                            </Route>     
                        </Switch>
                    </div>
                </div>
              </Router> 
            </div>
        );
    }
}

export default Index;

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
