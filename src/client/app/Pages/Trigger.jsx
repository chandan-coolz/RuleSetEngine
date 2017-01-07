import React from 'react';
import {render} from 'react-dom';
import ComboAjax from './ComboAjax.jsx';
import SelectStyle from './SelectStyle.jsx';
import DynamicCampaignConfig from '../stores/dynamicCampaignConfig.jsx';
import * as RuleAction from '../actions/RuleAction.jsx';
import DatePicker from './DatePicker.jsx';
import TimePicker from './TimePicker.jsx';
import DateTimePicker from './DateTimePicker.jsx';
import RuleErrorStore from '../stores/RuleErrorStore.jsx';
import Segment from './Segment.jsx';
import OptGroup from './OptGroup.jsx';
import RuleStore from '../stores/RuleStore.jsx';

export default class Trigger extends React.Component {

constructor(){

super();


this.state = {
   dyn__operations   : DynamicCampaignConfig.getOperations(),
   serviceKey:{},
   value:"",
   options:"",
   isOptionChanged:false,
   currentObject:"",
   isToShowServiceNameSelectBox:false,
   isToShowServicePropertyNameSelectBox:false,
   isToShowServiceOperatorSelectBox:false,
   isToShowValueSelectBox:false

};

this.isServiceNameBlurEventCalled=false;
this.isServicePropertyNameBlurEventCalled=false;
this.isServiceOperatorBlurEventCalled=false;
this.isServiceValueBlurEventCalled=false;
/****service related key ********/
this.databaseOptionChildrensKey =[];  
this.databaseOptionChildrensValue =[];
this.serviceNameKey = [];
this.serviceNameValue = [];

this.servicePropertyNameKey = [];
this.servicePropertyNameValue = [];

this.serviceOperatorKey = [];
this.serviceOperatorValue = [];

this.optGroupOptionsServiceData ={};
this.optGroupOptionsServiceNameData ={};
//trigger position info
this.currentTop = 0;
this.currentLeft = 0;

/********************trigger info****************************/
this.currentServiceKey="";
this.currentServicePropertyKey="";
this.currentPxIdx="";
this.isPxIdxDeleted=false;

} //constructor


componentWillMount(){

 var trigger = this.props.trigger;
 var keys= Object.keys(trigger).filter((key)=>{
  if(key=="id" || key=="comparator" || key=="pxIdx" ){return false;}
   return true;
 });

 var serviceData = keys[0].split(":"); //get the 3rd property
 var service = serviceData[0];
 var serviceProperty = serviceData[1].split(".")[1];


let currentObject = this.props.dyn__assetSourceServiceList[service][serviceProperty]; 
        
 this.setState({currentObject:currentObject});
  //


}//component willmount


componentWillUnmount() {


}


componentWillReceiveProps(newProps) {    

 this.isPxIdxDeleted = false;
 var trigger = newProps.trigger;
 var keys= Object.keys(trigger).filter((key)=>{
  if(key=="id" || key=="comparator" || key=="pxIdx" ){return false;}
   return true;
 });

 var serviceData = keys[0].split(":"); //get the 3rd property
 var service = serviceData[0];
 var serviceProperty = serviceData[1].split(".")[1];


 let currentObject = newProps.dyn__assetSourceServiceList[service][serviceProperty]; 


  this.setState({currentObject:currentObject});

  
  //

}//componentWillUpdate

/** delete trigger**************************************************************************/

deleteTrigger(){

RuleAction.deleteTrigger(this.props.secName,this.props.rulePosition,this.props.parentCondition,this.props.trigger.id);

}//delete trigger


/************service name method************************************************************/
getServiceNames(){
this.optGroupOptionsServiceNameData={};  
this.databaseOptionChildrensKey =[];  
this.databaseOptionChildrensValue =[];

this.serviceNameKey = [];
this.serviceNameValue =[];

//check weather property contain optgroup  or not
let  serviceKeys = Object.keys(this.props.dyn__assetSourceServiceList);
if(this.props.dyn__assetSourceServiceList[serviceKeys[0]].optGroup){
//put optgroup for database
for(let i=0;i<serviceKeys.length;i++){

  if(this.props.dyn__assetSourceServiceList[serviceKeys[i]].optGroup == undefined){
    this.props.dyn__assetSourceServiceList[serviceKeys[i]]["optGroup"] = "Database";
  }

}

//get the unique option group name
  let optGroups = serviceKeys.map( (key) =>
                    this.props.dyn__assetSourceServiceList[key]["optGroup"]
                  ).unique();
//check for personalisation hub
 let isToHidePersonalizationHub = true;
 if(dyn_dataToPost.enablePersonalization){   
      isToHidePersonalizationHub = dyn_dataToPost.enablePersonalization==0 || dyn_dataToPost.enablePersonalization== "false"? true : false; 
 }
//create options

 for(let i=0;i<optGroups.length;i++){


   let childOption = serviceKeys.filter( (key)=> 
        this.props.dyn__assetSourceServiceList[key].optGroup== optGroups[i]        
      ).map( (key)=> {

         let temp={};
         temp["key"] = key;
         temp["value"] = this.props.dyn__assetSourceServiceList[key].name;
         temp["disable"]=false;
        //check  weather it is personalisation hub or not
        if(key=='pdhService' && isToHidePersonalizationHub  ){
         temp["disable"]=true;
        }

         return temp;
      });

  this.optGroupOptionsServiceNameData[optGroups[i]] =  childOption;

 }//for



}else{


for ( let key of Object.keys(this.props.dyn__assetSourceServiceList) ) {
       
     //check for service property value

     if( Object.keys(this.props.dyn__assetSourceServiceList[key]).indexOf('_jvxMatchCount')>-1 ){
 
         this.databaseOptionChildrensKey.push(key);
         this.databaseOptionChildrensValue.push(this.props.dyn__assetSourceServiceList[key].name);
                   
     }else{      
         this.serviceNameKey.push(key);
         this.serviceNameValue.push(this.props.dyn__assetSourceServiceList[key].name);
       }
       this.state.serviceKey[this.props.dyn__assetSourceServiceList[key].name]=key;
      
} //for


}//else
 
}//end of select service


serviceValueChanged(serviceKey) { 
let defaultComboOption=""; 
this.isPxIdxDeleted=false;
let servicePropertyKeys = Object.keys(this.props.dyn__assetSourceServiceList[serviceKey]).filter(
  (key) => { 

    if(key=="name" || key=="optGroup"){ 
         return false; 
       }
       return true;  
     } 
  );
let defaultserviceProperty = servicePropertyKeys[0];
let newcomparator = this.props.dyn__assetSourceServiceList[serviceKey][defaultserviceProperty].operations[0];            
let newkey = serviceKey+":"+serviceKey+"."+defaultserviceProperty;

if(this.props.dyn__assetSourceServiceList[serviceKey][defaultserviceProperty].type=="combo"){
      
      let keys = Object.keys(this.props.dyn__assetSourceServiceList[serviceKey][defaultserviceProperty].values);
       defaultComboOption = keys[0];
}

 if(this.props.changePaddingListener){
  this.currentTop = 0 ;
  this.currentLeft =  0;
 }
this.setState({isToShowServiceNameSelectBox:false});
RuleAction.updateTriggerServiceName(this.props.secName,this.props.rulePosition,this.props.trigger,newcomparator,newkey,defaultComboOption,"");
    
}//serviceValueChanged end here


/***********************************service propertymethod******************************************************/

getServicePropertiesNames(){
let currentSelectedService=this.currentServiceKey;
let currentServiceObject = this.props.dyn__assetSourceServiceList[currentSelectedService];
this.servicePropertyNameKey = [];
this.servicePropertyNameValue = [];
this.optGroupOptionsServiceData = {};

//will handle cookie data here
//check weather the current service have optgroup options or not
let  servicePropertyKeys = Object.keys(currentServiceObject).filter( 
  (key) => {
    if(key=="name" || key=="optGroup"){
     return false;
    }
   return true;
  

  });

if(this.props.dyn__assetSourceServiceList[currentSelectedService][servicePropertyKeys[0]].optGroup){
//get the cookie option objects name

  
//get the unique option group name

  let optGroups = servicePropertyKeys.map( (key) =>
                    this.props.dyn__assetSourceServiceList[currentSelectedService][key].optGroup
                  ).unique();

 
//create options
 
let isToDisableOption = false;



 for(let i=0;i<optGroups.length;i++){


   let childOption = servicePropertyKeys.filter( (key)=> 
        this.props.dyn__assetSourceServiceList[currentSelectedService][key].optGroup== optGroups[i]        
      ).map( (key)=> {
         //check  weather it is retargetting or not
         let temp={};
         temp["key"] = key;
         temp["value"] = this.props.dyn__assetSourceServiceList[currentSelectedService][key].name;
           if(optGroups[i]=="Retargeted Messaging" || optGroups[i]=="Retargeting"){
               
              if(this.props.dyn__assetSourceServiceList[currentSelectedService][key].name.indexOf(dyn_dataToPost.allowedCookieGrp) > -1){
                isToDisableOption = true; 
                temp["disable"]=false;
                return temp;

              }

           }
       if(isToDisableOption){
         temp["disable"]=true;
       }else{
        temp["disable"]=false;
        } 
       
         return temp;
      });

    this.optGroupOptionsServiceData[optGroups[i]] =  childOption;
     
  
  }





}else{
 
  

  for(let i=0;i<servicePropertyKeys.length;i++){
     
     this.servicePropertyNameKey.push(servicePropertyKeys[i]);
     this.servicePropertyNameValue.push(this.props.dyn__assetSourceServiceList[currentSelectedService][ servicePropertyKeys[i] ].name);
  }


}




} //getServicePropertiesName end here


/***********function for check for duplicate*************************/
contains(value) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === value) return true;
    }
    return false;
};

/***********function to get unique value****************************/
unique() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}









servicePropertyValueChanged(serviceProperty){

let servicePropertykey = serviceProperty;
this.isPxIdxDeleted = false;
let pxIdx = "";
let tempSplit = serviceProperty.split(":");
if(tempSplit.length==2){
  servicePropertykey = tempSplit[1];
  pxIdx = tempSplit[0];
}

if(servicePropertykey != this.currentServicePropertyKey || this.currentPxIdx!=pxIdx){
let defaultComboOption="";
let serviceKey = this.currentServiceKey;
let newcomparator = this.props.dyn__assetSourceServiceList[serviceKey][servicePropertykey].operations[0];            
let newkey = serviceKey+":"+serviceKey+"."+servicePropertykey;
if(this.props.dyn__assetSourceServiceList[serviceKey][servicePropertykey].type=="combo"){
      
      let keys = Object.keys(this.props.dyn__assetSourceServiceList[serviceKey][servicePropertykey].values);

       defaultComboOption = keys[0];
}
if(this.props.changePaddingListener){
  this.currentTop=0;
  this.currentLeft=0;
  }
this.setState({isToShowServicePropertyNameSelectBox:false});
RuleAction.updateTriggerServiceName(this.props.secName,this.props.rulePosition,this.props.trigger,newcomparator,newkey,defaultComboOption,pxIdx);

}else{   
this.setState({isToShowServicePropertyNameSelectBox:false});
}



} //endof servicePropertyValueChanged
/**************remove pxid from trigger in case if it is doesnt exist************************/
deletePxID(){
  this.isPxIdxDeleted = true;
  RuleStore.deletePxID(this.props.trigger);

}

/********************************operation method*******************************************************/
getOperations(){

let currentSelectedService = this.currentServiceKey ;
let currentSelectedServiceProperty = this.currentServicePropertyKey ;


this.serviceOperatorKey = [];
this.serviceOperatorValue = [];

for(let i=0;i<this.props.dyn__assetSourceServiceList[currentSelectedService][currentSelectedServiceProperty].operations.length;i++){

this.serviceOperatorKey.push(this.props.dyn__assetSourceServiceList[currentSelectedService][currentSelectedServiceProperty].operations[i]);
this.serviceOperatorValue.push(this.state.dyn__operations[ this.props.dyn__assetSourceServiceList[currentSelectedService][currentSelectedServiceProperty].operations[i] ]);

}



}//get operations

serviceOperatorValueChanged(newOperator){

  if(this.props.changePaddingListener){
    this.currentTop=0;
    this.currentLeft=0;
  }
  this.setState({isToShowServiceOperatorSelectBox:false});
  RuleAction.updateOperator(this.props.secName,this.props.rulePosition,this.props.trigger,newOperator);

}//serviceOperatorValueChanged end here


/**************realtimesearch**************************************************************/
showSuggestion(serviceKey,servicePropertykey){
     
let searchText = this.refs.comboajax.value;
let url = "/studio/api/"+this.state.currentObject.values_url+
            "?service="+serviceKey+"&property="+servicePropertykey+"&prefix="+searchText; 
RuleAction.updateValue(this.props.secName,this.props.rulePosition,this.props.trigger,searchText);

 if(searchText.trim().length>0  ){

    // ajax call to php to load data
     var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
         let data= JSON.parse(xhttp.responseText);
         if(this.props.changePaddingListener){
                  let element=this.refs.comboajax.getBoundingClientRect();
                   this.currentTop = element.top ;
                   this.currentLeft =  element.left;

           }
         if(data){        
            this.setState({options:data,isOptionChanged:true});
         } else{
          this.setState({options:[],isOptionChanged:true});
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

     if(this.props.changePaddingListener){
      this.currentTop=0;
      this.currentLeft=0;
    }
 setTimeout( function(){

    this.setState({isOptionChanged:false});
 }.bind(this),200);  

}

/* combo box value change method *************************************/
comboBoxValueChange(comboBoxValue){
 
if(this.props.changePaddingListener){
   this.currentTop=0;
   this.currentLeft=0;
  }
this.setState({isToShowValueSelectBox:false});

RuleAction.updateValue(this.props.secName,this.props.rulePosition,this.props.trigger,comboBoxValue);

}


/* text box value change  method ****************************************/
textBoxValueChange(){
let textBoxValue = this.refs.textBoxValue.value;
RuleAction.updateValue(this.props.secName,this.props.rulePosition,this.props.trigger,textBoxValue);

}

/********************************* toogle service select box****************************/
 toggleServiceNameSelectBox(){
  
    let element=this.refs.serviceName.getBoundingClientRect();
 



      if(!this.isServiceNameBlurEventCalled){
      let temp = !this.state.isToShowServiceNameSelectBox;
      this.setState({isToShowServiceNameSelectBox:temp});
         if(this.props.changePaddingListener){
               this.currentTop = element.top ;
               this.currentLeft =  element.left + 5;

         }
      }else{
       this.isServiceNameBlurEventCalled=false;
      }
    }

   hideServiceNameSelectBox(){
    this.setState({isToShowServiceNameSelectBox:false});
      if(this.props.changePaddingListener){
              this.currentTop = 0 ;
              this.currentLeft =  0;
       }
    this.isServiceNameBlurEventCalled=true;
   } 

/*******************************  toogle service property select box*******************/
 toggleServicePropertyNameSelectBox(){

      let element=this.refs.servicePropertyName.getBoundingClientRect();

      if(!this.isServicePropertyNameBlurEventCalled){
      let temp = !this.state.isToShowServicePropertyNameSelectBox;
      this.setState({isToShowServicePropertyNameSelectBox:temp});
         if(this.props.changePaddingListener){
               this.currentTop = element.top ;
               this.currentLeft =  element.left + 5;
         }
      }else{
       this.isServicePropertyNameBlurEventCalled=false;
      }
    }

   hideServicePropertyNameSelectBox(){
          if(this.props.changePaddingListener){
                 
               this.currentTop = 0 ;
               this.currentLeft =  0;
       }
    this.setState({isToShowServicePropertyNameSelectBox:false});

    this.isServicePropertyNameBlurEventCalled=true;
   } 

/*******************************  toogle service operator select box*******************/
 toggleServiceOperatorSelectBox(){
  let element=this.refs.serviceOperator.getBoundingClientRect();
      if(!this.isServiceOperatorBlurEventCalled){
      let temp = !this.state.isToShowServiceOperatorSelectBox;
      this.setState({isToShowServiceOperatorSelectBox:temp});
        if(this.props.changePaddingListener){
           this.currentTop = element.top ;
           this.currentLeft =  element.left + 5;
         }
      }else{
       this.isServiceOperatorBlurEventCalled=false;
      }
    }

   hideServiceOperatorSelectBox(){
    
      if(this.props.changePaddingListener){
           this.currentTop = 0 ;
           this.currentLeft =  0;
       }
    this.setState({isToShowServiceOperatorSelectBox:false});   
    this.isServiceOperatorBlurEventCalled=true;
   } 
/*******************************  toogle service value select box*******************/
 toggleServiceValueSelectBox(){
  let element=this.refs.serviceValue.getBoundingClientRect();
      if(!this.isServiceValueBlurEventCalled){
      let temp = !this.state.isToShowValueSelectBox;
      this.setState({isToShowValueSelectBox:temp});
      if(this.props.changePaddingListener){
           this.currentTop = element.top ;
           this.currentLeft =  element.left + 5;
         }
      }else{
       this.isServiceValueBlurEventCalled=false;
      }
    }

   hideServiceValueSelectBox(){
    this.setState({isToShowValueSelectBox:false});
    if(this.props.changePaddingListener){
           this.currentTop = 0 ;
           this.currentLeft =  0;
       }
    this.isServiceValueBlurEventCalled=true;
   } 









render(){

  let validationError={};
  validationError["display"]="none";
  validationError["cursor"]="pointer";
  validationError["color"]="red";
  validationError["position"]="absolute";
  validationError["right"]=-23;
  let errorObj={"id":"","msg":""};
  if(RuleErrorStore.isEvaluateError()){
   errorObj = RuleErrorStore.chekIfThereIsErrorForIds(this.props.trigger.id,"Trigger") ;
   if(errorObj !=""){
      validationError["display"]="inline-block";
      
    }
   }
/******pixel id deleted error message**********************/
let pixelIdDeletedErrorStyle = {
    "display": "none",
    "height": "100%",
    "position": "absolute",
    "top": 13,
    "right": 4
};

let propertyNameStyle = {};


/* get the  value of trigger */
 var trigger = this.props.trigger;
 var keys= Object.keys(trigger).filter((key)=>{
  if(key=="id" || key=="comparator" || key=="pxIdx" ){return false;}
   return true;
 });
/*****check for releveant service key********/


 var serviceData = keys[0].split(":"); //get the 3rd property
 var service = serviceData[0];
 var serviceProperty = serviceData[1].split(".")[1];
 var operator = trigger["comparator"];
 var servicePropertyValue = trigger[keys[0]];

/* end of get the trigger value */

this.currentServiceKey = service;
this.currentServicePropertyKey = serviceProperty;



/***check for service property name****/
let servicePropertyName = this.props.dyn__assetSourceServiceList[service][serviceProperty].name;
if(this.props.trigger.pxIdx!=undefined){
if( dyn_configuredRetargetingPixels[this.props.trigger.pxIdx] ){
servicePropertyName = dyn_configuredRetargetingPixels[this.props.trigger.pxIdx].pixelName;
this.currentPxIdx = this.props.trigger.pxIdx;

}else{
this.deletePxID();  
this.currentPxIdx = "";

//delete the pxId from trigger

} 

}


if(this.isPxIdxDeleted){
 pixelIdDeletedErrorStyle["display"] = "inline-block"; 
 propertyNameStyle["marginRight"] = 21;
}



this.getServiceNames();
this.getServicePropertiesNames();
this.getOperations();


/* gettin the value to display here  */

switch(this.state.currentObject.type ){


case "comboajax":

     var value =<div>
            <input type="text"  ref="comboajax" onBlur={this.comboAjaxOnBlur.bind(this)} value={servicePropertyValue} 
            onChange={this.showSuggestion.bind(this,service,serviceProperty)}      
             />
            <ComboAjax isOptionChanged={this.state.isOptionChanged} options={this.state.options} triggerObject={this.props.trigger}
               changePaddingListener={this.props.changePaddingListener}
                currentTop={this.currentTop} currentLeft={this.currentLeft}
                secName={this.props.secName} rulePosition={this.props.rulePosition}
            />
            </div>;



      break;
case "combo":
        
        let keys = Object.keys(this.state.currentObject.values);
        let optionKey = [];
        let optionValue = [];
        for(let i=0;i<keys.length;i++){

              optionKey.push( keys[i]);
              optionValue.push( this.state.currentObject.values[keys[i]] )

         }

      var value= <div className="service-name-select"  
                  onClick={this.toggleServiceValueSelectBox.bind(this)}
                  onMouseEnter={()=> this.isServiceValueBlurEventCalled=false}
                  >
                     <span 
                      ref="serviceValue"
                      >
                      {this.state.currentObject.values[servicePropertyValue]}
                     </span>
                     <div className="down-triangle" 
                     ></div>
                     <SelectStyle keys={optionKey} values={optionValue} 
                      methodToCall={this.comboBoxValueChange.bind(this)}
                      isToShowSelectBox={this.state.isToShowValueSelectBox} 
                      hideSelectBox={this.hideServiceValueSelectBox.bind(this)}
                      currentTop={this.currentTop} currentLeft={this.currentLeft}
                      serviceProperty={serviceProperty}
                      currentTop={this.currentTop - 7} currentLeft={this.currentLeft + 4}
                      width={154} fontSize={11}
                      />
                </div>



     break;

case "text":
      var value=<input type="text" value={servicePropertyValue} ref="textBoxValue"
       onChange={this.textBoxValueChange.bind(this)}
       />
      break;

case "date":
      var value = 
                 <DatePicker  triggerObject={this.props.trigger} servicePropertyValue={servicePropertyValue}
                   secName={this.props.secName} rulePosition={this.props.rulePosition}
                   />
      break;

case "time" :
     
     var value =    <TimePicker triggerObject={this.props.trigger} servicePropertyValue={servicePropertyValue}
                      secName={this.props.secName} rulePosition={this.props.rulePosition}
                     />
    break;
                  
case "datetime":
         
        var value = <DateTimePicker triggerObject={this.props.trigger} servicePropertyValue={servicePropertyValue} 
                      secName={this.props.secName} rulePosition={this.props.rulePosition}
                    />         
    break;

case "segmentcombo":

        var value= <Segment servicePropertyValue={servicePropertyValue} triggerObject={this.props.trigger}
                      secName={this.props.secName} rulePosition={this.props.rulePosition}
                      service={service}
                    />

}



return (
   

   
   <tr>
       <td>
             <div className="service-name-select" 
              onClick={this.toggleServiceNameSelectBox.bind(this)}
              onMouseEnter={()=> this.isServiceNameBlurEventCalled=false}
             >
                     <span 
                       ref="serviceName"
                      >
                      {this.props.dyn__assetSourceServiceList[service].name}
                      
                     </span>
                     <div className="down-triangle"></div>
                     <SelectStyle keys={this.serviceNameKey} values={this.serviceNameValue} 
                      optgroupOptions={this.optGroupOptionsServiceNameData}
                      methodToCall={this.serviceValueChanged.bind(this)}
                      isToShowSelectBox={this.state.isToShowServiceNameSelectBox} 
                      hideSelectBox={this.hideServiceNameSelectBox.bind(this)}
                      databaseOptionChildrensKeys={this.databaseOptionChildrensKey}
                      databaseOptionChildrensValues={this.databaseOptionChildrensValue}
                      currentTop={this.currentTop - 7} currentLeft={this.currentLeft + 4}
                      width={154} fontSize={11}
                      />

              </div>  

       </td>
       <td>

              <div className="service-name-select" style={propertyNameStyle}
              onClick={this.toggleServicePropertyNameSelectBox.bind(this)}
              onMouseEnter={()=> this.isServicePropertyNameBlurEventCalled=false}
              >
                     <span  ref="servicePropertyName">
                      {servicePropertyName}
                      
                     </span>
                     <div className="down-triangle"></div>
                     <SelectStyle keys={this.servicePropertyNameKey} values={this.servicePropertyNameValue} 
                      methodToCall={this.servicePropertyValueChanged.bind(this)}
                      optgroupOptions={this.optGroupOptionsServiceData}
                      isToShowSelectBox={this.state.isToShowServicePropertyNameSelectBox} 
                      hideSelectBox={this.hideServicePropertyNameSelectBox.bind(this)}
                      currentTop={this.currentTop - 7} currentLeft={this.currentLeft + 4}
                      width={154} fontSize={11}
                      />

              </div>
          <span style={pixelIdDeletedErrorStyle} 
            onMouseEnter={(e)=>{showMessageToolTip($(e.target), "Pixel configuration is updated since campaign creation (or last edit)." , "groupSelectionQtipLeft");
            }}
          >
          <a style={{"cursor":"pointer"}} className="error"><i className="fa fa-exclamation"></i></a>
          </span>



       </td>
       <td className="operator">


                <div className="service-name-select"
                 onClick={this.toggleServiceOperatorSelectBox.bind(this)}
                 onMouseEnter={()=> this.isServiceOperatorBlurEventCalled=false}
                >
                     <span 
                      ref="serviceOperator"
                      >
                      {this.state.dyn__operations[operator]}
                     </span>
                     <div className="down-triangle"></div>
                     <SelectStyle keys={this.serviceOperatorKey} values={this.serviceOperatorValue} 
                      methodToCall={this.serviceOperatorValueChanged.bind(this)}
                      isToShowSelectBox={this.state.isToShowServiceOperatorSelectBox} 
                      hideSelectBox={this.hideServiceOperatorSelectBox.bind(this)}
                      currentTop={this.currentTop - 7} currentLeft={this.currentLeft + 4}
                      width={154} fontSize={11}
                      />
                </div>

           <span className="info" 
           onMouseEnter={(e)=>{showMessageToolTip($(e.target), 'Detects a match in the specified comma separated string based on the option you select:<br><br>*Equal To*:  exact matches only (finds "234" in the string "234"). <br>*Is Contained In*:  if the value appears anywhere in the string (finds "234" within "123456789").  <br>*Contains All Of*:  if all values appear in the string (finds “123,345" in "123,234,345").<br>*Contains Any Of*:  if  the value matches any one string in a comma-separated list (finds "234" in the string "123,234,345").', "groupSelectionQtipLeft");}}
           onMouseLeave={(e)=>{ $('.media-plan-tooltip').hide();}}
           > <i className="fa fa-question-circle fa-lg" ></i>
           </span> 
          
       </td>
       <td className="value">
         {value}
       </td>
       <td>
         <i data-tooltip="deleteTrigger" className="fa fa-trash" aria-hidden="true" onClick={this.deleteTrigger.bind(this)}></i>
         <span style={validationError} 
         onMouseEnter={(e)=>{
          if(errorObj.msg!=""){
            showMessageToolTip($(e.target), "<ol><li>" + errorObj.msg.join("</li><li>") + "</li></ol>" , "groupSelectionQtipLeft");
           }
        }}
         >
          <a style={{"cursor":"pointer"}} className="error"><i className="fa fa-exclamation"></i></a>
        </span>
       </td>
</tr>
    


  

);


}

} //ruleclass