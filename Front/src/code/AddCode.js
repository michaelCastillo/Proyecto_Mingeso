


import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import { Grid, Row, Col, Label } from 'react-bootstrap';



class Code extends Component{

    constructor(props){
        super(props);

        this.state = {
            
            code: "",
            o_inputs:[1],
            o_outputs:["hola"],
            language:"python",
            stdout: "",
            error: "",
            stderr:"",




        }

        this.handleCode = this.handleCode.bind(this);
        this.toCode = this.toCode.bind(this);
        
        
    };
            componentDidMount(){
                console.log(`http://46.101.81.136:8181/Backend/problems/get/`+this.props.match.params.id)
                let problem =  axios.get(`http://46.101.81.136:8181/Backend/problems/get/`+this.props.match.params.id)
                                .then(res => {
                                    const problem = res.data;
                                    //Se asigna falso para opened, para el collapse
                                    console.log(problem);
                                    this.setState({
                                        languaje:problem.languaje,
                                    });
                                }).catch(error => {
                                    console.log(error.response)
                                });
                
            };

            toCode(){

                alert(this.state.code);
        
                let post_code ={ 
                    code:this.state.code,
                    o_inputs: this.state.o_inputs,
                    o_outputs: this.state.o_outputs,
                    language: this.state.language,
                };
                const url = `http://46.101.81.136:8181/Backend/code/set`;
                console.log(post_code);
                axios.post(url,post_code)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    this.setState({
                        stdout:res.data.stdout, 
                        stderr: res.data.stderr,
                        error: res.data.error,
                    });

                    //Se toma la id del problema.
                    var id_problem = res.data.id;
                    console.log(res.data.id);
                    //Se crean los parametros y se agregan al problema.
                    this.parameters.current.handleSubmit(id_problem);
                    //Se crean los retornos y se agregan al problema.
                    this.returns.current.post_returnsCreate(id_problem);
                    alert("Se ha agregado el problema junto con sus parametros y retornos.");
                    
                }).catch(error => {
                    alert("Error");
                    console.log(error.response);
                    alert(error.response);
                    return -1;
                });
              }

              handleCode(e){
                this.setState({code:e.target.value.replace(/"/gi, "\\\"")});
                console.log(this.state.code);
                
              }


    render(){
        console.log(this.props);
        return(
            <Grid>
                <Row>
                    <Col md ={6}>
                        <Row>
                            <Col md={6}>
                                <Label> Stdout:  </Label>
                            </Col>
                            <Col>
                                <Label> {this.state.stdout} </Label>
                            </Col>

                        </Row>
                        <Label> Resultados </Label>
                    </Col>
                    
                    <Col md ={6}>
                        <Row> 
                            <font size="5"  face = "Verdana" color="black" >¡Utiliza el editor para programar!:</font> 
                        </Row>
                        <Row>
                        <textarea  onChange={this.handleCode} name="Text1" cols="50" rows="5" placeholder=" Ingrese el problema a plantear..."></textarea>
                        </Row>
                        <Row> 
                        <button id="eject" type="button"  className="ejecutar" onClick={this.toCode} >Ejecutar</button>
                        </Row>
                    </Col>
                    </Row>
            </Grid>
        );
    }




}




export default Code;