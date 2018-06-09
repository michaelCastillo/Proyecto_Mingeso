


import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import { Grid, Row, Col, Label, Panel ,DropdownButton,MenuItem ,Table, ButtonGroup,Button,ButtonToolbar} from 'react-bootstrap';

//React ACE!
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/theme/github';
import 'brace/theme/monokai';





class Code extends Component{

    constructor(props){
        super(props);

        this.state = {
            
            code: "",
            o_inputs:[1],
            o_outputs:["hola"],
            language:"",
            results:[],
            comparison:[],



        }

        this.handleCode = this.handleCode.bind(this);
        this.toCode = this.toCode.bind(this);
        this.handleAce = this.handleAce.bind(this);
        
    };
            componentDidMount(){
                console.log(`http://46.101.81.136:8181/Backend/problems/get/`+this.props.match.params.id)
                let problem =  axios.get(`http://46.101.81.136:8181/Backend/problems/get/`+this.props.match.params.id)
                                .then(res => {
                                    const problem = res.data;
                                    //Se asigna falso para opened, para el collapse
                                    console.log("problem");
                                    console.log(problem);
                                    this.setState({

                                        language:problem.language,
                                    });
                                }).catch(error => {
                                    console.log(error.response)
                                });
                
            };

            toCode(){

                alert(this.state.code);
                var codeFormat = this.state.code.replace('\\',"\\\\");
                codeFormat = codeFormat.replace(/"/gi, "\\\"");
                let post_code ={ 
                    code:codeFormat,
                    o_inputs: this.state.o_inputs,
                    o_outputs: this.state.o_outputs,
                    language: this.state.language,
                };
                const url = `http://localhost:1313/code/set`;
                console.log(post_code);
                axios.post(url,post_code)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    this.setState({
                        results:res.data.results,
                        comparison:res.data.comparison,
                    });
                    console.log(this.state);
                    
                    
                }).catch(error => {
                    alert("Error");
                    console.log(error.response);
                    alert(error.response);
                    return -1;
                });
              }

              handleCode(newValue){
                this.setState({code:newValue});
                console.log("Code: ",this.state.code);
                //var code = this.state.code.concat(newValue);
                //console.log(code);
                //var code = newValue.replace('\\',"\\\\");
                //code = code.replace(/"/gi, "\\\"");
                //this.setState({code:code});
                //console.log("code");
                //console.log(this.state.code);
              }
              handleAce(newValue) {
                console.log('change',newValue);
              }
              onLoad(editor) {
                console.log("i've loaded");
              }
              onComparison(comparison){
                console.log(comparison);
                if(comparison == "Correcto"){
                    return(
                        <th style={{color:'#2D882D'}}> {comparison}</th>
                    );
                }else{
                    return(
                        <th style={{color:'#f44242'}}> {comparison}</th>
                    );
                }
              }

    render(){
        console.log(this.props);
        return(
            <Grid>
                <Row>
                    <Col md ={5}>
                        <Row>
                            <Table responsive>
                                <thead>
                                    <tr>
                                    
                                    <th>Salida</th>
                                    <th>Comparación</th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.comparison.map((comparison) => {return (
                                            <tr> 
                                                <th> {this.state.results.stdout} </th>
                                                {this.onComparison(comparison)}
                                            </tr>
                                        
                                        );})
                                    
                                    }
                                    
                                    
                                        
                                </tbody>
                                </Table>

                            </Row>
                            <br/>
                            <br/>
                            <Row>
                                <Col md={6}> 
                                    <Label>Error: {this.state.results.error}</Label>
                                </Col>
                                <Col md={6}> 
                                    <Label>Salida error:  {this.state.results.stderr}</Label>
                                </Col>
                            </Row>
                        
                    </Col>
                    
                    <Col md ={6} xsOffset={1}>
                        <Row> 
                            <font size="5"  face = "Verdana" color="black" >¡Utiliza el editor para programar!:</font> 
                        </Row>
                        <Row>
                            <Col md = {12}>
                            <AceEditor
                                mode="javascript"
                                theme="monokai"
                                name="blah2"
                                onLoad={this.onLoad}
                                onChange={this.handleCode}
                                fontSize={14}
                                showPrintMargin={true}
                                showGutter={true}
                                highlightActiveLine={true}
                                value={this.state.code}
                                setOptions={{
                                enableBasicAutocompletion: false,
                                enableLiveAutocompletion: false,
                                enableSnippets: false,
                                showLineNumbers: true,
                                tabSize: 2,
                                }}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col  md={12}>
                                <ButtonGroup justified>
                                    <Button href="#">Guardar</Button>
                                    <Button href="#" onClick={this.toCode}>Ejecutar</Button>
                                    <Button href="#">Enviar</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                        
                    </Col>
                                
                    </Row>
                    

                    
                
            </Grid>
        );
    }




}




export default Code;                