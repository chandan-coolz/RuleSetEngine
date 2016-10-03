import React from 'react';
import {render} from 'react-dom';
import  Data from './Data.jsx';
import RuleStore from '../stores/RuleStore.jsx';
import {initializeData}  from '../actions/RuleAction.jsx';

export default class DynamicCompaign extends React.Component {

constructor(){
 super();
 this.state = {

   data : RuleStore.getRuleData(),
   hideRulePos:-1,
   defaultAssetGroup:dyn_dataToPost.defaultAssetGroup
               
 };

 
} //constructor



componentWillMount() {

/**************make a ajax call to get data from the server***********************************
var xhttp = new XMLHttpRequest();

let data={};
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        
        initializeData(JSON.parse(xhttp.responseText) );

    }
  }.bind(this);

xhttp.open("POST", "/studio/api/dynamicCampaignServices.php", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send("adId="+$("#adId").val()+"&campaignId="+campaignIdx,+"&versionId="+versionId)
;



********************************************************************************************/
var addID= $("#adId").val();
var advertiserID= advertiserId;
this.setState({addId:addID,advertiserId :advertiserID });

 RuleStore.on("change", () => {
  window.data = RuleStore.getRuleData();
 this.setState({
   data : RuleStore.getRuleData(),

   hideRulePos: RuleStore.getHideRulsPos()
 }) 
 }) ;    
}//componentWillMount function


changeDefaultAssetGroup(e){

 dyn_dataToPost.defaultAssetGroup = e.target.value;
 this.setState({defaultAssetGroup:e.target.value});
}//changeDefaultAssetGroup



render(){

var assetGroupsOption = dyn_assetGroups.map( (obj,i)=> <option key={i} value={obj.groupName}>{obj.groupName}</option> );

return(

  <div className="dynamic-campaign-container">
  
   
      <div className="default-asset-group">
        
      <span>Default Asset Group:</span>
       <select value={this.state.defaultAssetGroup} onChange={this.changeDefaultAssetGroup.bind(this)}>
        <option value="">-- Select Default Group --</option>
        {assetGroupsOption}
       </select>
      </div>
  
    <Data data={this.state.data} advertiserId={this.state.advertiserId} 
    addId={this.state.addId} hideRulePos={this.state.hideRulePos} 
    /> 

  </div>

);//return function


}//render



} //DynamicCompaign