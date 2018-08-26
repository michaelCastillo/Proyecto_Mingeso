import React, {Component} from 'react';
import {Grid,Row,Col,Label,Panel,Well, PanelGroup} from 'react-bootstrap';
import axios from 'axios';
import ReactLoading from "react-loading";
import './students.css'


class Students extends Component
{

    constructor(props)
    {
        super(props);

        this.state= {
            role:"student", 
            students:[],
            ready:false,
        }
    }

    componentDidMount  = () => {
        let user = {
          role:"student"
        };
        axios.post(`http://35.226.163.50:8080/Backend/users/getByRoles`,user)
            .then(res => {
                const students=res.data;
                this.setState({ students });
                this.setState({ready:true});
            }).catch(error => {
                console.log(error.response)
            });
    };


    showCareers(student)
    {
        return(
            student.careers.map( (carrera) =>
                {
                    return(
                        <p>{"- "+carrera.name}</p>
                    );
                }
            )
        );
    }

    handleAlumnos()
    {
        if(!this.state.ready)
        {
            return(
                <section id="carga">
                    <ReactLoading type={"spin"} color={"#000"} height={667} width={375}/>
                </section>
            );
        }
        else
        {
            return(
                this.state.students.map((student) => 
                {
                    return(
                        <Row className="grid-show">
                            <Col sm ={6} md={12}>
                                <PanelGroup accordion id="accordion-uncontrolled-example" defaultActiveKey="2">
                                    <Panel eventKey="1" bsStyle="primary">
                                        <Panel.Heading style={{background: '#66B3DD'  }}>
                                            <Row>
                                                <Col md={7} ms={12}>
                                                    <Panel.Title toggle>
                                                        {student.name}
                                                    </Panel.Title>
                                                </Col>
                                                <Col md={1} sm={6}>
                                                    <a href={`/users/`+student.id}><span class="glyphicon glyphicon-eye-open"></span></a>
                                                </Col>
                                            </Row>
                                        </Panel.Heading>
                                        <Panel.Body collapsible>
                                            <Label>Correo:</Label> 
                                            {" "+student.email}
                                            <br/>
                                            <br/>
                                            <Label>Carreras:</Label>
                                            <Well style={{background:'#c4def6' }}>
                                                {this.showCareers(student)}
                                            </Well>
                                        </Panel.Body>
                                    </Panel>
                                </PanelGroup>
                            </Col>
                        </Row>
                    );
                })
            );
        }
    }


    render()
    {
        return(
            <div id="students" className = " students"  >
                <br/>
                <br/>
                <br/>
                <Grid>
                    <Row > 
                        <Col md={12} xs={12}>
                            <h1  className="center"><Label id="title">Lista Alumnos:</Label></h1>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <br/>
                    {this.handleAlumnos()}
                </Grid>  
            </div>          
        );
    }

}

export default Students;