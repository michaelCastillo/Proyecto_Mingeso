


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

import 'brace/mode/c_cpp';
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
            letrasMinusculas: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
            letrasMayusculas: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            digito: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            javaModifiers: ["private", "public", "protected", "static", "final", "abstract", "synchronized"],


            


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
                if(event.target.value == "c"){
                    this.setState({ide:"c_cpp"});
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
                else if(this.state.ide == "java" || this.state.ide == "c_cpp")
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
                else if(this.state.ide == "java" || this.state.ide == "c_cpp")
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
                else if(this.state.ide == "java" || this.state.ide == "c_cpp")
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
                else if(this.state.ide == "java" || this.state.ide == "c_cpp")
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
                else if(this.state.ide == "c_cpp")
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
                else if(this.state.ide == "c_cpp")
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
                        console.log("Words: " + words);
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
                else if(this.state.ide == "c_cpp")
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
                if(this.state.ide == "python" || this.state.ide == "c_cpp")
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
                    else if(VarLine.length >= 5)
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
                else if(this.state.ide == "java" || this.state.ide == "c_cpp")
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

            handleRedaction(varCode)
            {
                var lineas = varCode.split("\n");

                var i;
                var j = 0;
                var booleanFound = false;
                var booleanComment = false;
                var flag = false;
                var temporalList = [];
                var actualList = [];
                var commentList = [];
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
                            console.log("Linea:" + i+1);
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
                        else
                        {
                            if(actualList[1] != 0)
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
                            
                        </Col>
                        
                        <Col md ={6} xsOffset={1}>
                            <Row> 
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
                    <Row>
                        <Correction data={this.state.simplCode} />
                    </Row>
                        

                        
                    
                </Grid>
            );
        }

    }
}




export default Code;                