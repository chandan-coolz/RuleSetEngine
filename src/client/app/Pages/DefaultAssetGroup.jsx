import React from 'react';
import {render} from 'react-dom';
import SelectStyle from './SelectStyle.jsx';


export default class DefaultRuleGroup extends React.Component {


constructor(){
 super();
this.state ={
   defaultAssetGroup:"",
   isToShowSelectBox:false

};//state
this.isBlurEventCalled=false;
 lastDeletedDefaultRule:"" ;
}//constructor



componentWillMount() {

 if(dyn_dataToPost.defaultAssetGroup == undefined){
  dyn_dataToPost.defaultAssetGroup="";
 }else{
  this.state.defaultAssetGroup = dyn_dataToPost.defaultAssetGroup;
 }

}

componentDidMount() {

  if(this.refs.defaultAssetGroupCurrentValueText.innerHTML=="-- No Asset Groups --"){
        this.refs.defaultAssetGroupCurrentValueText.style.opacity = 0.5;
  }else{
    this.refs.defaultAssetGroupCurrentValueText.style.opacity = 1;
  }
}
componentWillReceiveProps(nextProps) {
  this.setState({defaultAssetGroup:dyn_dataToPost.defaultAssetGroup});
}
componentDidUpdate(prevProps, prevState) {
  if(this.refs.defaultAssetGroupCurrentValueText.innerHTML=="-- No Asset Groups --"){
        this.refs.defaultAssetGroupCurrentValueText.style.opacity = 0.5;
  }else{
    this.refs.defaultAssetGroupCurrentValueText.style.opacity = 1;
  }
}


toggleSelectBox(){
if(!this.isBlurEventCalled){
  let temp = !this.state.isToShowSelectBox;
  this.setState({isToShowSelectBox:temp});
 }else{
  this.isBlurEventCalled=false;
 }
}

hideSelectBox(){
 this.setState({isToShowSelectBox:false});
 this.isBlurEventCalled=true;
}

changeDefaultAssetGroup(newValue){

 dyn_dataToPost.defaultAssetGroup = newValue;
  this.setState({defaultAssetGroup:newValue,isToShowSelectBox:false});
 
}//changeDefaultAssetGroup



render(){
/**************************deleteed Asset Groupcheck *********************************************/
this.lastDeletedDefaultRule="";
let  isToShowCreativeGroupWarningClass="recordDeleted";
    for(let i=0;i< dyn_assetGroups.length ;i++){

            if(dyn_dataToPost.defaultAssetGroup ==  dyn_assetGroups[i].groupName){
              isToShowCreativeGroupWarningClass="hide";
              break;
            }
       }
  if(dyn_dataToPost.defaultAssetGroup==""){
    isToShowCreativeGroupWarningClass="hide";
  }

/*************************************deleted asset group check end**************************/


let assetGroupsOptionKey=[];
let assetGroupOptionValue=[];
assetGroupsOptionKey.push("");
assetGroupOptionValue.push("-- No Asset Groups --");
for(let i=0;i<dyn_assetGroups.length;i++){

   assetGroupsOptionKey.push(dyn_assetGroups[i].groupName);
   assetGroupOptionValue.push(dyn_assetGroups[i].groupName);
 }

 if( isToShowCreativeGroupWarningClass=="recordDeleted" ){
  
  this.lastDeletedDefaultRule = dyn_dataToPost.defaultAssetGroup;
}

if(this.lastDeletedDefaultRule!=""){
   assetGroupsOptionKey.push(this.lastDeletedDefaultRule);
   assetGroupOptionValue.push(this.lastDeletedDefaultRule);
}
/****check for default asset group text****/
let defaultAssetGroupCurrentValueText = this.state.defaultAssetGroup==""?"-- Select Default Group --":this.state.defaultAssetGroup;
if(dyn_assetGroups.length == 0 && this.lastDeletedDefaultRule == ""){

   defaultAssetGroupCurrentValueText = "-- No Asset Groups --";
}




return( 
 <div style={{"display":"inline-block"}}> 
       <div className="default-asset-group-select"
        onClick={this.toggleSelectBox.bind(this)}
        onMouseEnter={function(){this.isBlurEventCalled=false}.bind(this) } >
            <span ref="defaultAssetGroupCurrentValueText">
             {defaultAssetGroupCurrentValueText}
            </span>
            <div className="down-triangle"></div>
            <SelectStyle keys={assetGroupsOptionKey} values={assetGroupOptionValue} 
             methodToCall={this.changeDefaultAssetGroup.bind(this)}
             isToShowSelectBox={this.state.isToShowSelectBox} 
             hideSelectBox={this.hideSelectBox.bind(this)}
             />

       </div>

      <span  className={isToShowCreativeGroupWarningClass}>
               <i className="fa fa-exclamation" aria-hidden="true"></i>
       </span>
             
      <div className="error-message">
              <div className="arrow-up"></div>
              <div className="message">
                The asset group used as Default is no longer available. Please select a valid asset group.
              </div>

         </div> 
 </div>      

 );
}//render

}
