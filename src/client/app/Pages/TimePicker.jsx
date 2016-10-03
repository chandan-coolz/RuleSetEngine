import React from 'react';
import {render} from 'react-dom';
import {updateValue}  from '../actions/RuleAction.jsx';


export default class TimePicker extends React.Component {

  componentDidMount() {
  
    $('.'+this.props.triggerObject.id).timepicker({timeFormat: "hh:mm TT"}).datetimepicker("setDate", new Date());
    let newTime =  dateFormat($('.'+this.props.triggerObject.id).datepicker("getDate"), "HH:MM:ss") ;
     updateValue(this.props.triggerObject,newTime);

    $('.'+this.props.triggerObject.id).change(function(e){
      //fire your ajax call  
     
     let newTime =  dateFormat($('.'+this.props.triggerObject.id).datepicker("getDate"), "HH:MM:ss") ;
     updateValue(this.props.triggerObject,newTime);

   }.bind(this));
}

  componentWillUnmount() {
     
    $('.'+this.props.triggerObject.id).timepicker('destroy');
    $('.'+this.props.triggerObject.id).datepicker('destroy');
  }


render() {
    const props = this.props;
    return <input type="text" className={this.props.triggerObject.id} readOnly='true'/>
  }



}//time  picker