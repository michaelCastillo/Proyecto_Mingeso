
import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row, FormControl, Col, Label } from 'react-bootstrap';
import ReactLoading from "react-loading";

class EditProblem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editState: true,
            name: '',
            statement: '',
            language: '',
            ready:false,
        };

        this.handleEditStatement = this.handleEditStatement.bind(this);
        this.handleEditName = this.handleEditName.bind(this);
        this.handleEditLenguage = this.handleEditLenguage.bind(this);
        
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
                    ready:true,
                });
                console.log(problem);
            }).catch(error => {
                console.log(error.response);
            });
        
    }
    updateProblem = (event) => {
        event.preventDefault();
        const problem = {
            id: this.props.id,
            name: this.state.name,
            statement: this.state.statement,
            language: this.state.language,
        };

        const url = 'http://35.226.163.50:8080/Backend/problems/update';
        axios.put(url, problem)
            .then(res => {
                let userResponse = res.data;
                alert("Usuario editado exitosamente!");
            }).catch(error => {
                alert("Error");
                console.log(error.response);
                console.log(error.request);
                console.log(error.message);
            });
    }

    handleEditName(event) {
        this.setState({ name: event.target.value });
    }
    handleEditStatement(event) {
        this.setState({ statement: event.target.value });

    }
    handleEditLenguage(event) {
        this.setState({ language: event.target.value });
    }


    

    render() 
    {
        if(!this.state.ready)
        {
            return(
                <ReactLoading type={"spin"} color={"#000"} height={667} width={375} />
            );
        }
        else
        {
            return (
                <Grid>
                    <div class="container">
                        <Row>
                            <Col md={3} sm={6}>
                                <h3>
                                    <Label bsStyle="danger">Título</Label> </h3>
                                <br />
                                <h4>
                                    <FormControl
                                        autoFocus
                                        type="text"
                                        value={this.state.name}
                                        onChange={this.handleEditName}
                                    /></h4>
                                <br />
                                <br />
                                <p>
                                    <h3>
                                        <Label bsStyle="danger">Enunciado</Label></h3>
                                    <br />
                                    <h4>
                                        <FormControl
                                            autoFocus
                                            type="text"
                                            value={this.state.statement}
                                            onChange={this.handleEditStatement}

                                        />
                                    </h4>
                                    <br />
                                    <br />
                                    <h3>
                                        <Label bsStyle="danger">Lenguaje</Label></h3>
                                    <br />
                                    <h4>
                                        <FormControl
                                            autoFocus
                                            type="text"
                                            value={this.state.language}
                                            onChange={this.handleEditLenguage}

                                        /></h4>
                                    <br />
                                </p>
                            </Col>

                        
                        </Row>
                        

                    </div>

                </Grid>
            );
        }
    }




}





export default EditProblem;                