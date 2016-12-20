import React from 'react';
import {render} from 'react-dom';
import ComboAjax from './ComboAjax.jsx';
import SelectStyle from './SelectStyle.jsx';
import DynamicCampaignConfig from '../stores/dynamicCampaignConfig.jsx';
import * as RuleAction from '../actions/RuleAction.jsx';
import DatePicker from './DatePicker.jsx';
import TimePicker from './TimePicker.jsx';
import DateTimePicker from './DateTimePicker.jsx';

export default class DeletedTrigger extends React.Component {

constructor(){

super();


this.state = {
   dyn__operations   : DynamicCampaignConfig.getOperations(),
   serviceKey:{},
   isToShowServiceNameSelectBox:false,
   isToShowServicePropertyNameSelectBox:false,
   isToShowServiceOperatorSelectBox:false
  

};

this.isServiceNameBlurEventCalled=false;
this.isServicePropertyNameBlurEventCalled=false;
this.isServiceOperatorBlurEventCalled=false;

this.databaseOptionChildrensKey =[];  
this.databaseOptionChildrensValue =[];
this.serviceNameKey = [];
this.serviceNameValue =[];

this.servicePropertyNameKey = [];
this.servicePropertyNameValue = [];

this.serviceOperatorKey = [];
this.serviceOperatorValue = [];
this.currentOperator="";

//trigger position info
this.currentTop = 0;
this.currentLeft = 0;

this.optGroupOptionsServiceNameData ={};
} //constructor



/************service name method************************************************************/
getServiceNames(service){
 
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

}//for

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
        if(key=='personalizationHub' && isToHidePersonalizationHub  ){
         temp["disable"]=true;
        }

         return temp;
      });

  this.optGroupOptionsServiceNameData[optGroups[i]] =  childOption;

 }//for
//end of creating options

/******for deleted service*************************/
if( Object.keys(this.props.dyn__assetSourceServiceList).indexOf(service)==-1){
    
     let temp={};
     temp["key"] = service;
     temp["value"] = service;
     temp["disable"]=false; 
   if(this.optGroupOptionsServiceNameData.Database){  
      this.optGroupOptionsServiceNameData["Database"].push(temp);   
    }else{
      this.optGroupOptionsServiceNameData["Database"] = [];
      this.optGroupOptionsServiceNameData["Database"].push(temp);  
    }    
 }




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



if( Object.keys(this.props.dyn__assetSourceServiceList).indexOf(service)==-1){
  
  this.databaseOptionChildrensKey.push(service);
  this.databaseOptionChildrensValue.push(service);        
 }

}//end of optgroup else check
 
}//end of select service


/********************************operation method*******************************************************/
getOperations(currentSelectedService,currentSelectedServiceProperty){

this.serviceOperatorKey = ["equals","greater-than","less-than"];
this.serviceOperatorValue = [this.state.dyn__operations['equals'],this.state.dyn__operations['greater-than'],this.state.dyn__operations["less-than"]];

}//get operations


serviceValueChanged(serviceKey){
  

if( this.props.dyn__assetSourceServiceList[serviceKey] != undefined ){
let defaultComboOption="";  
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
let newTrigger = {

     "id":this.props.trigger.id,
     "comparator": newcomparator,

  }
 if(defaultComboOption!=""){
  newTrigger[newkey]=defaultComboOption;
 }else{
  newTrigger[newkey]="";
 } 

this.props.changePaddingListener("false");
this.setState({isToShowServiceNameSelectBox:false});
this.props.addNewRestoreTrigger(newTrigger,this.props.trigger.id); 
}
}



servicePropertyValueChanged(serviceProperty){

this.setState({isToShowServicePropertyNameSelectBox:false});

}


serviceOperatorValueChanged(newOperator){

 this.currentOperator=newOperator;
 this.setState({isToShowServiceOperatorSelectBox:false});


}//serviceOperatorValueChanged end here





deleteFromDeletedSelector(){
  this.props.deleteFromDeletedSelector(this.props.trigger.id);
}



/********************************* toogle service select box****************************/
 toggleServiceNameSelectBox(){
   let element=this.refs.serviceName.getBoundingClientRect();

      if(!this.isServiceNameBlurEventCalled){
      let temp = !this.state.isToShowServiceNameSelectBox;
      this.setState({isToShowServiceNameSelectBox:temp});
      if(this.props.changePaddingListener){
               this.currentTop = element.top ;
               this.currentLeft =  element.left;

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
               this.currentLeft =  element.left;
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
           this.currentLeft =  element.left;
         }
      }else{
       this.isServicePropertyNameBlurEventCalled=false;
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




render(){



 
/* get the  value of trigger */
 var trigger = this.props.trigger;
 var keys= Object.keys(trigger);

 var serviceData = keys[2].split(":"); //get the 3rd property
 var service = serviceData[0];
 var serviceProperty = serviceData[1].split(".")[1];
 if(this.currentOperator==""){
     this.currentOperator= trigger["comparator"];
 }
 var servicePropertyValue = trigger[keys[2]];

/* end of get the trigger value */





this.getServiceNames(service);
this.servicePropertyNameKey=[];
this.servicePropertyNameValue=[];

this.servicePropertyNameKey.push("Number Of Matches");
this.servicePropertyNameValue.push("Number Of Matches");
this.getOperations();

/* gettin the value to display here  */




return (
   

   
   <tr>
       <td>

              <div className="service-name-select">
                     <span onClick={this.toggleServiceNameSelectBox.bind(this)}
                      onMouseEnter={()=> this.isServiceNameBlurEventCalled=false}
                      ref="serviceName"
                      >
                      {service}
                     </span>
                     <div className="down-triangle" onClick={this.toggleServiceNameSelectBox.bind(this)}
                      onMouseEnter={()=> this.isServiceNameBlurEventCalled=false}
                     ></div>
                     <SelectStyle keys={this.serviceNameKey} values={this.serviceNameValue} 
                      optgroupOptions={this.optGroupOptionsServiceNameData}
                      methodToCall={this.serviceValueChanged.bind(this)}
                      isToShowSelectBox={this.state.isToShowServiceNameSelectBox} 
                      hideSelectBox={this.hideServiceNameSelectBox.bind(this)}
                      databaseOptionChildrensKeys={this.databaseOptionChildrensKey}
                      databaseOptionChildrensValues={this.databaseOptionChildrensValue}
                      currentTop={this.currentTop} currentLeft={this.currentLeft}
                      />

              </div> 
       </td>
       <td>


              <div className="service-name-select">
                     <span onClick={this.toggleServicePropertyNameSelectBox.bind(this)}
                      onMouseEnter={()=> this.isServicePropertyNameBlurEventCalled=false} 
                      ref="servicePropertyName">
                      Number Of Matches
                     </span>
                     <div className="down-triangle" onClick={this.toggleServicePropertyNameSelectBox.bind(this)}
                      onMouseEnter={()=> this.isServicePropertyNameBlurEventCalled=false}
                     ></div>
                     <SelectStyle keys={this.servicePropertyNameKey} values={this.servicePropertyNameValue} 
                      methodToCall={this.servicePropertyValueChanged.bind(this)}
                      isToShowSelectBox={this.state.isToShowServicePropertyNameSelectBox} 
                      hideSelectBox={this.hideServicePropertyNameSelectBox.bind(this)}
                      currentTop={this.currentTop} currentLeft={this.currentLeft}
                      />

              </div>


       </td>
       <td>


               <div className="service-name-select">
                     <span onClick={this.toggleServiceOperatorSelectBox.bind(this)}
                      onMouseEnter={()=> this.isServiceOperatorBlurEventCalled=false}
                      ref="serviceOperator"
                      >
                      {this.state.dyn__operations[this.currentOperator]}
                     </span>
                     <div className="down-triangle" onClick={this.toggleServiceOperatorSelectBox.bind(this)}
                      onMouseEnter={()=> this.isServiceOperatorBlurEventCalled=false}
                     ></div>
                     <SelectStyle keys={this.serviceOperatorKey} values={this.serviceOperatorValue} 
                      methodToCall={this.serviceOperatorValueChanged.bind(this)}
                      isToShowSelectBox={this.state.isToShowServiceOperatorSelectBox} 
                      hideSelectBox={this.hideServiceOperatorSelectBox.bind(this)}
                      currentTop={this.currentTop} currentLeft={this.currentLeft}
                      />
                </div>
         
       </td>
       <td className="value">
         <input type="text" defaultValue={servicePropertyValue}  />
         <span className="recordDeleted" 
         >
          <i className="fa fa-exclamation" aria-hidden="true"></i>
         </span> 
         <div className="error-message">
              <div className="arrow-up"></div>
              <div className="message">
                Some of the services reference Databases that are no longer available. Please update 
                the Services to reference valid Databases.
              </div>
         </div>
       </td>
       <td>
         <i data-tooltip="deleteTrigger" className="fa fa-trash" aria-hidden="true" 
         onClick={this.deleteFromDeletedSelector.bind(this)}></i>

       </td>
</tr>
    


  

);


}

} //ruleclass