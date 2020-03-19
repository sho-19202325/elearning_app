import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import NavBar from './NavBar';
import Welcome from './Welcomepage';
import './../../sass/welcome.scss';
import Home from './Home';
import Questions from './Questions';

function RenderHome() {
    if (localStorage.getItem('token') == ''){
        return <Welcome />;
    } else {
        return <Home />;
    }
}

 class Index extends Component {

    render() {
        return (
            <div className={ "h-100" }> 
              <Router>
                <header>
                  <NavBar />
                </header>
                <div className={"main-container"}>
                    <div className={"container-fluid h-100 no-padding"}>
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
