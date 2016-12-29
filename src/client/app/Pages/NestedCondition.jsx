import React from 'react';
import {render} from 'react-dom';
import Trigger from './Trigger.jsx';
import DeletedTrigger from './DeletedTrigger.jsx';
import SelectStyle from './SelectStyle.jsx';
import * as RuleAction from '../actions/RuleAction.jsx';
import DynamicCampaignConfig from '../stores/dynamicCampaignConfig.jsx';
import RuleErrorStore from '../stores/RuleErrorStore.jsx';

export default class NestedCondition extends React.Component {

constructor(){
super();

this.state = {
  isToShowConditionContent : true,
  contentClass : "visuallyShow",
   newCondition: {
          "id": "",
          "operator": "and",
          "selectors": [

           ]

          },
  newTrigger: {
     "id":"",
     "comparator": "equals",
     "geo:geo.city": ""


   },
    deleteConfirmationBoxContainerClass:"hide",
    deleteConfirmationBoxClass:"confirmationBoxInitialPosition",
    dyn_assetSource : DynamicCampaignConfig.getAssetSourceData(),
    dyn__assetSourceServiceList : DynamicCampaignConfig.getDynamicCampaignConfig(),
    isToShowSelectBox:false

} //state


this.selectorToWatch = [];
this.deletedSelector = [];
this.isBlurEventCalled=false;
this.currentTop = 0;
this.currentLeft = 0;

} //constructor



/*************function for asset change listener****************************************/

refressAssetSource(){

this.deletedSelector = [];
//this.deletedSelector=tempDataStore.getDeletedTriggers(''+nextProps.condition.id);
let temp_dyn_assetSource = DynamicCampaignConfig.getAssetSourceData();

 /*****get the database trigger name***********************/
 let databaseTrigger = [];
 if(this.props.condition.selectors!=undefined){
  databaseTrigger =  this.props.condition.selectors.filter( (trigger)=>{

    var keys= Object.keys(trigger).filter((key)=>{
      if(key=="id" || key=="comparator" || key=="pxIdx" ){return false;}
       return true;
     });
    
    
     var serviceData = keys[0].split(":");
     var serviceProperty = serviceData[1].split(".")[1];
    
    
      if(serviceProperty == '_jvxMatchCount'){
        return true;
      }else{
        return false;
      }



 }).map( (trigger)=> {
    var keys= Object.keys(trigger); 
    var serviceData = keys[2].split(":"); //get the 3rd property
    return(serviceData[0]);

}).unique(databaseTrigger);
}

  
/**2check for deleted trigger****************************************************/
let deletedTrigger = databaseTrigger.filter( (assetName)=>{

    for(let i=0;i<temp_dyn_assetSource.length;i++){
       if(assetName == temp_dyn_assetSource[i].dataServiceName){return false;}
   
    }
   return true;

});


/**3 put deleted trigger in this.deleted trigger*****************************************/
  let indexToDelete=[];
 
  for(let i=0;i<deletedTrigger.length;i++){

    for(let j=0;j<this.props.condition.selectors.length;j++){
        
       /* get the  value of trigger */
       var trigger = this.props.condition.selectors[j];
       var keys= Object.keys(trigger);
       var serviceData = keys[2].split(":"); //get the 3rd property
       var service = serviceData[0];
      
       if(service==deletedTrigger[i]){

          indexToDelete.push(j);

       }


     }//for
  }//outer for

   
for(let i=0;i<indexToDelete.length;i++){

        this.deletedSelector.push(this.props.condition.selectors[indexToDelete[i]]);

  }



this.setState({
   dyn_assetSource :temp_dyn_assetSource,
   dyn__assetSourceServiceList : DynamicCampaignConfig.getDynamicCampaignConfig()
  }) ;


}//refressAssetSources



/*******end function for asset change listener*****************************************/




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



componentWillMount() {

   this.refressAssetSource();
}//component will mount


componentWillUnmount() {

  clearTimeout(this.showConditionTimeOut);
  clearTimeout(this.hideConditionTimeOut);
  clearTimeout(this.deleteRuleDialogTimeOut);
  

}

componentWillReceiveProps(nextProps) {
  this.refressAssetSource();
}







showConditionalContent(){
	this.setState({isToShowConditionContent : true,contentClass:"showAll"});
  this.showConditionTimeOut = setTimeout(function(){

  this.setState({contentClass:"visuallyShow"});
  

}.bind(this),500);
} //showConditionalContent

hideConditionalContent() {

	this.setState({isToShowConditionContent : false,contentClass:"visuallyhidden"});
  this.hideConditionTimeOut = setTimeout(function(){

  this.setState({contentClass:"hide"});
  

}.bind(this),500);
} //hideConditionalCOntent

//generatecondition id
generateConditionId(){

return ("R-"+this.props.advertiserId+"-"+this.props.addId+"-"+Date.now());

} //generateConditionId

//generate Trigger ID
generateTriggerId(){

return ("TRI-R-"+this.props.advertiserId+"-"+this.props.addId+"-"+Date.now());

}//generate trigger id

addNestedCondition(){
   
  let temp = JSON.parse(JSON.stringify(this.state.newCondition));
  temp["id"] = this.generateConditionId();
  RuleAction.addCondition(this.props.secName,this.props.rulePosition,this.props.condition,temp);

}//add nestedcondition


addTrigger(){

let temp = JSON.parse(JSON.stringify(this.state.newTrigger));
temp["id"] = this.generateTriggerId();
RuleAction.addTrigger(this.props.secName,this.props.rulePosition,this.props.condition,temp);

}//add trigger


openDeleteRuleDialog(){

this.setState({deleteConfirmationBoxContainerClass:"confirmationBoxContainer"});

this.deleteRuleDialogTimeOut = setTimeout(function(){

this.setState({deleteConfirmationBoxClass:"confirmationBoxFinalPosition"});

}.bind(this),20);

} //showDeleteConditionCOnfirmationBox

cancelDelete(){

this.setState({deleteConfirmationBoxContainerClass:"hide",deleteConfirmationBoxClass:"confirmationBoxInitialPosition"});
} //cancel delete ruledialog


deleteCondition(){

   RuleAction.deleteCondition(this.props.secName,this.props.rulePosition,this.props.parentCondition,this.props.condition.id);
   this.cancelDelete();
} //delete COndition


changeConditionOperator(newOperator){

this.setState({isToShowSelectBox:false});
RuleAction.updateConditionOperator(this.props.secName,this.props.rulePosition,this.props.condition, newOperator);

}//changeConditionOperator

//add new trigger for restore Trigger 

addNewRestoreTrigger(triggerObj,id){

/*******delete from selector list  *****/
RuleAction.deleteTrigger(this.props.secName,this.props.rulePosition,this.props.condition,id);

/************add the new trigger********************************/

RuleAction.addTrigger(this.props.secName,this.props.rulePosition,this.props.condition,triggerObj);
this.refressAssetSource();
this.forceUpdate();
}

deleteFromDeletedSelector(id){

/*******delete from selector list  *****/
RuleAction.deleteTrigger(this.props.secName,this.props.rulePosition,this.props.condition,id);
this.refressAssetSource();
this.forceUpdate();
         


}

/***************toggle select box***********************************/
  toggleSelectBox(){
      let element=this.refs.conditionOperator.getBoundingClientRect();   
      if(!this.isBlurEventCalled){
      let temp = !this.state.isToShowSelectBox;
      this.setState({isToShowSelectBox:temp});
      this.currentTop = element.top ;
      this.currentLeft =  element.left;      
      }else{
       this.isBlurEventCalled=false;
      }
    }

   hideSelectBox(){
    this.setState({isToShowSelectBox:false});
    this.currentTop = 0 ;
    this.currentLeft =  0;
    this.isBlurEventCalled=true;
   }  


render(){

  let validationError={};
  validationError["display"]="none";
  validationError["position"]="absolute";
  validationError["top"]=21;
  validationError["left"]=511;
  validationError["color"]="red";

if(RuleErrorStore.isEvaluateError() && !this.state.isToShowConditionContent){
  
  if(RuleErrorStore.chekIfThereIsErrorForIds(this.props.condition.id,"Condition")){
      validationError["display"]="inline-block";
    }

}


/******filter the deleted trigger from our trigger list*********************************/

var   nonDeletedTrigger =[];
if(this.props.condition.selectors!=undefined){
  nonDeletedTrigger = this.props.condition.selectors.filter( (trigger)=>{

  for(let i=0;i<this.deletedSelector.length;i++){
    
     
    if(trigger.id==this.deletedSelector[i].id){
      
      return false;
    }
  }

 return true;
});

}


/******check weather it has nested condition or not******************************/


if( this.props.condition.hasOwnProperty('conditions') ){

    var triggers = nonDeletedTrigger.map( (trigger,i) => {
       
      return <Trigger key={i} trigger={trigger}
      parentCondition={this.props.condition} dyn_assetSource={this.state.dyn_assetSource}
      dyn__assetSourceServiceList={this.state.dyn__assetSourceServiceList}
      changePaddingListener={this.props.changePaddingListener}
      secName={this.props.secName} rulePosition={this.props.rulePosition}
      />
 
     });

 
    var nestedConditions = this.props.condition.conditions.map( (conditionObject,i) => 

     <NestedCondition key={i} condition={conditionObject} parentCondition={this.props.condition}
     advertiserId={this.props.advertiserId} addId={this.props.addId}
     dyn__conditionOperator={this.props.dyn__conditionOperator}
     conditionOperatorKey={this.props.conditionOperatorKey}
     conditionClass={this.props.conditionClass}
     conditionOperatorValue={this.props.conditionOperatorValue}
     changePaddingListener={this.props.changePaddingListener}
     secName={this.props.secName}  rulePosition={this.props.rulePosition}
     />
     );  

}else{

 //populate in trigger only
//populate in last element of trigger  only
   
  var triggers = nonDeletedTrigger.map( (trigger,i) => {  
      return <Trigger key={i} trigger={trigger}
      parentCondition={this.props.condition} dyn_assetSource={this.state.dyn_assetSource}
      dyn__assetSourceServiceList={this.state.dyn__assetSourceServiceList}
      changePaddingListener={this.props.changePaddingListener}
      secName={this.props.secName} rulePosition={this.props.rulePosition}
      /> 
  });
}//condition property check if










var DeletedTriggers = this.deletedSelector.map( (trigger,i) => <DeletedTrigger key={i} trigger={trigger}
    addNewRestoreTrigger={this.addNewRestoreTrigger.bind(this)} dyn_assetSource={this.state.dyn_assetSource}
     dyn__assetSourceServiceList={this.state.dyn__assetSourceServiceList}
     deleteFromDeletedSelector={this.deleteFromDeletedSelector.bind(this)}
     changePaddingListener={this.props.changePaddingListener}
    />

   ); 

let isToShowTrigger = {'display':'none'};
if( triggers.length>0 || (this.deletedSelector.length>0) ) {
isToShowTrigger['display'] = 'block';
}

 /*const contentClass = this.state.isToShowConditionContent? "show" : "hide" ; */

let showUpArrow = {'display':'none','paddingLeft' : 4};
let showDownArrow = {'display':'none','paddingLeft' : 4};

if(this.state.isToShowConditionContent){
  showUpArrow['display'] = 'block';
  
}else{
 showDownArrow['display'] = 'block'; 
}


 



return (

  <li>

       <div className={this.state.deleteConfirmationBoxContainerClass}>

         <div className={this.state.deleteConfirmationBoxClass}>
              <span className="title">Remove Condition</span>  
              <div className="content">
                <i className="fa fa-exclamation-triangle fa-4x" aria-hidden="true"></i>
                <span>Are you sure you want to remove this conditional block?
                </span>
              </div>
              <div className="action">
               <span className="delete" onClick={this.deleteCondition.bind(this)}>Ok</span>
              <span className="cancel" onClick={this.cancelDelete.bind(this)}>Cancel</span>
             
              </div>

              
        </div>
      </div>







        <table className="condition">
        <thead>
        <tr>
            <th style={{"width":17,"textAlign":"start"}}>
               
               <span  style={showUpArrow}><i className="fa fa-angle-down"  aria-hidden="true" 
                onClick={this.hideConditionalContent.bind(this)}></i>
             </span>
             <span  style={showDownArrow}>
              <i  className="fa fa-angle-right" aria-hidden="true" 
                  onClick={this.showConditionalContent.bind(this)}></i>
             </span>
               
            </th>
            <th style={{"textAlign":"start"}}>

             <label>
               
                   <div className="condition-operator-select">
                     <span onClick={this.toggleSelectBox.bind(this)}
                      onMouseEnter={()=> this.isBlurEventCalled=false}
                      ref="conditionOperator"
                      >
                      {this.props.dyn__conditionOperator[ this.props.condition.operator ]}
                     </span>
                     <div className="down-triangle" onClick={this.toggleSelectBox.bind(this)}
                      onMouseEnter={()=> this.isBlurEventCalled=false}
                     ></div>
                     <SelectStyle keys={this.props.conditionOperatorKey} values={this.props.conditionOperatorValue} 
                      methodToCall={this.changeConditionOperator.bind(this)}
                      isToShowSelectBox={this.state.isToShowSelectBox} 
                      hideSelectBox={this.hideSelectBox.bind(this)}
                      currentTop={this.currentTop - 2} currentLeft={this.currentLeft + 11}
                      />

                   </div>
             </label>
           </th>  
           <th style={{"textAlign":"start"}}> 
            <label className="condition">
              <span onClick={this.addNestedCondition.bind(this)}>
              <span><i className="fa fa-adjust" aria-hidden="true" ></i></span>
              Add Condition </span>

            </label>
           </th>
           <th style={{"textAlign":"start"}}>
            <label className="trigger">
              <span onClick={this.addTrigger.bind(this)}>
              <span><i className="fa fa-bolt" aria-hidden="true"></i></span>
              Add Trigger </span>

            </label>

            </th>
            <th style={{"textAlign":"start"}}>
  
             <i data-tooltip="deleteCondition" style={{'paddingRight' : 3}} className="fa fa-trash " aria-hidden="true" onClick={this.openDeleteRuleDialog.bind(this)}></i>

            

            </th>
        </tr>
        </thead>
    </table>


          <ul className={this.state.contentClass}>
             
            <li style={isToShowTrigger}><div className="trigger"> 
           <table>
            <thead>
             <tr>
              <th>Service</th>
              <th>Properties</th>
              <th>Operator</th>
              <th>Value</th>
              <th></th>
              </tr>
           </thead>
           <tbody>
              {triggers}
              {DeletedTriggers}
           </tbody>
          </table>
          </div>
        </li>     

              {nestedConditions}
             

          </ul>
    <span style={validationError}>
       <a  className="error"><i className="fa fa-exclamation"></i></a>
   </span>       
  </li>    

);


}

} //ruleclass