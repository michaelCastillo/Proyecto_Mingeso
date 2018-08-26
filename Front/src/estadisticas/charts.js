import React, { Component } from 'react';
import ScrollArea from 'react-scrollbar';

import './charts.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Well, Row, Col,FormGroup,ControlLabel,FormControl,Button,Grid } from 'react-bootstrap';
import moment, { relativeTimeThreshold } from 'moment';
import axios from 'axios';
import ChartLine from './chartsLine'
import TimeChart from './time'

import { TreeSelect, Spin } from 'antd';
import 'antd/dist/antd.css';
import ReactLoading from "react-loading";




const TreeNode = TreeSelect.TreeNode;

export default class Chart extends Component {

    constructor (props) {
        super(props)
        this.state = {
          startDate:  moment(),
          userList:[],
          value: '',
          type: '',
          chartcomponent : false,
          userID: 0,
          listItems:[],
          userList2:[],
          bool:false,
          bool1:true,
          //TREESELECT
          value: undefined,
          userCoord: [],
          userCareer:[],
          classCord:[],
          studentCareer:[],
          classStudent:[],
          showitems:[],
          classes:[],
          stuclass:[],
          ready:false,
          signal:false
        };
        this.startDate = React.createRef();

        this.chart =  React.createRef();
        this.timeChart = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleValue = this.handleValue.bind(this);
       
        
        
        this.onChange = this.onChange.bind(this);
        this.updateCharts = this.updateCharts.bind(this);

      }

   

    

   
    handleValue(event){
        this.state.bool = false;
        this.state.chartcomponent = false;
        this.state.value =  event.target.value ;
        console.log(this.state.value);
       // this.gets(this.state.value);

      }

    handleChange(date) {
        this.setState({
          startDate: date
        });
      }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }


// TRESELECT

componentDidMount(){
    axios.get(`http://35.226.163.50:8080/Backend/users/simple`)
        .then(res => {
            const userCareer=res.data.careers;
            const userCoord=res.data.coordinations;

            let result = []; 
            res.data.careers.map((scareer,id)=>
            <li key={id}>
            {result.push(scareer.students_career)}
             </li>     
             );

            const classStudent = result ;

            let result1 = []; 
            res.data.coordinations.map((coord,id)=>
            <li key={id}>
            {result1.push(coord.classes)}
             </li>     
             );

            const classes = result1 ;

            let result2 = []; 
            classes.map((stucl,id)=>

                stucl.map((st,idx)=>
                {result2.push(st.students)}
                )

             );

            const stuclass = result2;


            //SETSTATE 
            this.setState({ userCareer,userCoord,classStudent,classes,stuclass,ready:true });
             
            console.log(userCareer);
            console.log(userCoord);
          

        }).catch(error => {
            console.log(error.response)
        });

}

onChange = (value) => {
    console.log(value);
    this.state.bool = false;
    this.state.chartcomponent = false;
    this.state.value = value;
    
  if(value){  
    var values = value.split('-');
    console.log(values);
    var userId = 0;
    var type = "";
  
    switch(values.length){
        case 0:
            console.log("nada seleccionado");
            
            break;
        case 1:
            console.log("se seleccionó una de las opciones principales");
            break;
        case 2:
            console.log("se seleccionó una carrera o una coordinacion");
                if(values[0]==='0'){
                    console.log("Se seleccionó la carrera "+values[1]);
                    userId= values[1];
                    type= "careers";
                }else if(values[0]==='1'){
                    userId= values[1];
                    type= "coordinations";
                    console.log("Se seleccionó la coordinación "+values[1]);
                }
                
                break;
            case 3:
                if(values[0]==='0'){
                    userId= values[2];
                    type= "student";
                    console.log("Se seleccionó el alumno "+values[2] +" de la carrera "+values[1]);
                }else if(values[0]==='1'){
                    userId= values[2];
                    type= "classes";
                    console.log("Se seleccionó la clase "+values[2]+" de la coordinación "+values[1]);
                }
                break;
            case 4:
                userId=values[3];
                type= "student";
                console.log("Se seleccionó el alumno "+ values[3]+" de la clase "+values[2]+" de la coordinación "+values[1]);
            break;
            }            
    }
    this.setState({
        userID :userId,
        type : type
    });


  }    

  onChange1 = (value) => {
    console.log(value);
    this.state.bool = false;
    this.state.chartcomponent = false;
    this.state.value = value;
  }    

  comprobarValue(value,idString){

    if(value != idString){
      //  console.log( "soyid:", idString);
        return idString;

    }
    //console.log("soyvalue:", value);
    return value;

  }

  updateCharts(){
    this.state.chartcomponent=true;
      this.chart.current.handleButton();
      this.timeChart.current.handleButton();
  }



    render() {
    
    const role = localStorage.getItem('role');
    const id = localStorage.getItem('userId');
    if(role === "student"){
        
        this.state.type = "student";   
        this.state.userID = id;

    }

      let component = null;
      let component2 = null;

    if((this.state.type) !== ""){

        this.state.chartcomponent=true;        


       } 
       console.log(this.state.chartcomponent);

     if (this.state.chartcomponent){
        component = <ChartLine ref = {this.chart} userID = {this.state.userID}  type = {this.state.type} signal={this.state.signal} /> ;
        component2 = <TimeChart   ref = {this.timeChart} userID = {this.state.userID}  type = {this.state.type} signal={this.state.signal}/> ;

    }

   
   var cords = this.state.userCoord.map((classcoord,id) =>{
        var idString = '1-'+classcoord.id.toString()
        return{
            title: classcoord.code,
            value: idString,
            key: classcoord.id,
            value:this.comprobarValue(this.value,idString),
            children:this.state.classes[id].map((stu,idx) =>{
                var idString1 = idString+'-'+stu.id.toString()
                 return{
                     title : stu.code,
                     value: idString1,
                     key : stu.id ,
                     children:this.state.stuclass[idx].map((stud,idy) =>{
                      var idString2 = idString1+'-'+stud.id.toString()
                 return{
                         title : stud.name,
                         value: idString2,    
                         key : stud.id ,
                     }

             })   

                 }

             })
            
         }
    }
    
    )
   console.log(cords);
    var car = this.state.userCareer.map((cards,i) =>{
        var idString = '0-'+cards.id.toString()
        return{
               title: cards.name,
                value: idString,
                key: cards.id,
                children: this.state.classStudent[i].map((stu,idx) =>{
                    var idString2 = stu.id.toString()
                   
                    return{
                        title : stu.name,
                        value: idString+'-'+idString2,    
                        key : stu.id    

                    }

                })
             }
        }
        )

    console.log(car);    
  
    const treeData1 = [{
        title: 'coordinacion',
        value: 'coordinations',
        key: '1',
        children: cords
        },
        {
        title: 'Carrera',
        value: 'coordinations',
        key: '0',
        children: car
        }
    
    
    ];

    const treeData = [{
        title: 'carrera(s)',
        value: 'careers',
        key: '0-1',
        children: car
      }];
if(role === "student"){
    
    
    return(

        
        
        <Grid>
        <Row className="updateButton" ><Button bsStyle="info" onClick={this.updateCharts}>Actualizar</Button></Row>
            
        <Row className="rowCharts">
            <Col  md={5} className="lineChart">
            
            {component}

            
            </Col>

            <Col  md={5} className="timeCircle">
                {component2}
            </Col>
        </Row>
        </Grid>
    )
}

else{
      if(this.state.ready !== true ){
            
        return(
            
         <div>
            <Col className="firstSpin"> 
            <Spin tip="Cargando ..." size="large">
            </Spin>
          </Col>
        </div>
        )
      } 
      
        return (
            <Grid className="containerStatics">
                <Row> 
                    <h4 className="title">
                        <ControlLabel>Seleccione categoría de alumnos, de los cuales desea conocer estadísticas: </ControlLabel>
                    </h4>
                </Row>
                <Row>
                        <Col  className="treeSelect">
                            <TreeSelect 
                                showSearch
                                style={{ width: 300 }}
                                value={this.state.value}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="Seleccione coordinación"
                                allowClear
                                onChange={this.onChange} 
                                treeData={treeData1}    
                            />
                                <Button className="aceptButton" bsStyle="info" onClick={this.updateCharts}> Aceptar </Button>
                            
                        </Col>
                        <Col >
                        </Col>
                </Row>
                <Row className="rowCharts">
                <Col  md={5} className="lineChart">
                  
                  {component}

                   
                 </Col>

                <Col  md={5} className="timeCircle">
                    {component2}
                </Col>
                </Row>
            </Grid>
            );
        }   
          }
        }
        
        