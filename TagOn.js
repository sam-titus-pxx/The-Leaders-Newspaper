
/*
Functions and variables for carrying out tap tagging, marking operations

Requirement:
• For this API to work, the hoisting container div 
 - id="tags-hoist"
• To instantiate the GUI, use the "INIT_TagGUI()" function
*/

const standard_tags = ["Politics","Education","Health","Security","Sports","Foreign","Technology","Finance","News","Entertainment"];
 var selected_tags = 0;
 var tag_status_map = new Map();

function INIT_TagGUI(){
    standard_tags.sort();
    
    //get the hoisting div container element
    var hoist_elem = getElem("tags-hoist");
    
    var btn_tags_submit = createTag("button");
       btn_tags_submit.setAttribute("id","btn-tags-submit");
       btn_tags_submit.setAttribute("class","w3-btn header w3-border-white w3-border w3-small w3-white w3-right w3-bar-item w3-round-large");
       btn_tags_submit.setAttribute("type","button");
       btn_tags_submit.addEventListener("click",function(){
          var hoist = getElem("tags-hoist");
          if(selected_tags > 0){
           INIT_loadSelected();
         }else{
           hoist.innerHTML = "";
           hoist.style.display = "none";
         }
           $("#btn-add-tag").click();  
       })
     btn_tags_submit.innerHTML = `Submit`;
       
    //create the actual holding container for the tags
    var tags_div = createTag("div");
    //initialize its properties
    tags_div.setAttribute("id","tag-on-div");
    tags_div.setAttribute("class","w3-bar w3-panel primary w3-small pd-sm w3-border-white w3-topbar w3-bottombar");
    tags_div.setAttribute("style","");
    
    var tags_str = "", tag_btn = null;
    //run dynamic iteration entry loading
    standard_tags.forEach(function(val,i){
        
      //create a clickable bar item tag button; set it to untagged
       tag_btn = createTag("button")
       tag_btn.setAttribute("id","tag-btn-"+i);
       tag_btn.setAttribute("class","tag-btn w3-btn w3-border-white w3-border secondary mg-sm pd-sm w3-bar-item w3-round-xlarge");
       tag_btn.setAttribute("type","button");
       tag_btn.setAttribute("data-value",val);
       tag_btn.setAttribute("data-status","untagged");
       tag_btn.setAttribute("value",val);
        
       tag_btn.innerHTML = `${val}&nbsp<i class="fas fa-plus-circle"></i>`;
       
       //set init tag status to untagged
       tag_status_map.set(val,"untagged");
     
        //append tag button to holder div
        tags_div.appendChild(tag_btn);
    });
    
    //hoist the gui
    hoist_elem.appendChild(tags_div);
    hoist_elem.appendChild(btn_tags_submit);
    
    //Register/define Event Listeners for each tag button
    INIT_TagEvent();    
}

function INIT_TagEvent(){
   //fetch all tag buttons
   tag_elems = getElems("tag-btn");
    
   //set their event listeners
    for(let i = 0; i < tag_elems.length; i++){
        btn = tag_elems[i];
        
        btn.addEventListener("click",function(){
           //alert(this.value); 
           //get the corresponding value
            val = this.value;
           //get its tag status
            status = tag_status_map.get(val); //btn.getAttribute("data-status");
            
          if(status == "untagged"){
            //alert(status)
            //reset the styling and set status as tagged
            
            this.setAttribute("class","w3-btn w3-border-white w3-border tertiary mg-sm pd-sm w3-bar-item w3-round-xlarge");
            this.innerHTML = `${val}&nbsp<i class="w3-text-green fas fa-check-circle"></i>`
            tag_status_map.set(val,"tagged")
            selected_tags++;
           }
          else if(status == "tagged"){
            this.setAttribute("class","w3-btn w3-border-white w3-border secondary mg-sm pd-sm w3-bar-item w3-round-xlarge");
            this.innerHTML = `${val}&nbsp<i class="fas fa-plus-circle"></i>`
            tag_status_map.set(val,"untagged");
            selected_tags--;
          }
        });
    }
}

function INIT_loadSelected(){
    var hoist_div = getElem("selected-tags-hoist");
        
    if(hoist_div !== null){
        hoist_div.innerHTML = "";
        var tags_div = createTag("div");
    //initialize its properties
       tags_div.setAttribute("id","tag-on-div");
       tags_div.setAttribute("class","w3-bar w3-small pd-sm w3-border-white w3-topbar");
       tags_div.setAttribute("style","");
        
       tag_status_map.forEach(function(val,key){
       //str += `• ${key} => ${val}\n`;
           if(val == "tagged"){
              tag_btn = createTag("button")
              tag_btn.setAttribute("id","tag-btn-"+key);
              tag_btn.setAttribute("class","select-tag-btn w3-btn w3-border-white w3-border secondary mg-sm pd-sm w3-bar-item w3-round-xlarge");
              tag_btn.setAttribute("value",key);
              tag_btn.setAttribute("type",'button');
        
              tag_btn.innerHTML = `${key}&nbsp<i class="fas fa-check-circle"></i>`;
              tags_div.appendChild(tag_btn);
           }
   });
        hoist_div.appendChild(tags_div);
        
    }
}

function getSelectedTags(){
    var selected = [];
    tag_status_map.forEach(function(val,key){
       //str += `• ${key} => ${val}\n`;
           if(val == "tagged"){
               selected.push(key);
           }
    }); selected.sort();
    return selected;
}


function displayTagged(){
    var str = "";
   tag_status_map.forEach(function(val,key){
       str += `• ${key} => ${val}\n`;
   })
    alert(str);
}

function createTag(type){
    obj = document.createElement(type);
    //console.log("Created Tage Object:=> "+type);
    return obj
}

function getElem(id){
    return document.getElementById(id);
}

function getElems(cls){
   var elems = document.getElementsByClassName(cls);
    return elems;
}