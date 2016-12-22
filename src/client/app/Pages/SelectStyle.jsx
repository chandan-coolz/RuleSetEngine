import React from 'react';
import {render} from 'react-dom';

export default class SelectStyle extends  React.Component {

constructor(){
  super();
  this.state={
  selectClass:"hide",
  options:[]
    }
  this.ulStyle={};  

  /**clone variavle***/
  this.cln = "";
  this.hideSelectBox=this.hideSelectBox.bind(this);
  this.optGroupKey = [];
  this.isToHidePersonalizationHub = true;

  
}//constructor



componentWillMount() {


  if(this.props.currentTop){
 
    if(this.props.currentTop!=0){
     this.ulStyle={

          top: this.props.currentTop + 27,
          left: this.props.currentLeft - 12,
          width: 172,
          display: 'none',
          position: 'fixed'
         };
          
    }

  } 




  
 
  this.isToHidePersonalizationHub = true;
  if(dyn_dataToPost.enablePersonalization){   
    this.isToHidePersonalizationHub = dyn_dataToPost.enablePersonalization == 0 || dyn_dataToPost.enablePersonalization== "false"? true : false; 
   }

//check for cookie retargetting 
if(this.props.serviceProperty != undefined ){
 
    if(this.props.serviceProperty == "jvxdynsl-isSet_groups"){
   

     for(let i=0;i<this.props.keys.length;i++){
       
          if(i<dyn_dataToPost.allowedCookieGrp){ 
            this.state.options.push(<li key={this.props.keys[i]} onClick={this.onCLickMethod.bind(this,this.props.keys[i])} >
            {this.props.values[i]}</li>);
           }else{
            this.state.options.push(<li key={this.props.keys[i]}  className="options-disable" >
            {this.props.values[i]}</li>); 

           }
         }////for
   
    }else{
     for(let i=0;i<this.props.keys.length;i++){
  
        
           this.state.options.push(<li key={this.props.keys[i]} onClick={this.onCLickMethod.bind(this,this.props.keys[i])} >
           {this.props.values[i]}</li>);
          
        }////for
    
  
  
   }//else


}else{ 


   for(let i=0;i<this.props.keys.length;i++){
      
      if(this.props.keys[i]=='pdhService' && this.isToHidePersonalizationHub ){
         
         this.state.options.push(<li key={this.props.keys[i]}  className="options-disable" >
         {this.props.values[i]}</li>); 
               
       }else{
         this.state.options.push(<li key={this.props.keys[i]} onClick={this.onCLickMethod.bind(this,this.props.keys[i])} >
         {this.props.values[i]}</li>);
        
      }
  }   
}//serive property check if end here  

  if(this.props.databaseOptionChildrensKeys){
  
      if(this.props.databaseOptionChildrensKeys.length>0){
        
          this.state.options.push(<li key={"database"} className="optgroup" style={{'cursor':'default'}} >
          Database</li>);
         this.props.keys[i]
          for(let i=0;i<this.props.databaseOptionChildrensKeys.length;i++){

            this.state.options.push(<li key={this.props.databaseOptionChildrensKeys[i]} 
              className="optgroup-options"
              onClick={this.onCLickMethod.bind(this,this.props.databaseOptionChildrensKeys[i])} >
            {this.props.databaseOptionChildrensValues[i]}</li>);
          }

      }
  }


//to handle optgroup options
  if(this.props.optgroupOptions){
     this.optGroupKey = [];
     let optgroups = Object.keys(this.props.optgroupOptions);
      for(let i=0;i<optgroups.length;i++){
          this.optGroupKey.push("");
          this.state.options.push(<li key={optgroups[i]} className="optgroup" style={{'cursor':'default'}}>{optgroups[i]}</li>);

          for(let j=0;j<this.props.optgroupOptions[optgroups[i]].length;j++){

              if(this.props.optgroupOptions[optgroups[i]][j].disable){
                    
                 if(this.props.optgroupOptions[optgroups[i]][j].key.indexOf("jvxdynsl_group") > -1 ){
                     //get all name from dyn_configuredRetargetingPixels containg key as groupName
                     let dyn_configuredRetargetingPixelsKeys = Object.keys(dyn_configuredRetargetingPixels);
                     let pixelKeyToShow = dyn_configuredRetargetingPixelsKeys.filter((key)=>
                         dyn_configuredRetargetingPixels[key].groupName == this.props.optgroupOptions[optgroups[i]][j].key              
                      );

                     //now add pixelname to our option addEventListener
                    if(pixelKeyToShow.length!=0){ 
                     for(let m=0;m<pixelKeyToShow.length;m++){
                        this.optGroupKey.push("");
                        this.state.options.push(<li key={pixelKeyToShow[m]} 
                        className="optgroup-options-disable" >
                        {dyn_configuredRetargetingPixels[pixelKeyToShow[m]].pixelName}</li>);
                       }
                     }else{
                      this.optGroupKey.push("");
                      this.state.options.push(<li key={this.props.optgroupOptions[optgroups[i]][j].key} 
                      className="optgroup-options-disable" >
                      {this.props.optgroupOptions[optgroups[i]][j].value}</li>);

                     }  

                 }else{

                    this.optGroupKey.push("");
                    this.state.options.push(<li key={this.props.optgroupOptions[optgroups[i]][j].key} 
                    className="optgroup-options-disable" >
                     {this.props.optgroupOptions[optgroups[i]][j].value}</li>);

                 } 
               }else{ //not disable obtions check

                  if(this.props.optgroupOptions[optgroups[i]][j].key.indexOf("jvxdynsl_group") > -1 ){
                     //get all name from dyn_configuredRetargetingPixels containg key as groupName
                     let dyn_configuredRetargetingPixelsKeys = Object.keys(dyn_configuredRetargetingPixels);
                     let pixelKeyToShow = dyn_configuredRetargetingPixelsKeys.filter((key)=>
                         dyn_configuredRetargetingPixels[key].groupName == this.props.optgroupOptions[optgroups[i]][j].key              
                      );
                  
                     //now add pixelname to our option addEventListener
                    if(pixelKeyToShow.length!=0){ 
                     for(let m=0;m<pixelKeyToShow.length;m++){
                        this.optGroupKey.push(pixelKeyToShow[m]+":"+this.props.optgroupOptions[optgroups[i]][j].key);
                        this.state.options.push(<li key={pixelKeyToShow[m]} 
                        className="optgroup-options" 
                        onClick={this.onCLickMethod.bind(this,pixelKeyToShow[m]+":"+this.props.optgroupOptions[optgroups[i]][j].key)} 
                        >
                        {dyn_configuredRetargetingPixels[pixelKeyToShow[m]].pixelName}</li>);
                       }
                    }else{
                     this.optGroupKey.push(this.props.optgroupOptions[optgroups[i]][j].key);
                     this.state.options.push(<li key={this.props.optgroupOptions[optgroups[i]][j].key} 
                     className="optgroup-options"
                     onClick={this.onCLickMethod.bind(this,this.props.optgroupOptions[optgroups[i]][j].key)} >
                     {this.props.optgroupOptions[optgroups[i]][j].value}</li>);

                    }   

                   }else{
                     this.optGroupKey.push(this.props.optgroupOptions[optgroups[i]][j].key);
                     this.state.options.push(<li key={this.props.optgroupOptions[optgroups[i]][j].key} 
                     className="optgroup-options"
                     onClick={this.onCLickMethod.bind(this,this.props.optgroupOptions[optgroups[i]][j].key)} >
                     {this.props.optgroupOptions[optgroups[i]][j].value}</li>);
                   }
               } 
          }

      }
    }//if of optgroup option


}//componentWillMount






componentDidMount(){

 if(this.state.selectClass=="select-style"){
  
  this.refs.selectBox.focus();
  
   }
 

 
}//componentDidMount()



componentWillUnmount() {
  if(this.cln!=""){
   document.body.removeChild(this.cln);
   this.cln="";
  }
}

componentDidUpdate(prevProps, prevState){


 if(this.state.selectClass=="select-style"){
  

  this.refs.selectBox.focus();
  
   }


if(this.state.selectClass=="select-style"){

   if(this.props.currentTop ){

    if(this.props.currentTop!=0 ){

       
                if(this.cln==""){
      
                 this.cln = this.refs.selectBox.cloneNode(true);
                 this.cln.addEventListener("blur",this.hideSelectBox);
                 let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                 this.cln.style.position='absolute';
                 this.cln.style.display='block';
                 this.cln.style.top= (this.props.currentTop + 27 + scrollTop) + "px";
                 document.body.appendChild(this.cln);
/***********check weather current display height is greater than viewport height or  not*****/
                 let elementHeight = parseFloat(window.getComputedStyle(this.cln).height);
                 let displayBottomCoordinate = this.props.currentTop + 27 + scrollTop + elementHeight;
                 let browserBottomCoordinate = window.innerHeight + window.scrollY;
                 if( displayBottomCoordinate > browserBottomCoordinate){
                  //top 
                  this.cln.style.top= (this.props.currentTop - elementHeight - 10 + scrollTop) + "px";
                  this.cln.style.borderTop = "1px solid #ddd";
                 }
                
                 this.cln.focus();
                 /******for optgroup*****************************************/
            
                  
                if(this.props.optgroupOptions){
                   if(Object.keys(this.props.optgroupOptions).length>0){
                        for(let i=0;i<this.cln.childNodes.length;i++){


                          if(this.optGroupKey[i]!=""){
                                this.cln.childNodes[i].addEventListener("click", this.onCLickMethod.bind(this,this.optGroupKey[i]));
                                this.cln.childNodes[i].addEventListener("mouseover", this.getOverflowContents.bind(this) );
                      
                           }else{
                            this.cln.childNodes[i].addEventListener("mouseover", this.getOverflowContents.bind(this) );
                           }
                        }//for
                    }    
                 }//if optgroupOptions



                let j=0;
                if(this.props.keys.length!=0)
                 {
              
                    for(let i=0;i<this.cln.childNodes.length;i++){

                        if(this.cln.childNodes[i].innerHTML=="Database"){j=i+1;break;}
                        this.cln.childNodes[i].addEventListener("click", this.onCLickMethod.bind(this,this.props.keys[i]));
                        this.cln.childNodes[i].addEventListener("mouseover", this.getOverflowContents.bind(this) );
                        
                    }//for 
                 }

              /****for database option **********************************************/
                 
                 if(this.props.databaseOptionChildrensKeys){
  
                      if(this.props.databaseOptionChildrensKeys.length>0){
                            for(let i=j;i<this.cln.childNodes.length;i++){

                                
                                this.cln.childNodes[i].addEventListener("click", this.onCLickMethod.bind(this,this.props.databaseOptionChildrensKeys[i-j]));
                                this.cln.childNodes[i].addEventListener("mouseover", this.getOverflowContents.bind(this) );
                       
                             }//for 
     

                        }

                  }

              } //this.cln!=" " chack
          

          }      //current top ! = 0 check

    }

  }else{

              if(this.cln!=""){
                 document.body.removeChild(this.cln);
                 this.cln="";
                
                 }  
  }


}


componentWillReceiveProps(newProps) {  




  if(newProps.currentTop ){

     if(newProps.currentTop!=0 ){
     
        this.ulStyle={

          top: newProps.currentTop + 27,
          left: newProps.currentLeft - 12,
          width: 172,
          display: 'none',
          position: 'fixed'
        }

      }else{
        this.ulStyle={};
      }  

  }else{
        this.ulStyle={};
}  



    let tempOptions=[];
    this.isToHidePersonalizationHub = true;
    if(dyn_dataToPost.enablePersonalization){   
      this.isToHidePersonalizationHub = dyn_dataToPost.enablePersonalization==0 || dyn_dataToPost.enablePersonalization== "false"? true : false; 
    }

if(newProps.serviceProperty != undefined ){

   if(newProps.serviceProperty == "jvxdynsl-isSet_groups"){
   

     for(let i=0;i<newProps.keys.length;i++){
       
          if(i<dyn_dataToPost.allowedCookieGrp){ 
            tempOptions.push(<li key={newProps.keys[i]} onClick={this.onCLickMethod.bind(this,newProps.keys[i])} >
            {newProps.values[i]}</li>);
           }else{
            tempOptions.push(<li key={newProps.keys[i]}  className="options-disable" >
            {newProps.values[i]}</li>); 

           }
         }////for
   
    }else{
     for(let i=0;i<newProps.keys.length;i++){
  
        
           tempOptions.push(<li key={newProps.keys[i]} onClick={this.onCLickMethod.bind(this,newProps.keys[i])} >
           {newProps.values[i]}</li>);
          
        }////for
    
  
  
   }//else



}else{  
    for(let i=0;i<newProps.keys.length;i++){
      if(newProps.keys[i]=='pdhService' && this.isToHidePersonalizationHub  ){

         tempOptions.push(<li key={newProps.keys[i]} className="options-disable" >
         {newProps.values[i]}</li>); 
                
       }else{         
        tempOptions.push(<li key={newProps.keys[i]} onClick={this.onCLickMethod.bind(this,newProps.keys[i])} 
        onMouseOver={this.getOverflowContents.bind(this)} >
        {newProps.values[i]}</li>);
       } 
   }//for
}   

    if(newProps.databaseOptionChildrensKeys){
  
      if(newProps.databaseOptionChildrensKeys.length>0){
        
          tempOptions.push(<li key={"database"} className="optgroup"  style={{'cursor':'default'}}>
          Database</li>);

          for(let i=0;i<newProps.databaseOptionChildrensKeys.length;i++){

            tempOptions.push(<li key={newProps.databaseOptionChildrensKeys[i]} 
              className="optgroup-options"
              onClick={this.onCLickMethod.bind(this,newProps.databaseOptionChildrensKeys[i])} >
            {newProps.databaseOptionChildrensValues[i]}</li>);
          }

      }
    }



    //to handle optgroup options
  if(newProps.optgroupOptions){
     this.optGroupKey = [];
     let optgroups = Object.keys(newProps.optgroupOptions);
      for(let i=0;i<optgroups.length;i++){
          this.optGroupKey.push("");
    /*******check for personalisation hub opt group*************************************/



          tempOptions.push(<li key={optgroups[i]} className="optgroup" style={{'cursor':'default'}}>{optgroups[i]}</li>);

          for(let j=0;j<newProps.optgroupOptions[optgroups[i]].length;j++){

             if(newProps.optgroupOptions[optgroups[i]][j].disable){

                  if(newProps.optgroupOptions[optgroups[i]][j].key.indexOf("jvxdynsl_group") > -1 ){
                     //get all name from dyn_configuredRetargetingPixels containg key as groupName
                     let dyn_configuredRetargetingPixelsKeys = Object.keys(dyn_configuredRetargetingPixels);
                     let pixelKeyToShow = dyn_configuredRetargetingPixelsKeys.filter((key)=>
                         dyn_configuredRetargetingPixels[key].groupName == newProps.optgroupOptions[optgroups[i]][j].key              
                      );

                     //now add pixelname to our option addEventListener
                   if(pixelKeyToShow.length!=0){  
                     for(let m=0;m<pixelKeyToShow.length;m++){
                        this.optGroupKey.push("");
                        tempOptions.push(<li key={pixelKeyToShow[m]} 
                        className="optgroup-options-disable" >
                        {dyn_configuredRetargetingPixels[pixelKeyToShow[m]].pixelName}</li>);
                       }
                    }else{
                      this.optGroupKey.push("");
                     tempOptions.push(<li key={newProps.optgroupOptions[optgroups[i]][j].key} 
                     className="optgroup-options-disable" >
                     {newProps.optgroupOptions[optgroups[i]][j].value}</li>);

                    }   
                  }else{

                     this.optGroupKey.push("");
                     tempOptions.push(<li key={newProps.optgroupOptions[optgroups[i]][j].key} 
                     className="optgroup-options-disable" >
                     {newProps.optgroupOptions[optgroups[i]][j].value}</li>);
              
                  }

               }else{ //not disable options

                    if(newProps.optgroupOptions[optgroups[i]][j].key.indexOf("jvxdynsl_group") > -1 ){
                     //get all name from dyn_configuredRetargetingPixels containg key as groupName
                     let dyn_configuredRetargetingPixelsKeys = Object.keys(dyn_configuredRetargetingPixels);
                     let pixelKeyToShow = dyn_configuredRetargetingPixelsKeys.filter((key)=>
                         dyn_configuredRetargetingPixels[key].groupName == newProps.optgroupOptions[optgroups[i]][j].key              
                      );

                     //now add pixelname to our option addEventListener
                     if(pixelKeyToShow.length!=0){
                       for(let m=0;m<pixelKeyToShow.length;m++){
                        this.optGroupKey.push(pixelKeyToShow[m]+":"+newProps.optgroupOptions[optgroups[i]][j].key);
                        tempOptions.push(<li key={pixelKeyToShow[m]} 
                        className="optgroup-options" 
                        onClick={this.onCLickMethod.bind(this,pixelKeyToShow[m]+":"+newProps.optgroupOptions[optgroups[i]][j].key)} 
                        >
                        {dyn_configuredRetargetingPixels[pixelKeyToShow[m]].pixelName}</li>);
                       }
                     }else{
                      this.optGroupKey.push(newProps.optgroupOptions[optgroups[i]][j].key);
                      tempOptions.push(<li key={newProps.optgroupOptions[optgroups[i]][j].key} 
                      className="optgroup-options"
                      onClick={this.onCLickMethod.bind(this,newProps.optgroupOptions[optgroups[i]][j].key)} >
                      {newProps.optgroupOptions[optgroups[i]][j].value}</li>); 
                     }  

                    }else{

                     this.optGroupKey.push(newProps.optgroupOptions[optgroups[i]][j].key);
                     tempOptions.push(<li key={newProps.optgroupOptions[optgroups[i]][j].key} 
                     className="optgroup-options"
                     onClick={this.onCLickMethod.bind(this,newProps.optgroupOptions[optgroups[i]][j].key)} >
                     {newProps.optgroupOptions[optgroups[i]][j].value}</li>);
                    }
               } //disbale check else end
          }

      }
    }//if of optgroup option


   







 if(newProps.isToShowSelectBox){
    
     
    this.setState({selectClass:"select-style",options:tempOptions});
    
    

  }else{

    
    this.setState({selectClass:"hide",options:tempOptions});

  }

}

onCLickMethod(newValue){


  if(newValue == 'pdhService' && !this.isToHidePersonalizationHub){
    this.props.methodToCall(newValue);
  }
  if(newValue != 'pdhService'){
  this.props.methodToCall(newValue);
  }

}

getOverflowContents(e){
 
  if( $(e.target).hasClass('optgroup-options-disable') || $(e.target).hasClass('options-disable') ){
  
    displayTitles($(e.target), "", "This Option is available to customers of the Jivox Personalization Hub. Please contact your account manager or email us at support@jivox.com to learn more.");
  }else{
  
    getOverflowContent($(e.target), '', $(e.target) ) ;
  }  
}

hideSelectBox(){

$('.display-title-tooltip').hide();
 this.props.hideSelectBox();
  
}

render(){


return(
 <ul className={this.state.selectClass} style={this.ulStyle} tabIndex="0" ref="selectBox" onBlur={this.hideSelectBox}>
   {this.state.options}
 </ul>
 );
}//render

}//Select Style class
