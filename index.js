setTimeout(()=>{
INIT_splashCarousel();
},1000);
    
  setTimeout(()=>{  
    searchCompactLayered('news','main');
    INIT_btnTagsRouteRedirect('btn-tag-route');
    INIT_btnTagsRouteRedirect('footer-link');
    INIT_btnTagsRouteRedirect('sidebar-link');
    INIT_btnTagsRouteRedirect('btn-contact-link');
  },3000);
  
  $("#footer-load-area").load("footer.html");
  $("#btn-pos").hide();
 // INIT_popupGUI();
  handleScroll();

  $("#btn-pos").click(function(){window.scrollTo(0,0);})
    
//////////////////////////////////////////////////////////////////////
   $('#inp-search-article').focus(()=>{
     showSection('searchs');
   });
   $('#btn-open-sidebar').click(()=>{
      openSidebar();
    });


getElem("btn-search-article").addEventListener("click", function(){
  //get search query stringm....
  query = getElem("inp-search-article").value;
  
  //alert(query);
  //1) exact query string
  //2) substrings of the query string
  sub_queries = query.split(" ");
  
  //run search on the main query and then the co
  //main_query_matches = SEARCH_QUERY(query)
  //""sub_queries_matches = SEARCH_QUERIES(sub_queries)
  
});


function enter_trigger(){
  showSection('main');
 
  /*
 setTimeout(()=>{
      INIT_AdRepeater('main',10000,2);
    },5000);*/
}

//handle scroll positioning
function handleScroll(){
  
  var ticker = setInterval(function(){
  const bd = document.querySelector("#body");
  const out = document.querySelector("#output");
  //alert(bd);
  
  
  //bd.addEventListener("scroll", function(){
   y_pos = document.documentElement.scrollTop;//window.pageYOffset;//bd.scrollTop;
   x_pos = document.documentElement.scrollLeft;//window.pageXOffset;//bd.scrollLeft;
    //alert(y_pos);
    
   //log(x_pos+","+y_pos);
  
   out.innerHTML = `X: ${x_pos} <br> Y: ${y_pos}`;
  //});
  if(y_pos >= 300){
    $("#btn-pos").show();
  }else if(y_pos < 300){
    $("#btn-pos").hide();
  }
  },1000);
}

function log(str){
  console.log(str);
}

//////////////////////////////////////////////////////////////
function INIT_btnTagsRouteRedirect(cls){
  //console.log(`Initializing Button Routing Event: "${cls}"`);
  var route_btn = getElems(cls);
  //console.log(`Elems Size: ${route_btn.length}`);
  for(let i = 0; i < route_btn.length; i++){
    btn = route_btn[i];
    setLinkRedirectRoute(btn);    
  }
}

function setLinkRedirectRoute(doc_elem){
  doc_elem.addEventListener('click',function(){
    data_href = this.getAttribute('data-href');
    action_type = this.getAttribute('data-action-type');
      
    //console.log(data_href);
  });
}

function INIT_splashCarousel(){
 let owl = $('.splash-carousel');
    //console.log(`Initiating Carousel (${count})...`);
    
    //console.log('Setting Carousel')
    owl.owlCarousel({
        margin: 5,
        nav:false,
        loop: false,
        autoplay:true,
        autoplayTimeout:2500,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 2
          },
          1000: {
            items: 3
          }
        }
      }) 
}

//////////////////////////////////////////////////////////////

function openSidebar(){
 hideElem('tln-main-nav-bar');
 getElem('sidebar-hoist-area').innerHTML = sidebar_str;
 getElem('sidebar-hoist-area').style.display = 'block'; 
}

function closeSidebar(){
 getElem('sidebar-hoist-area').style.display = 'none'; 
 getElem('sidebar-hoist-area').innerHTML = ''
 showElem('tln-main-nav-bar');  
}

//////////////////////////////////////////////////////////////


var sidebar_str = `<div style="margin:0;display:block;padding-right:0;" id="tln-main-sidebar" class="w3-sidebar TLN-grad w3-bar-block w3-rightbar header w3-large">
    <span onclick="closeSidebar()" class="w3-right w3-xlarge fas fa-times-circle w3-text-white mg-bg"></span>

    <h1 class="w3-large robotoB underline pd-sm">THE LEADERS™</h1>

    <u style="padding:0;padding-left:5px;margin-top:0;" class="w3-ul w3-section w3-bar-item portland">
      <li class="list-item">
    <button data-href="home" style="width:100%;" class="w3-button sidebar-link">Home</button>
      </li>
      <li class="w3-list-item">
        <button data-href="login" style="width:100%;" class="w3-button sidebar-link">Sign In</button>
      </li>
      <li class="w3-list-item">
        <button data-href="editorials" style="width:100%;" class="w3-button sidebar-link">Editorials</button>
      </li>
      <li class="w3-list-item">
        <button data-href="bulletin" style="width:100%;" class="w3-button sidebar-link">Bulletin Board</button>
      </li>        
      <li class="w3-list-item">
        <button data-href="advert" style="width:100%;" class="w3-button sidebar-link">Advert Placement</button>
      </li>  
      <li class="w3-list-item">
        <button data-href="about" style="width:100%;" class="w3-button sidebar-link">About Us</button>
      </li>  
      </ul>   

<div class="w3-xxlarge w3-container w3-cell-row w3-section">
  <div class="w3-cell">
    <span class="w3-btn fas fa-envelope"></span>
   </div>
   <div class="w3-cell">
    <span class="w3-btn fab fa-facebook"></span>
   </div>
   <div class="w3-cell">
    <span class="w3-btn fab fa-twitter"></span>
   </div>
</div>

   </div>`;

//////////////////////////////////////////////////////////////////////
//Functions to handle copying of text to clipboard(tested and working)
function handleCopy(id) {
  const area = getElem(id)
  area.select();
  document.execCommand('copy')
}

function triggerCopy(id) {
  const element = getElem(id);
  element.select();
  element.setSelectionRange(0, 99999);
  document.execCommand('copy');
}

/////////////////////////////////////////////////////////////////

function showSection(section){
    /*
    *section 0 => Splash
    *section 1 => Search SPA Page
    *section 2 => Main Form
    *section 3 => Setup Form
    *section 4 => Preview Form
    */
    const tln_sections = getElems('TLN-section');
    switch(section){
        case "main" :
        console.log('Sec_2: Switching To Main Section')
        tln_sections[0].style.display = 'none';
        tln_sections[1].style.display = 'none';
        tln_sections[2].style.display = 'block';
        break;
        case "search" :
        console.log('Sec_1: Switching To Search Section')
        tln_sections[2].style.display = 'none';
        tln_sections[1].style.display = 'block';
        break;
        case "splash" :
        console.log('Sec_0: Switching To Splash Section')
        tln_sections[2].style.display = 'none';
        tln_sections[0].style.display = 'block';
        break;
    }
        
}

