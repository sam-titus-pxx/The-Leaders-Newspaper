var div_id = "loader-modal", id = "loader-modal-content"
var repeat_interval;


const facts = new Array();
//facts.push(""); 
facts.push("Nigeria Boasts 250+ Indigenous Languages!","Nigeria Gained Independence In 1960","Akwa Ibom State Is The Safest State In Nigeria, Followed By Abuja And Cross River");
facts.push("Nigeria Is The Largest Black Nation In The World","Nigeria Is The Poverty Capital Of The World","Presently, It Would Take 10 Generations Of Nigerians To Clear The Trillions Of Dollars In Debt We Owe");
facts.push("Suicide Deaths Have Seen A Steady Rise In The Last 10 Years","Nigeria Lost The 2024 AFCON Federation Cup To Ivory Coast");


function INIT_loaderGUI(){
    
 var fact = getFact();
    
  modal_str = `<div id="loader-modal" style="display:block;height:100vh;margin:0;padding:0;" class="w3-modal w3-flat-wet-asphalt">
    <div style="height:100%;margin:0;" class="w3-display-container w3-modal-content w3-white">
    
   <div style="width:100%;margin:0;padding:0;" class="w3-display-middle">
    
     <h1 style='margin-right:10px;' class="w3-large header w3-right"><b class="w3-border-red w3-topbar w3-bottombar w3-large header">TLN</b></h1>
<br>
    <center> 
     <span class="fas fa-4x fa-spinner fa-spin"></span>
    </center>
      <br><hr>
     <h1 class="w3-xxlarge underline bolder">DID YOU KNOW ?</h1>
     <p style="padding:15px;margin:35px;" id="facts-box" class="w3-small bold w3-border w3-round">
      ${fact}
     </p>
    </div>
    
    </div>
  </div>`    
    
    document.getElementsByTagName("body")[0].innerHTML += modal_str;
    
    setTimeout(()=>{
        
        document.getElementById("loader-modal").remove();
        //alert("Clear")
    },1500)
}


function getFact(){
    var r = Math.floor(Math.random()*facts.length);
    
    return facts[r];
}