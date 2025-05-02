
var route_log = new Array();
var route_obj = {
    "current" : "",
    "destination" : "",
    "prev" : "",
    "next" : "",
}

var prev_page = "",current_page = ""

var state_storage = new Array();
var state_history = new Array();

/*
To Change State=>
 * copy original page state. store copy 	to state_storage
 * store new state to state_storage
 * change/replace original state with new state
 * store original state copy to state_history

To Return To Previous State =>
 * get/pop last state_history array
 * replace current state with gotten state
*/

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


function getPageState(page){
  //first, populate holder div with page
   $.get(page,function(status,data){
       if(status == "success"){
           alert(data);
       }
   })
   /*$("#index-holder-div").load(page); 
    alert($("#index-holder-div").html())*/
    
 //next,extract <body>, <scripts>
   /*state_body = document.querySelector("#index-holder-div");
    alert(state_body.textContent);*/
}

function load_SEGMENT(sgnt,sgnt_val){
    
    switch(sgnt){
        case "home" :
          //$("#SEGMENT-display-body").load("index.html");
       loadPage('index.html');
       break;
       case "navbar" : 
          getElem("SEGMENT-nav-bar-links").innerHTML = sgnt_nav_bar_links;
          INIT_nav_item_event();
        break;
        case "navbar-main" : 
          getElem("SEGMENT-nav-bar-links").innerHTML = sgnt_nav_bar_links_main;
          INIT_nav_item_event();
        break;
       case "footer" :
          getElem("SEGMENT-footer").innerHTML = sgnt_footer;
        break;
       case "taglist" :
          getElem("SEGMENT-display-body").innerHTML = sgnt_tags_list;
        break;
       case "content" :
          getElem("SEGMENT-display-body").innerHTML = sgnt_val;
       break;
       case "about" :
          //$("#SEGMENT-display-body").load("about.html");
          loadPage('about.html');
       break;
       case "privacy" :
          $("#SEGMENT-display-body").load("privacy.html");
       break;
       case "cta" :
        loadPage('cta-1.html');
       break;
       case "categories" :
        loadPage('articles-tags-lists.html');
       break;
       case "creator" :
          //$("#SEGMENT-display-body").load("article-maker.html");
       loadPage('article-creater.html');
       break; 
       case "login" :
          //$("#SEGMENT-display-body").load("login.html");
       loadPage('login.html');
       break;
       case "signup" :
          //$("#SEGMENT-display-body").load("signup.html");
       loadPage('signup.html');
       break;
       case "search" :
          //$("#SEGMENT-display-body").load("search-page.html");
       loadPage('search-page.html');
       break;
       case "date-clock" :
          $("#SEGMENT-display-body").load("date_clock.html");
       break;
    }
    
    route_obj.prev = route_obj.current;
    route_obj.current = sgnt;
    
}

/*
A strict route path is a route to an already defined/existing page
No data/content change is needed, 
when the link is clicked, the page tethered to that link gets loaded up to the appropriate segment
*/
function registerStrictRoute(link_obj,href){
    
    link_obj.addEventListener("click",function(){
        load_SEGMENT(href);
    });
  //  console.log(`Registered Route "${link_obj}" => "${href}"`)

}

function registerButtonRoute(btn_id,route){
    
    document.getElementById(btn_id).addEventListener('click',function(){
       loadPage(route); 
    });
}

function INIT_nav_item_event(){
   
   //registerStrictRoute("about","about");
   navlinks = document.getElementById("SEGMENT-nav-bar-links").children;
    
   for(let i = 0; i < navlinks.length; i++ ){
      navlink = navlinks[i];
      nav_sgmnt = navlink.getAttribute("data-sgmnt");
      registerStrictRoute(navlink,nav_sgmnt);
    // console.log(`Nav Link: ${navlink.getAttribute("data-sgmnt")}`)
   }
}

//dynamically load a given html page
function loadPage(page_ref){
 a = document.createElement("a");
 a.setAttribute('href',page_ref);
    /*
 $.get(page_ref,function(data,status){
     if(status == "success"){
       alert(data);   
     }else{
       alert('Failed');   
     }
 });*/
/* document.getElementById("index-holder-div").appendChild(a);
 a.addEventListener("click",function(){
   prev_page = location.href;
   current_page = page_ref;
 })*/
    
    a.click();
}

function goBack(){
    loadPage(prev_page);
}
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


const sgnt_nav_bar_links = ` 
   <div class="w3-cell"> 
    <a id="about" data-sgmnt="home" href="#" class="w3-bar-item">Home</a>
    </div>
   <div class="w3-cell">
    <a data-sgmnt="advert-page" href="#" class="w3-bar-item">Adverts</a>
   </div>
   <div class="w3-cell">
    <a data-sgmnt="about" href="#" class="w3-bar-item">About Us</a>
   </div>
   <div class="w3-cell">
    <a data-sgmnt="login" href="#" class="w3-bar-item">Login</a>
   </div>
   <div class="w3-cell">
    <a data-sgmnt="bulletin" href="#" class="w3-bar-item">Bulletin</a>
   </div>

`

const sgnt_nav_bar_links_main = ` 
    <a id="about" data-sgmnt="categories" href="#" class="w3-bar-item">Categories</a>
    <a data-sgmnt="advert-page" href="#" class="w3-bar-item">Adverts</a>
    <a data-sgmnt="login" href="#" class="w3-bar-item">Login</a>
    <a data-sgmnt="bulletin" href="#" class="w3-bar-item">Bulletin</a>

`


const sgnt_tags_list = ` 
 <div style="display:none;padding:0;margin:0;" id="DFR-prev-display" class="w3-container"></div>
  <div style="display:none" id="DFR-holding-div"></div>

  
    <div id="articles-list-tags-display" style="padding:0;" class="w3-container w3-card-4 w3-section">
     <ul style="padding:0;border:1px solid black;"class="w3-ul">
        
      <li style="padding:0;" class="w3-list-item article-list-tag" data-tag="politics" >
          <div style="height:fit-content;width:100%;padding:0;" class="w3-display-container">
            <img class="" style="height:100%;width:100%;" src="assets/photos/politics.jpg" alt="">
          <div style="" class="w3-container w3-xlarge header w3-text-white w3-display-bottomright">
            <center>Politics</center>
          </div>
          </div>
        </li> 
       <li style="padding:0;" class="w3-list-item article-list-tag" data-tag="entertainment" >
          <div style="height:fit-content;width:100%;padding:0;" class="w3-display-container">
            <img class="" style="height:100%;width:100%;" src="assets/photos/entertainment2.jpg" alt="">
          <div style="" class="w3-container w3-xlarge header w3-text-white w3-display-bottomright">
            <center>Entertainment</center>
          </div>
          </div>
        </li>
       <li style="padding:0;" class="w3-list-item article-list-tag" data-tag="agriculture" >
          <div style="height:fit-content;width:100%;padding:0;" class="w3-display-container">
            <img class="" style="height:100%;width:100%;" src="assets/photos/market.jpg" alt="">
          <div style="" class="w3-container w3-xlarge header w3-text-white w3-display-bottomright">
            <center>Agriculture</center>
          </div>
          </div>
        </li>
       <li style="padding:0;" class="w3-list-item article-list-tag" data-tag="education" >
          <div style="height:fit-content;width:100%;padding:0;" class="w3-display-container">
            <img class="" style="height:100%;width:100%;" src="assets/photos/children2.jpg" alt="">
          <div style="" class="w3-container w3-xlarge header w3-text-white w3-display-bottomright">
            <center>Education</center>
          </div>
          </div>
        </li>
       <li style="padding:0;" class="w3-list-item article-list-tag" data-tag="society" >
          <div style="height:fit-content;width:100%;padding:0;" class="w3-display-container">
            <img class="" style="height:100%;width:100%;" src="assets/photos/protest2.jpg" alt="">
          <div style="" class="w3-container w3-xlarge header w3-text-white w3-display-bottomright">
            <center>Society News</center>
          </div>
          </div>
        </li>
        <li style="padding:0;" class="w3-list-item article-list-tag" data-tag="sports" >
          <div style="height:fit-content;width:100%;padding:0;" class="w3-display-container">
            <img class="" style="height:100%;width:100%;" src="assets/photos/sport.jpg" alt="">
          <div style="" class="w3-container w3-xlarge header w3-text-white w3-display-bottomright">
            <center>Sports</center>
          </div>
          </div>
        </li>
       <li style="padding:0;" class="w3-list-item article-list-tag" data-tag="finance" >
          <div style="height:fit-content;width:100%;padding:0;" class="w3-display-container">
            <img class="" style="height:100%;width:100%;" src="assets/photos/stock-market2.jpg" alt="">
          <div style="" class="w3-container w3-xlarge header w3-text-white w3-display-bottomright">
            <center>Economy & Finance</center>
          </div>
          </div>
        </li>
        <li style="padding:0;" class="w3-list-item article-list-tag" data-tag="crime" >
          <div style="height:fit-content;width:100%;padding:0;" class="w3-display-container">
            <img class="" style="height:100%;width:100%;" src="assets/photos/crime-scene.jpg" alt="">
          <div style="" class="w3-container w3-xlarge header w3-text-white w3-display-bottomright">
            <center>Crime</center>
          </div>
          </div>
        </li>
        <li style="padding:0;" class="w3-list-item article-list-tag" data-tag="insecurity" >
          <div style="height:fit-content;width:100%;padding:0;" class="w3-display-container">
            <img class="" style="height:100%;width:100%;" src="assets/photos/terrorist.jpg" alt="">
          <div style="" class="w3-container w3-xlarge header w3-text-white w3-display-bottomright">
            <center>Insecurity</center>
          </div>
          </div>
        </li>
        <li style="padding:0;" class="w3-list-item article-list-tag" data-tag="law" >
          <div style="height:fit-content;width:100%;padding:0;" class="w3-display-container">
            <img class="" style="height:100%;width:100%;" src="assets/photos/justice.jpg" alt="">
          <div style="" class="w3-container w3-xlarge header w3-text-white w3-display-bottomright">
            <center>Law & Order</center>
          </div>
          </div>
        </li>
      </ul>
      
    </div>
`

const sgnt_footer = ` `