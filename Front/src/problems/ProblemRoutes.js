
import React, { Component } from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import { Grid,Row} from 'react-bootstrap';
import ShowProblems from './ShowProblems';
import CreateProblem from './CreateProblem';
import Authorization from '../hoc/roleRequire';
import requireAuth from '../hoc/requireAuth';
import ProblemProfile from '../problems/ProblemProfile';


const perm1 = Authorization(['teacher', 'coordination', 'su']);
const perm3 = Authorization(['teacher', 'su']);



// <Route path={`${this.props.match.path}/create`} render={props =>  
//<CreateProblem {...props}/>
//}/>

//<Route path={`${this.props.match.path}/show`} render={props =>  
 //   <ShowProblems {...props}/>
//} />

class ProblemRoutes extends Component{

    constructor(props){
        super(props);
        console.log(props);

        this.state ={
            
        }
    }


    render(props){
        console.log(props);
        return(
            <div>
                <Router>
                    <div>
                        <Grid >
                            <Row className = "grid-show" >
                            
                            <Route path="/problems/create" component ={perm3(CreateProblem)}/>



                            </Row >
                            <Row className = "grid-show" >

                            <Route path="/problems/show" component ={requireAuth(ShowProblems)}/>
                            <Route path="/problemsProfile/:id" component={perm1(ProblemProfile)}/>

                           
                            </Row >

                        </Grid >
                    </div>
                </Router>

            </div>
        );
    }
/*
 <Router>
                    
                    <Route exact path={`${this.props.match.path}/code/:id`} render = {props => <Code {...props}/>}/>

                </Router>

*/

}

export default ProblemRoutes;

