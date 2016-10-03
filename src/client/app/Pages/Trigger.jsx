import React from 'react';
import {render} from 'react-dom';
import ComboAjax from './ComboAjax.jsx';
import DynamicCampaignConfig from '../stores/dynamicCampaignConfig.jsx';
import * as RuleAction from '../actions/RuleAction.jsx';
import DatePicker from './DatePicker.jsx';
import TimePicker from './TimePicker.jsx';
import DateTimePicker from './DateTimePicker.jsx';

export default class Trigger extends React.Component {

constructor(){

super();


this.state = {
   dyn__assetSourceServiceList : DynamicCampaignConfig.getDynamicCampaignConfig(),
   dyn__operations   : DynamicCampaignConfig.getOperations(),
   serviceKey:{},
   value:"",
   options:"",
   isOptionChanged:false,
   currentObject:"",
   timePickerClass:"hide",
   dateTimePickerClass:"hide"

}



} //constructor

componentWillMount(){

/* get the  value of trigger */
 var trigger = this.props.trigger;
 var keys= Object.keys(trigger);
 var serviceData = keys[2].split(":"); //get the 3rd property
 var service = serviceData[0];
 var serviceProperty = serviceData[1].split(".")[1];

let currentObject = this.state.dyn__assetSourceServiceList[service][serviceProperty]; 
        
 this.setState({currentObject:currentObject});
  //


}//component willmount


componentWillReceiveProps(newProps) {    

    

/* get the  value of trigger */
 var trigger = newProps.trigger;
 var keys= Object.keys(trigger);
 var serviceData = keys[2].split(":"); //get the 3rd property
 var service = serviceData[0];
 var serviceProperty = serviceData[1].split(".")[1];

let currentObject = this.state.dyn__assetSourceServiceList[service][serviceProperty]; 
  

  this.setState({currentObject:currentObject});

  
  //

}//componentWillUpdate

/** delete trigger**************************************************************************/

deleteTrigger(){

RuleAction.deleteTrigger(this.props.parentCondition,this.props.trigger.id);

}//delete trigger


/************service name method************************************************************/
getServiceNames(){
   
let serviceName = [];
for ( let key of Object.keys(this.state.dyn__assetSourceServiceList) ) {
   

       serviceName.push(<option key={key} >{this.state.dyn__assetSourceServiceList[key].name}</option>);
       this.state.serviceKey[this.state.dyn__assetSourceServiceList[key].name]=key;
} //for

return  serviceName;
 
}//end of select service


serviceValueChanged() {
let serviceName = this.refs.selectedServiceValue.value;
let serviceKey = this.state.serviceKey[serviceName];
let defaultserviceProperty =  Object.keys(this.state.dyn__assetSourceServiceList[serviceKey])[1];
let newcomparator = this.state.dyn__assetSourceServiceList[serviceKey][defaultserviceProperty].operations[0];            
let newkey = serviceKey+":"+serviceKey+"."+defaultserviceProperty;
RuleAction.updateTriggerServiceName(this.props.trigger,newcomparator,newkey);
    

}//serviceValueChanged end here


/***********************************service propertymethod******************************************************/

getServicePropertiesNames(currentSelectedService){

let currentServiceObject = this.state.dyn__assetSourceServiceList[currentSelectedService];

let  servicePropertyNames = Object.keys(currentServiceObject).filter( (key) => key!="name").map(
     (key) => <option key={key} value={key}>{key} </option>
  );


return servicePropertyNames


} //getServicePropertiesName end here

servicePropertyValueChanged(){



let serviceName = this.refs.selectedServiceValue.value.trim();
let serviceKey = this.state.serviceKey[serviceName];
let serviceProperty = this.refs.selectedServicePropertyValue.value.trim();
let newcomparator = this.state.dyn__assetSourceServiceList[serviceKey][serviceProperty].operations[0];            
let newkey = serviceKey+":"+serviceKey+"."+serviceProperty;
RuleAction.updateTriggerServiceName(this.props.trigger,newcomparator,newkey);

    

} //endof servicePropertyValueChanged


/********************************operation method*******************************************************/
getOperations(currentSelectedService,currentSelectedServiceProperty){

let operations = this.state.dyn__assetSourceServiceList[currentSelectedService][currentSelectedServiceProperty]
                  .operations.map( (operation) => 
                    <option key={operation}>{this.state.dyn__operations[operation]}</option> );
return operations;

}//get operations

serviceOperatorValueChanged(){

  RuleAction.updateOperator(this.props.trigger,this.refs.operation.value);

}//serviceOperatorValueChanged end here


/**************realtimesearch**************************************************************/
showSuggestion(serviceKey,servicePropertykey){
     
let searchText = this.refs.comboajax.value;
let url = "http://qaslate.jivox.com/studio/api/"+this.state.currentObject.values_url+
            "?service="+serviceKey+"&property="+servicePropertykey+"&prefix="+searchText; 
RuleAction.updateValue(this.props.trigger,searchText);

 if(searchText.trim().length>0  ){

    // ajax call to php to load data
     var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
         let data= JSON.parse(xhttp.responseText);
         if(data){
         this.setState({options:data,isOptionChanged:true});
         }
        

    } //if
  }.bind(this);
  xhttp.open("GET",url, true);
  xhttp.send();

}else {


this.setState({options:""});


}//else


}//show Suggestion

comboAjaxOnBlur(){

  this.setState({isOptionChanged:false});
}

/* combo box value change method *************************************/
comboBoxValueChange(){
 
let comboBoxValue = this.refs.comboBoxValue.value;

RuleAction.updateValue(this.props.trigger,comboBoxValue);

}


/* text box value change  method ****************************************/
textBoxValueChange(){
let textBoxValue = this.refs.textBoxValue.value;
RuleAction.updateValue(this.props.trigger,textBoxValue);

}


/************************time picker clicked*************************************************/
timePickerClicked(){
  this.setState({timePickerClass:""});
    setTimeout(function(){
    
    this.refs.timePicker.focus();
  }.bind(this),50);
} 

hideTimePicker(){

this.setState({timePickerClass:"hide"});
}//hideTimePicker


/*****************date timepicker method ******************************************************/
dateTimePickerClicked(){

this.setState({dateTimePickerClass:""});
    setTimeout(function(){
    
    this.refs.dateTimePicker.focus();
  }.bind(this),50);

}//dateTime Picker Clicked

hideDateTimePicker(){
this.setState({dateTimePickerClass:"hide"});

}//hideDateTimePicker


render(){



/* get the  value of trigger */
 var trigger = this.props.trigger;
 var keys= Object.keys(trigger);

 var serviceData = keys[2].split(":"); //get the 3rd property
 var service = serviceData[0];
 var serviceProperty = serviceData[1].split(".")[1];
 var operator = trigger["comparator"];
 var servicePropertyValue = trigger[keys[2]];

/* end of get the trigger value */





let serviceNames= this.getServiceNames();
let servicePropertyNames = this.getServicePropertiesNames(service);
let operations = this.getOperations(service,serviceProperty);

/* gettin the value to display here  */

switch(this.state.currentObject.type ){

case "comboajax":
     var value =       <div>
            <input type="text"  ref="comboajax" onBlur={this.comboAjaxOnBlur.bind(this)} value={servicePropertyValue} onChange={this.showSuggestion.bind(this,service,serviceProperty)} />
            <ComboAjax isOptionChanged={this.state.isOptionChanged} options={this.state.options} triggerObject={this.props.trigger}/>
            </div>
      break;
case "combo":
      let keys = Object.keys(this.state.currentObject.values);
      let option = keys.map((v,i)=><option key={i}>{v}</option>);
      var value = <select value={servicePropertyValue} ref="comboBoxValue"
      onChange={this.comboBoxValueChange.bind(this)}>{option}</select>
     break;

case "text":
      var value=<input type="text" value={servicePropertyValue} ref="textBoxValue"
       onChange={this.textBoxValueChange.bind(this)}
       />
      break;

case "date":
      var showDate = servicePropertyValue;
      if(servicePropertyValue){
      //month array fordisplaying month
      let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      let currentdate = servicePropertyValue.split(" ")[0].split("-");
      var showDate = currentdate[1]+" "+month[parseInt(currentdate[0])]+", "+currentdate[2];

      
      }
      var value = 
                 <DatePicker  triggerObject={this.props.trigger}   />
      break;

case "time" :

     var value =    <TimePicker triggerObject={this.props.trigger}/>
    break;
                  
case "datetime":
         /* var showDateTime = servicePropertyValue;
          if(servicePropertyValue){ 
         
                 //month array fordisplaying month
             let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
             let seperateDateTime = servicePropertyValue.split(" ");       
             let currentdate = seperateDateTime[0].split("-");
             var showDate = currentdate[1]+" "+month[parseInt(currentdate[0])]+", "+currentdate[2];

             
             
             let meridiem = "PM";
             let currentTimeValue = seperateDateTime[1].split(":");
             let hour = parseInt(currentTimeValue[0]);
             if(hour==0){
               meridiem="AM";
               hour=12;          
               }else if(hour>12){
                hour=hour-12;
               }else if(hour>0 && hour<12){
               meridiem="AM";
               }
               hour= hour>9?""+hour:"0"+hour;
             var showTime = hour+":"+currentTimeValue[1]+" "+meridiem;
             showDateTime = showDate+" "+showTime;

           }//if
       var value= <div className="date-time-picker">
                 <input type="text" value={showDateTime} size="33"
                   onClick={this.dateTimePickerClicked.bind(this)}
                 />
                 <div tabIndex="0" className={this.state.dateTimePickerClass}
                  onBlur={this.hideDateTimePicker.bind(this)} ref="dateTimePicker"
                 >
                 <span className="arrow-up"> </span>
                 <DateTimePicker triggerObject={this.props.trigger} />
                 </div>

                 </div> */
        var value = <DateTimePicker triggerObject={this.props.trigger} />         

}



return (
   

   
   <tr>
       <td>
           <select value={this.state.dyn__assetSourceServiceList[service].name} ref="selectedServiceValue" 
           onChange={this.serviceValueChanged.bind(this)}>

                 {serviceNames}
            </select>
       </td>
       <td>
            <select value={serviceProperty} ref="selectedServicePropertyValue"
             onChange={this.servicePropertyValueChanged.bind(this)} >
               {servicePropertyNames}
            </select>
       </td>
       <td>
            <select value={operator} ref="operation" 
              onChange={this.serviceOperatorValueChanged.bind(this)}
            >
                   {operations}
            </select>
         
       </td>
       <td>
         {value}
       </td>
       <td>
         <i className="fa fa-trash" aria-hidden="true" onClick={this.deleteTrigger.bind(this)}></i>
       </td>
</tr>
    


  

);


}

} //ruleclass