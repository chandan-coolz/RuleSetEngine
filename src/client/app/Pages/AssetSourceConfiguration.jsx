
import React from 'react';
import {render} from 'react-dom';
import DynamicCampaignConfig from '../stores/dynamicCampaignConfig.jsx';
import tempDataStore from '../stores/tempDataStore.jsx';
import {updateIncludeAssetSources} from '../actions/RuleAction.jsx';
export default class AssetSourceConfiguration extends React.Component {

constructor(){

super();

this.state = {
dyn_assetSource : DynamicCampaignConfig.getAssetSourceData(),
assetSourceConfigurationClass:"hide",
errorMessageClassObj :{}
 };

 this.deletedIncludeAssetSource=[];
 this.isHavingAnyIncludeAssetSourceChecked = false;

}//constructor

//function to listen to change of eventEmitter
refressAassetSource(nextProps){
  

    this.deletedIncludeAssetSource = tempDataStore.getDeletedIncludeAssetSource(''+nextProps.secName+nextProps.ruleName);
 
  let tempAssetResource = DynamicCampaignConfig.getAssetSourceData();
  
   //delete the id which u have in reportConfig but not in current assetsource list
/************delete phase************************************************************/

   let filterResult = nextProps.includeAssetSources.filter( function(element){

           for(let i=0;i<tempAssetResource.length;i++){
                if(tempAssetResource[i].assetDatabase == element){
                  return false;

                }
               
           }
           return true;
   });
//copy the data from our current include resource and make it ready for delete  
   let tempIncludeAssetSourceAfterDel = JSON.parse(JSON.stringify(nextProps.includeAssetSources));
   for(let i=0;i<filterResult.length;i++){
      let index=tempIncludeAssetSourceAfterDel.indexOf(filterResult[i]);
      tempIncludeAssetSourceAfterDel.splice(index,1);
     if(this.deletedIncludeAssetSource.indexOf(filterResult[i]) == -1){ 
        this.deletedIncludeAssetSource.push(filterResult[i]);
       }
      if(this.refs[filterResult[i]]){this.refs[filterResult[i]].checked = false; } 
   }

 if(filterResult.length>0){
    //store the deleted asset source

    tempDataStore.setDeletedIncludeAssetSource(''+nextProps.secName+nextProps.ruleName,this.deletedIncludeAssetSource); 
 //   updateIncludeAssetSources(nextProps.secName,nextProps.rulePosition,tempIncludeAssetSourceAfterDel);
        
 }    

/************************Restore Phase*************************************************************/

let assetToRestore = this.deletedIncludeAssetSource.filter( (asset)=>{

     for(let i=0;i<tempAssetResource.length;i++){
          
         if(tempAssetResource[i].assetDatabase == asset){
                  return true;

          } 

     }
  return false;

});

 //restore the asset

 let tempIncludeAssetSourcesAfterRestore = JSON.parse(JSON.stringify(nextProps.includeAssetSources));
 

     for(let i=0;i<assetToRestore.length;i++){
         tempIncludeAssetSourcesAfterRestore.push(assetToRestore[i]);
         let  index = this.deletedIncludeAssetSource.indexOf(assetToRestore[i]);
         this.deletedIncludeAssetSource.splice(index,1);
  }

 if(assetToRestore.length>0){
 tempDataStore.setDeletedIncludeAssetSource(''+nextProps.secName+nextProps.ruleName,this.deletedIncludeAssetSource);  
 //updateIncludeAssetSources(nextProps.secName,nextProps.rulePosition,tempIncludeAssetSourcesAfterRestore);
 }




    this.setState({ dyn_assetSource : tempAssetResource});


}//assetSourceChangeListener


componentWillMount() {
 //delete the assetSource which are not present in our current databaselist
 let tempAssetResource = DynamicCampaignConfig.getAssetSourceData();

let tempIncludeAssetSourceAfterDel = JSON.parse(JSON.stringify(this.props.includeAssetSources));


var notExistedIncludeAssetSource =  tempIncludeAssetSourceAfterDel.filter( (assetId)=>{  
           
         for(var j=0;j<dyn_DatabaseList.length;j++){
              
              if(assetId==dyn_DatabaseList[j].dataServiceId){
                 return false;
              }//if

             

          }//for

  return true;
 });


for(let i=0;i<notExistedIncludeAssetSource.length;i++){
      let index=tempIncludeAssetSourceAfterDel.indexOf(notExistedIncludeAssetSource[i]);
      tempIncludeAssetSourceAfterDel.splice(index,1);       
}


//update our current includeAssetSources  
if(tempIncludeAssetSourceAfterDel.length != this.props.includeAssetSources.length){

updateIncludeAssetSources(this.props.secName,this.props.rulePosition,tempIncludeAssetSourceAfterDel);
}

  


}

componentWillReceiveProps(nextProps) {

  this.refressAassetSource(nextProps);
 // tempDataStore.doAnyIncludeAssetSourceChecked();
}


componentWillUnmount() {

this.isHavingAnyIncludeAssetSourceChecked = false;
}

/*****************setup the errorMessageClass*********************************************/

componentDidUpdate(prevProps,prevState){

    for(let i=0;i<this.props.includeAssetSources.length;i++){
           if( this.refs[this.props.includeAssetSources[i]]  ){
             this.refs[this.props.includeAssetSources[i]].checked = true;  
              }
              
     }   

    if(!this.isHavingAnyIncludeAssetSourceChecked && this.props.includeAssetSources.length>0){
      let rule = "sec"+this.props.secName+"rule"+this.props.rulePosition;
      tempDataStore.setRulesHaveingIncludedAssetSourceChecked(rule,false);
      this.isHavingAnyIncludeAssetSourceChecked = true;
    } 

    if(this.isHavingAnyIncludeAssetSourceChecked && this.props.includeAssetSources.length==0){
      let rule = "sec"+this.props.secName+"rule"+this.props.rulePosition;
      tempDataStore.removeRulesHaveingIncludedAssetSourceChecked(rule,false);
      this.isHavingAnyIncludeAssetSourceChecked = false ;      
    }
}     




componentDidMount(){

  for(let i=0;i<this.props.includeAssetSources.length;i++){
           if( this.refs[this.props.includeAssetSources[i]]  ){
             this.refs[this.props.includeAssetSources[i]].checked = true;  
              }
              
     }

    if(!this.isHavingAnyIncludeAssetSourceChecked && this.props.includeAssetSources.length>0){
      let rule = "sec"+this.props.secName+"rule"+this.props.rulePosition;
      tempDataStore.setRulesHaveingIncludedAssetSourceChecked(rule,true);
      this.isHavingAnyIncludeAssetSourceChecked = true ;
    }

    if(this.isHavingAnyIncludeAssetSourceChecked && this.props.includeAssetSources.length==0){
      let rule = "sec"+this.props.secName+"rule"+this.props.rulePosition;
      tempDataStore.removeRulesHaveingIncludedAssetSourceChecked(rule,true);
      this.isHavingAnyIncludeAssetSourceChecked = false ;      
    }

}//componentDidMount()







checkBoxChanged(isChecked,assetDatabase){

let tmpAssetSources = JSON.parse(JSON.stringify(this.props.includeAssetSources));

    if(isChecked){
       tmpAssetSources.push(assetDatabase);
       var index = this.deletedIncludeAssetSource.indexOf(assetDatabase);
       this.deletedIncludeAssetSource.splice(index);

    }else{
      var index = tmpAssetSources.indexOf(assetDatabase);
      tmpAssetSources.splice(index,1);
    }

 updateIncludeAssetSources(this.props.secName,this.props.rulePosition,tmpAssetSources);

}






render(){


var tempassetSorceData = this.state.dyn_assetSource.filter( (obj,i)=>{

  for(let j=0;j<this.deletedIncludeAssetSource.length;j++){
        if(obj.assetDatabase == this.deletedIncludeAssetSource[j]){
           return false;
           break;
        }
    
      }
  return true;    

});
/**********filter those whose datatype is basicReco***************************************/

var assetSorceData = tempassetSorceData.filter( (obj,i)=>{

   for(let j=0;j<dyn_DatabaseList.length;j++){

       if(dyn_DatabaseList[j].dataServiceId == obj.assetDatabase){
           
           if(dyn_DatabaseList[j].dbType == "basicReco"){
              return false;
           }else{
              return true;
           }

        }
     }    

});



var assetSourceTableRow = assetSorceData.map( (obj,i)=> 
        <tr key={i}>
         <td>{obj.dataServiceName}</td>
         <td>
             <div className="checkbox" ><input type="checkbox" id={this.props.ruleName+obj.assetDatabase} 
               onChange={(e) => this.checkBoxChanged(e.target.checked,obj.assetDatabase)}
               ref={obj.assetDatabase}
              />
               <label htmlFor={this.props.ruleName+obj.assetDatabase}></label>
             </div> 
         </td>
        </tr>
  );  
/*****************get the asset name for deleted ids**********************************/

var deletedIncludeAssetSourceObject =  this.deletedIncludeAssetSource.map( (assetId)=>{  
           let temp = {};
         for(var j=0;j<dyn_DatabaseList.length;j++){
              
              if(assetId==dyn_DatabaseList[j].dataServiceId){
                   //store  it in some variable
                 temp["assetDatabase"] = assetId;
                 temp["dataServiceName"] = dyn_DatabaseList[j].dataServiceName;
              }//if

             

          }//for

          return temp;
 });









/***********prepare the row*********************************************************/
var deletedIncludeAssetSourceRow = deletedIncludeAssetSourceObject.map( (obj,i)=>
    
    <tr key={i}>
      <td>{obj.dataServiceName}</td>
      <td>
          <div className="checkbox" ><input type="checkbox" id={this.props.ruleName+obj.assetDatabase} 
                onChange={(e) => this.checkBoxChanged(e.target.checked,obj.assetDatabase)}
                ref={obj.assetDatabase}
              />
               <label htmlFor={this.props.ruleName+obj.assetDatabase}></label>
          </div> 
          
        
          <span className="recordDeleted" >
          <i className="fa fa-exclamation" aria-hidden="true"></i>
         </span> 
         <div className="error-message">
              <div className="arrow-left"></div>
              <div className="message">
                Some of the services reference Databases that are no longer available. Please update 
                the Services to reference valid Databases.
              </div>
         </div>






      </td>
    </tr>
  );

let assetSourceConfigurationStyle = {};
if(deletedIncludeAssetSourceObject.length==0  && assetSorceData.length==0){
this.state.assetSourceConfigurationClass='hide';
assetSourceConfigurationStyle['display'] = 'none';
}else{
 this.state.assetSourceConfigurationClass="asset-source-configuration";
}



return(

<div className={this.state.assetSourceConfigurationClass} style={assetSourceConfigurationStyle}>
<hr />
<h5><i className="fa fa-arrow-down" aria-hidden="true"></i> <span>Asset Source Configuration</span></h5>

<table className="asset-source-table">
  <thead>
     <tr>
         <th>Available Asset Sources</th>
         <th>Include in Creative Variant</th>
     </tr>
  </thead>
  <tbody>
    
     {assetSourceTableRow}
     {deletedIncludeAssetSourceRow}
  </tbody>


</table>
</div>
);
}

}
//