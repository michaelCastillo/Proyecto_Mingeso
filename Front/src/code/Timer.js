
import React, { Component } from 'react';
import { Label } from 'react-bootstrap';



class Timer extends Component{

    constructor(props){
        super(props);
        this.state= {
            //Se deben extraer de la solucion   
            seconds:0,
            time:0,
        };
        this.getInitialState = this.getInitialState.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.tick = this.tick.bind(this);
    }

    getInitialState = () =>{

        // This is called before our render function. The object that is 
        // returned is assigned to this.state, so we can use it later.
        
        return { elapsed: 0 };
    };

    componentDidMount =() => {
        //1 tick cada 1 segundo.
        this.setState({time:this.props.time});
        this.timer = setInterval(this.tick, 1000);
    };

    tick = () =>{
        
        this.setState({elapsed: new Date() - this.props.start});
        var elapsed = Math.round(this.state.elapsed / 100);
        var seconds = (elapsed / 10).toFixed(1);  
        var timeFromProps =  parseInt(this.props.time);
        seconds = parseInt(seconds) + timeFromProps;
        this.setState({time:seconds});
    }

    render(){
        
        
        var elapsed = Math.round(this.state.elapsed / 100);
        elapsed += this.props.time;
        var seconds = (elapsed / 10).toFixed(1);    
        
        return(
            <div> 
                

            </div>
        );
    }

}

export default Timer;