


import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import { Well,Grid,Form,FormControl, Row, Col, Label, Panel ,DropdownButton,MenuItem ,Table, ButtonGroup,Button,ButtonToolbar, FormGroup, ControlLabel} from 'react-bootstrap';
import Timer from './Timer';

//React Login
import ReactLoading from "react-loading";

//React ACE!
import AceEditor from 'react-ace';
import brace from 'brace';
import ReactSvgPieChart from "react-svg-piechart"


import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/theme/github';
import 'brace/theme/monokai';
import ResultChart from './ResultsChar';





class Code extends Component{

    constructor(props){
        super(props);
        this.timer = React.createRef();
        this.chart = React.createRef();
        this.state = {
            ready:false,
            code: "",
            o_inputs:[],
            o_outputs:[],
            language:"",
            results:[],
            comparison:[],
            solution:[],
            ide:"",
            nsucc :0,
            nfails :0
            


        }

        this.handleCode = this.handleCode.bind(this);
        this.toCode = this.toCode.bind(this);
        this.handleAce = this.handleAce.bind(this);
        this.onSend = this.onSend.bind(this);
        this.handleIde = this.handleIde.bind(this);
        this.isSucsess = this.isSucsess.bind(this);
        this.setOut = this.setOut.bind(this);
        this.setNumSuccFails = this.setNumSuccFails.bind(this);
    };
            
            componentDidMount(){
                let id_problem = this.props.match.params.id;
                //Por ahora es la id 6, cuando este el login bien se cambia por aquel que
                //esté logueado.
                let id_user =localStorage.getItem('userId');
                let global_url = `http://35.226.163.50:8080/Backend`;
                let local_url = `http://localhost:1313`;
                let problem =  axios.get(local_url+`/problems/get/`+id_problem)
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
                    fails:0,
                    successes:0,
                    time:0,
                    success:false,
                    closed:false,
                    errors:"",
                    id_problem:id_problem,
                    id_user:id_user
                };
                let sol_resp = axios.post(local_url+`/solutions/create`,solution).
                then(res => {
                    console.log("resultado");
                    console.log(res);
                    var solution = res.data.solution;
                    var codeDeformed = this.deformCode(res.data.code);
                    this.setState({code:codeDeformed});
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
                }else if(event.target.value == "Java"){
                    this.setState({ide:"java"});
                }else if(event.target.value == "Python"){
                    this.setState({ide:"python"});
                }
            }

            setNumSuccFails(){
                var nsucc = 0;
                var nfails= 0;
                
                this.state.solution.test.results.map((result) => {
                    if(result.result){
                        nsucc++;
                    }else{
                        nfails++;
                    }
                });
                this.chart.current.setState({data:[{title: "Data 2", value: nfails, color: "#ff0000"},{title: "Data 3", value: nsucc, color: "#00ff00"}]});
                this.setState({nsucc:nsucc,nfails:nfails});
          }

            toCode = (save) =>{
                
                let id_problem = this.props.match.params.id;
                var codeFormat = this.state.code.replace('\\',"\\\\");
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
                    let code = this.deformCode(res.data.code);
                    this.setState({
                        code:code,
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
                            let solution = this.state.solution;
                            solution.closed = res.data.closed;
                            this.setState({solution:solution});
                            console.log("Se cerró exitosamente la solucion.",res);
                        }).catch(error => {
                            console.log("Error en el cerrado de la solución, inténtelo más tarde.",error);
                        });
                    }
                    //Aqui se cambia el chart.
                    this.setNumSuccFails();
                }).catch(error => {
                    alert("Error");
                    alert(error.response);
                    return -1;
                });
                
              }

             

              

              handleCode(newValue){
                this.setState({code:newValue});
                console.log("Code: ",this.state.code);
                console.log("solution ",this.state.solution);
                //var code = this.state.solution.code.concat(newValue);
                //console.log(code);
                //var code = newValue.replace('\\',"\\\\");
                //code = code.replace(/"/gi, "\\\"");
                //this.setState({code:code});
                //console.log("code");
                //console.log(this.state.solution.code);
              }
              handleAce(newValue) {
                console.log('change',newValue);
              }
              onLoad(editor) {
                console.log("i've loaded");
              }
              onComparison(index){
                  if(this.state.solution.test != null){

                      if( index < this.state.solution.test.results.length){
                        console.log("index => "+index);
                        console.log(this.state.solution.test.results[index].result);
    
                        if(this.state.solution.test.results[index].result){
                            return(
                                <th style={{color:'#2D882D'}}>Correcto</th>
                            );
                        }else{
                            return(
                                <th style={{color:'#f44242'}}>Incorrecto</th>
                            );
                        }
                    }else{
                        return(
                            <th style={{color:'#f44242'}} > Error </th>
                        );
                    }
                  }else{
                    return(<th style={{color:'#f44242'}} > - </th>);
                  }
              }
              isSucsess(){
                  console.log("fui exec");
                  if(this.state.solution.test != null){
                      
                      if(this.state.solution.test.correct){
                          return(
                              <Label> SI </Label>
                            );
                        }else{
                            return(<Label> NO </Label>);
                            
                        }
                    }else{
                        
                        return(<Label> - </Label>);
                  }
              }
              isClosed(){
                  if(this.state.solution.closed){
                      return(
                          <Label> Si </Label>
                      );
                  }else{
                    return(
                        <Label> No </Label>
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

            getResult(index){
                if(this.state.solution.test != null){
                    return(<th>{this.state.solution.test.results[index].stdout}</th>);
                }else{
                    return(<th> - </th>);
                }
            }

        setResults(){

            if(this.state.solution.test != null){
                this.state.o_outputs.map((out,index)=>{return(
                    <tr>
                        <th> {out.name} </th>
                        <th>{this.state.solution.test.results[index].stdout}</th>
                        <th> {this.onComparison(index)} </th>
                    </tr>
                );
                })
            }else{
                this.state.o_outputs.map((out,index)=>{return(
                    <tr>
                        <th> {out.name} </th>
                        <th> - </th>
                        <th> - </th>
                    </tr>
                );
                })
            }

        }
        setOut(out,index){
            if(!out.hidden){
                return(
                    <tr>
                        <th> {this.state.o_inputs[index]} </th>
                        <th> {out.name} </th>
                        <th>{this.getResult(index)}</th>
                        <th> {this.onComparison(index)} </th>
                    </tr>
                );
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
                        <Well>Enunciado!</Well>
                    </Row>
                    <Row>
                        <Col md ={5}>
                            <Row>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Entrada</th>
                                            <th>Salida esperada</th>
                                            <th>Salida</th>
                                            <th>Comparación</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.o_outputs.map((out,index)=>{return(
                                                        this.setOut(out,index)
                                            );
                                            })
                                        }   
                                    </tbody>
                                    </Table>

                            </Row>
                            <Row>
                                <ResultChart ref={this.chart} nsucc={this.state.nsucc} nfails={this.state.nfails}/>
                            </Row>
                            
                                <br/>
                                <br/>
                                <Row>
                                    <Col md={4}> 
                                        <Label>Time: {this.state.solution.time}</Label>
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