import React from 'react';
import {render} from 'react-dom';
import RuleStore from '../stores/RuleStore.jsx';
import {updateValue}  from '../actions/RuleAction.jsx';


export default class TimePicker extends React.Component {

componentDidMount() {

    
    if(this.props.servicePropertyValue!=""){
       let tempTime = dateFormat(dateFormat("mm-dd-yyyy") + " " + this.props.servicePropertyValue, "HH:MM");
      // let tempTime=dateFormat(this.props.servicePropertyValue, "HH:MM:ss") ;
         let d = new Date();
         let timeToSet = tempTime.split(":");
         d.setHours(timeToSet[0]);
         d.setMinutes(timeToSet[1]);
        $(this.refs.timePicker).timepicker({timeFormat: "hh:mm TT"}).datetimepicker("setDate", d );


    } else{
    
     $(this.refs.timePicker).timepicker({timeFormat: "hh:mm TT"}).datetimepicker("setDate", new Date());
     let newTime =  dateFormat($(this.refs.timePicker).datepicker("getDate"), "HH:MM:ss") ;
     RuleStore.updateValue(this.props.secName,this.props.rulePosition,this.props.triggerObject,newTime);
    
    }


    $(this.refs.timePicker).change(function(e){
      //fire your ajax call  
     let newTime =  dateFormat($(this.refs.timePicker).datepicker("getDate"), "HH:MM:ss") ;
     updateValue(this.props.secName,this.props.rulePosition,this.props.triggerObject,newTime);

   }.bind(this));
}


componentWillUnmount() {

    $(this.refs.timePicker).timepicker('destroy');
    $(this.refs.timePicker).datepicker('destroy');
}


componentDidUpdate(prevProps, prevState) {

     if(this.props.servicePropertyValue==""){
         this.refs.timePicker.value = "";
       }
}




render() {
    const props = this.props;
    return <input type="text" ref="timePicker" readOnly='true'/>
  }



}//time  picker