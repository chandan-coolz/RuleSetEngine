import React from 'react';
import {render} from 'react-dom';
import Condition from './Condition.jsx';
import * as RuleAction from '../actions/RuleAction.jsx';
import Data from './Data.jsx';
import CreativeGroupToShow from './CreativeGroupToShow.jsx';

export default class Rule extends React.Component {

constructor(){

  super();
  this.swapRulePosition=-1;
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
    zIndexClass:""

  } ;

 

} //constructor















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

RuleAction.hideView(this.props.rulePosition-1);
this.setState({ruleTableClass:"moveup-rule",isToShowRuleContent:false,conditionClass:"hide"});


setTimeout(function(){

 RuleAction.moveRuleUp(this.props.rulePosition);

 setTimeout(function(){
this.setState({ruleTableClass:"rule"});

   setTimeout(function(){
  
    RuleAction.hideView(-1);
   }.bind(this),500); 

 }.bind(this),200);
 
 

}.bind(this),700); 



} //move rule up

moveDown(){
  this.setState({ruleTableClass:"movedown-rule",isToShowRuleContent:false,conditionClass:"hide"});
  setTimeout(function(){
 /* this.setState({ruleTableClass:"movedownUp-rule"}); */

  RuleAction.moveRuleDown(this.props.rulePosition);
   setTimeout(function(){
  this.setState({ruleTableClass:"rule"});
}.bind(this),200); 
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

 RuleAction.deleteRule(this.props.rulePosition);
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

RuleAction.changeRuleName(this.props.rulePosition,this.refs.ruleNameInput.value);

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

this.props.copyRuleFunction(this.props.rulePosition,RuleAction,++this.state.copyCreated);
this.setState({copyConfirmationBoxContainerClass:"hide",copyConfirmationBoxClass:"confirmationBoxInitialPosition"});

}//copy reul

/*************dragable releated methods ********************************************************************/

handleDragStart(e){

  
  e.dataTransfer.effectAllowed = 'move';
 // e.dataTransfer.dropEffect='move';
  e.dataTransfer.setData('text', ''+this.props.rulePosition);
  e.target.style.opacity = '0.7';
  this.setState({isToShowRuleContent:false,conditionClass:"hide"});
  

}

handleDragOver(e){

if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

 // e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}



handleDragEnd(e){


 e.target.style.opacity = '1';

}

handleDrop(e){


if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

let newPos = Number(e.dataTransfer.getData('text') );

if(newPos!=this.props.rulePosition){
this.swapRulePosition = newPos;
this.setState({dragConfirmationContainerBox:"drag-confirmation-container-box"});
//RuleAction.dragRule(this.props.rulePosition,newPos);
}

  return false;


}
/************************hadnle swap method**************************************************/
swapRule(){

RuleAction.dragRule(this.props.rulePosition,this.swapRulePosition);
this.setState({dragConfirmationContainerBox:"hide",isToShowRuleContent:false,conditionClass:"hide"});
}

insertAfterRule(){

RuleAction.moveRuleAfterSomeRule(this.props.rulePosition,this.swapRulePosition);
this.setState({dragConfirmationContainerBox:"hide",isToShowRuleContent:false,conditionClass:"hide"});
}
 
insertBeforeRule(){


RuleAction.moveRuleBeforeSomeRule(this.props.rulePosition,this.swapRulePosition);

this.setState({dragConfirmationContainerBox:"hide",isToShowRuleContent:false,conditionClass:"hide"});
}  

closeDragRuleWindow(){

 this.setState({dragConfirmationContainerBox:"hide"}); 
}


///it is get called while clicking the creative group to show
changeZIndex(){
 if(this.state.zIndexClass==""){
  this.setState({zIndexClass:"ZIndex"});
   }else{
    this.setState({zIndexClass:""});
   }
}


/*****************render method ****************************************************************************/
render(){

let conditionClass = this.state.conditionClass;
if(this.props.hideRulePos == this.props.rulePosition ){
   //collapse the conditional class if it is already opened while moving up 
  conditionClass="hide";
  let element=this.refs.ruleTable.getBoundingClientRect();
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let currentTopPos = element.top + scrollTop;
 if(element.top<0){
   window.scrollTo(0,currentTopPos-100);
   }
}
var conditions = this.props.rule.conditions.map( (condition,i) =>   

 <Condition key={i} condition={condition} advertiserId={this.props.advertiserId} addId={this.props.addId}/> 
	);

//***********8 codeforsetting classes ********************//
const showUpArrow = this.state.isToShowRuleContent? "show" : "hide";
const showDownArrow = this.state.isToShowRuleContent ? "hide" : "show";
//const conditionClass = this.state.isToShowRuleContent ? "show" : "hide";



//console.log(this.props.rule);
return (

  <li draggable="true"
  onDragStart={this.handleDragStart.bind(this)}
  onDragOver={this.handleDragOver.bind(this)}
  onDragEnd={this.handleDragEnd.bind(this)}
  onDrop={this.handleDrop.bind(this)}
  className={this.state.zIndexClass} 
  >
      <div className={this.state.deleteConfirmationBoxContainerClass}>

         <div className={this.state.deleteConfirmationBoxClass}>

              <span className="title">Delete Rule</span> 	
              <div className="content">
                <i className="fa fa-exclamation-triangle fa-4x" aria-hidden="true"></i>
                <span>Are you sure you want to delete rule <strong>{this.props.rule.ruleName}</strong>?
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
                <span>Are you sure you want to copy rule <strong>{this.props.rule.ruleName}</strong>?
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
         <span onClick={this.closeDragRuleWindow.bind(this)}><i className="fa fa-times" aria-hidden="true"></i></span>
         <div className="options"> 
          <button onClick={this.insertBeforeRule.bind(this)}>INSERT IT BEFORE <strong>{this.props.rule.ruleName}</strong> </button>
          <button onClick={this.insertAfterRule.bind(this)}>INSERT IT AFTER <strong>{this.props.rule.ruleName}</strong> </button>
          <button onClick={this.swapRule.bind(this)}>SWAP WITH   <strong>{this.props.rule.ruleName}</strong> </button>
         </div> 
        </div>
      </div>



    <table className={this.state.ruleTableClass} ref="ruleTable">
      <thead>
      <tr>
          <th><span  className={showUpArrow}><i className="fa fa-angle-up" aria-hidden="true" 
                onClick={this.hideClicked.bind(this)}></i>
             </span>
             <span  className={showDownArrow}>
              <i className="fa fa-angle-down" aria-hidden="true" 
                  onClick={this.showClicked.bind(this)}></i>
             </span>
          </th>
          <th> Rule Title</th>

          <th> Creative Group to Show
          </th>

          <th> Options </th>



      </tr>
     </thead>
     <tbody>
     <tr>
       <td> </td>
       <td className="ruleName">
        
         <input type="text" ref="ruleNameInput"
          className={this.state.ruleNameEditClass} 
           value={this.props.rule.ruleName} 
           onChange={this.changeRuleName.bind(this)}
           onBlur={this.doneRuleNameEdit.bind(this)}
           /> 
         <i className="fa fa-pencil-square-o" aria-hidden="true" onClick={this.editRuleClicked.bind(this)}></i>
       </td>
       
       <td >
             
            <CreativeGroupToShow creativeGroups={this.props.rule.creative_groups}  changeZIndex={this.changeZIndex.bind(this)}/>

        </td>


       <td >
       	<i className="fa fa-arrow-up" aria-hidden="true"  onClick={this.moveUp.bind(this)}></i>
       	<i className="fa fa-arrow-down" aria-hidden="true" onClick={this.moveDown.bind(this)}></i>
       	<i className="fa fa-trash-o" aria-hidden="true" onClick={this.openDeleteRuleDialog.bind(this)}></i>
       	<i className="fa fa-files-o" aria-hidden="true" onClick={this.openCopyRuleDialog.bind(this)}></i>
       </td>
       
     </tr>
     </tbody> 
    </table>

     <ul className={conditionClass}> 
      {conditions}
     </ul>
  </li>

);


}

} //ruleclass