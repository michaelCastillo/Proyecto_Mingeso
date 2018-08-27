import React, {Component} from 'react';
import {Grid,Row,Col,Label,Panel,Well, PanelGroup} from 'react-bootstrap';
import axios from 'axios';
import ReactLoading from "react-loading";
import './teachers.css'


class Teachers extends Component
{

    constructor(props)
    {
        super(props);

        this.state= 
        {
            role:"teacher",
            teachers:[],
            ready:false,
        }

    }

    componentDidMount  = () => 
    {
        let user = {
        role:"teacher"
        };
        axios.post(`http://35.226.163.50:8080/Backend/users/getByRoles`,user)
            .then(res => {
                const teachers=res.data;
                this.setState({ teachers });
                this.setState({ ready:true });
            }).catch(error => {
                console.log(error.response)
            });
    };

    showClasses(teacher)
    {
        return(
            teacher.classes_teachers.map( (classes) =>
                {
                    return(
                        <p>{"- "+classes.classRoom}</p>
                    );
                }
            )
        );
    }

    handleProfesores()
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
                this.state.teachers.map((teacher) => 
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
                                                        {teacher.name}
                                                    </Panel.Title>
                                                </Col>
                                                <Col md={1} sm={6}>
                                                    <a href={`/users/`+teacher.id}><span class="glyphicon glyphicon-eye-open"></span></a>
                                                </Col>
                                            </Row>
                                        </Panel.Heading>
                                        <Panel.Body collapsible>
                                            <Label>Correo:</Label> 
                                            {" "+teacher.email}
                                            <br/>
                                            <br/>
                                            <Label>Carreras:</Label>
                                            <Well style={{background:'#c4def6' }}>
                                                {this.showClasses(teacher)}
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
            <div id="teachers" className = "teachers">
                <br/>
                <br/>
                <br/>
                <Grid>
                    <Row > 
                        <Col md={12} xs={12}>
                            <h1  className="center"><Label id="title">Lista profesores:</Label></h1>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <br/>
                    {this.handleProfesores()}
                </Grid>
            </div>                  
        );



    }

}

export default Teachers;