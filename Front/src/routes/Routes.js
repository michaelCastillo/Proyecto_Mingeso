import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Code from '../code/AddCode';
import Home from '../home/Home';
import ProblemRoutes from '../problems/ProblemRoutes';
import Login from '../login/login';
import Teachers from '../teachers/teachers';
import Students from '../students/students';

class Routes extends Component{


    render(){

        return(


            /* Se posicionan todas la rutas que tenga la web 
            <Route path="/Profesores/:id" component={}/>
            
            <Route path="/login" component ={Login}/>
            */ 
            <Router>
                <div>
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
            
        );

    }


}
export default Routes;