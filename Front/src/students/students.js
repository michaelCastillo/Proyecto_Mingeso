import React, {Component} from 'react';
import {ListGroup,ListGroupItem,Grid,Row,Col,Label,Button} from 'react-bootstrap';
import axios from 'axios';


class Students extends Component{

  constructor(props){
    super(props);

    this.state= {
        students:[]
    }

  }

  componentDidMount() {
            
    axios.get(`http://46.101.81.136:8181/Backend/student/`)
        .then(res => {
            const  students = res.data;
            this.setState({students});
        }).catch(error => {
            console.log(error.response)
        });
  };

render(){
    return(
      <div id="students" className = " students">
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
                    { 
                      this.state.students.map((student) => {
                        return (
                      <Row className="grid-show">
                          <Col sm ={6} md={12}>  
                            <ListGroup>
                                  
                            <ListGroupItem style={{background:'#66B3DD'}} href={`/alumnos/${student.id}`}> {student.name}</ListGroupItem>
                            </ListGroup>
                          </Col>
                      </Row>

                     );})
                  }
                </Grid>  
        </div>                  

                  
    );



}

}

export default Students;