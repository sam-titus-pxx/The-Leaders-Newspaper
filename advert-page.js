
var tln_advert_str = '';

  var ad_repeater_interval = null;
  var ad_display_stat = 'close';
  var repeat_count = 0,total_repeats=0;
  var elapsedEnd; //the time elapsed after last Ad display;
  var elapseNext; //the time to be elapsed before the next Ad is displayed

  var load_spec = ''

  $(document).ready(()=>{
    
    
    //INIT_loadAdvert();
    //INIT_AdRepeater(60000,3);
    //loadAdDisplay();
  });

function INIT_loadAdvert(){
 setTimeout(()=>{
      showElem('tln-ad-modal');
    },500);
   setTimeout(()=>{
      hideElem('tln-ad-modal');
      copyText('Hello World');
    },2500);
}
    

function setAdDisplay(ad_img,ad_title,ad_descr,link){
  tln_ad_str = ` <div id="tln-ad-modal" style="display:none;" class="pd-0 w3-modal background">
    <div class="pd-0 mg-0 w3-modal-content w3-border-black">

    <h1 style="margin:0;padding-left:10px;" class="w3-xlarge w3-black underline cinzelBD">TLN Advert</h1>  
    <div style="padding:0;" class="pd-0 mg-0 primary w3-display-container">
     <img src="${ad_img}" height="100%" width="100%" class="">
     <h1 class="w3-small SSB pd-sm mg-tny w3-border w3-display-topright">Ad</h1>
     <h1 class="w3-large pd-sm portland bold">
      <span class="underline">${ad_title}</span>
      <button class="w3-small secondary w3-btn w3-right">visit &nbsp<i class="fas fa-globe"></i></button>
      <span class="w3-text-red w3-small w3-btn SSB ">Details</span>
     </h1>
   </div></div></div>
  `;
}

function loadAdDisplay(){
  d = document.createElement('div');
  d.innerHTML = tln_ad_str;
  
  document.body.appendChild(d);
  
  //showElem('tln-ad-modal');
    switch(load_spec){
        case 'main' : 
         hideElem('tln-main-nav-bar');
        break;
    }
  
      showElem('tln-ad-modal');
      ad_display_stat = 'open';

   setTimeout(()=>{
      showElem('tln-main-nav-bar');
      hideElem('tln-ad-modal');
      ad_display_stat = 'close';
      d.remove();
    },5000);
}

function INIT_AdRepeater(spec,interval,count){
 //show advert every n seconds interval 
  //for m number of times
  repeat_count = count;
  load_spec = spec;
  
  //load initial ad display
  loadAdDisplay();
  
  //set ad display load interval
  ad_repeater_interval = setInterval(()=>{
    //if the total times ad have been displayed is less than 
    //the repeat count set, continue interval iteration.
    if(total_repeats < repeat_count){
      //if the display status of current ad is close,
      //proceed to display next.
      if(ad_display_stat == 'close'){
        total_repeats++;
        console.log(`Displaying Ads\nRepeat Count: ${total_repeats}`);
        loadAdDisplay();
     }      
    }if(total_repeats >= repeat_count){
      console.log('Ad Repeater Ended!');
       clearInterval(ad_repeater_interval);
    }
  },interval);
}


function showElem(id){
 document.getElementById(id).style.display = 'block';  
}


function hideElem(id){
 document.getElementById(id).style.display = 'none';  
}

function getElem(id){
 return document.getElementById(id); 
}


tln_ad_str = `<div id="tln-ad-modal" style="display:none;" class="pd-0 w3-modal background">
    <div class="pd-0 mg-0 w3-modal-content w3-border-black">
    <h1 style="margin:0;padding-left:10px;" class="w3-xlarge w3-black underline cinzelBD">TLN Advert</h1>  
    <div style="padding:0;" class="pd-0 mg-0 primary w3-display-container">
     <img src="assets/Ads/ad1.jpg" height="100%" width="100%" class="">
     <h1 class="w3-small SSB pd-sm mg-tny w3-border w3-display-topright">Ad</h1>
     <h1 class="w3-large pd-sm portland bold">
      <span class="underline">Video Camera TCV3099</span>
      <button class="w3-small secondary w3-btn w3-right">visit &nbsp<i class="fas fa-globe"></i></button>
      <span class="w3-text-red w3-small w3-btn SSB ">Details</span>
     </h1>
   </div>
  </div>
  </div>`
