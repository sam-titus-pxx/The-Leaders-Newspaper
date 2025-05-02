
 setTimeout(()=>{
     
$('.testimonials-carousel').owlCarousel({
    loop:true,margin:1,nav:false,autoHeight:false,autoplay:true,autoplayTimeout:800,autoplayHoverPause:true,
    responsive:{0:{items:1},600:{items:3},1000:{items:5}}
   });
    
    $('#btn-enter').click(()=>{
      formatDisplayData();
    });
    
    $('#btn-open-sidebar').click(()=>{
      openSidebar();
    });    
    
},1000);

//////////////////////////////////////////////////////////////////////////
function openSidebar(){
 hideElem('nav-bar');
 getElem('sidebar-hoist-area').innerHTML = about_pg_nav_str;
 getElem('sidebar-hoist-area').style.display = 'block'; 
 INIT_linkRouting();
}

function closeSidebar(){
 getElem('sidebar-hoist-area').style.display = 'none'; 
 getElem('sidebar-hoist-area').innerHTML = ''
 showElem('nav-bar');  
}

function getElem(id){
    return document.getElementById(id);    
}

function getElems(cls){
    return document.getElementsByClassName(cls);
}

function hideElem(id){
    document.getElementById(id).style.display = 'none';
}

function showElem(id){
    document.getElementById(id).style.display = 'block';
}

const about_pg_nav_str = ` <div style="display:block;padding-right:0;" id="sidebar" class="w3-sidebar w3-border-blue primary w3-bar-block w3-rightbar header">
    <button onclick="closeSidebar()" class="w3-right w3-btn w3-large "><span class="fas fa-times-circle"></span></button>
    <ul style="padding:0;padding-left:5px;margin-top:10px;" class="w3-ul w3-section w3-bar-item portland">
      <div style="margin:0;width:100%;"class="w3-container w3-section w3-bottombar"><img height="100px" width="100px" src="assets/lens2.jpg" style="border-radius:50%;"></div>
      <li class="list-item"><a style="width:100%;" data-auth-type='public' data-href="index.html" class="page-link w3-button">Home</a></li>
      <li class="w3-list-item"><a style="width:100%;" data-auth-type='public' data-href="admin-dashboard.html" class="page-link w3-button">Admin Dashboard</a></li>
      <li class="w3-list-item"><button style="width:100%;" data-auth-type='public' data-href='advert-page.html' class="page-link w3-button">Advertisement</button></li>
      <li class="w3-list-item"><button style="width:100%;" data-auth-type='public' data-href='sponsorship-page.html' class="page-link w3-button">Sponsorships</button></li></ul></div>
     `
