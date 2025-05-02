
var v_code = "";

function INIT_verificationInput(){
    inp_elems = getElems("v-inp");
   // alert(inp_elems.length);
    
    for(let i = 0; i < inp_elems.length; i++){
        inp = inp_elems[i];
        
        inp.addEventListener("keyup",function(){
            //alert(this.value);
            v_code += this.value
            var key = parseInt(this.getAttribute("data-key"));
            //alert(key);
            
            inp_elems = getElems("v-inp");
              if(key < (inp_elems.length-1)){   
              inp_elems[key+1].focus();
              }if(key >= (inp_elems.length-1)){
                  //alert("Reached End")
                  inp_elems[key].blur();
                  setTimeout(function(){
                      INIT_registerCode();
                  },800);
              }
        });
    }
}

function INIT_registerCode(){
    alert("Verification Code: "+v_code)
}

function getElems(cls){
    return document.getElementsByClassName(cls);
}