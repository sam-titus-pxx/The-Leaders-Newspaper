
var article = "";
var user_obj = {
    "user" : "",
    "user_image" : "",
    "user_id" : ""
};

var article_obj = {
    "aricle_index" : 0,
    "id" : "",
    "author" : "Mr. Fatherly P. Titus",
    "date" : "",
    "title" : "",
    "cover" : "",
    "keywords" : [],
    "content" : "",
    "tags" : [],
    
    "subcontent" : {
        "subcontents" : [],
    },
}

var sobj_arr = []

////////////////////////////////////////////////////////////////////////////////////////////
var sub_titles_map = new Map(); //(title_tag_id/title_index, title_text)
var sub_images_map = new Map(); //(image_tag_id/image_index, image_src)
var sub_links_map = new Map(); //(link_tag_id/link_index, {link_text,link_href})
var sub_contents_map = new Map(); //(content_tag_id/content_index, content_text)

var sub_title_index = 1, 
sub_image_index = 1, 
sub_link_index = 1, 
sub_content_index = 1; 

///////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

var article_author = "Mr. Fatherly Powered Titus";
var sub_div = null, append_obj = null;
var str = "";

var sub_count = 0;
var sub_element = 1;

var inp_art_map = new Map();
var sub_inp_art_map = new Map();

var article_html = '';

var links_map = new Map();
var contentBox_id = "inp-article-content";

  
/////////////////////////////////////////////////////////////////////
$(document).ready(()=>{
    
    
  $("#meta-panel").hide();
  $("#btn-clear-fields").hide();
  $("#slide-up-modal").hide();

  loadDummyValues();
      
  getElem("inp-article-content").addEventListener("keyup",function(){
      const char = this.value.substr(-1);
      if(char == "@"){
        openUtilModal();}});
    
    $("#btn-prompt-submit").click(()=>{
     ref_title = $("#prompt-title").val();
     ref_link = $("#prompt-link").val();
  
     links_map.set(ref_title,ref_link);
      
     getElem(contentBox_id).value += `${ref_title}@ `;
     closeUtilModal();
    });
    
    //=================================
    
   $("#btn-add-tag").click(function(){
     var elem = getElem("tags-hoist"), t_elem = getElem("btn-add-tag");
     var stat = t_elem.getAttribute("data-status");
     
     if(stat == "unclicked"){
       t_elem.setAttribute("data-status","clicked");
       t_elem.firstElementChild.setAttribute("class","fas fa-minus");
     elem.style.display = "block";
     elem.innerHTML = ""
       INIT_TagGUI();
     }else if(stat == "clicked"){
       t_elem.setAttribute("data-status","unclicked");
       t_elem.firstElementChild.setAttribute("class","fas fa-plus");
     elem.style.display = "none";
     elem.innerHTML = "";
     }
   });
    
    $("#btn-add-subcontent").click(function(){
     var elem = getElem("sub-creater-hoist"), t_elem = getElem("btn-add-subcontent");
     var stat = t_elem.getAttribute("data-status"); 
     
     if(stat == "unclicked"){
       t_elem.setAttribute("data-status","clicked");
       t_elem.firstElementChild.setAttribute("class","fas fa-minus");
     elem.style.display = "block";
     elem.innerHTML = ""
       INIT_subCreater();
       loadSubDummyValues();
     }else if(stat == "clicked"){
       t_elem.setAttribute("data-status","unclicked");
       t_elem.firstElementChild.setAttribute("class","fas fa-plus");
     elem.style.display = "none";
     elem.innerHTML = "";
     }
   });
    
 $("#btn-clear-fields").click(function(){
   var inp_meta = document.getElementsByClassName("inp-tag"); 
   for(let i = 0; i < inp_meta.length;i++){
    inp_meta[i].value = ""; 
   }
      $(this).hide();
 });    
    
 $("#btn-article-preview").click(function(){
   var inp = document.getElementsByClassName("art-inp");
   var dta = "";
   
   for(let i = 0; i < inp.length; i++){
     dta = inp[i].value;
     
     switch(i){
      case 0: //Article Title
        $("#preview-article-title").html(dta);
       break;
      case 1: //Article Author
        $("#preview-article-author").html(dta);  
       break;
      case 2: //Article Cover Image
       if((dta == "") || (dta == null)){
        dta = "assets/photos/horizon.jpg";
       } 
        getElem("preview-article-cover-image").setAttribute("src",dta);
       break;
      case 4: //Article Content
       data = formatString(dta);
       $("#preview-article-content").html(data);
       break;
      case 3: //Article Keywords
       keys = dta.split(",");
       for(let j = 0; j < keys.length; j++){
         key = `<b class="w3-list-item">${keys[j]}</b>` 
         if(j < keys.length-1){key+=' | ';}
         document.getElementById("preview-article-keywords").innerHTML += key; 
       }
       break;
     }
   }
     //Article Tags
     var tags = getSelectedTags(); /*©document.getElementsByClassName("select-tag-btn"); */
     for(let i = 0; i < tags.length; i++){
       str = `<span class="w3-btn w3-white w3-border-teal w3-border w3-tiny mg-sm pd-tny">${tags[i]}</span>`;
       getElem("preview-article-tags").innerHTML += str;
     }
              
    //Article Date
      getElem("preview-article-date").innerHTML = getDate();
 
     //subcontent
      alert(sobj_arr.length);
     
     article_html = getElem('new-article-html').innerHTML;     
     //document.getElementById("article-preview-display").style.display = "block";
     showSectionDisplay(0);
 });
    
    $("#btn-article-submit-confirm").click(function(){
      INIT_saveArticle();
    });
    
    $("#close-modal").click(function(){
       document.getElementById("article-preview-modal").style.display = "none";
    });
    $("#close-prev-modal").click(function(){
       document.getElementById("preview-modal").style.display = "none";
    });
    
  });
///////////////////////////////////////////////////////////////////

function loadDummyValues(){
    getElemById("inp-article-title").value = "Insecurity Worsening In Northern Nigeria";
    getElemById("inp-article-author").value = "Mr. Fatherly P. Titus";
    getElemById("inp-article-cover").value = "assets/photos/politics2.jpg";
    getElemById("inp-article-intro").value = "The twist no one saw coming !";
    getElemById("inp-article-keywords").value = "Insecurity,Food shortage";
    getElemById("inp-article-content").value = "The growing levels of insecurity in the state has become a major issue of recent";
}

function loadSubDummyValues(){
    sub_elems = document.getElementsByClassName("sub-inp");
    log("Elements: "+sub_elems.length);
    sub_elems[0].value = "How It All Began: 2003";
    sub_elems[1].value = "assets/photos/city4.jpg";
    sub_elems[3].value = "The crisis began about 18 years ago when the current leader of the faction took power in the fall of 2003.";
}


function INIT_subCreater(){
    ++sub_count;
    var sub_hoist = getElem("sub-creater-hoist");
    
    //form header
    header = createTag('h1');
    header.setAttribute('class','header w3-xlarge w3-section underline');
    header.innerText = 'Sub Content Form';
    
    //create a article sub content
    var sub_obj = createTag("div");
    sub_obj.style.padding = "0";
    
    //input - sub header title
    var sb_inp1 = createTag("input");
    sb_inp1.setAttribute("id",`inp-sub-${sub_count}-title`);
    sb_inp1.setAttribute("class","primary-light sub-inp w3-input inp w3-border-grey w3-hover-border-blue mg-btm");
    sb_inp1.setAttribute("style","");
    sb_inp1.setAttribute("placeholder","Provide Title");
    
    //input -image
    var sb_inp2 = createTag("input")
    sb_inp2.setAttribute("id",`inp-sub-${sub_count}-image`);
    sb_inp2.setAttribute("class","primary-light sub-inp w3-input inp2 w3-border-grey w3-hover-border-blue mg-btm");
    sb_inp2.setAttribute("style","");
    sb_inp2.setAttribute("placeholder","Provide Image Path...");
    sb_inp2.value = "assets/";
    
    //image label
    var sb_inp2_lbl = createTag("input")
    sb_inp2_lbl.setAttribute("id",`inp-sub-${sub_count}-image-label`);
    sb_inp2_lbl.setAttribute("class","primary-light sub-inp w3-input inp2 w3-border-grey w3-hover-border-blue mg-btm");
    sb_inp2_lbl.setAttribute("style","");
    sb_inp2_lbl.setAttribute("placeholder","Provide Image Label...");

    
    //textarea - content
    var sb_inp3 = createTag("textarea")
    sb_inp3.setAttribute("id",`inp-sub-${sub_count}-content`);
    sb_inp3.setAttribute("class","primary-light sub-inp w3-input inp2 w3-border-grey w3-hover-border-blue mg-btm");
    sb_inp3.setAttribute("style","");
    sb_inp3.setAttribute("placeholder","Provide Content Text...");
    sb_inp3.setAttribute("rows","5");
    sb_inp3.setAttribute("cols","28");
    sb_inp3.addEventListener("keyup",function(){
      const char = this.value.substr(-1);
      if(char == "@"){
        openUtilModal();
        contentBox_id = `inp-sub-${sub_count}-content`
      }  
    });
    
    var btn_sb_submit = createTag("button");
       btn_sb_submit.setAttribute("id","btn-sub-submit");
       btn_sb_submit.setAttribute("class","w3-btn header w3-border-white w3-border w3-small w3-flat-midnight-blue w3-right w3-section mg-sm pd-bg w3-bar-item w3-round-large");
       btn_sb_submit.setAttribute("style","");
       btn_sb_submit.addEventListener("click",function(){
           INIT_subCreaterEvent();
           $("#btn-add-subcontent").click();
          
           var hoist = getElem("tags-hoist");
           hoist.innerHTML = "";
           hoist.style.display = "none";
       })
       btn_sb_submit.innerText = `Submit`;

    inp_lbl1 = createTag("label");
    inp_lbl1.setAttribute(`class`,`lbl w3-margin`);
    inp_lbl1.innerHTML = "Title";
    inp_lbl2 = createTag("label");
    inp_lbl2.setAttribute(`class`,`lbl w3-margin`);
    inp_lbl2.innerHTML = "Image";
    inp_lbl3 = createTag("label");
    inp_lbl3.setAttribute(`class`,`lbl w3-margin`);
    inp_lbl3.innerHTML = "Content";
    
    sub_obj.appendChild(header);
    sub_obj.appendChild(inp_lbl1);
    sub_obj.appendChild(sb_inp1);
    sub_obj.appendChild(inp_lbl2);
    sub_obj.appendChild(sb_inp2);
    sub_obj.appendChild(sb_inp2_lbl);
    sub_obj.appendChild(inp_lbl3);
    sub_obj.appendChild(sb_inp3);
  
    sub_obj.appendChild(btn_sb_submit);
    
    sub_hoist.appendChild(sub_obj);
    sub_hoist.style.display = 'block';
}

function INIT_subCreaterEvent(){
    hoist = getElem("sub-content-hoist");
    
    sub_obj = createTag("div");
    sub_elems = getElems("sub-inp")
  
    sobj = {
    "title" : "",
    "image" : "",
    "image_caption" : "",
    "content" : ""
    }

    var str = "";
    for(let i = 0; i < sub_elems.length; i++){
    dta = sub_elems[i].value;
    
   if((dta !== "") && (dta !== null)){
   switch(i){
    case 0: sobj.title = dta; 
     str += title_str = `<div class="w3-container"><h2 style="text-decoration:underline;" id="sub-title-${sub_title_index}" class="w3-xlarge sub-title w3-left SSBL">${sobj.title}</h2></div>`;
     sub_title_index++;  
       break;
    case 1: sobj.image = dta; 
     str += img_str = `<img class='sub-image' style="height:100px;width:100%;" id="sub-image-${sub_image_index}" src="${sobj.image}">`;
     sub_image_index++;
       break; 
    case 2:  sobj.caption = dta;
      image_path = $(`#inp-sub-${sub_count}-image`).val();
      caption = $(`#inp-sub-${sub_count}-image-label`).val();
      
      str += img_cont = `<img height="150px" width="100%" src="${image_path}">
      <br> <span class="w3-small"><b>${caption}</b></span>`
     break;//get content
    case 3: sobj.content = formatString(dta); 
     str += cont_str = `<p id="sub-content-${sub_content_index}" class="SSB w3-small sub-content">${sobj.content}</p>`;
     sub_content_index++;  
       break; //get subcontent image
   }
  }
 }  contentBox_Id = "inp-article-content";
    
    sobj_arr.push(sobj);
    
     sub_obj.innerHTML = str;
     getElem('subs-created-counter').innerText = sub_count;
     //format=> title -> content -> image -> link
     getElemById("preview-article-subcontent").appendChild(sub_obj);    
}

function showSectionDisplay(section){
    am_sections = getElems('AM-section');
    
    for(i = 0; i < am_sections.length; i++){
        am_section = am_sections[i];
       if(i == section){
        am_section.style.display = 'block';  
       }else{
           am_section.style.display = 'none';
       }
    }
    slideToTop();
}

function setSubValue(tag,index_id,value,meta){
    //set/change the current value of the sub content item
    //tag => title,image,content,link
    //index_id => sub-tag-(1,2,3,4)
    //value => new value
    switch(tag){
     case 'title' : 
      getElem(`sub-title-${index_id}`).innerHTML = value;
        break;
     case 'image' : 
      getElem(`sub-image-${index_id}`).src = value;
        break;
     case 'link'  :  
       var link_obj = getElem(`sub-title-${index_id}`)
        link_obj.innerHTML = value;
        link_obj.href = meta;
        break;
     case 'content' : 
      getElem(`sub-image-${index_id}`).innerHTML = value;
        break;
    }
}

/*Saving an article is saving a DTO entry and so the data
must be formatted in the appropriate layout
*///Save/persist a DTO entry
/* DTO Layout Format:
ref_id, file_path, title, cover, author, date, content, keywords, tags, subcontents
*/
function INIT_saveArticle(){
    
    //genetate article id
    article_obj.id = generateID();
    //get date
    article_obj.date = getDate();
    //get the title
    article_obj.title = getElem("inp-article-title").value;
    //get the intro
    article_obj.intro = getElem("inp-article-intro").value;
        //get the author
    article_obj.author = getElem("inp-article-author").value;
    //get the cover image
    article_obj.cover = getElem("inp-article-cover").value;
    //get the keywords
    article_obj.keywords = getElem("inp-article-keywords").value.split();
    //get selected tags
    article_obj.tags = getSelectedTags();
    //get content
    data = formatString(getElem("inp-article-content").value);
    article_obj.content = data;
    //article file oath
    article_obj.filename = generateArticleFile(article_obj.id);
    //subcontents
    article_obj.subcontents = sobj_arr;
    
   const DTO = {
           "ref_id" : article_obj.id,
           "file_path" : article_obj.filename,
           "title" : article_obj.title,
           "category" : "feed",
           "intro" : article_obj.intro,
           "cover" : article_obj.cover,
           "author" : article_obj.author,
           "date" : getDate(),
           "content" : article_obj.content,
           "keywords" : article_obj.keywords,
           "tags" : article_obj.tags,
           "subcontents" : article_obj.subcontents
          }
        dto_str = saveDTODataEntry(DTO);
    
        console.log(dto_str);
    
    ///for subcontent handling =>
    //alert("Article Object Saved Successfully !!")
    //alert(`ID: ${article_obj.id}\nTitle: ${article_obj.title}\nFile Name: ${article_obj.filename}`);
 }

//obfuscated version of function
//function _0x1dc9(_0x4c6496,_0x30dda4){const _0x730b46=_0x730b();return _0x1dc9=function(_0x1dc986,_0x38f619){_0x1dc986=_0x1dc986-0x18b;let _0x450239=_0x730b46[_0x1dc986];return _0x450239;},_0x1dc9(_0x4c6496,_0x30dda4);}function _0x730b(){const _0xbed63a=['2315JpYXqa','224kWVsqP','subcontents','content','inp-article-intro','4573360BeJnLx','intro','inp-article-keywords','5421255hjHxrc','keywords','log','cover','4474872ZMSnwj','author','inp-article-title','value','6713106UYJWAZ','split','filename','1030257fDowal','title','1042SnpyGv','date','tags','7252119AJbAdX'];_0x730b=function(){return _0xbed63a;};return _0x730b();}(function(_0x2e8337,_0x5353c5){const _0x39749e=_0x1dc9,_0x3a0c29=_0x2e8337();while(!![]){try{const _0x4f823c=parseInt(_0x39749e(0x18b))/0x1*(parseInt(_0x39749e(0x1a0))/0x2)+-parseInt(_0x39749e(0x197))/0x3+parseInt(_0x39749e(0x190))/0x4+parseInt(_0x39749e(0x193))/0x5+parseInt(_0x39749e(0x19b))/0x6+parseInt(_0x39749e(0x1a3))/0x7+-parseInt(_0x39749e(0x18c))/0x8*(parseInt(_0x39749e(0x19e))/0x9);if(_0x4f823c===_0x5353c5)break;else _0x3a0c29['push'](_0x3a0c29['shift']());}catch(_0x5b5b5c){_0x3a0c29['push'](_0x3a0c29['shift']());}}}(_0x730b,0xd9b3a));function INIT_saveArticle(){const _0x330572=_0x1dc9;article_obj['id']=generateID(),article_obj[_0x330572(0x1a1)]=getDate(),article_obj[_0x330572(0x19f)]=getElem(_0x330572(0x199))[_0x330572(0x19a)],article_obj[_0x330572(0x191)]=getElem(_0x330572(0x18f))[_0x330572(0x19a)],article_obj['author']=getElem('inp-article-author')[_0x330572(0x19a)],article_obj[_0x330572(0x196)]=getElem('inp-article-cover')[_0x330572(0x19a)],article_obj[_0x330572(0x194)]=getElem(_0x330572(0x192))['value'][_0x330572(0x19c)](),article_obj['tags']=getSelectedTags(),data=formatString(getElem('inp-article-content')['value']),article_obj[_0x330572(0x18e)]=data,article_obj[_0x330572(0x19d)]=generateArticleFile(article_obj['id']),article_obj[_0x330572(0x18d)]=sobj_arr;const _0x24a309={'ref_id':article_obj['id'],'file_path':article_obj[_0x330572(0x19d)],'title':article_obj['title'],'category':'feed','intro':article_obj[_0x330572(0x191)],'cover':article_obj[_0x330572(0x196)],'author':article_obj[_0x330572(0x198)],'date':getDate(),'content':article_obj[_0x330572(0x18e)],'keywords':article_obj[_0x330572(0x194)],'tags':article_obj[_0x330572(0x1a2)],'subcontents':article_obj[_0x330572(0x18d)]};dto_str=saveDTODataEntry(_0x24a309),console[_0x330572(0x195)](dto_str);}
 

function formatString(str){
  f_index = str.indexOf("@");
  l_index = str.lastIndexOf("@");
  
  spec_char = str.substr(f_index+1,l_index-1);
  
  line_arr = str.split("\n");
  line_len = line_arr.length;
  line_str = "";
  
  for(j = 0; j < line_len; j++){
    line = line_arr[j];
    
    var t_str = "", 
    l_str = "",
    str_arr = line.split("");
    var r_on = false;
   
  
  for(i = 0; i < str_arr.length; i++){
    val = str_arr[i];
    
    if((r_on == false) && (val !== "@")){
      t_str += val; 
    }
    else if((r_on == true) && (val !== "@")){
     l_str += val;  
    } 
    
    if(val == "@"){
      if (r_on == false){
        r_on = true 
      }else if(r_on == true){
        link = links_map.get(l_str);
        
        str_format = `<a class="w3-text-blue" href="${link}">${l_str}</a>`;
        l_str = "";
        t_str += str_format;
       
        r_on = false;
      }
    }
  } line_str += `${t_str}<br>`;
 }
  return line_str;
}


//////////////////////////////////////////////////////////

function loadModalDialogue(str){
  $("#game-modal-dialog").html(str);
  
  $("#btn-load-map-select").click(function(){
    map_option = $("#play-map-select").val();
    INIT_LOAD(game_option);
    closeModal();
  });
}

function openModal(){
  getElem("main-modal").style.display = "block"; 
}

function closeModal(){
  getElem("main-modal").style.display = "none"; 
}

function openUtilModal(){
  getElem("util-modal").style.display = "block";
  $("#inp-article-content").blur();
  setTimeout(()=>{
    $("#prompt-title").focus();
  },600);
}

function closeUtilModal(){
  $("#prompt-title").val("");
  $("#prompt-link").val("");
  $(`#${contentBox_id}`).focus();
  getElem("util-modal").style.display = "none"
}

function getElem(id){
  return document.getElementById(id);
}

function log(str){
  console.log(str);
}

////////////////////////////////////////////////////////////////
function getDate(){
    mnths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    var d = new Date();
    var df = `${d.getDate()}/${mnths[d.getMonth()]}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;//  [dd/mm/yyyy]
    return df;
}

function getElems(cls){
    return document.getElementsByClassName(cls);
}

function generateID(){
    var id = "id-#";
    for(let i = 0; i < 6;i++){
        id += Math.floor(Math.random()*9);
    } return id;
}

function generateArticleFile(id){
    f_name = `Article-${id}`;
    
    return f_name;
}

function createTag(type){
    obj = document.createElement(type);
    console.log("Created Tage Object:=> "+type);
    return obj
}

function getElemById(id){
    return document.getElementById(id);
}

//set window screen to the top
function slideToTop(){
 window.scrollTo(1,1); 
}

function viewSkeleton(){
    return c_obj.innerHTML;
}