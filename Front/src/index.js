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


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(

    <Provider store={store}>    
       <Router>
                <div>
                <HeaderUp/>
                <Route path="/problems" render={props =>  
                    <ProblemRoutes {...props}/>
                } />
                <Route path="/code/:id" component={Code}/>
                <Route path="/createProblem" component /> 
                <Route path="/home" component ={Home}/>
                <Route path="/login" component ={Login}/>
        
                <Route path="/Profesores" component ={Teachers}/>
                <Route path="/alumnos" component ={Students}/>

                </div>
            </Router>
    </Provider>,   
  document.querySelector('#root')        
    
);
registerServiceWorker();
