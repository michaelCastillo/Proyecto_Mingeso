


import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import { Grid,Form,FormControl, Row, Col, Label, Panel ,DropdownButton,MenuItem ,Table, ButtonGroup,Button,ButtonToolbar, FormGroup, ControlLabel} from 'react-bootstrap';
import Timer from './Timer';

//React Login
import ReactLoading from "react-loading";

//React ACE!
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/theme/github';
import 'brace/theme/monokai';

//Components1

import Correction from './Correction.js';









class Code extends Component{

    constructor(props){
        super(props);
        this.timer = React.createRef();
        this.state = {
            ready:false,
            code: "",
            o_inputs:[],
            o_outputs:[],
            language:"",
            results:[],
            comparison:[],
            solution:[],
            ide:"python",
            simplCode:[],
            


        }

        this.handleCode = this.handleCode.bind(this);
        this.toCode = this.toCode.bind(this);
        this.handleAce = this.handleAce.bind(this);
        this.onSend = this.onSend.bind(this);
        this.handleIde = this.handleIde.bind(this);
        this.isSucsess = this.isSucsess.bind(this);
    };
            
            componentDidMount(){
                let id_problem = this.props.match.params.id;
                //Por ahora es la id 6, cuando este el login bien se cambia por aquel que
                //esté logueado.
                let id_user = localStorage.getItem('userId');
                let global_url = `http://35.226.163.50:8080/Backend`;
                let local_url = `http://localhost:1313`;
                let problem =  axios.get(global_url+`/problems/get/`+id_problem)
                .then(res => {
                    const problem = res.data;
                    this.setState({
                        language:problem.language,
                        o_inputs:problem.parameters,
                        o_outputs:problem.returns,
                    });
                }).catch(error => {
                    console.log(error.response)
                });
                //Se crea una solución vacía.
                let solution = {
                    title:"",
                    code:"",
                    fails:0,
                    successes:0,
                    time:0,
                    success:false,
                    closed:false,
                    errors:"",
                    id_problem:id_problem,
                    id_user:id_user
                };
                let sol_resp = axios.post(global_url+`/solutions/create`,solution).
                then(res => {
                    console.log("resultado");
                    console.log(res);
                    var solution = res.data;
                    var codeDeformed = this.deformCode(solution.code);
                    solution.code = codeDeformed;
                    this.setState({solution:solution});
                    this.setState({ready:true});
                }).catch(error => {
                    console.log("Ha ocurrido un error: "+error);
                });
            };
            
            deformCode(code){
                var codeFormat = code.replace(/\n/gi,'');
                codeFormat = code.replace(/\\/gi,'');
                return codeFormat;
            }
            
            handleIde(event){
                if(event.target.value == "C"){
                    this.setState({ide:"c"});
                }else if(event.target.value == "java"){
                    this.setState({ide:"java"});
                }else if(event.target.value == "python"){
                    this.setState({ide:"python"});
                }
            }

            toCode = (save) =>{
                
                let id_problem = this.props.match.params.id;
                var codeFormat = this.state.solution.code.replace('\\',"\\\\");
                codeFormat = codeFormat.replace(/"/gi, "\\\"");
                var time = this.timer.current.state.time;
                let post_code ={ 
                    
                    code:codeFormat,
                    time:time,
                    id_solution:this.state.solution.id,
                    id_problem:id_problem
                    
                };
                const global_url = `http://35.226.163.50:8080/Backend/solutions/execute`;
                const url = `http://localhost:1313/solutions/execute`;

                axios.post(url,post_code)
                .then(res => {
                    let solution = res.data.solution;
                    let local_url = `http://localhost:1313/solutions/save`;
                    solution.code = this.deformCode(solution.code);
                    this.setState({
                        results:res.data.results,
                        comparison:res.data.comparison,
                        solution:solution,
                    });
                    if(save == true){
                        console.log("Si send");
                        //Entonces se hace envia la señal al back de que debe cerrar la solucion
                        let closeSol = {
                            id_solution:this.state.solution.id
                        }
                        axios.post(local_url,closeSol)
                        .then(res => {
                            console.log("Se cerró exitosamente la solucion.",res);
                        }).catch(error => {
                            console.log("Error en el cerrado de la solución, inténtelo más tarde.",error);
                        });
                    }
                    console.log(this.state);
                }).catch(error => {
                    alert("Error");
                    alert(error.response);
                    return -1;
                });
                
              }

              handleCode(newValue){
                let solution = this.state.solution;
                solution.code = newValue;
                this.setState({solution:solution});
                console.log("Code: ",this.state.solution.code);
                console.log("solution ",this.state.solution);
                //var code = this.state.solution.code.concat(newValue);
                //console.log(code);
                //var code = newValue.replace('\\',"\\\\");
                //code = code.replace(/"/gi, "\\\"");
                //this.setState({code:code});
                //console.log("code");
                //console.log(this.state.solution.code);

                //Accion del cambio del panel de sugerencias
                this.state.simplCode = [];
                this.handleRedaction(this.state.solution.code);
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
              isSucsess(){
                  console.log("fui exec");
                  if(this.state.solution.success){
                      return(
                          <Label> SI </Label>
                        );
                    }else{
                        return(<Label> NO </Label>);
                        
                  }
              }
              isClosed(){
                  if(this.state.solution.closed){
                      return(
                          <Label> Cerrada </Label>
                      );
                  }else{
                    return(
                        <Label> No! Cerrada </Label>
                    );
                  }
              }

              

            onSend(){
                
                this.toCode(true);
                // var elapsed = Math.round(this.timer.current.state.elapsed/ 100);
                // var seconds = (elapsed / 10).toFixed(0);    
                // console.log(seconds);

                // let global_url = `http://46.101.81.136:8181/Backend`;
                // let local_url = `http://localhost:1313`;
                // let msg ={
                //     id_solution:this.state.solution.id,
                //     code:this.state.code
                // };              
                // axios.post(local_url+`/solutions/send`,msg)
                // .then(res => {
                //     console.log(res);
                // })
                // .catch(error => {
                //     console.log(error);
                // });
            }

            isInArray(VarList, data)
            {
                var i;
                for(i=0; i < VarList.length; i++)
                {
                    if(data == VarList[i])
                    {
                        return true;
                    }
                }
                return false;
            }

            handleFindComment(VarLine)
            {
                if(this.state.ide == "python")
                {
                    var actualLetter;
                    actualLetter = VarLine.charAt(0);

                    if(actualLetter == '#')
                    {
                        return true;
                    }
                }
                else if(this.state.ide == "java")
                {

                }
                else if(this.state.ide == "C")
                {

                }

                return false;
            }


            handleFindCommentD(VarLine)
            {
                if(this.state.ide == "python")
                {
                    var actualLetter;
                    actualLetter = VarLine.charAt(0);

                    if(actualLetter == '#')
                    {
                        if(VarLine.includes("Descripción") || VarLine.includes("Descripcion") || VarLine.includes("descripción") || VarLine.includes("descripcion"))
                        {
                            return true;
                        }
                    }
                }
                else if(this.state.ide == "java")
                {

                }
                else if(this.state.ide == "C")
                {

                }

                return false;
            }

            handleFindCommentR(VarLine)
            {
                if(this.state.ide == "python")
                {
                    var actualLetter;
                    actualLetter = VarLine.charAt(0);

                    if(actualLetter == '#')
                    {
                        if(VarLine.includes("Retorno") || VarLine.includes("retorno") || VarLine.includes("Return") || VarLine.includes("return") || VarLine.includes("Salida") || VarLine.includes("salida") || VarLine.includes("Salidas") || VarLine.includes("salidas"))
                        {
                            return true;
                        }
                    }
                }
                else if(this.state.ide == "java")
                {

                }
                else if(this.state.ide == "C")
                {

                }

                return false;
            }

            handleFindCommentE(VarLine)
            {
                if(this.state.ide == "python")
                {
                    var actualLetter;
                    actualLetter = VarLine.charAt(0);

                    if(actualLetter == '#')
                    {
                        if(VarLine.includes("Entrada") || VarLine.includes("entrada") || VarLine.includes("Entradas") || VarLine.includes("entradas"))
                        {
                            return true;
                        }
                    }
                }
                else if(this.state.ide == "java")
                {

                }
                else if(this.state.ide == "C")
                {

                }

                return false;
            }

            /*
            Funcion que recibe un String y calcula cuantas tabulaciones (2 espacios) 
            hay al inicio de esta, ignorando las tabulaciones y espacios que no son seguidas 
            por algun caracter distinto (ejemplo: "          as" en este caso se calculan 
            sus tabulaciones, en este caso "           ", no).

            Se retorna una lista la cual contiene la linea resultante sin las tabulaciones 
            ni espacios al inicio como primer termino y la cantidad de tabulaciones como segundo termino.
            */
            handleFindTab(VarLine)
            {
                var listReturn = [];
                if(this.state.ide == "python")
                {
                    var i=0;
                    var num = 0;
                    var flag = true;
                    //Se cuentan cuantos espacios hay al inicio antes de un caracter distinto
                    while(i < VarLine.length)
                    {
                        if(VarLine.charAt(i) == ' ' && flag)
                        {
                            num++;
                        }
                        else
                        {
                            flag = false;
                        }
                        i++;
                    }

                    //Si no hubo caracter distinto se ignoran las tabulaciones
                    if(flag)
                    {
                        num = 0;
                    }
                    //Si hay caracteres distintos, se calculan las tabulaciones, de haber un numero impar
                    //de espacios, se resta un espacio del contador y se cuentan las tabulaciones existentes.
                    else
                    {
                        VarLine = VarLine.slice(num);
                        if(num%2 != 0 &&  0 < num)
                        {
                            num = num -1;

                        }
                        num = num/2;
                    }
                }
                else if(this.state.ide == "java")
                {

                }
                else if(this.state.ide == "C")
                {

                }

                listReturn = [VarLine, num];
                return listReturn;
            }

            handleFindFunction(VarLine)
            {
                if(this.state.ide == "python")
                {

                    if(VarLine.length >= 3)
                    {
                        if(VarLine.charAt(0) == 'd' || VarLine.charAt(1) == 'e' || VarLine.charAt(1) == 'f')
                        {
                            return true;
                        }
                    }
                }
                else if(this.state.ide == "java")
                {

                }
                else if(this.state.ide == "C")
                {

                }

                return false;
            }

            handleRedaction(varCode)
            {
                var lineas = varCode.split("\n");

                var i;
                var j = 0;
                var booleanFound = false;
                var actualList = [];
                for (i = 0; i < lineas.length; i++)
                {
                    
                    actualList = this.handleFindTab(lineas[i])
                    lineas[i] = actualList[0];
                    //encontrar tabulaciones
                    if(actualList[1] != 0)
                    {
                        while(j < actualList[1])
                        {
                            this.state.simplCode.push("TAB");
                            j++;
                        }
                        j=0;
                    }
                    //Encontrar comentarios con la palabra descripcion
                    if(this.handleFindCommentD(lineas[i]) && booleanFound == false)
                    {
                        this.state.simplCode.push("COMMENTD");
                        booleanFound = true;
                    }
                    // Encontrar comentarios con la palabra entrada
                    else if(this.handleFindCommentE(lineas[i]) && booleanFound == false)
                    {
                        this.state.simplCode.push("COMMENTE");
                        booleanFound = true;
                    }
                    //Encontrar comentarios con la palabra retorno, return o salida en ella
                    else if(this.handleFindCommentR(lineas[i]) && booleanFound == false)
                    {
                        this.state.simplCode.push("COMMENTR");
                        booleanFound = true;
                    }
                    // encontrar un simple comentario si es que no encontro ningun otro tipo de comentario
                    else if(this.handleFindComment(lineas[i]) && booleanFound == false)
                    {
                        this.state.simplCode.push("COMMENT");
                        booleanFound = true;
                    }
                    else if(this.handleFindFunction(lineas[i]) && booleanFound == false)
                    {
                        this.state.simplCode.push("FUNCTION");
                        booleanFound = true;
                    }
                    else
                    {
                        if(actualList[1] != 0)
                        {
                            this.state.simplCode.push("CODE");
                        }
                    }
                    booleanFound = false;
                }
            }

            

              

    render(){
        
        console.log(this.props);
        if(!this.state.ready){
            return (
                <ReactLoading type={"spin"} color={"#000"} height={667} width={375} />
            );
        }else{
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
                                    <Col md={4}> 
                                        <Label>Time: {this.state.solution.time}</Label>
                                    </Col>
                                    <Col md={4}> 
                                        <Label>Error: {this.state.results.error}</Label>
                                    </Col>
                                    <Col md={4}> 
                                        {this.isSucsess()}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}> 
                                        <Timer start={Date.now()} time = {this.state.solution.time} ref = {this.timer}> </Timer>
                                    </Col>
                                    <Col md ={6}>
                                        <Label>Cerrado: {this.isClosed()} </Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Correction data={this.state.simplCode} />
                                </Row>
                            
                        </Col>
                        
                        <Col md ={6} xsOffset={1}>
                            <Row> 
                                <Form inline> 
                                    <FormGroup> 
                                        <ControlLabel>Codigo: </ControlLabel>
                                        <FormControl componentClass="select" placeholder="select" onChange={this.handleIde}>
                                            <option value="python">Python</option>
                                            <option value="java">Java</option>
                                            <option value="C">C</option>
                                        </FormControl>
                                    </FormGroup>
                                </Form>
                            </Row>
                            <Row>
                                <Col md = {12}>
                                <AceEditor
                                    mode={this.state.ide}
                                    theme="monokai"
                                    name="blah2"
                                    onLoad={this.onLoad}
                                    onChange={this.handleCode}
                                    fontSize={14}
                                    showPrintMargin={true}
                                    showGutter={true}
                                    highlightActiveLine={true}
                                    value={this.state.solution.code}
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
                                        <Button href="#" onClick={this.onSend}>Enviar</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            
                        </Col>
                                    
                        </Row>
                        

                        
                    
                </Grid>
            );
        }

    }
}




export default Code;                