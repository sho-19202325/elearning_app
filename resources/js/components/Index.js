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
import IndexQuestionLists from './questionLists/IndexQuestionLists';
import axios from 'axios';
import IndexAdminQuestionLists from './adminQuestionLists/IndexAdminQuestionLists';
import IndexUsers from './users/IndexUsers';
import Show from './users/Show';
import AdminShowQuestionList from './adminQuestionLists/AdminShowQuestionList';

function UnLoggedInUserPage() {
    return (
        <Switch>  
            <Route path="/signup">
                <Signup />
            </Route>   
            <Route path="/login">
                <Login />
            </Route>  
            <Route path="/">
                <Welcome />
            </Route>
        </Switch>
    )
}

function LoggedInUserPage() {
    return (
    <Switch>
        <Route path="/questions">
            <IndexQuestionLists questions={this.state.questionLists} />
        </Route>          
        <Route path="/adminList">
            <IndexAdminQuestionLists questionLists={this.state.questionLists} />
        </Route>                  
        <Route path="/users">
            <IndexUsers users={this.state.users} />
        </Route>           
        <Route path="/user/:id" render={({ match })=> <Show users={this.state.users } user_id={match.params.id}/>} />         
        <Route path="/questionList/:id/questions" render={({ match }) => <AdminShowQuestionList quetsionLists={this.state.questionLists} questionList_id={match.params.id} />} />              
        <Route exact path="/">
            <Home user={this.state.user} />;
        </Route>     
    </Switch>        
)}

function RenderMainPage() {
    if(localStorage.getItem('token') == "") {
        return <UnLoggedInUserPage />;
    } else if (this.state.user != null && this.state.users != null) {
        return <LoggedInUserPage />;
    } else {
        return <div></div>;
    }
}



 class Index extends Component {
    constructor(props) {
        super(props)
        RenderMainPage = RenderMainPage.bind(this);
        LoggedInUserPage = LoggedInUserPage.bind(this);
        this.state = {
            user: null,
            users: null,
            questionLists: [],
        }
    }

    componentDidMount() {
        // get user data from laravel api and set it to state
        if(localStorage.getItem('token')){
            axios.get('/api/user', {
                headers: {
                    'Accept' : 'application/json',
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            })
            .then(response => {
                console.log("response: ", response.data);
                this.setState({user: response.data});
            })
            .catch(error => {
                console.log(error);
            }) 

            axios.get('/api/questionLists', {
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
            
            axios.get('/api/users', {
                headers: {
                    'Accept' : 'application/json',
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            })
            .then(response => {
                console.log(response);
                this.setState({ users: response.data.users }); 
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
                            <RenderMainPage />
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
