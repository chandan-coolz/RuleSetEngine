import React from 'react';
import {render} from 'react-dom';
import  Data from './Data.jsx';
import AddRule from './AddRule.jsx';
import DefaultRuleGroup from './DefaultAssetGroup.jsx';
import RuleStore from '../stores/RuleStore.jsx';
import {initializeData}  from '../actions/RuleAction.jsx';
import SelectStyle from './SelectStyle.jsx';
import DynamicCampaignConfig from '../stores/dynamicCampaignConfig.jsx';
import TempStore from '../stores/tempDataStore.jsx';
import {addRuleToEnd} from '../actions/RuleAction.jsx';
import RuleErrorStore from '../stores/RuleErrorStore.jsx';



export default class DynamicCompaign extends React.Component {

constructor(){
 super();
 this.state = {

   data : RuleStore.getRuleData(),
   rule:{
        "id": "",
        "ruleName": "Default",
        "reportConfig": {
          "includeAssetSources": []
        },
        "creative_groups": [
          
        ],
        "conditions": [
          {
            "id": "",
            "operator": "and",
            "selectors": [

            ],
            "conditions": [

              ]

          }
        ]
      },
      advertiserId:"",
      addId:""
             
 };
this.ruleStoreChangeListener = this.ruleStoreChangeListener.bind(this);
this.ruleErrorCheckListener = this.ruleErrorCheckListener.bind(this);
this.isBlurEventCalled=false;
this.Data=[];
this.prevAddId="";
this.checkForAddIdChange="";



} //constructor


ruleStoreChangeListener(){
 TempStore.reSetDeletedCreativeAssetGroup();
 this.state.data = RuleStore.getRuleData();

/*********depending upon no of rules data create data instances********************/


let noOfRuleSet = Math.floor( this.state.data.data.length /50 );

  if( (this.state.data.data.length % 50) >0){noOfRuleSet=noOfRuleSet + 1;}

this.Data =[];
for(let i=0;i<noOfRuleSet;i++){

   this.Data.push(
         <Data key={i} secName={i} advertiserId={this.state.advertiserId} 
           addId={this.state.addId} 
         /> 
    )

 }

this.forceUpdate();
 /********************************************************************************/



 }


ruleErrorCheckListener(){
 this.state.data = RuleStore.getRuleData();

/*********depending upon no of rules data create data instances********************/


let noOfRuleSet = Math.floor( this.state.data.data.length /50 );

  if( (this.state.data.data.length % 50) >0){noOfRuleSet=noOfRuleSet + 1;}

this.Data =[];
for(let i=0;i<noOfRuleSet;i++){

   this.Data.push(
         <Data key={i} secName={i} advertiserId={this.state.advertiserId} 
           addId={this.state.addId} 
         /> 
    )

 }

this.forceUpdate();

}

componentWillMount() {
var addID= $("#adId").val();
var advertiserID= advertiserId;
this.state.addId = addID;
this.state.advertiserId = advertiserID;


if(dyn_dataToPost.defaultAssetGroup == undefined){
  dyn_dataToPost.defaultAssetGroup="";
 }


/****************creating datainstances***************************************************/

 /*********depending upon no of rules data create data instances********************/


let noOfRuleSet = Math.floor( this.state.data.data.length /50 );

  if( (this.state.data.data.length % 50) >0){noOfRuleSet=noOfRuleSet + 1;}

this.Data =[];
for(let i=0;i<noOfRuleSet;i++){

   this.Data.push(
         <Data key={i} secName={i} advertiserId={this.state.advertiserId} 
           addId={this.state.addId} 
         /> 
    )

 }



 RuleStore.on("change", this.ruleStoreChangeListener) ;  
 RuleErrorStore.on("ruleErrorCheck",this.ruleErrorCheckListener); 
}//componentWillMount function




componentWillUnmount() {
  
   RuleStore.removeListener("change", this.ruleStoreChangeListener);
   RuleErrorStore.removeListener("ruleErrorCheck",this.ruleErrorCheckListener); 
   DynamicCampaignConfig.stopSetIntervalTimer();
  
   clearInterval(this.checkForAddIdChange);

}


componentDidMount() {
this.prevAddId = this.refs.adId.value;  
this.checkForAddIdChange = setInterval(function(){ 
if(this.prevAddId!=this.refs.adId.value){
this.prevAddId = this.refs.adId.value;   
DynamicCampaignConfig.stopSetIntervalTimer();
RuleStore.initializeData();
DynamicCampaignConfig.initializeData();
TempStore.initializeData();
RuleErrorStore.initializeData();
this.ruleStoreChangeListener();
}

}.bind(this), 1000);

}



  /*********************method releated to adding  rules ***************************************/
  generateRuleId(){

  return ("R-"+this.state.advertiserId+"-"+this.state.addId+"-"+Date.now());
  } //generate Ruleid

  generateRuleName(){
  let ruleNumber = this.state.data.data.length;
  return("Rule "+(++ruleNumber) );

  } //generateRuleName

  generateRootConditionId(){

  return ("R-"+this.state.advertiserId+"-"+this.state.addId+"-"+Date.now());

  } //generateRootConditionId
  addRuleFunction(){
  let tempRule =  JSON.parse(JSON.stringify(this.state.rule)); 
  tempRule.id = this.generateRuleId();
  tempRule.ruleName = this.generateRuleName();
  tempRule.conditions[0].id = this.generateRootConditionId();
  if(dyn_assetGroups){
    if(dyn_assetGroups.length>0){
      tempRule.creative_groups.push(dyn_assetGroups[0].groupName);
    }
  }
  addRuleToEnd(tempRule);

  } //addRuleToEndFunction


render(){


/**********************add rule related ******************************************/
var ruleCount = this.state.data.data.length;
var addRuleAtStartClass = ruleCount > 0 ?"add-rule-at-start" : "hide";
var addRuleAtEndClass =  ruleCount < 7 ?"hide":"add-rule-at-end";
var addRuleButtonClass = ruleCount < 1 ?"add-rule-button":"hide";
var noRuleText = <p>No rules are configured for the ad <b>{$("#adName").text()}</b>
      . To configure a new rule click the "Add Rule" button below</p>

var ruleHeadingClass = ruleCount > 0 ?"ruleHeading" : "hide";

var defaultAssetGroupStyle = {};
if(ruleCount < 1){  
defaultAssetGroupStyle['right']=14;
}else{
defaultAssetGroupStyle['right']=300;
}

return(

  <div className="dynamic-campaign-container">

      <input id="adIdForRule" type="hidden" ref="adId" />
      <div className="default-asset-group" style={defaultAssetGroupStyle}>
        
      <span className="default-asset-group-heading">Default Asset Group :</span>
        
      <DefaultRuleGroup />
      
      </div>

      <div className={addRuleAtStartClass}>
         <button className="g-btndeactive assetGroupRulesPreview" onClick={()=>{RuleErrorStore.validateRule();} }>
            <span className="button-icon"><i className="fa fa-check" aria-hidden="true"></i></span>Validate Rules
         </button>
         <AddRule  addId={this.state.addId}
           advertiserId={this.state.advertiserId}
          />
      </div>

    <div className="rule" >
   
      <div className="rule-tree">

  <table className={ruleHeadingClass}>
      <thead >
      <tr >
          <th>
          </th>
          <th> Rule Title</th>

          <th> Creative Group to Show
          </th>

          <th> Options </th>



      </tr>
     </thead>
  </table>


       {this.Data}


    <div className={addRuleAtEndClass}>

    <AddRule  ruleCount={ruleCount} 
      addId={this.state.addId}
      advertiserId={this.state.advertiserId}/>
    </div>

          <div className={addRuleButtonClass}>
              {noRuleText}
              <label className="add-rule-button">
          

                  <button onClick={this.addRuleFunction.bind(this)} className="g-btnactive assetGroupRulesAdd">
                   <span className="button-icon"><i className="fa fa-plus"></i></span>Add Rule
                 </button>  

               </label>


            </div> 
     


                              
                         
      </div>
    </div>


  </div>

);//return function


}//render



} //DynamicCompaign