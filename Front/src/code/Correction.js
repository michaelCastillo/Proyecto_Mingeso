import React, { Component } from 'react';
import {Panel} from 'react-bootstrap';
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
            if(list[i] == "MIRA")
            {
                finalList.push("Es un mira");
            }
            else if(list[i] == "TAB")
            {
                finalList.push("Soy una Tabulacion");
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
                    <Panel.Body>{this.handleProblems(this.props.data).map((data) => {return (<p>{data}</p>);})}</Panel.Body>
                </Panel>
            </section>
        );
    }
}

export default Correction;