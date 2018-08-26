import React, { Component } from 'react';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import './Correction.css';

class Correction extends Component
{
    //Constructor
    constructor(props)
    {
        super(props);
        this.state=
        {
            users: "",
        }
    }

    //Metodos

    handleProblems(list)
    {
        var i;
        var j=0;
        var qTab = 0;
        if(list.length > 0)
        {
            var actLine = list[0][1];
        }
        var finalList = [];

        var flagD = false;
        var flagE = false;
        var flagR = false;

        var flagSeparacionEntrada = false;
        var flagSeparacionProcesamiento = false;
        var flagSeparacionSalida = false;

        var flagParentesis = false;

        /*
        var k;
        console.log("PARTO");
        for(k = 0; k < list.length; k++)
        {
            console.log(list[k][0]);
        }
        console.log("TERMINO");
        */
        for(i = 0; i < list.length; i++)
        {
            if(list[i][1] == actLine)
            {
                if(list[i][0] == "TAB" || (flagParentesis && list[i][0] == "{"))
                {
                    j++;
                    

                    if(j > qTab)
                    {
                        finalList.push("Se a colocado en la linea "+list[i][1]+" una tabulacion que podria ser innecesaria.");
                    } 
                }
            }
            else
            {
                actLine = list[i][1];
                if(list[i][0] == "TAB" || (flagParentesis && list[i][0] == "{"))
                {
                    j = 1;

                    if(j > qTab)
                    {
                        finalList.push("Se a colocado en la linea "+list[i][1]+" una tabulacion que podria ser innecesaria.");
                    } 
                }
                else
                {
                    j=0;
                }
            }
            if(list[i][0] == "COMMENTD")
            {
                flagD = true;
            }
            else if(list[i][0] == "COMMENTE")
            {
                flagSeparacionEntrada = true;
                flagE = true;
            }
            else if(list[i][0] == "COMMENTR")
            {
                flagSeparacionSalida = true;
                flagR = true;
            }
            else if(list[i][0] == "COMMENTP")
            {
                flagSeparacionProcesamiento = true;
            }
            else if(list[i][0] == "FUNCTIONGOODLENGTH")
            {
                flagParentesis = true;
                qTab = j+1;

                if(flagD && flagE && flagR)
                {
                    flagD = false;
                    flagE = false;
                    flagR = false;
                }
                else
                {
                    finalList.push("No se detecta una presentacion completa de la funcion en la linea "+list[i][1]+". Se recomienda la incorporacion de:");
                    if(flagD == false)
                    {
                        finalList.push(" - Una descripción.");
                    }
                    if(flagE == false)
                    {
                        finalList.push(" - Mostrar las entradas.");
                    }
                    if(flagR == false)
                    {
                        finalList.push(" - Mostrar los retornos.");
                    }
                }
            }
            else if(list[i][0] == "FUNCTION")
            {
                qTab = j+1;
                flagParentesis = true;

                finalList.push("Se detecta que el nombre de la funcion en la linea "+list[i][1]+" es muy corto, aumentando la posibilidad de que dicho nombre no sea representativo, se recomienda alargarlo.");

                if(flagD && flagE && flagR)
                {
                    flagD = false;
                    flagE = false;
                    flagR = false;
                }
                else
                {
                    finalList.push("No se detecta una presentacion completa de la funcion en la linea "+list[i][1]+". Se recomienda la incorporacion de:");
                    if(flagD == false)
                    {
                        finalList.push(" - Una descripción.");
                    }
                    if(flagE == false)
                    {
                        finalList.push(" - Mostrar las entradas.");
                    }
                    if(flagR == false)
                    {
                        finalList.push(" - Mostrar los retornos.");
                    }
                }
            }
            else if(list[i][0] == "IF")
            {
                qTab = j+1;
                flagParentesis = true;

                flagD = false;
                flagE = false;
                flagR = false;
            }
            else if(list[i][0] == "WHILE")
            {
                qTab = j+1;
                flagParentesis = true;

                flagD = false;
                flagE = false;
                flagR = false;
            }
            else if(list[i][0] == "ELSEIF")
            {
                qTab = j+1;
                flagParentesis = true;

                flagD = false;
                flagE = false;
                flagR = false;
            }
            else if(list[i][0] == "ELSE")
            {
                qTab = j+1;
                flagParentesis = true;

                flagD = false;
                flagE = false;
                flagR = false;
            }
            else if(list[i][0] == "FOR")
            {
                qTab = j+1;
                flagParentesis = true;

                flagD = false;
                flagE = false;
                flagR = false;
            }
            else if(list[i][0] == "}")
            {
                if(j < qTab)
                {
                    qTab = j;
                }
                flagParentesis = false;
                flagD = false;
                flagE = false;
                flagR = false;
            }
            else if(list[i][0] == "CODE")
            {
                if(j < qTab)
                {
                    qTab = j;
                }
                flagParentesis = false;
                flagD = false;
                flagE = false;
                flagR = false;
            }
        }

        if(flagSeparacionEntrada == false || flagSeparacionProcesamiento == false || flagSeparacionSalida == false)
        {
            finalList.push("No se detectan todos los comentarios de separacion del codigo, le recordamos que el codigo tiene que estar separado en:");
            finalList.push(" - Entrada.");
            finalList.push(" - Procesamiento.");
            finalList.push(" - Salida.");
        }

        return finalList;
    }

    //Render

    render()
    {
        return(
            <section id="PanelSugerencias">
                <Panel bsStyle="info">
                    <Panel.Heading>
                        <Panel.Title>Sugerencias para el código</Panel.Title>
                    </Panel.Heading>
                    <section id="cuerpoPanelSugerencias">
                        <Panel.Body>
                            <ListGroup>
                                {this.handleProblems(this.props.data).map((data) => {return (<ListGroupItem>{data}</ListGroupItem>);})}
                            </ListGroup>
                        </Panel.Body>
                    </section>
                </Panel>
            </section>
        );
    }
}

export default Correction;