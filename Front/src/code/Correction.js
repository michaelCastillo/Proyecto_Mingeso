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



        for(i = 0; i < list.length; i++)
        {
            if(list[i][0] == "TAB")
            {
                if(list[i][1] == actLine)
                {
                    j++;
                }
                else
                {
                    j = 1;
                    actLine = list[i][1];
                }

                if(j > qTab)
                {
                    finalList.push("Se a colocado en la linea "+list[i][1]+" una tabulacion que podria ser innecesaria.");
                }
                
            }
            else if(list[i][0] == "COMMENTD")
            {
                flagD = true;
            }
            else if(list[i][0] == "COMMENTE")
            {
                flagE = true;
            }
            else if(list[i][0] == "COMMENTR")
            {
                flagR = true;
            }
            else if(list[i][0] == "FUNCTION")
            {
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
            else if(list[i][0] == "IF")
            {
                qTab = j+1;

                flagD = false;
                flagE = false;
                flagR = false;
            }
            else if(list[i][0] == "WHILE")
            {
                qTab = j+1;

                flagD = false;
                flagE = false;
                flagR = false;
            }
            else if(list[i][0] == "ELSEIF")
            {
                qTab = j+1;

                flagD = false;
                flagE = false;
                flagR = false;
            }
            else if(list[i][0] == "ELSE")
            {
                qTab = j+1;

                flagD = false;
                flagE = false;
                flagR = false;
            }
            else if(list[i][0] == "FOR")
            {
                qTab = j+1;

                flagD = false;
                flagE = false;
                flagR = false;
            }
            else if(list[i][0] == "CODE")
            {
                flagD = false;
                flagE = false;
                flagR = false;
            }
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