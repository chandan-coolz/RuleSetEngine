		import React from 'react';
		import {render} from 'react-dom';
		import SelectStyle from './SelectStyle.jsx';
		import RuleStore from '../stores/RuleStore.jsx';
		import {addRuleToEnd} from '../actions/RuleAction.jsx';
		import * as RuleAction from '../actions/RuleAction.jsx';
		

		export default class AddRule extends React.Component {

	   constructor(){
	  
	   super();
	   this.methodToCall="";
	   this.indexToInsert=-1;
	   this.isRuleBlurEventCalled=false;
	   this.isAddRuleBlurEventCalled=false;
	   this.state = {
	     selectedOption:"end",
	     isToShowRuleSelectBox:false,
	     isToShowAddRuleSelectBox:false,
	     isToShowAddRuleDialog:false,
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

	          ]
	        }
	      ]//conditions
	    }//rule
	  } ;//state
     this.addRuleValue=[];
     this.addRuleKey=[];
     this.ruleCount =0;
     this.addRuleOptionKey=["End","Begining","After","Before"];
     this.addRuleOptionValue=["Add as Last","Add as First","Add After","Add Before"]; 
     this.ruleDataChangeListener = this.ruleDataChangeListener.bind(this);     
} //constructor

ruleDataChangeListener(){

    let ruledata = RuleStore.getRuleData();
    this.ruleCount = ruledata.data.length;
    this.addRuleValue=[];
    this.addRuleKey=[];
    for(let i=0;i<this.ruleCount;i++){
     this.addRuleKey.push(i);
     this.addRuleValue.push(ruledata.data[i].ruleName);
     }

  this.forceUpdate();
}



componentWillMount() {
   	
   	let ruledata = RuleStore.getRuleData();
    this.ruleCount = ruledata.data.length;
    this.addRuleValue=[];
    this.addRuleKey=[];
    for(let i=0;i<this.ruleCount;i++){
     this.addRuleKey.push(i);
     this.addRuleValue.push(ruledata.data[i].ruleName);
     }
RuleStore.on("ruleChange",this.ruleDataChangeListener) ;  

}

componentWillUnmount() {
 RuleStore.removeListener("ruleChange",this.ruleDataChangeListener);
}


	/*********************method releated to adding  rules ***************************************/
	generateRuleId(){

	return ("R-"+this.props.advertiserId+"-"+this.props.addId+"-"+Date.now());
	} //generate Ruleid

	generateRuleName(){
	let ruleNumber = this.ruleCount;
	return("Rule "+(++ruleNumber) );

	} //generateRuleName

	generateRootConditionId(){

	return ("R-"+this.props.advertiserId+"-"+this.props.addId+"-"+Date.now());

	} //generateRootConditionId

	addRuleToEndFunction(){
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

	addRuleToBeginingFunction(){
  let tempRule =  JSON.parse(JSON.stringify(this.state.rule)); 
  tempRule.id = this.generateRuleId();
  tempRule.ruleName = this.generateRuleName();
  tempRule.conditions[0].id = this.generateRootConditionId();
  if(dyn_assetGroups){
    if(dyn_assetGroups.length>0){
      tempRule.creative_groups.push(dyn_assetGroups[0].groupName);
    }
  }
	RuleAction.addRuleToBegining(tempRule);

	} //addRuleToBeginingFunction

	addRuleAfterSomeRuleFunction(indexToInsert){
  let tempRule =  JSON.parse(JSON.stringify(this.state.rule)); 
  tempRule.id = this.generateRuleId();
  tempRule.ruleName = this.generateRuleName();
  tempRule.conditions[0].id = this.generateRootConditionId();
  if(dyn_assetGroups){
    if(dyn_assetGroups.length>0){
      tempRule.creative_groups.push(dyn_assetGroups[0].groupName);
    }
  }

	RuleAction.addRuleAfterSomeRuleFunction(tempRule ,indexToInsert);

	} //addRuleToBeginingFunction

	addRuleBeforeSomeRuleFunction(indexToInsert){
  let tempRule =  JSON.parse(JSON.stringify(this.state.rule)); 
  tempRule.id = this.generateRuleId();
  tempRule.ruleName = this.generateRuleName();
  tempRule.conditions[0].id = this.generateRootConditionId();
  if(dyn_assetGroups){
    if(dyn_assetGroups.length>0){
      tempRule.creative_groups.push(dyn_assetGroups[0].groupName);
    }
  }
	RuleAction.addRuleBeforeSomeRuleFunction(tempRule,indexToInsert);

	}
/********method related to select box*****************************************************************/
	 insertAfterBeforeSelectCalled(value){
	   

	      this.indexToInsert = value;
	      this.setState({isToShowRuleSelectBox:false});
	     
	 }

	 addRuleSelectBoxOptionmethod(value){
	 	this.methodToCall = value;
	 	this.setState({isToShowAddRuleSelectBox:false});
	 }

   openRuleAddDialog(){
   	this.setState({isToShowAddRuleDialog:true});
   }

   closeRuleAddDialog(){
   	this.setState({isToShowAddRuleDialog:false});
   }
    

/*************handle add button click methods***************************************/ 

	insertRule(){
      

	   switch(this.methodToCall){
	   
	   case "End" :
	   this.addRuleToEndFunction();
     this.state.isToShowAddRuleDialog=false;
	   break;
	   case "Begining":
	   this.addRuleToBeginingFunction();
     this.state.isToShowAddRuleDialog=false;
	   break;
	   case "After":
	   
	   if(this.indexToInsert >=0){
	     
	     this.addRuleAfterSomeRuleFunction(this.indexToInsert);
       this.indexToInsert = -1;
       this.state.isToShowAddRuleDialog=false;
	    }
	   break;
	   case "Before":
	   
	   if(this.indexToInsert >=0){
	     
	     this.addRuleBeforeSomeRuleFunction(this.indexToInsert);
       this.indexToInsert = -1;
       this.state.isToShowAddRuleDialog=false;
	    }
	   break;	   


	   }//switch
     
     
	}





/**************toggle select box methods*****************************************/

	toggleRuleSelectBox(){
      if(!this.isRuleBlurEventCalled){
      let temp = !this.state.isToShowRuleSelectBox;
      this.setState({isToShowRuleSelectBox:temp});
      }else{
       this.isRuleBlurEventCalled=false;
      }
    }

   hideRuleSelectBox(){
    this.setState({isToShowRuleSelectBox:false});
    this.isRuleBlurEventCalled=true;
   }  


	toggleAddRuleSelectBox(){
	
      if(!this.isAddRuleBlurEventCalled){
      let temp = !this.state.isToShowAddRuleSelectBox;
      this.setState({isToShowAddRuleSelectBox:temp});
      }else{
       this.isAddRuleBlurEventCalled=false;
      }
    }

   hideAddRuleSelectBox(){
    this.setState({isToShowAddRuleSelectBox:false});
    this.isAddRuleBlurEventCalled=true;
   }

	/**********************************************render*****************************************************/

render(){
                
               /*************text to show in select box*******************************/
               var ruleSelectBoxText="";
               var selectRuleStyle={'display':'none'};
               if(this.indexToInsert!=-1){
               	ruleSelectBoxText = this.addRuleValue[this.indexToInsert];
               }else{
               	ruleSelectBoxText ="-- Select --"
               }
 
               var addRuelSelectBoxText="";
               if(this.methodToCall!=""){
                addRuelSelectBoxText=this.addRuleOptionValue[this.addRuleOptionKey.indexOf(this.methodToCall)];
              }else{
                addRuelSelectBoxText=this.addRuleOptionValue[0];
                this.methodToCall = this.addRuleOptionKey[0];
              }

               if(this.methodToCall=='After' || this.methodToCall=='Before'){
                 selectRuleStyle['display'] = 'block';
               }

var addRuleOptionContainerClass=this.state.isToShowAddRuleDialog?"add-rule-option-container":"add-rule-option-container-hide";

 
return(

   <div className="add-rule">
   
   <button onClick={this.insertRule.bind(this)} className="g-btnactive assetGroupRulesAdd">
    <span className="button-icon"><i className="fa fa-plus"></i></span>Add Rule
    </button>


  {/*  <button onClick={this.openRuleAddDialog.bind(this)} className="g-btnactive assetGroupRulesAdd">
	  <span className="button-icon"><i className="fa fa-plus"></i></span>Add Rule
	  </button>

{this.insertRule.bind(this)}
     <div className={addRuleOptionContainerClass}>
       <div className="titlebar">
        
        Add Rule
       </div>

       <div className="content">
        <table>
         <tbody>
          <tr>
           <td>Options</td>
           <td>
           <div className="add-rule-select" onClick={this.toggleAddRuleSelectBox.bind(this)}
            onMouseEnter={()=> {this.isAddRuleBlurEventCalled=false}}> 
             <span> 
             
             {addRuelSelectBoxText}
            </span>

             <div  className="down-triangle" onClick={this.toggleAddRuleSelectBox.bind(this)}></div>
             <SelectStyle keys={this.addRuleOptionKey} values={this.addRuleOptionValue} 
             methodToCall={this.addRuleSelectBoxOptionmethod.bind(this)}
             isToShowSelectBox={this.state.isToShowAddRuleSelectBox} 
             hideSelectBox={this.hideAddRuleSelectBox.bind(this)}
             />
           </div>
           </td>
          </tr>
          <tr>
           <td>
           </td>
           <td> 
           <div className="add-rule-select" onClick={this.toggleRuleSelectBox.bind(this)}
            onMouseEnter={()=> {this.isRuleBlurEventCalled=false}}
            style={selectRuleStyle} >
            <span>
             {ruleSelectBoxText}
            </span>
            <div  className="down-triangle" ></div>     
             <SelectStyle keys={this.addRuleKey} values={this.addRuleValue} 
             methodToCall={this.insertAfterBeforeSelectCalled.bind(this)}
             isToShowSelectBox={this.state.isToShowRuleSelectBox} 
             hideSelectBox={this.hideRuleSelectBox.bind(this)}
             />
           </div>

           </td>
          </tr>
           
          
         </tbody>
        </table>

       </div>

       <div className="action">
         <button onClick={this.closeRuleAddDialog.bind(this)} className="g-btndeactive cancel"><span className="button-icon"><i className="fa fa-close"></i></span> Cancel</button> 
         <button onClick={this.insertRule.bind(this)} className="g-btnactive showPreview"><span className="button-icon"><i className="fa fa-plus"></i></span> Add</button>
       </div>
     </div>*/}
  </div>

);

		}//endof render method


		}//endof Add Rule class