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
import { authorizedAxios } from './../modules/Rest';
import AnswerQuestions from './questionLists/AnswerQuestions';

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
            <IndexQuestionLists 
                handleChange={this.handleChange}
                user={this.state.user}
                questionLists={this.state.questionLists}
                questions={this.state.questions} 
                lessons={this.state.lessons}
                answers={this.state.answers}
            />
        </Route>          
        <Route path="/adminList">
            <IndexAdminQuestionLists questionLists={this.state.questionLists} />
        </Route>                  
        <Route path="/users">
            <IndexUsers users={this.state.users} />
        </Route>           
        <Route path="/user/:id" render={({ match })=> <Show users={this.state.users } user_id={match.params.id}/>} />         
        <Route path="/admin/questionList/:id/questions" render={({ match }) => 
            <AdminShowQuestionList 
                questionLists={this.state.questionLists} 
                questionList_id={match.params.id} 
                questions={this.state.questions} 
                options={this.state.options}
                />} />    
        <Route path="/lesson/:lesson_id/questionList/:questionList_id" render={({ match }) =>
            <AnswerQuestions 
                user={this.state.user}
                questionLists={this.state.questionLists}
                questionList_id={match.params.questionList_id}
                questions={this.state.questions}
                options={this.state.options}
                lessons={this.state.lessons}
                lesson_id={match.params.lesson_id}
                answers={this.state.answers}
                handleChange={this.handleChange}
                />  } />
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
        this.setInformation = this.setInformation.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            user: null,
            users: null,
            questionLists: [],
            questions: [],
            options: [],
            lessons: [],
            answers: [],
        }
    }

    

    componentDidMount() {
        if(localStorage.getItem('token')){
            this.setInformation();       
        }
    }    

    async setInformation() {
            let response = await authorizedAxios("get", '/api/user/');
            this.setState({ user: response.data});

            response = await authorizedAxios("get", '/api/questionLists');
            this.setState({ questionLists: response.data.questionLists});

            response = await authorizedAxios("get", '/api/users/');
            this.setState({ users: response.data.users });

            response = await authorizedAxios("get", '/api/questionList/questions');
            this.setState({ questions: response.data.questions }); 

            response = await authorizedAxios("get", '/api/options' );
            this.setState({ options: response.data.options });  

            response = await authorizedAxios("get", '/api/lessons');
            this.setState({ lessons: response.data.lessons });

            response = await authorizedAxios("get", '/api/answers');
            this.setState({ answers: response.data.answers });
    }

    handleChange(name, value) {
        this.setState({[name]: value});
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
