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
        var finalList = [];
        for(i = 0; i < list.length; i++)
        {
            if(list[i] == "TAB")
            {
                finalList.push("Tabulacion");
            }
            else if(list[i] == "COMMENTD")
            {
                finalList.push("Comentario descriptivo");
            }
            else if(list[i] == "COMMENTR")
            {
                finalList.push("Comentario con Retorno");
            }
            else if(list[i] == "COMMENTE")
            {
                finalList.push("Comentario con Entrada");
            }
            else if(list[i] == "COMMENT")
            {
                finalList.push("Comentario");
            }
            else if(list[i] == "FUNCTION")
            {
                finalList.push("Funcion");
            }
            else if(list[i] == "CODE")
            {
                finalList.push("Codigo");
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
                    <Panel.Body>
                        <ListGroup>
                            {this.handleProblems(this.props.data).map((data) => {return (<ListGroupItem>{data}</ListGroupItem>);})}
                        </ListGroup>
                    </Panel.Body>
                </Panel>
            </section>
        );
    }
}

export default Correction;