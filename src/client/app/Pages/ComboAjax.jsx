import React from 'react';
import {render} from 'react-dom';
import {updateValue}  from '../actions/RuleAction.jsx';

export default class ComboAjax extends React.Component {

constructor(){

super();
this.state = {
  ulClass:"hide"
};
this.ulStyle={};  
  /**clone variavle***/
  this.cln = "";



}//constructor




componentWillReceiveProps(newProps) {  



if(newProps.isOptionChanged){
  
   if(newProps.options.length>0){

     if(newProps.currentTop ){

       if(newProps.currentTop!=0 ){
     
          this.ulStyle={

          top: newProps.currentTop + 30,
          left: newProps.currentLeft ,
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
  
       this.setState({ulClass:"combo-ajax"});    
   
      
     }else{
      
       this.setState({ulClass:"hide"});     
       
      
    }
}else{

  this.setState({ulClass:"hide"}); 
  
    
}


} //component Will receive props


componentDidUpdate(prevProps, prevState) {


if(this.state.ulClass=="combo-ajax"){

 if(this.props.options.length>0){
 
   if(this.props.currentTop ){

    if(this.props.currentTop!=0 ){

                if(this.cln!=""){
                   document.body.removeChild(this.cln);
                   this.cln="";
                
                 }
                 this.cln = this.refs.comboAjaxBox.cloneNode(true);
                 /*this.cln.addEventListener("blur",this.hideSelectBox);*/
                 let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                 this.cln.style.position='absolute';
                 this.cln.style.display='block';
                 this.cln.style.top= (this.props.currentTop + 23 + scrollTop) + "px";
                 document.body.appendChild(this.cln);
                 
                // this.cln.focus();
                 for(let i=0;i<this.cln.childNodes.length;i++){
                      
                   this.cln.childNodes[i].addEventListener("click", this.changeValue.bind(this,this.props.options[i].value) );
                }//for 


                
          

          }      

    }
  }else{
               if(this.cln!=""){
                 document.body.removeChild(this.cln);
                 this.cln="";
                
                 } 
  } 

}else{

              if(this.cln!=""){
                 document.body.removeChild(this.cln);
                 this.cln="";
                
                 }  
}


} //componentDidUpdate


componentWillUnmount() {
  if(this.cln!=""){
   document.body.removeChild(this.cln);
   this.cln="";
  }
}





changeValue(newValue){

  updateValue(this.props.secName,this.props.rulePosition,this.props.triggerObject,newValue);
  this.setState({ulClass:"hide"});
}

render(){
var options = [];
if(this.props.options){

 options = this.props.options.map( (obj,i) => <li key={i} 
  onClick={this.changeValue.bind(this,obj.value)}>{obj.displayValue}</li>);
} 



return(

    <ul className={this.state.ulClass} style={this.ulStyle} ref="comboAjaxBox"
    
    >

      {options}

    </ul>


  );

}//render




}//comboajax end hers 


