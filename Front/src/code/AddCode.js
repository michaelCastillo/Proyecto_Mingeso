


import React, { Component } from 'react';
import axios from 'axios';
import { Alert,Well,Grid,Form,FormControl, Row, Col, Label, Panel ,DropdownButton,MenuItem ,Table, ButtonGroup,Button,ButtonToolbar, FormGroup, ControlLabel} from 'react-bootstrap';
import Timer from './Timer';

//React Login
import ReactLoading from "react-loading";

//React ACE!
import brace from 'brace';


import 'brace/mode/c_cpp';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/theme/github';
import 'brace/theme/monokai';
import ResultChart from './ResultsChar';

//Components1

import Correction from './Correction.js';
import Editor from './Editor';









class Code extends Component{

    constructor(props){
        super(props);
        this.timer = React.createRef();
        this.chart = React.createRef();
        this.editor = React.createRef();
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
            simplCode:[],
            letrasMinusculas: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
            letrasMayusculas: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            digito: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            javaModifiers: ["private", "public", "protected", "static", "final", "abstract", "synchronized"],

            nsucc :0,
            nfails :0,
            statement:"",
        }

        this.handleCode = this.handleCode.bind(this);
        this.toCode = this.toCode.bind(this);
        this.handleAce = this.handleAce.bind(this);
        this.onSend = this.onSend.bind(this);
        this.handleIde = this.handleIde.bind(this);
        this.isSucsess = this.isSucsess.bind(this);
        this.setOut = this.setOut.bind(this);
        this.setNumSuccFails = this.setNumSuccFails.bind(this);
        this.setError = this.setError.bind(this);
        this.handleRedaction = this.handleRedaction.bind(this);
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
                        statement:problem.statement,
                        language:problem.language,
                        o_inputs:problem.parameters,
                        o_outputs:problem.returns,
                        ide:problem.language,

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
                let sol_resp = axios.post(global_url+`/solutions/create`,solution).
                then(res => {
                    var solution = res.data.solution;
                    console.log("test => ");
                    var codeDeformed = this.deformCode(res.data.code);
                    this.setState({code:codeDeformed});
                    this.setState({solution:solution});
                    this.setState({ready:true});
                    this.setNumSuccFails();
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
                if(event.target.value == "c"){
                    this.setState({ide:"c_cpp"});
                }else if(event.target.value == "java"){
                    this.setState({ide:"java"});
                }else if(event.target.value == "python"){
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
                this.chart.current.setState(
                    
                    
                    {
                        data: {
                            labels: [
                                'exitos',
                                'fallos'
                            ],
                            datasets: [{
                                data: [nsucc, nfails],
                                backgroundColor: [
                                    '#4BC0C0',
                                    '#FF6384',
                                ],
                                hoverBackgroundColor: [
                                    '#4BC0C0',
                                    '#FF6384',
                                ]
                            }]
                        }
                    }
                
                );
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
                console.log("post");
                this.editor.current.isCharging(true);
                axios.post(global_url,post_code)
                .then(res => {
                    let solution = res.data.solution;
                    let local_url = `http://localhost:1313/solutions/save`;
                    let global_url = `http://35.226.163.50:8080/Backend/solutions/save`;
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
                        axios.post(global_url,closeSol)
                        .then(res => {
                            let solution = this.state.solution;
                            solution.closed = res.data.closed;
                            this.setState({solution:solution});
                            if(!res.data.closed){
                                alert("Tu solución aún no resuelve el problema, vuelve a intentarlo!");
                            }
                        }).catch(error => {
                            console.log("Error en el cerrado de la solución, inténtelo más tarde.",error);
                        });
                    }
                    this.editor.current.isCharging(false);
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
                
                
                this.state.simplCode = [];
                this.handleRedaction();
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
                        <ButtonGroup justified>
                            <Button href="#" disabled>Guardar</Button>
                            <Button href="#"  onClick={this.toCode} disabled>Ejecutar</Button>
                            <Button href="#"  onClick={this.onSend} disabled>Enviar</Button>
                        </ButtonGroup>
                    );
                  }else{
                      return(
                        <ButtonGroup justified>
                            <Button href="#" >Guardar</Button>
                            <Button href="#"  onClick={this.toCode} >Ejecutar</Button>
                            <Button href="#"  onClick={this.onSend} >Enviar</Button>
                        </ButtonGroup>
                      );
                  }
              }

              

            onSend(){
                
                this.toCode(true);
                
            }

        // idden code
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
                else if(this.state.ide == "java" || this.state.ide == "c")
                {
                    if(VarLine.length >= 2)
                    {
                        if(VarLine.charAt(0) == "/" && VarLine.charAt(1) == "/")
                        {
                            return true;
                        }
                    }
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
                else if(this.state.ide == "java" || this.state.ide == "c")
                {
                    if(VarLine.length >= 2)
                    {
                        if(VarLine.charAt(0) == "/" && VarLine.charAt(1) == "/")
                        {
                            if(VarLine.includes("Descripción") || VarLine.includes("Descripcion") || VarLine.includes("descripción") || VarLine.includes("descripcion"))
                            {
                                return true;
                            }
                        }
                    }
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
                else if(this.state.ide == "java" || this.state.ide == "c")
                {
                    if(VarLine.length >= 2)
                    {
                        if(VarLine.charAt(0) == "/" && VarLine.charAt(1) == "/")
                        {
                            if(VarLine.includes("Retorno") || VarLine.includes("retorno") || VarLine.includes("Return") || VarLine.includes("return") || VarLine.includes("Salida") || VarLine.includes("salida") || VarLine.includes("Salidas") || VarLine.includes("salidas"))
                            {
                                return true;
                            }
                        }
                    }
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
                else if(this.state.ide == "java" || this.state.ide == "c")
                {
                    if(VarLine.length >= 2)
                    {
                        if(VarLine.charAt(0) == "/" && VarLine.charAt(1) == "/")
                        {
                            if(VarLine.includes("Entrada") || VarLine.includes("entrada") || VarLine.includes("Entradas") || VarLine.includes("entradas"))
                            {
                                return true;
                            }
                        }
                    }
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
                if(flag && num > 0)
                {
                    num = -1;
                }
                //Si hay caracteres distintos, se calculan las tabulaciones, de haber un numero impar
                //de espacios, se resta un espacio del contador y se cuentan las tabulaciones existentes.
                else if(num > 0 && flag == false)
                {
                    VarLine = VarLine.slice(num);
                    if(num%2 != 0 &&  0 < num)
                    {
                        num = num -1;

                    }
                    num = num/2;
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
                        if(VarLine.charAt(0) == 'd' && VarLine.charAt(1) == 'e' && VarLine.charAt(2) == 'f')
                        {
                            return true;
                        }
                    }
                }
                else if(this.state.ide == "java")
                {
                    if(VarLine.length > 0)
                    {
                        var i = 0;
                        var words = VarLine.split(" ");
                        while(i < words.length  && this.isInArray(this.state.javaModifiers, words[i]))
                        {
                            i++;
                        }
                        if(i < words.length)
                        {
                            var lineWOMod = words[i];
                            i++;
                            while(i < words.length)
                            {
                                lineWOMod = lineWOMod.concat(" ", words[i]);
                                i++;
                            }
                            i=0;
                            while(i < lineWOMod.length && lineWOMod.charAt(i) == ' ')
                            {
                                i++;
                            }
                            if(i < lineWOMod.length)
                            {
                                //Recortamos los espacios previos al texto a revisar
                                lineWOMod = lineWOMod.slice(i);
                                var letterVariable = 0;
                                while(i < lineWOMod.length && (this.isInArray(this.state.letrasMinusculas, lineWOMod.charAt(i)) || this.isInArray(this.state.letrasMayusculas, lineWOMod.charAt(i)) || this.isInArray(this.state.digito, lineWOMod.charAt(i))) )
                                {
                                    letterVariable++;
                                    i++;
                                }

                                if(i < lineWOMod.length && letterVariable > 0)
                                {
                                    while(i < lineWOMod.length && lineWOMod.charAt(i) == " ")
                                    {
                                        i++;
                                    }
                                    if(i < lineWOMod.length)
                                    {
                                        letterVariable = 0;
                                        while(i < lineWOMod.length && (this.isInArray(this.state.letrasMinusculas, lineWOMod.charAt(i)) || this.isInArray(this.state.letrasMayusculas, lineWOMod.charAt(i)) || this.isInArray(this.state.digito, lineWOMod.charAt(i))) )
                                        {
                                            letterVariable++;
                                            i++;
                                        }
                                        if(i < lineWOMod.length)
                                        {
                                            if(lineWOMod.charAt(i) == "(" && letterVariable > 0)
                                            {
                                                return true;
                                            }
                                            else
                                            {
                                                while(i < lineWOMod.length && lineWOMod.charAt(i) == " ")
                                                {
                                                    i++;
                                                }
                                                if(i < lineWOMod.length && lineWOMod.charAt(i) == "(" && letterVariable > 0)
                                                {
                                                    return true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(this.state.ide == "c")
                {
                    var i = 0;
                    if(VarLine.length > 0)
                    {
                        var letterVariable = 0;
                        while(i < VarLine.length && VarLine.charAt(i) != " " && (this.isInArray(this.state.letrasMinusculas, VarLine.charAt(i)) || this.isInArray(this.state.letrasMayusculas, VarLine.charAt(i)) || this.isInArray(this.state.digito, VarLine.charAt(i)) ))
                        {
                            letterVariable++;
                            i++;
                        }
                        if(i < VarLine.length && letterVariable > 0)
                        {
                            while(i < VarLine.length && VarLine.charAt(i) == " ")
                            {
                                i++;
                            }
                            if(i < VarLine.length)
                            {
                                letterVariable = 0;
                                while(i < VarLine.length && (this.isInArray(this.state.letrasMinusculas, VarLine.charAt(i)) || this.isInArray(this.state.letrasMayusculas, VarLine.charAt(i)) || this.isInArray(this.state.digito, VarLine.charAt(i)) ))
                                {
                                    letterVariable++;
                                    i++;
                                }
                                while(i < VarLine.length && VarLine.charAt(i) == " ")
                                {
                                    i++;
                                }
                                if(i < VarLine.length && VarLine.charAt(i) == "(" && letterVariable > 0)
                                {
                                    while(i < VarLine.length && VarLine.charAt(i) != ")")
                                    {
                                        i++;
                                    }
                                    if(i < VarLine.length)
                                    {
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                }

                return false;
            }

            handleFindFunctionWithNameLimit(VarLine)
            {
                if(this.state.ide == "python")
                {

                    if(VarLine.length >= 3)
                    {
                        if(VarLine.charAt(0) == 'd' && VarLine.charAt(1) == 'e' && VarLine.charAt(2) == 'f')
                        {
                            var i = 3;
                            if(i < VarLine.length)
                            {
                                while(i < VarLine.length && VarLine.charAt(i) == " ")
                                {
                                    i++;
                                }
                                if(i < VarLine.length)
                                {
                                    var letterVariable = 0;
                                    while(i < VarLine.length && (this.isInArray(this.state.letrasMinusculas, VarLine.charAt(i)) || this.isInArray(this.state.letrasMayusculas, VarLine.charAt(i)) || this.isInArray(this.state.digito, VarLine.charAt(i)) ))
                                    {
                                        letterVariable++;
                                        i++;
                                    }
                                    if(letterVariable >= 4 && VarLine.charAt(i) == "(")
                                    {
                                        return true
                                    }
                                }
                            }
                        }
                    }
                }
                else if(this.state.ide == "java")
                {
                    if(VarLine.length > 0)
                    {
                        var i = 0;
                        var words = VarLine.split(" ");
                        while(i < words.length  && this.isInArray(this.state.javaModifiers, words[i]))
                        {
                            i++;
                        }
                        if(i < words.length)
                        {
                            var lineWOMod = words[i];
                            i++;
                            while(i < words.length)
                            {
                                lineWOMod = lineWOMod.concat(" ", words[i]);
                                i++;
                            }
                            i=0;
                            while(i < lineWOMod.length && lineWOMod.charAt(i) == ' ')
                            {
                                i++;
                            }
                            if(i < lineWOMod.length)
                            {
                                //Recortamos los espacios previos al texto a revisar
                                lineWOMod = lineWOMod.slice(i);
                                var letterVariable = 0
                                while(i < lineWOMod.length && (this.isInArray(this.state.letrasMinusculas, lineWOMod.charAt(i)) || this.isInArray(this.state.letrasMayusculas, lineWOMod.charAt(i)) || this.isInArray(this.state.digito, lineWOMod.charAt(i))) )
                                {
                                    letterVariable++;
                                    i++;
                                }

                                if(i < lineWOMod.length && letterVariable > 0)
                                {
                                    while(i < lineWOMod.length && lineWOMod.charAt(i) == " ")
                                    {
                                        i++;
                                    }
                                    if(i < lineWOMod.length)
                                    {
                                        letterVariable = 0;
                                        while(i < lineWOMod.length && (this.isInArray(this.state.letrasMinusculas, lineWOMod.charAt(i)) || this.isInArray(this.state.letrasMayusculas, lineWOMod.charAt(i)) || this.isInArray(this.state.digito, lineWOMod.charAt(i))) )
                                        {
                                            letterVariable++;
                                            i++;
                                        }
                                        if(i < lineWOMod.length)
                                        {
                                            if(lineWOMod.charAt(i) == "(")
                                            {
                                                if(letterVariable >= 4)
                                                {
                                                    return true
                                                }
                                            }
                                            else
                                            {
                                                while(i < lineWOMod.length && lineWOMod.charAt(i) == " ")
                                                {
                                                    i++;
                                                }
                                                if(i < lineWOMod.length && lineWOMod.charAt(i) == "(")
                                                {
                                                    if(letterVariable >= 4)
                                                    {
                                                        return true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(this.state.ide == "c")
                {
                    var i = 0;
                    if(VarLine.length > 0)
                    {
                        var letterVariable = 0
                        while(i < VarLine.length && VarLine.charAt(i) != " " && (this.isInArray(this.state.letrasMinusculas, VarLine.charAt(i)) || this.isInArray(this.state.letrasMayusculas, VarLine.charAt(i)) || this.isInArray(this.state.digito, VarLine.charAt(i)) ))
                        {
                            letterVariable++;
                            i++;
                        }
                        if(i < VarLine.length && letterVariable > 0)
                        {
                            while(i < VarLine.length && VarLine.charAt(i) == " ")
                            {
                                i++;
                            }
                            if(i < VarLine.length)
                            {
                                letterVariable = 0;
                                while(i < VarLine.length && (this.isInArray(this.state.letrasMinusculas, VarLine.charAt(i)) || this.isInArray(this.state.letrasMayusculas, VarLine.charAt(i)) || this.isInArray(this.state.digito, VarLine.charAt(i))) )
                                {
                                    letterVariable++;
                                    i++;
                                }
                                if(i < VarLine.length && letterVariable >= 4 && VarLine.charAt(i) == "(")
                                {
                                    while(i < VarLine.length && VarLine.charAt(i) != ")")
                                    {
                                        i++;
                                    }
                                    if(i < VarLine.length)
                                    {
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                }

                return false;
            }

            handleFindIf(VarLine)
            {
                if(VarLine.length >= 2)
                {
                    if(VarLine.charAt(0) == 'i' && VarLine.charAt(1) == 'f')
                    {
                        return true;
                    }
                }

                return false;
            }

            handleFindWhile(VarLine)
            {
                if(this.state.ide == "python" || this.state.ide == "c")
                {

                    if(VarLine.length >= 5)
                    {
                        if(VarLine.charAt(0) == 'w' && VarLine.charAt(1) == 'h' && VarLine.charAt(2) == 'i' && VarLine.charAt(3) == 'l' && VarLine.charAt(4) == 'e')
                        {
                            return true;
                        }
                    }
                }
                else if(this.state.ide == "java")
                {
                    // Deteccion del Do-While
                    if(VarLine.length >= 2)
                    {
                        if(VarLine.charAt(0) == 'd' && VarLine.charAt(1) == 'o')
                        {
                            return true;
                        }
                    }
                    // Deteccion del While
                    if(VarLine.length >= 5)
                    {
                        if(VarLine.charAt(0) == 'w' && VarLine.charAt(1) == 'h' && VarLine.charAt(2) == 'i' && VarLine.charAt(3) == 'l' && VarLine.charAt(4) == 'e')
                        {
                            return true;
                        }
                    }

                }


                return false;
            }

            handleFindElif(VarLine)
            {
                if(this.state.ide == "python")
                {

                    if(VarLine.length >= 4)
                    {
                        if(VarLine.charAt(0) == 'e' && VarLine.charAt(1) == 'l' && VarLine.charAt(2) == 'i' && VarLine.charAt(3) == 'f')
                        {
                            return true;
                        }
                    }
                }
                else if(this.state.ide == "java" || this.state.ide == "c")
                {
                    if(VarLine.length >= 7)
                    {
                        if(VarLine.charAt(0) == 'e' && VarLine.charAt(1) == 'l' && VarLine.charAt(2) == 's' && VarLine.charAt(3) == 'e' && VarLine.charAt(4) == ' ' && VarLine.charAt(5) == 'i' && VarLine.charAt(6) == 'f')
                        {
                            return true;
                        }
                    }
                }

                return false;
            }

            handleFindElse(VarLine)
            {
                if(VarLine.length >= 4)
                {
                    if(VarLine.charAt(0) == 'e' && VarLine.charAt(1) == 'l' && VarLine.charAt(2) == 's' && VarLine.charAt(3) == 'e')
                    {
                        return true;
                    }
                }

                return false;
            }

            handleFindFor(VarLine)
            {
                if(VarLine.length >= 3)
                {
                    if(VarLine.charAt(0) == 'f' && VarLine.charAt(1) == 'o' && VarLine.charAt(2) == 'r')
                    {
                        return true;
                    }
                }

                return false;
            }

            handleFindCommentGlobal(varLine)
            {
                var i;
                var listReturn;
                var positionCommentD;
                var positionCommentE;
                var positionCommentR;

                var actual;

                var listD = ["Descripción", "Descripcion", "descripción", "descripcion"];
                var listE = ["Entrada", "entrada", "Entradas", "entradas"];
                var listR = ["Retorno", "retorno", "Return", "return", "Salida", "salida", "Salidas", "salidas"];

                for(i=0; i < listD.length ; i++)
                {
                    actual = varLine.indexOf(listD[i]);
                    if(i == 0)
                    {
                        positionCommentD = actual;
                    }
                    else
                    {
                        if(positionCommentD == -1)
                        {
                            positionCommentD = actual;
                        }
                        else if(actual < positionCommentD && actual != -1)
                        {
                            positionCommentD = actual;
                        }
                    }
                }

                for(i=0; i < listE.length ; i++)
                {
                    actual = varLine.indexOf(listE[i]);
                    if(i == 0)
                    {
                        positionCommentE = actual;
                    }
                    else
                    {
                        if(positionCommentE == -1)
                        {
                            positionCommentE = actual;
                        }
                        else if(actual < positionCommentE && actual != -1)
                        {
                            positionCommentE = actual;
                        }
                    }
                }

                for(i=0; i < listR.length ; i++)
                {
                    actual = varLine.indexOf(listR[i]);
                    if(i == 0)
                    {
                        positionCommentR = actual;
                    }
                    else
                    {
                        if(positionCommentR == -1)
                        {
                            positionCommentR = actual;
                        }
                        else if(actual < positionCommentR && actual != -1)
                        {
                            positionCommentR = actual;
                        }
                    }
                }

                if(positionCommentD == -1)
                {
                    positionCommentD = varLine.length +1;
                }
                if(positionCommentE == -1)
                {
                    positionCommentE = varLine.length +1;
                }
                if(positionCommentR == -1)
                {
                    positionCommentR = varLine.length +1;
                }

                if(positionCommentD < positionCommentE && positionCommentD < positionCommentR)
                {
                    listReturn = ["COMMENTD", this.handleFindCommentD(varLine)];
                }
                else if(positionCommentE < positionCommentD && positionCommentE < positionCommentR)
                {
                    listReturn = ["COMMENTE", this.handleFindCommentE(varLine)];
                }
                else if(positionCommentR < positionCommentE && positionCommentR < positionCommentD)
                {
                    listReturn = ["COMMENTR", this.handleFindCommentR(varLine)];
                }
                else
                {
                    if(varLine.indexOf("procesamiento") != -1 || varLine.indexOf("Procesamiento") != -1 || varLine.indexOf("PROCESAMIENTO") != -1)
                    {
                        listReturn = ["COMMENTP", this.handleFindComment(varLine)];
                    }
                    else
                    {
                        listReturn = ["COMMENT", this.handleFindComment(varLine)];
                    }
                }

                return listReturn;
            }

            handleFindParenthesis(varLine)
            {
                var listaRetorno = [];
                if(varLine.indexOf("{") >= 0)
                {
                    listaRetorno.push([true, varLine.indexOf("{")]);
                }
                else
                {
                    listaRetorno.push([false, -1]);
                }
                if(varLine.indexOf("}") >= 0)
                {
                    listaRetorno.push([true, varLine.indexOf("}")]);
                }
                else
                {
                    listaRetorno.push([false, -1]);
                }
                return listaRetorno;
            }

            handleRedaction(varCode)
            {
                var lineas = this.state.code.split("\n");

                var i;
                var j = 0;
                var booleanFound = false;
                var booleanComment = false;
                var flag = false;
                var temporalList = [];
                var actualList = [];
                var commentList = [];
                var listaParentesis = [];
                for (i = 0; i < lineas.length; i++)
                {
                    if(booleanComment == false)
                    {
                        actualList = this.handleFindTab(lineas[i])
                        lineas[i] = actualList[0];
                        //Encontrar tabulaciones
                        if(actualList[1] != 0)
                        {
                            while(j < actualList[1])
                            {
                                this.state.simplCode.push(["TAB", i+1]);
                                j++;
                            }
                            j=0;
                        }
                        //#########################################
                        //Encontrar Comentarios colectivos (/* */)

                        if(lineas[i].indexOf("/*") != -1)
                        {
                            if(lineas[i].indexOf("/*") == 0)
                            {
                                booleanComment = true;
                                booleanFound = true;
                                flag = true;
                            }
                            else
                            {
                                temporalList = lineas[i].split("/*");
                                temporalList[1] = "/*" + temporalList[1];
                                lineas.splice(i, 1, temporalList);
                                flag = true;
                            }
                        }

                        //Lista deteccion parentesis de llaves

                        listaParentesis = this.handleFindParenthesis(lineas[i]);

                        //#########################################

                        //Encontrar comentarios
                        commentList = this.handleFindCommentGlobal(lineas[i]);
                        if(commentList[1] && booleanFound == false)
                        {
                            this.state.simplCode.push([commentList[0], i+1]);
                            booleanFound = true;
                        }
                        //Encontrar Funciones
                        else if(this.handleFindFunctionWithNameLimit(lineas[i]) && booleanFound == false)
                        {
                            this.state.simplCode.push(["FUNCTIONGOODLENGTH", i+1]);
                            booleanFound = true;
                        }
                        else if(this.handleFindFunction(lineas[i]) && booleanFound == false)
                        {
                            this.state.simplCode.push(["FUNCTION", i+1]);
                            booleanFound = true;
                        }
                        //Encontrar If's
                        else if(this.handleFindIf(lineas[i]) && booleanFound == false)
                        {
                            this.state.simplCode.push(["IF", i+1]);
                            booleanFound = true;
                        }
                        //Encontrar While's
                        else if(this.handleFindWhile(lineas[i]) && booleanFound == false)
                        {
                            this.state.simplCode.push(["WHILE", i+1]);
                            booleanFound = true;
                        }
                        else if(this.handleFindElif(lineas[i]) && booleanFound == false)
                        {
                            this.state.simplCode.push(["ELSEIF", i+1]);
                            booleanFound = true;
                        }
                        else if(this.handleFindElse(lineas[i]) && booleanFound == false)
                        {
                            this.state.simplCode.push(["ELSE", i+1]);
                            booleanFound = true;
                        }
                        else if(this.handleFindFor(lineas[i]) && booleanFound == false)
                        {
                            this.state.simplCode.push(["FOR", i+1]);
                            booleanFound = true;
                        }
                        else if(listaParentesis[0][0] && booleanFound == false)
                        {
                            if(listaParentesis[0][1] == 0)
                            {
                                this.state.simplCode.push(["{", i+1]);
                                booleanFound = true;
                            }
                        }
                        else if(this.handleFindParenthesis(lineas[i])[1][0] && booleanFound == false)
                        {
                            if(listaParentesis[1][1] == 0)
                            {
                                this.state.simplCode.push(["}", i+1]);
                                booleanFound = true;
                            }
                        }
                        else
                        {
                            if(actualList[1] != -1)
                            {
                                this.state.simplCode.push(["CODE", i+1]);
                            }
                        }
                        booleanFound = false;
                        if(flag)
                        {
                            i--;
                            flag = false;
                        }
                    }
                    else
                    {
                        if(lineas[i].indexOf("*/") == -1)
                        {
                            commentList = this.handleFindCommentGlobal("//"+lineas[i]);
                            if(commentList[1] && booleanFound == false)
                            {
                                this.state.simplCode.push([commentList[0], i+1]);
                                booleanFound = true;
                            }
                        }
                        else
                        {
                            if(lineas[i].indexOf("*/") == lineas[i].length -2)
                            {
                                commentList = this.handleFindCommentGlobal("//"+lineas[i]);
                                if(commentList[1] && booleanFound == false)
                                {
                                    this.state.simplCode.push([commentList[0], i+1]);
                                    booleanFound = true;
                                }
                                booleanComment = false;
                            }
                            else
                            {
                                temporalList = lineas[i].split("*/");
                                temporalList[0] = temporalList[0] + "*/";
                                lineas.splice(i, 1, temporalList);
                                flag = true;
                            }
                        }

                        if(flag)
                        {
                            i--;
                            flag = false;
                        }
                        booleanFound = false;
                    }
                }
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
            setError(){
                if(this.state.ready && (this.state.solution.test != null)){
                    var err = this.state.solution.test.results[0].stderr; 
                    console.log(this.state.solution.test.results[0].stderr);
                    var total = this.state.nsucc + this.state.nfails;
                    if(err != null){
                        if(err != ""){

                            return(
                                <Alert bsStyle="danger">
                                <strong>Error: </strong> {err}
                            </Alert>
                        );
                    }else{
                        if(total == this.state.nsucc){
                            console.log("closed ",this.state.solution.closed);
                            if(this.state.solution.closed){
                                return(
                                    <Alert bsStyle="success">
                                        <strong>   Problema resuelto! y cerrado </strong>
                                    </Alert>
                                    );
                            }

                            return(
                                <Alert bsStyle="success">
                                    <strong>   Problema resuelto!  </strong>
                                </Alert>
                            );
                            
                            }else{
                                return(
                                    <Alert bsStyle="danger">
                                        <strong>   Tu solución aún no resuelve el problema, sigue intentandolo!  </strong>
                                    </Alert>
                                );  
                            }
                        }
                    }
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
                        <Well>{this.state.statement}</Well>
                    </Row>
                    <Row>
                            {this.setError()}
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
                                {/*
                                <Row>
                                    <Col md={4}> 
                                        <Label>Time: {this.state.solution.time}</Label>
                                    </Col>
                                    <Col md={4}> 
                                        {this.isSucsess()}
                                    </Col>
                                </Row>
                            */}
                                <Row>
                                    <Col md={6}> 
                                        <Timer start={Date.now()} time = {this.state.solution.time} ref = {this.timer}> </Timer>
                                    </Col>
                                </Row>
                            
                        </Col>
                        
                        <Col md ={6} xsOffset={1}>
                            {/*<Row> 
                                <Form inline> 
                                    <FormGroup> 
                                        <ControlLabel>Codigo: </ControlLabel>
                                        <FormControl componentClass="select" placeholder="select" onChange={this.handleIde}>
                                            <option value="python">Python</option>
                                            <option value="java">Java</option>
                                            <option value="c">C</option>
                                        </FormControl>
                                    </FormGroup>
                                </Form>
                            </Row>*/}
                            <Editor ref={this.editor} handleCode={this.handleCode} ide={this.state.ide} funcion={this.handleIde} />    
                            <Row>
                                
                                <Col  md={12}>
                                    
                                        {this.isClosed()}
                                    
                                </Col>
                            </Row>
                            
                        </Col>

                                    
                    </Row>
                    <Row>
                        <Correction data={this.state.simplCode} />
                    </Row>
     
                        
                        
                        

               
                </Grid>
            );
            //Cierre if closed
        
        
    }
        
        
    }
}
export default Code;                
