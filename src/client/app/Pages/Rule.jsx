import React from 'react';
import {render} from 'react-dom';
import Condition from './Condition.jsx';
import * as RuleAction from '../actions/RuleAction.jsx';
import DynamicCampaignConfig from '../stores/dynamicCampaignConfig.jsx';
import RuleStore from '../stores/RuleStore.jsx';
import Data from './Data.jsx';
import CreativeGroupToShow from './CreativeGroupToShow.jsx';
import tempDataStore from '../stores/tempDataStore.jsx';
import RuleErrorStore from '../stores/RuleErrorStore.jsx';

export default class Rule extends React.Component {

constructor(){

  super();
  this.swapSecName="";
  this.swapRulePosition=-1;
  this.swapRuleName="";
  this.state = {
    isToShowRuleContent : false,
    conditionClass:"hide",
    deleteConfirmationBoxContainerClass:"hide",
    deleteConfirmationBoxClass:"confirmationBoxInitialPosition",
    ruleNameEditClass:"",
    copyConfirmationBoxContainerClass:"hide",
    copyConfirmationBoxClass:"confirmationBoxInitialPosition",
    copyCreated:0,
    ruleTableClass:"rule",
    dragConfirmationContainerBox:"hide",
    zIndexClass:"",
    isToShowCreativeGroupWarningClass:"hide",
    selectedOption:"before"

  } ;

this.ruleDataRefressListener = this.ruleDataRefressListener.bind(this);
this.hideRuleConditionListener = this.hideRuleConditionListener.bind(this);
this.hideRuleIfOpenListener = this.hideRuleIfOpenListener.bind(this);
this.rule={};
this.assetSourceChangeListener = this.assetSourceChangeListener.bind(this);

} //constructor

/************ruleDataChangeListener***************************/
ruleDataRefressListener(){

this.rule = RuleStore.getDataForRule(this.props.secName,this.props.rulePosition);
this.forceUpdate();
}

hideRuleConditionListener(){

if(this.state.conditionClass){
  let element=this.refs.ruleTable.getBoundingClientRect();
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let currentTopPos = element.top + scrollTop;
  if(element.top<0){
   window.scrollTo(0,currentTopPos-100);
  }
  this.setState({conditionClass:"hide",isToShowRuleContent:false});
 }  
}


hideRuleIfOpenListener(){
if(this.state.conditionClass){
  if(this.state.conditionClass!="hide"){

  this.setState({conditionClass:"hide",isToShowRuleContent:false});
  }
}
}


//function to listen to change of eventEmitter
assetSourceChangeListener() {

 if(this.state.conditionClass){
  if(this.state.conditionClass!="hide"){

  this.setState({conditionClass:"hide",isToShowRuleContent:false});
  }
 }
}//assetSourceChangeListener

/*********change padding class***********************************/
changePaddingListener(currentOption){

  return true;

}



componentWillMount() {
RuleStore.on("Section"+this.props.secName+"Rule"+this.props.rulePosition, this.ruleDataRefressListener) ; 
RuleStore.on("Hide"+this.props.secName+"Rule"+this.props.rulePosition, this.hideRuleConditionListener) ; 
RuleStore.on("HideIfOpen", this.hideRuleIfOpenListener) ;  
DynamicCampaignConfig.on("assetSourcechange", this.assetSourceChangeListener) ; 
this.rule = RuleStore.getDataForRule(this.props.secName,this.props.rulePosition);

}


componentWillUnmount() {
  
RuleStore.removeListener("Section"+this.props.secName+"Rule"+this.props.rulePosition, this.ruleDataRefressListener);
RuleStore.removeListener("Hide"+this.props.secName+"Rule"+this.props.rulePosition, this.hideRuleConditionListener);
RuleStore.removeListener("HideIfOpen", this.hideRuleIfOpenListener) ; 
DynamicCampaignConfig.removeListener("assetSourcechange", this.assetSourceChangeListener); 
}

componentWillReceiveProps(newProps) {
  this.rule = RuleStore.getDataForRule(newProps.secName,newProps.rulePosition);

}

componentDidMount() {
  
  /******move the browser scroll to  newly added rule position*******************/
  if( (RuleStore.getAddedRuleSection()==this.props.secName) && 
    (RuleStore.getAddedRulePos()==this.props.rulePosition) ){
   
      let element=this.refs.ruleTable.getBoundingClientRect();
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      let currentTopPos = element.top + scrollTop;
      var height = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
    
     // if(element.top<0 || element.top>=height-50){
       window.scrollTo(0,currentTopPos-100);
       //}
       this.refs.ruleTable.style.opacity = 0;
       setTimeout(function(){ 
        this.refs.ruleTable.style.transition = "opacity 1s";
        this.refs.ruleTable.style.opacity = 1;
       }.bind(this),500);
      //reset the getAddedRulePos
      RuleStore.resetTheAddedRulePos();

  }

  $(this.refs.ruleTable).draggable({
    cursor: "move",
    helper:'clone',
    opacity:0.7,
    zIndex: 100000,
    revert: "invalid",
    start: function(e){
      tempDataStore.setDraggedRuleInfo(this.rule.ruleName,this.props.secName,this.props.rulePosition);
      
    }.bind(this)

   });
   $(this.refs.ruleTable).droppable({
      hoverClass: "drag-rule-ui-drop-hover",
      drop: function(e,ui){
          var draggedRuleData = tempDataStore.getDraggedRuleInfo();
          if(draggedRuleData.rulePosition!=this.props.rulePosition){
             this.swapSecName = draggedRuleData.secName;  
             this.swapRulePosition = draggedRuleData.rulePosition;
             this.swapRuleName = draggedRuleData.ruleName;
             this.setState({dragConfirmationContainerBox:"drag-confirmation-container-box"});

              }//if
          //data-ruleName ={this.rule.ruleName}
       }.bind(this)

     
  
   });
}

componentDidUpdate(prevProps, prevState) {
    /******move the browser scroll to  newly added rule position*******************/
  if( (RuleStore.getAddedRuleSection()==this.props.secName) && 
    (RuleStore.getAddedRulePos()==this.props.rulePosition) ){
      let element=this.refs.ruleTable.getBoundingClientRect();
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      let currentTopPos = element.top + scrollTop;
      var height = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
    
      //if(element.top<0 || element.top>=height-50){
       window.scrollTo(0,currentTopPos-100);
     //  }
        this.refs.ruleTable.style.opacity = 0;
        setTimeout(function(){ 
        this.refs.ruleTable.style.transition = "opacity 1s";
        this.refs.ruleTable.style.opacity = 1;
       }.bind(this),1000);
      //reset the getAddedRulePos
      RuleStore.resetTheAddedRulePos();

  }else{
       if(this.refs.ruleTable.style.transition){
        this.refs.ruleTable.style.transition="";
       }
       if(this.refs.ruleTable.style.opacity){
        this.refs.ruleTable.style.opacity="";
       }

  }
}


/** function to collapse the conditions **********/
hideClicked(){


this.setState({isToShowRuleContent:false,conditionClass:"visuallyhidden"});

setTimeout(function(){

  this.setState({conditionClass:"hide"});
  

}.bind(this),500);


} //hideClicked

showClicked(){

this.setState({isToShowRuleContent:true,conditionClass:"showAll"});
setTimeout(function(){

  this.setState({conditionClass:"visuallyShow"});
  

}.bind(this),500);

}


moveUp(){


//window.scrollTo(0,rule-100);

RuleStore.hideMoveUpView( this.props.secName,this.props.rulePosition);
this.setState({ruleTableClass:"moveup-rule",isToShowRuleContent:false,conditionClass:"hide"});


setTimeout(function(){

RuleAction.moveRuleUp(this.props.secName,this.props.rulePosition);

setTimeout(function(){
this.setState({ruleTableClass:"rule"});



 }.bind(this),400);
 
 

}.bind(this),700); 



} //move rule up

moveDown(){
  RuleStore.hideMoveDownView( this.props.secName,this.props.rulePosition);
  this.setState({ruleTableClass:"movedown-rule",isToShowRuleContent:false,conditionClass:"hide"});
  setTimeout(function(){
 /* this.setState({ruleTableClass:"movedownUp-rule"}); */

  RuleAction.moveRuleDown(this.props.secName,this.props.rulePosition);
   setTimeout(function(){
  this.setState({ruleTableClass:"rule"});
}.bind(this),400); 
  }.bind(this),700);
 
} //move rule down


openDeleteRuleDialog(){


this.setState({deleteConfirmationBoxContainerClass:"confirmationBoxContainer"});

setTimeout(function(){

this.setState({deleteConfirmationBoxClass:"confirmationBoxFinalPosition"});

}.bind(this),20);


} //delete rule dialog box

cancelDelete(){

this.setState({deleteConfirmationBoxContainerClass:"hide",deleteConfirmationBoxClass:"confirmationBoxInitialPosition"});
} //cancel delete ruledialog

deleteRule(){

RuleAction.deleteRule(this.props.secName,this.props.rulePosition);
this.cancelDelete();
} //delete rule

editRuleClicked(){

this.setState({ ruleNameEditClass:"edit"});
if (this.refs.ruleNameInput !== null) {
      this.refs.ruleNameInput.focus();
    }
} //edit rule button clicked

doneRuleNameEdit(){

this.setState({ ruleNameEditClass:""});
} //donerule name  edit

changeRuleName(){

RuleAction.changeRuleName(this.props.secName,this.props.rulePosition,this.refs.ruleNameInput.value);

} //change Rule Name


/*copy  releated dialog box */
openCopyRuleDialog(){

this.setState({copyConfirmationBoxContainerClass:"confirmationBoxContainer"});

setTimeout(function(){

this.setState({copyConfirmationBoxClass:"confirmationBoxFinalPosition"});

}.bind(this),20);



} //openCopy


cancelCopy(){

this.setState({copyConfirmationBoxContainerClass:"hide",copyConfirmationBoxClass:"confirmationBoxInitialPosition"});


} //cancel copy

copyRule(){

this.props.copyRuleFunction(this.props.secName,this.props.rulePosition,RuleAction,++this.state.copyCreated);
this.setState({copyConfirmationBoxContainerClass:"hide",copyConfirmationBoxClass:"confirmationBoxInitialPosition"});

}//copy reul


/************************hadnle swap method**************************************************/
swapRule(){

RuleAction.dragRule(this.props.secName,this.props.rulePosition,this.swapSecName,this.swapRulePosition);
this.setState({dragConfirmationContainerBox:"hide",selectedOption:"before"});
}

insertAfterRule(){

RuleAction.moveRuleAfterSomeRule(this.props.secName,this.props.rulePosition,this.swapSecName,this.swapRulePosition);
this.setState({dragConfirmationContainerBox:"hide",isToShowRuleContent:false,conditionClass:"hide",selectedOption:"before"});
}
 
insertBeforeRule(){


RuleAction.moveRuleBeforeSomeRule(this.props.secName,this.props.rulePosition,this.swapSecName,this.swapRulePosition);

this.setState({dragConfirmationContainerBox:"hide",isToShowRuleContent:false,conditionClass:"hide",selectedOption:"before"});
}  

closeDragRuleWindow(){

 this.setState({dragConfirmationContainerBox:"hide",selectedOption:"before"}); 
}


///it is get called while clicking the creative group to show
changeZIndex(){

 if(this.state.zIndexClass==""){
  this.setState({zIndexClass:"ZIndex"});
   }else{
    this.setState({zIndexClass:""});
   }
}



//handle option change for drag option
handleOptionChange(e){
this.setState({selectedOption:e.target.value});
}  

dragRuleMethod(){

switch(this.state.selectedOption){

  case "before" :
       this.insertBeforeRule();
    break;
  case "after" :
       this.insertAfterRule();
    break;

  case "swap" :
       this.swapRule();
    break;   

  }
}















/*****************render method ****************************************************************************/
render(){

  let validationError={};
  validationError["display"]="none";
  validationError["position"]="absolute";
  validationError["top"]=10;
  validationError["left"]=-4;
  validationError["color"]="red";

if(RuleErrorStore.isEvaluateError() && this.state.conditionClass=="hide"){
  
  if(RuleErrorStore.chekIfThereIsErrorForIds(this.rule.id,"Rule")){
      validationError["display"]="inline-block";
    }

}

/**************************check for assetGroup delete **************************************/

if(this.rule.creative_groups != undefined){
var deletedAssetGroup = this.rule.creative_groups.filter( (groupName)=>{

    for(let i=0;i< dyn_assetGroups.length ;i++){

            if(groupName ==  dyn_assetGroups[i].groupName){
              return false;
            }
       }

  return true;
 });
}else{

 var deletedAssetGroup = [];
  if(this.rule.creative_group != undefined){
    let deletedIndex = dyn_assetGroups.indexOf(this.rule.creative_group);
    if(deletedIndex == -1){ deletedAssetGroup.push(this.rule.creative_group); }
  }

}


var isToShowCreativeGroupWarningClass = deletedAssetGroup.length>0 ? "recordDeleted":"hide" ;


/****************************************************************************************/

/**check weather include asset source exit or  not********/
let includeAssetSources = [];
if(this.rule.reportConfig){
  if(this.rule.reportConfig.includeAssetSources){
     includeAssetSources = this.rule.reportConfig.includeAssetSources;
   }
}

if(this.state.conditionClass!="hide"){
var conditions = this.rule.conditions.map( (condition,i) =>   

 <Condition key={i} ruleName={this.rule.ruleName} condition={condition} advertiserId={this.props.advertiserId} addId={this.props.addId}
  rulePosition={this.props.rulePosition} includeAssetSources={includeAssetSources}
  changePaddingListener={this.changePaddingListener.bind(this)}
  secName={this.props.secName} conditionClass={this.state.conditionClass}
 /> 
  );
}else{
  var conditions = [];
}

//***********8 codeforsetting classes ********************//
let showUpArrow = {'display':'none'};
let showDownArrow = {'display':'none'};
let ruleHighlighter = {
    "display": "none",
    "position": "absolute",
    "top": -1,
    "left": 0,
    "width": 0,
    "height": 0,
    "borderBottom": "9px solid transparent",
    "borderLeft": "10px solid #666"

};

if(this.state.isToShowRuleContent){
  showUpArrow['display'] = 'block';
  
}else{
 showDownArrow['display'] = 'block'; 
}


//style for rule head
let tableBackground = {};
if(this.props.rulePosition%2==0){
   tableBackground['background'] = '#FAFAFA';
 }
if(this.state.conditionClass!="hide"){
   tableBackground['background'] = '#CCCCCC';
   ruleHighlighter['display'] = "inline-block";
}

return (

  <li 
  
  className={this.state.zIndexClass} 
  >
      <div className={this.state.deleteConfirmationBoxContainerClass}>

         <div className={this.state.deleteConfirmationBoxClass}>

              <span className="title">Delete Rule</span>  
              <div className="content">
                <i className="fa fa-exclamation-triangle fa-4x" aria-hidden="true"></i>
                <span>Are you sure you want to delete rule <strong>{this.rule.ruleName}</strong>?
                </span>
              </div>
              <div className="action">
               <span className="delete" onClick={this.deleteRule.bind(this)}>Ok</span>
               <span className="cancel" onClick={this.cancelDelete.bind(this)}>Cancel</span>
             
              </div>

        </div>
      </div>



      <div className={this.state.copyConfirmationBoxContainerClass}>

         <div className={this.state.copyConfirmationBoxClass}>

              <span className="title">Copy Rule</span>  
              <div className="content">
                <i className="fa fa-exclamation-triangle fa-4x" aria-hidden="true"></i>
                <span>Are you sure you want to copy rule <strong>{this.rule.ruleName}</strong>?
                </span>
              </div>
              <div className="action">
               <span className="delete" onClick={this.copyRule.bind(this)}>Ok</span>
              <span className="cancel" onClick={this.cancelCopy.bind(this)}>Cancel</span>
             
              </div>


              
        </div>
      </div>

      <div className={this.state.dragConfirmationContainerBox} >
         
        <div className="drag-confirmation-box">

         <div className="header">
          <span className="title">{this.swapRuleName}</span>
          <i className="fa fa-close" aria-hidden="true"  onClick={this.closeDragRuleWindow.bind(this)}></i> 
          </div>
          <div className="options-container">
   
              <div className="option">
               <span className="radio-button-border"></span>
               <label>
                 <input type="radio"  value="before" 
                  checked={this.state.selectedOption === 'before'}
                  onChange={this.handleOptionChange.bind(this)}

                 />
                 <span >
                 Insert it before rule <strong style={ {fontWeight:"bold" } }>{this.rule.ruleName}</strong>
                 </span>
               </label>
              </div>

              <div className="option">
               <span className="radio-button-border"></span>
               <label>
                 <input type="radio"  value="after" 
                  checked={this.state.selectedOption === 'after'}
                  onChange={this.handleOptionChange.bind(this)}
                 />
                 <span >
                 Insert it after rule <strong style={ {fontWeight:"bold"} }>{this.rule.ruleName}</strong>
                 </span>
               </label>
              </div>

              <div className="option">
               <span className="radio-button-border"></span>
               <label>
                 <input type="radio" value="swap" 
                   checked={this.state.selectedOption === 'swap'}
                   onChange={this.handleOptionChange.bind(this)}
                 />
                 <span >
                 Swap with rule <strong style={ {fontWeight:"bold"} }>{this.rule.ruleName}</strong>
                 </span>
               </label>
              </div>


          </div>

          <div className="action">
            <div>  
              <span className="move" onClick={this.dragRuleMethod.bind(this)}>Ok</span>
              <span className="cancel" onClick={this.closeDragRuleWindow.bind(this)}>Cancel</span>
            </div> 
          </div>

        </div>
      </div>



    <table className={this.state.ruleTableClass} ref="ruleTable" style={tableBackground}
     onMouseOver={ ()=>{ 

         if(this.state.conditionClass!="hide"){

            this.refs.ruleTable.style.background = '#e6e4e4';
           }else{
            this.refs.ruleTable.style.background = '#F1F1F1';
            
           }
      }}
     
     onMouseOut={ ()=>{ 
       if(this.state.conditionClass=="hide"){  
           if(this.props.rulePosition%2==0){
              this.refs.ruleTable.style.background = '#FAFAFA';
            } else{
              this.refs.ruleTable.style.background = '#FFFFFF';
            }
         }    
      }}

    >      
        
 
     <tbody>
     <tr>
       <td> 
             <span style={ruleHighlighter}></span>
             <span  style={showUpArrow}><i className="fa fa-minus"
                onClick={this.hideClicked.bind(this)}></i>
             </span>
             <span  style={showDownArrow}>
              <i   className="fa fa-plus"
                  onClick={this.showClicked.bind(this)}></i>
             </span>
       </td>
       <td className="ruleName">
        
         <input type="text" ref="ruleNameInput"
           className={this.state.ruleNameEditClass} 
           value={this.rule.ruleName} 
           maxLength={64}
           onChange={this.changeRuleName.bind(this)}
           onBlur={this.doneRuleNameEdit.bind(this)}
           /> 
         <i data-tooltip="editRuleName" className="fa fa-pencil" aria-hidden="true" onClick={this.editRuleClicked.bind(this)}></i>
       </td>
       
       <td >
             
            <CreativeGroupToShow creativeGroups={this.rule.creative_groups} creativeGroup={this.rule.creative_group}
            changeZIndex={this.changeZIndex.bind(this)} secName={this.props.secName} rulePosition={this.props.rulePosition}/>
          
              <span className={isToShowCreativeGroupWarningClass}>
               <i className="fa fa-exclamation" aria-hidden="true"></i>
              </span>
             
              <div className="error-message">
              <div className="arrow-right"></div>
              <div className="message">
                Some of the Rules references asset groups that are no longer available. Please update the Rules to reference valid asset groups.
              </div>

         </div>
            
        </td>


       <td >
        <i data-tooltip="moveRuleUp" className="fa fa-chevron-up" aria-hidden="true"  onClick={this.moveUp.bind(this)}></i>
        <i data-tooltip="moveRuleDown" className="fa fa-chevron-down" aria-hidden="true" onClick={this.moveDown.bind(this)}></i>
        <i data-tooltip="deleteRule" className="fa fa-trash" aria-hidden="true" onClick={this.openDeleteRuleDialog.bind(this)}></i>
        <i data-tooltip="cloneRule" className="fa fa-copy" aria-hidden="true" onClick={this.openCopyRuleDialog.bind(this)}></i>
       </td>

     </tr>
     </tbody> 
    </table>
    <span style={validationError}>
       <a  className="error"><i className="fa fa-exclamation"></i></a>
    </span>

     <ul className={this.state.conditionClass}> 
      {conditions}
     </ul>


  </li>

);


}

} //ruleclass