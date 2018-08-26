import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Code from '../code/AddCode';
import UserProfile from '../users/UserProfile';
import Home from '../home/Home';
import ProblemRoutes from '../problems/ProblemRoutes';
import UserRoutes from '../users/UserRoutes';
import Login from '../login/login'
import Register from '../register/register'
import ProblemProfile from '../problems/ProblemProfile';


class Routes extends Component{


    render(){

        const extraProps = {color:'red'}    
        return(


            /* Se posicionan todas la rutas que tenga la web */ 
            <Router>
                <div>
                <Route path="/problems" render={props =>  
                    <ProblemRoutes {...props}/>
                } />

                <Route path="/users" render={props =>  
                    <UserRoutes {...props}/>
                } />
                <Route path="/code/:id" component={Code}/>
                <Route path="/users/:id" component={UserProfile}/>
                <Route path="/problemsProfile/:id" component={ProblemProfile}/>
                <Route path="/createProblem" component /> 
                <Route path="/home" component ={Home}/>
                <Route path="/login" component ={Login}/>
                <Route path="/register" component ={Register}/>

                </div>
            </Router>
            
        );

    }


}
export default Routes;