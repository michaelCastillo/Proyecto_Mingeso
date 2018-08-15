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
          stuclass:[]
        };
        this.startDate = React.createRef();

        this.chart =  React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleValue = this.handleValue.bind(this);
        this.gets = this.gets.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.changeComponentStatus = this.changeComponentStatus.bind(this);
        this.boolNext = this.boolNext.bind(this);
        this.onChange = this.onChange.bind(this);

      }

      changeComponentStatus(event){
        
        if (this.state.chartcomponent){
            this.setState({chartcomponent:false});
        } else {
            this.setState({chartcomponent:true});
        }   

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

   

      gets =(type) => {
          console.log(type);
        axios.get(`http://35.226.163.50:8080/Backend/` + type)
            .then(res => {
                const userList=res.data;
                this.setState({ userList });
                console.log(res.data);
                this.state.type = type;
                this.state.listItems = userList.map((userl) =>
                <li key={userl.id}>
                     {userl.code}
               </li>
                )             
                this.state.bool=true;  
                this.state.bool1=true;  

    
            }).catch(error => {
                console.log(error.response)
            });
      };

      getCarrerStudent =(id) => {
        axios.get('http://35.226.163.50:8080/Backend/careers/' + id +'/getStudents/')
            .then(res => {
                const userList=res.data;
                this.setState({ userList });
                console.log(res.data);
                this.state.type = "student";
                this.state.listItems = userList.map((userl) =>
                <li key={userl.id}>
                     {userl.code}
               </li>
                ) 
                this.state.bool=true;  
                this.state.bool1=false;  


                
            }).catch(error => {
                console.log(error.response)
            });
      };
    

      getClasseStudent =(id) => {
        axios.get('http://35.226.163.50:8080/Backend/classes/' + id +'/students/')
            .then(res => {
                const userList=res.data.students;
                this.setState({ userList });
                console.log(res.data);
                this.state.type = "student";  
                this.state.bool=true;  
                this.state.bool1=false;  

              
            }).catch(error => {
                console.log(error.response)
            });
            this.state.type = "student";


      };

      getClasesCoord =(id) => {
        
        axios.get('http://35.226.163.50:8080/Backend/coordinations/' + id +'/getClasses/')
            .then(res => {
                const userList=res.data;
                this.setState({ userList });
                console.log(res.data);
                this.state.type = "classes";
                this.state.bool=true;  
                this.state.bool1=true;  

            }).catch(error => {
                console.log(error.response)
            });
      };
      
  

      handleInputChange(event) {
        const target = event.target;
        var value = target.type === 'radio' ? target.checked : target.value;
        const name = target.name;
        this.state.chartcomponent = false;
        this.setState({
          [name]: value
        });

        this.state.userID = target.value;
        console.log(this.state.userID);

       
          
      }

      
    boolNext(event){

     console.log(this.state.value);   
     console.log(this.state.type);   

    if((this.state.value === "careers") )  
    {  this.getCarrerStudent(this.state.userID);
       this.state.value = "";
       this.state.type = "";
      
    }
    
    console.log(this.state.userID)
    if(this.state.value === "coordinations")
    {this.getClasesCoord(this.state.userID);
      this.state.value = "";


    }


    if(this.state.type === "classes")
    {
    
      this.getClasseStudent(this.state.userID);

      
    }


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
            console.log(classes);

            let result2 = []; 
            classes.map((stucl,id)=>

                stucl.map((st,idx)=>
                {result2.push(st.students)}
                )

             );

            const stuclass = result2;

            console.log(stuclass);

            //SETSTATE 
            this.setState({ userCareer,userCoord,classStudent,classes,stuclass });
             
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
  }    


    render() {
    
    const role = localStorage.getItem('role');
    const id = localStorage.getItem('userId');
    if(role === "student"){
        this.state.chartcomponent = true;
        this.state.type = "student";   
        this.state.userID = id;

    }

      let component = null;
      let component2 = null;

    //console.log(this.state.chartcomponent);
     if (this.state.chartcomponent){
        component = <ChartLine ref = {this.chart} userID = {this.state.userID}  type = {this.state.type}/> ;
        component2 = <TimeChart   ref = {this.chart} userID = {this.state.userID}  type = {this.state.type}/> ;

    }

    console.log(this.state.stuclass);
   var cords = this.state.userCoord.map((classcoord,id) =>{
    return{
           title: classcoord.code,
            value: classcoord.id,
            key: id,
            children:this.state.classes[id].map((stu,idx) =>{
               // console.log(stu.id);
                 return{
                     title : stu.code,
                     value: stu.id,    
                     key : idx ,
                    children:this.state.stuclass[idx].map((stud,idy) =>{
                    // console.log(stu.id);
                 return{
                         title : stud.name,
                         value: stu.id,    
                         key : idy ,
                   

                     }

             })   

                 }

             })
            
         }
    }
    
    )
   
    var car = this.state.userCareer.map((cards,i) =>{
        var ids = cards.id;
       // console.log(ids);
        return{
               title: cards.name,
                value: ids,
                key: i,
                children:this.state.classStudent[i].map((stu,idx) =>{
                 //  console.log(stu.id);
                   
                    return{
                        title : stu.name,
                        value: stu.id,    
                        key : idx    

                    }

                })
             }
        }
        )

  
    const treeData1 = [{
        title: 'coordinacion(es)',
        value: 'coordinations',
        key: '0-0',
        children: cords
      }];

    const treeData = [{
        title: 'carrera(s)',
        value: 'careers',
        key: '0-1',
        children: car
      }];



        return (
            <div>
                <Row> 
                  {component}

                   <br/>     
                
                  {component2}
                 <br/>
                 <br/>

                 <Col smOffset = {4}>
                 <h4>
                 <ControlLabel>Seleccione categoría de estadísticas a mostar: </ControlLabel>
                 </h4>
                 </Col>
                <br/>
                <br/>
                 <Row smOffset = {6}>

                    <Col   md={4} xs={4}  smOffset = {2}>
                         <TreeSelect
                            showSearch
                            style={{ width: 300 }}
                            value={this.state.value}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Seleccione carrera"
                            allowClear
                            onChange={this.onChange} 
                            treeData={treeData}    
                        />
                    </Col>
            
           

             
                    <Col  md={4} xs={4}  smOffset = {1} >

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

                    </Row>
                </Row>
            
 
                

              
            
              </div>

            );
          }
        }
        
        