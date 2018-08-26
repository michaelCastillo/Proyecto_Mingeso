import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';





class ResultChart extends Component{

/*
const data = [
            {title: "Data 2", value: 1, color: "#ff0000"},
            {title: "Data 3", value: 1, color: "#00ff00"},
          ]
           */
    constructor(props){
        super(props);
        console.log("as => "+this.props.nsucc);
        this.state ={
            
        }   
    }

    
    


    render(){
        console.log("data");
        console.log(this.state.data);
        return(
        <Doughnut data={this.state.data} />
                            
    )}

}
export default ResultChart;