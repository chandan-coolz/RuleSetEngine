import { EventEmitter } from  'events';
EventEmitter.defaultMaxListeners = Infinity;
class DynamicCampaignConfig extends EventEmitter{


constructor(){
super();
this.initializeData();
 
} //constructor



initializeData(){

this.assetSourceData = [];
this.assetSourceDataPreviousLength = -1;

 if(dyn_dataToPost.assetSources){

/*******************************************************************************************/


    for(var i=0;i<dyn_dataToPost.assetSources.length;i++){
        
        var tempId = dyn_dataToPost.assetSources[i].assetDatabase;
           
         for(var j=0;j<dyn_DatabaseList.length;j++){
              
              if(tempId==dyn_DatabaseList[j].dataServiceId){
                   //store  it in some variable
                 this.assetSourceData.push({"assetDatabase":tempId,"dataServiceName":dyn_DatabaseList[j].dataServiceName});
                   //add it to asset Source dyn_DatabaseList
                /*   
                  dyn__triggerConfigServiceList[dyn_DatabaseList[j].dataServiceName]={
                            'name':dyn_DatabaseList[j].dataServiceName,
                            '_jvxMatchCount':{'name':'Number Of Matches',
                                              'type': 'text',
                                              'operations':["equals", "greater-than", "less-than"]
                                          }
                            

                    } */ //dyn__triggerConfigServiceList
              }//if

             

          }//for
  }//for outer
   this.assetSourceDataPreviousLength =dyn_dataToPost.assetSources.length; 

 }//if

this.operations = dyn__operations;


this.conditionOperator = dyn__conditionOperator;

this.checkForChange = setInterval(function(){ 
if(dyn_dataToPost.assetSources){ 

    if(dyn_dataToPost.assetSources.length!=this.assetSourceDataPreviousLength){

        this.refressAssetSourceData();
        this.assetSourceDataPreviousLength = dyn_dataToPost.assetSources.length;
        this.emit("assetSourcechange");
        
    }

} else{
//in case  if it is undefined
 if(this.assetSourceDataPreviousLength!=-1){
 this.assetSourceData = [];   
 this.assetSourceDataPreviousLength=-1;
 this.emit("assetSourcechange");
 }

}



}.bind(this), 1000);



}




stopSetIntervalTimer(){

clearInterval(this.checkForChange);

}



refressAssetSourceData(){
 
this.assetSourceData = [];
for(var i=0;i<dyn_dataToPost.assetSources.length;i++){
        
        var tempId = dyn_dataToPost.assetSources[i].assetDatabase;
           
         for(var j=0;j<dyn_DatabaseList.length;j++){
              
              if(tempId==dyn_DatabaseList[j].dataServiceId){
                   //store  it in some variable
                 this.assetSourceData.push({"assetDatabase":tempId,"dataServiceName":dyn_DatabaseList[j].dataServiceName});
                   

              }//if

             

          }//for
  }//for
}//refressAssetSourceData





getDynamicCampaignConfig(){
   //getting the assetSourceList
	return  dyn__triggerConfigServiceList;
}

getOperations(){
	return this.operations;
}

getConditionOperator(){

    return this.conditionOperator;
}

getAssetSourceData(){

return this.assetSourceData;
}




}//DynamicCampaignCinfig  class end

const dynamicCampaignConfig = new  DynamicCampaignConfig;

export default  dynamicCampaignConfig;