import React, { Component } from 'react';
import ScrollArea from 'react-scrollbar';
import 'react-datepicker/dist/react-datepicker.css';
import { Well, Row, Col,FormGroup,ControlLabel,FormControl,Button,Grid } from 'react-bootstrap';
import moment, { relativeTimeThreshold } from 'moment';
import axios from 'axios';
import ChartLine from './chartsLine'
import TimeChart from './time'

import { TreeSelect } from 'antd';
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




    

    rolesComponent(){

        const role = localStorage.getItem('role');
       if(role != "student"){
        return[


            <Col md={6} smOffset={2} xs={6} >
            <FormGroup controlId="formControlsSelect">
            <ControlLabel>Seleccione gráfico a mostrar</ControlLabel>
            <FormControl componentClass="select" // onChange={this.handleValue} 
              >
              
             <option disabled="true" selected ="true">...</option>
             <option  value="coordinations" key ={1}>coordinación(nes)</option>
             <option value="careers" key = {2} >carrera(s)</option>
            </FormControl>
            </FormGroup>
            
            <ScrollArea speed={0.8} className="area2" contentClassName="content"
             horizontal={false} style={{ height: 200 , width:500 }}  >
        
            <Well>
            {this.state.listItems}
            </Well>
            
            </ScrollArea>
            

            <br/>
            <Button bsStyle="info" onClick = {this.changeComponentStatus} disabled = {!this.state.bool}>Mostrar estadística</Button>
            <Col md={3} smOffset={1} xs={6} >
            <Button onClick = {this.boolNext} disabled = {!this.state.bool1}>Siguiente</Button>

            </Col>
            </Col>

            
        ]


       }
      

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
                userId= values[2];
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

      if(this.state.ready !== true ){
            
        return(
            
         <div>
            <Col smOffset = {4}> 
          <ReactLoading type={"spin"} color={" #2876e1 "} height={100} width={100} />
          </Col>
        </div>
        )
      } 
      
        return (
            <div>
                <Row> 
                 <Col smOffset = {3}>
                 <h4>
                 <ControlLabel>Seleccione categoría de estadísticas a mostar: </ControlLabel>
                 </h4>
                 </Col>
                <br/>
                
                <br/>
                 <Row smOffset = {5}>
             
                    <Col  md={4} xs={4}  smOffset = {3} >

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
                    </Col>
                   <br/>
                   <br/>
                   <br/>
                   <br/>
                   <br/>
                   <br/>
                   <br/>
                <Col  md={5} xs={5}  smOffset = {1} >
                  
                  {component}

                   
                 </Col>

                <Col  md={4} xs={4}  smOffset = {1} >
                    {component2}
                </Col>

                    </Row>
                </Row>
            
 
                

              
            
              </div>

            );
          }
        }
        
        