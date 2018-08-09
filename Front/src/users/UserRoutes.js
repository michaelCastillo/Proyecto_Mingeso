
import React, { Component } from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import {Grid,Row} from 'react-bootstrap';
import ShowUsersList from './ShowUsersList';


class UserRoutes extends Component{

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
                            <Route path={`${this.props.match.path}/showList`} render={props =>  
                                <ShowUsersList {...props}/>
                            } />
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

export default UserRoutes;

