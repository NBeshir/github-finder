
import React,{Fragment} from 'react';

import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

const App=()=>{

 

    return (
      <GithubState>
        <AlertState>
      <Router>
          <Fragment className="App">
          <Navbar title="Github Finder"  icon="fab fa-github"/>
           
            <div className="container">
                <Alert />
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        

                        
                        <Route exact path='/user/:login' component={User}/>
                        <Route exact path='/about'  component={About}/>
                        
                      <Route component={NotFound}/>
                      </Switch>
                        
                      
                  
            </div>
          
          
          </Fragment>
      </Router>
      </AlertState>
      </GithubState>
    );
  }
  


export default App;
