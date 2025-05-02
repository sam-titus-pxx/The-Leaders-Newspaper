function INIT_popupGUI(){
    $("#btn-close-main-popup").click(function(){
        hidePopUp();
    }); 
}

function showPopUp(msg,stat){
    getElem("main-popup-modal").style.display = "block";
    getElem("popup-body-div").innerHTML = msg;
    setMarker(stat)
}


function hidePopUp(){
    getElem("main-popup-modal").style.display = "none";       
 }

function getElem(id){
    return document.getElementById(id);
}

function setMarker(status){
    var cList = getElem("popup-marker").classList;
    var color = cList.item(2);
    
    switch(status){
      case 'warning' : cList.replace('w3-blue-grey','w3-red'); break;
      case 'alert' : cList.replace('w3-blue-grey','w3-green'); break;
      case 'info' : cList.replace('w3-blue-grey','w3-blue'); break;
      default : cList.replace('w3-blue-grey','w3-green'); break;
    }
}