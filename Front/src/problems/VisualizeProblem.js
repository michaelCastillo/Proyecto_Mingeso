
import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row, Col, Label, ListGroup, ListGroupItem } from 'react-bootstrap';
import ReactLoading from "react-loading";


class VisualizeProblem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editState: false,
            name: '',
            statement: '',
            language: '',
            solutions: [],
            ready:false
        };
      
        this.showSolutions = this.showSolutions.bind(this);

    }
    componentDidMount() {
        let id_user = this.props.id;
        //Por ahora es la id 6, cuando este el login bien se cambia por aquel que
        //esté logueado.
        let global_url = `http://35.226.163.50:8080/Backend`;
        let problem = axios.get(global_url + `/problems/get/` + id_user)
            .then(res => {
                const problem = res.data;
                this.setState({
                    name: problem.name,
                    statement: problem.statement,
                    language: problem.language,
                    solutions: problem.solutions,
                    ready:true
                });
                console.log(problem);
            }).catch(error => {
                console.log(error.response);
            });
    }
    showSolutions(){
        let items = [];
        if(this.state.solutions.length>0){
            items.push(<Label bsStyle="info">Datos Intentos Soluciones</Label>);
            this.state.solutions.map((careersAux) => {
                items.push(<ListGroupItem bsStyle="info"> Correctos: {careersAux.successes} Fallidos: {careersAux.fails} </ListGroupItem>);
            });
        }
        
        return items;
    }


    render() {

        if(this.state.ready === false){
            return(  
              <div>
                  <Col md={12} xs={12} smOffset={4}>
                <ReactLoading type={"spin"} color={"#428cf3"} height={500} width={300} />
                </Col>
              </div>
            )    

          }
        return (
            <Grid>
                <Row>
                    <div class="container">
                        <div class="row">
                            <Col md={6} sm={6}>
                                <h3>
                                    <Label bsStyle="info">Título</Label> </h3>
                                <br />
                                <h4>
                                    {this.state.name}</h4>
                                <br />
                                <p>
                                    <h3>
                                        <Label bsStyle="info">Enunciado</Label></h3>
                                    <br />
                                    <h4>
                                        {this.state.statement}
                                    </h4>
                                    
                                    <h3>
                                        <Label bsStyle="info">Lenguaje</Label></h3>
                                    <br />
                                    <h4>
                                        {this.state.language}</h4>
                                    <br />

                                </p>

                            </Col>
                            <Col md={3} sm={6}>
                                
                                
                           
                                <br />
                                <h4>
                                    <ListGroup>
                                        {this.showSolutions()}
                                    </ListGroup>
                                </h4>
                               
                             </Col>

                        </div>
                    </div>
                </Row>

            </Grid>
        );
    }




}
export default VisualizeProblem;                