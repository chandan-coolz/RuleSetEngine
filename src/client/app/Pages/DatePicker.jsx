import React from 'react';
import {render} from 'react-dom';
import {updateValue}  from '../actions/RuleAction.jsx';
import RuleStore from '../stores/RuleStore.jsx';
export default class DatePicker extends  React.Component {

  componentDidMount() {
    
    $(this.refs.datePicker).datepicker({
       dateFormat: "d MM, yy"
      });
    if(this.props.servicePropertyValue!=""){
       let tempDate=dateFormat(this.props.servicePropertyValue, "d mmm, yyyy") ;
     $(this.refs.datePicker).val(tempDate);
    }else{
      let d = new Date();
      d.setHours(0,0,0,0);
      let newDate = dateFormat(d, "mm-dd-yyyy HH:MM:ss") ; 
      RuleStore.updateValue(this.props.secName,this.props.rulePosition,this.props.triggerObject,newDate);

      let tempDate=dateFormat(newDate, "d mmm, yyyy") ;
      $(this.refs.datePicker).val(tempDate);

    }


    $(this.refs.datePicker).change(function(e){
      //fire your ajax call  
    
      let newDate = dateFormat(e.target.value, "mm-dd-yyyy HH:MM:ss") ;

    
      updateValue(this.props.secName,this.props.rulePosition,this.props.triggerObject,newDate);


   }.bind(this));
}

  componentWillUnmount() {
    
    $(this.refs.datePicker).datepicker('destroy');
  }


render() {
    
    return <input type="text" ref="datePicker" readOnly='true'/>
  }



}//DatePicker