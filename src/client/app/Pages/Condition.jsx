import React from 'react';
import {render} from 'react-dom';
import Trigger from './Trigger.jsx';
import DeletedTrigger from './DeletedTrigger.jsx';
import NestedCondition from './NestedCondition.jsx';
import SelectStyle from './SelectStyle.jsx';
import * as RuleAction from '../actions/RuleAction.jsx';
import tempDataStore from '../stores/tempDataStore.jsx';
import DynamicCampaignConfig from '../stores/dynamicCampaignConfig.jsx';
import RuleErrorStore from '../stores/RuleErrorStore.jsx';

export default class Condition extends React.Component {

constructor(){
super();

this.state = {

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


   }   ,
  dyn__conditionOperator : DynamicCampaignConfig.getConditionOperator(),
  dyn_assetSource : DynamicCampaignConfig.getAssetSourceData(),
  dyn__assetSourceServiceList : DynamicCampaignConfig.getDynamicCampaignConfig(),
  isToShowSelectBox:false

}; //states



this.deletedSelector = [];

this.conditionOperatorKey=[];
this.conditionOperatorValue=[];
this.isBlurEventCalled=false;

this.currentTop = 0;
this.currentLeft = 0;

}//constructor end here



/*************function for asset change listener****************************************/

refressAssetSource(){

this.deletedSelector = [];
//this.deletedSelector=tempDataStore.getDeletedTriggers(''+nextProps.condition.id);
let temp_dyn_assetSource = DynamicCampaignConfig.getAssetSourceData();
 /*****get the database trigger name***********************/
 let databaseTrigger =  this.props.condition.selectors.filter( (trigger)=>{

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

}).unique();


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
  
     

    let conditionOperatorkey = Object.keys(this.state.dyn__conditionOperator);

    for(let i=0;i<conditionOperatorkey.length;i++){

        this.conditionOperatorKey.push(conditionOperatorkey[i]);
        this.conditionOperatorValue.push(this.state.dyn__conditionOperator[conditionOperatorkey[i]]);
    }


   this.refressAssetSource();
  
}//component will mount

componentWillReceiveProps(nextProps) {
  this.refressAssetSource();
}






//generatecondition id
generateConditionId(){

return ("R-"+this.props.advertiserId+"-"+this.props.addId+"-"+Date.now());

} //generateConditionId
//generate Trigger ID
generateTriggerId(){

return ("TRI-R-"+this.props.advertiserId+"-"+this.props.addId+"-"+Date.now());

}//generate trigger id

addConditionClicked(){
  
  let temp = JSON.parse(JSON.stringify(this.state.newCondition));
  temp["id"] = this.generateConditionId();
  RuleAction.addCondition(this.props.secName,this.props.rulePosition,this.props.condition,temp);
}//addConditionClicked end here



addTrigger(){

let temp =  JSON.parse(JSON.stringify(this.state.newTrigger));
temp["id"] = this.generateTriggerId();

RuleAction.addTrigger(this.props.secName,this.props.rulePosition,this.props.condition,temp);

}//add trigger



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



/******filter the deleted trigger from our trigger list*********************************/

var   nonDeletedTrigger = this.props.condition.selectors.filter( (trigger)=>{

  for(let i=0;i<this.deletedSelector.length;i++){
    
     
    if(trigger.id==this.deletedSelector[i].id){
      
      return false;
    }
  }

 return true;
});




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
  

      var nestedConditions =  this.props.condition.conditions.map( (conditionObject,i) => 

        <NestedCondition key={i} condition={conditionObject} parentCondition={this.props.condition}
        advertiserId={this.props.advertiserId} addId={this.props.addId}
        dyn__conditionOperator={this.state.dyn__conditionOperator}
        conditionOperatorKey={this.conditionOperatorKey}
        conditionOperatorValue={this.conditionOperatorValue}
        conditionClass={this.props.conditionClass}
        changePaddingListener={this.props.changePaddingListener}
        secName={this.props.secName}  rulePosition={this.props.rulePosition} 
        />
        );

}else{

 //populate in trigger only
//it condition has a property check if else

    var triggers = nonDeletedTrigger.map( (trigger,i) => 

      <Trigger key={i} trigger={trigger}
      parentCondition={this.props.condition} dyn_assetSource={this.state.dyn_assetSource}
      dyn__assetSourceServiceList={this.state.dyn__assetSourceServiceList}
      changePaddingListener={this.props.changePaddingListener}
      secName={this.props.secName} rulePosition={this.props.rulePosition}
      />

     );
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



return(

  <li>
     <table className="condition">
        <thead>
        <tr>
            
            <th>

             <label>

                    <div className="condition-operator-select">
                     <span onClick={this.toggleSelectBox.bind(this)}
                      onMouseEnter={()=> this.isBlurEventCalled=false}
                      ref="conditionOperator"
                      >
                      {this.state.dyn__conditionOperator[ this.props.condition.operator ]}
                     </span>
                     <div className="down-triangle" onClick={this.toggleSelectBox.bind(this)}
                      onMouseEnter={()=> this.isBlurEventCalled=false}
                     ></div>
                     <SelectStyle keys={this.conditionOperatorKey} values={this.conditionOperatorValue} 
                      methodToCall={this.changeConditionOperator.bind(this)}
                      isToShowSelectBox={this.state.isToShowSelectBox} 
                      hideSelectBox={this.hideSelectBox.bind(this)}
                      currentTop={this.currentTop -2 } currentLeft={this.currentLeft + 11}
                      />

                   </div>


             </label>
            









            </th>
            <th>
            <label className="condition">
              <span onClick={this.addConditionClicked.bind(this)}  >
              <span><i className="fa fa-adjust" aria-hidden="true" ></i></span>

              Add Condition </span>
               </label>
            </th>
            <th>
            <label className="trigger">
              <span onClick={this.addTrigger.bind(this)}>
              <span><i className="fa fa-bolt" aria-hidden="true"></i></span>
              Add Trigger </span>
        
            </label>
            </th>
        </tr>
        </thead>
    </table>
  
          <ul>

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

 </li>
);


}

} //ruleclass