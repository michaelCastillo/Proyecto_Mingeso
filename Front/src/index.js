import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import UserProfile from './users/UserProfile';


import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import HeaderUp from './header/HeaderUp';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Code from './code/AddCode';
import Home from './home/Home';

import Register from './register/register';

import Redirect from './home/redirect';

import ProblemProfile from './problems/ProblemProfile';

import UserRoutes from './users/UserRoutes';
import ProblemRoutes from './problems/ProblemRoutes';
import Login from './login/login';
import Teachers from './teachers/teachers';
import Students from './students/students';
import { AUTHENTICATED , UNAUTHENTICATED } from './actions/actionSign';
import requireAuth from './hoc/requireAuth';
import noRequireAuth from './hoc/noRequireAuth';
import Authorization from './hoc/roleRequire';

import Signout from './login/signOut';
import Chart from './estadisticas/charts';






const perm = Authorization(['coordination', 'su']);
const perm1 = Authorization(['teacher', 'coordination', 'su']);
const perm2 = Authorization(['student', 'su']);
const su = Authorization([ 'su']);


//<Route path="/alumnos" component ={perm1(Students)}/>


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const user = localStorage.getItem('user');

if(user ) {
  store.dispatch({ type: AUTHENTICATED });
}





ReactDOM.render(

    <Provider store={store}>    
       <Router>
                <div>
                <HeaderUp/>
                <Route path="/problems" render={ props =>  
                    <ProblemRoutes {...props}/>
                } />
                <Route path="/users" render={props =>  
                    <UserRoutes {...props}/>
                } />
                <Route path="/code/:id" component={perm2(Code)}/>
                <Route path="/home" component ={noRequireAuth(Home)}/>
                <Route path="/login" component ={noRequireAuth(Login)}/>
                <Route path="/users/:id" component={perm1(UserProfile)}/>
                <Route path="/signout" component ={requireAuth(Signout)}/>  
                <Route path="/register" component ={Register}/>
                <Route path="/problemsProfile/:id" component={ProblemProfile}/>
                <Route path="/alumnos" component ={perm1(Students)}/>  

                <Route path="/Profesores" component ={perm(Teachers)}/>
                <Route path="/redirect" component ={requireAuth(Redirect)}/>
                <Route path="/dashboard" component ={requireAuth(Chart)}/>


                </div>
            </Router>
    </Provider>,   
  document.querySelector('#root')        
    
);
registerServiceWorker();
