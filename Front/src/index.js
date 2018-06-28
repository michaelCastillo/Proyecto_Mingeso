import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';


import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import HeaderUp from './header/HeaderUp';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Code from './code/AddCode';
import Home from './home/Home';
import ProblemRoutes from './problems/ProblemRoutes';
import Login from './login/login';
import Teachers from './teachers/teachers';
import Students from './students/students';
import { AUTHENTICATED , UNAUTHENTICATED } from './actions/actionSign';
import requireAuth from './hoc/requireAuth';
import noRequireAuth from './hoc/noRequireAuth';
import Authorization from './hoc/roleRequire';

import Signout from './login/signOut';

const perm = Authorization(['coordination', 'su']);
const perm1 = Authorization(['teacher', 'coordination', 'su']);
const perm2 = Authorization(['student', 'su']);




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
                <Route path="/code/:id" component={perm2(Code)}/>
                <Route path="/home" component ={noRequireAuth(Home)}/>
                <Route path="/login" component ={noRequireAuth(Login)}/>
                
                <Route path="/signout" component ={requireAuth(Signout)}/>  

                <Route path="/Profesores" component ={perm(Teachers)}/>
                <Route path="/alumnos" component ={perm1(Students)}/>

              



                </div>
            </Router>
    </Provider>,   
  document.querySelector('#root')        
    
);
registerServiceWorker();
