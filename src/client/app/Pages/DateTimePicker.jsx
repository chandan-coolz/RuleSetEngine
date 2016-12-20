import React from 'react';
import {render} from 'react-dom';
import {updateValue}  from '../actions/RuleAction.jsx';
import RuleStore from '../stores/RuleStore.jsx';



export default class DateTimePicker extends React.Component {

componentDidMount() {
    
    $(this.refs.dateTimePicker).datetimepicker({
              dateFormat: "d MM, yy",
              timeFormat: "hh:mm TT"
            });

   if(this.props.servicePropertyValue!=""){
       let tempDateTime=dateFormat(this.props.servicePropertyValue, "d mmmm, yyyy hh:MM TT") ;
     $(this.refs.dateTimePicker).val(tempDateTime);
    }else{
            let newDateTime =  dateFormat(new Date(), "mm-dd-yyyy HH:MM:ss");
            RuleStore.updateValue(this.props.secName,this.props.rulePosition,this.props.triggerObject,newDateTime);

            let tempDateTime=dateFormat(newDateTime, "d mmmm, yyyy hh:MM TT") ;
            $(this.refs.dateTimePicker).val(tempDateTime);

    }



    $(this.refs.dateTimePicker).change(function(e){
      //fire your ajax call  

      let newDateTime =  dateFormat(e.target.value, "mm-dd-yyyy HH:MM:ss");
      
      updateValue(this.props.secName,this.props.rulePosition,this.props.triggerObject,newDateTime);


   }.bind(this));
}

  componentWillUnmount() {
    
    $(this.refs.dateTimePicker).datetimepicker('destroy');
  }


render() {
    const props = this.props;
    return <input type="text" ref="dateTimePicker" readOnly='true'/>
  }



}//DateTimePicker