
////////////////////////////////////////////////

var tags_search_matches = [],
    keywords_search_matches = [],
    title_search_matches = [],
    author_search_matches = [],
/////////////////////////////////////////////////////////
    found_matches_muster = [];

///////////////////////////////////////////////

var ref_ID_muster_map = new Map(),//(id,[meta_datas])
    tags_muster_map = new Map(), //(id,[tags])
    keywords_muster_map = new Map(), //(id,[keywords])
    title_muster_map = new Map(), //(id,[titles])
    author_muster_map = new Map(); //(id,[authors])
///////////////////////////////////////////////////

var content_muster_map = new Map(); //(id,content_clip)

//////////////////////////////////////////////////
var search_matrix = [];
var selected_searches = [];
var search_selected = false;

var search_spec = '';

var alpha_obj = {'0':"a",'1':"b",'2':"c",'3':"d",'4':"e",'5':"f",'6':"g",'7':"h",'8':"i",'9':"j",'10':"k",'11':"l",'12':"m",'13':"n",'14':"o",'15':"p",'16':"q",'17':"r",'18':"s",'19':"t",'20':"u",'21':"v",'22':"w",'23':"x",'24':"y",'25':"z"};    

INIT_matrix();

var alpha_map = new Map();
alpha_map.set("a",0);  alpha_map.set("f",5);
alpha_map.set("b",1);  alpha_map.set("g",6);
alpha_map.set("c",2);  alpha_map.set("h",7);
alpha_map.set("d",3);  alpha_map.set("i",8);
alpha_map.set("e",4);  alpha_map.set("j",9);
alpha_map.set("k",10);  alpha_map.set("p",15);
alpha_map.set("l",11);  alpha_map.set("q",16);
alpha_map.set("m",12);  alpha_map.set("r",17);
alpha_map.set("n",13);  alpha_map.set("s",18);
alpha_map.set("o",14);  alpha_map.set("t",19);
alpha_map.set("u",20);  alpha_map.set("x",23);
alpha_map.set("v",21);  alpha_map.set("y",24);
alpha_map.set("w",22);  alpha_map.set("z",25);

///////////////////////////////////////////////////////////

//eraseItem('DTO');

var DTO_arr = INIT_DTO();
//console.log(DTO_arr);
var search_options = [];
var values = [];

var headline_carousel_obj = {
    headline_map : new Map(),
    headline_data : [],
}

var tln_feed_obj = {
    feed_data : [],
}


 $(document).ready(()=>{
    
    setTimeout(()=>{
      $('#inp-search-bar').focus();
    },1500)
    
   INIT_loadKeywords();
    
   $("#btn-search-matches").click(function(){
     //get search box value
     var inp_search_value = $("#inp-search-bar").val();
     
   if((inp_search_value !== "") && (inp_search_value !== null)){
     //If gotten field value is not empty, then:
     //validate query string
     isQueryValid = validateSpecialCharString(inp_search_value);
     
     if(isQueryValid){
     //array-concat all values
     var search_arr = new Array();
     search_arr.push(inp_search_value);
     if(selected_searches.length > 0){
       search_arr.push(selected_searches);
     }
     
     //displayArray(search_arr);
     //INIT_generalSearch(search_options,search_arr,'search');
     searchCompactLayered(inp_search_value,'main');
     showSection('main');
     }else if(!isQueryValid){
       showInfoAlert('Invalid query string ! Retry','error') 
     }
   }else{
    showInfoAlert('Please enter search string !','error') 
   }
 });
    
 //Action event for when user is entering search text
  document.getElementById("inp-search-bar").addEventListener("keyup",function(){
     str = this.value; 
     
     if((str == "") || (str == null)){
       getElem("btn-search-matches").style.display = "none";
       getElem('search-matches-box').style.display = 'none';
     }
     if((str !== "")&&(str !== null)){
       getElem("btn-search-matches").style.display = "block";
       getElem('search-matches-box').style.display = 'block';
       getElem("btn-search-matches").style.display = "block";
       
     if(values.includes("keywords")){  
     searchByKeywords(str);
     }if(values.includes("tags")){  
     searchByTags(str);
     }if(values.includes("title")){  
     searchByTitle(str);
     }if(values.includes("author")){  
     searchByAuthor(str);
     }else{
      searchByKeywords(str); 
     }
    }else{
     getElem("btn-search-matches").style.display = "none";
     }
   });
    
 });

setTimeout(()=>{
INIT_RefMapper();
},300);

INIT_ArticleSearch("keyword");
INIT_ArticleSearch("tag");
INIT_ArticleSearch("title");
INIT_ArticleSearch("author");

///////////////////////////////////////////////////////////

function INIT_RefMapper(){
   DTO_arr.forEach((dto)=>{
       id = dto.ref_id;
       ref_ID_muster_map.set(id,dto);
   });
    //console.log(`Initialized Ref Map. Size: ${ref_ID_muster_map.size}`);
}

function simpleSearchByTitle(query){
    var matches = [];
    //console.log('Searching By Title')
    DTO_arr.forEach((dto)=>{
        
        //for each DTO entry, match the title against the given query
        title = dto.title;
        var match_results = matchStrings(title,query);
        if(match_results){
           alert('Match Found');
           matches.push(dto)
        }
    }); //console.log(`Matches: ${matches.length}`) 
    return matches;
}


function simpleSearchByAuthor(query){
    var matches = [];
    //console.log('Searching By Author')
    DTO_arr.forEach((dto)=>{
        
        //for each DTO entry, match the title against the given query
        author = dto.author;
        var match_results = matchStrings(author,query);
        if(match_results){
           alert('Match Found');
           matches.push(dto)
        }
    }); //console.log(`Matches: ${matches.length}`) 
    return matches;
}


function simpleSearchByKeywordTag(query){
    var matches = [];
    //console.log('Searching Keywords and Tags')
    DTO_arr.forEach((dto)=>{
        //for each DTO entry, match the title against the given query
        keywords = dto.keywords;
        tags = dto.tags;
        
        kw_len = keywords.length;
        tg_len = tags.length;
        
        var mx = Math.max(kw_len,tg_len);
        
        for(let i = 0; i < mx; i++){
            if(i < kw_len){
               kw = keywords[i]
               kw_match = matchStrings(kw,query);
               if(kw_match){
                   matches.push(dto);
               }
            }if(i < tg_len){
               tg = tags[i]
               //console.log(tg)
               tg_match = matchStrings(tg,query);
               if(tg_match){
                   matches.push(dto);
               }
            }
        }   
    }); //console.log(`Matches: ${matches.length}`) 

    return matches
}

function searchCompactLayered(query,spec){
    
    query_matches = [];//contains DTO IDs
    
    var title_search = simpleSearchByTitle(query);
    
    var author_search = simpleSearchByAuthor(query);
    
    var keytag_search = simpleSearchByKeywordTag(query);
    
    if(title_search.length > 0){
        //console.log("Query Matches Found: TITLE")
        title_search.forEach((dto)=>{
          id = dto.ref_id;
          if(!query_matches.includes(id)){
              query_matches.push(id);
          }
        })
    }
    if(author_search.length > 0){
        //console.log("Query Matches Found: AUTHOR")
        author_search.forEach((dto)=>{
          id = dto.ref_id;
          if(!query_matches.includes(id)){
              query_matches.push(id);
          }
        })
    }
    if(keytag_search.length > 0){
        console.log("Query Matches Found: KEY-TAGS")
        keytag_search.forEach((dto)=>{
          id = dto.ref_id;
          if(!query_matches.includes(id)){
              query_matches.push(id);
          }
        })
    }
    
    if(query_matches.length > 0){
        console.log('Search Matches: '+query_matches.length)
        //load each dto data
        
        headline_carousel_obj.headline_data=[];
        
      query_matches.forEach((id)=>{
       dto = ref_ID_muster_map.get(id)
       title = dto.title;
       category = dto.category;
       cover = dto.cover;
       intro = dto.intro;
       date = dto.date;
       path = dto.file_path;
       
       //console.log(`Category: ${category}`)
       switch(spec){
        case 'main' :
         //console.log(path)
         loadDataDisplayMain(title,category,cover,intro,date,path);
        break;
        case 'search' :
         loadDataDisplaySearch(title,cover,intro,date,path);
        break;
       }
     });
       if(spec == 'main'){
           
         loadFeedMatchesDisplay();
         //INIT_mainCarouselGUI();
         INIT_headlineCarousel();
         //alert(headline_carousel_obj.headline_data.length)
       }
        //INIT_viewArticle();
        INIT_viewFeedArticle();
        INIT_viewHeadlineArticle();   
    }
}


function loadDataDisplaySearch(title,image,intro,date,file_path){
  var str = `<div style='padding:0;margin:0; padding-bottom:10px;' class='mg-bg w3-container w3-section w3-card-4'>
    <div class="pd-sm mg-0 primary ">
    <h1 style='margin-right:10px;' class="w3-small header w3-right"><b class="w3-border-red w3-topbar w3-bottombar w3-small header">TLN</b></h1>
    <h1 class='w3-large cinzelBD underline bolder '>${title}</h1>
  </div>
  <div style='margin:0;padding:0;' class='w3-container'>
   <img style='width:100%;height:150px;' src='${image}' >
  </div>
   <span class="w3-right w3-small bold">${date}</span>
   <p style="" class="w3-medium pd-sm bold poppinsB">${intro}...</p>
         
    <div class='w3-container w3-bar w3-right'>
    <span id='' class='w3-text-amber w3-bar-item fas fa-eye'>&nbsp<span>0</span></span>
    <span id='' class='w3-text-blue w3-bar-item fas fa-comments w3-leftbar w3-rightbar'>&nbsp<span>0</span></span>
    <span id='' class='w3-text-green w3-bar-item fas fa-chart-line'>&nbsp<span>0.0</span></span>
    </div> 
    <button setup-status="false" data-path="${file_path}" type="button" style='padding:5px;' class='w3-round-small w3-card btn-read-article w3-btn w3-small mg-sm w3-border w3-amber w3-text-white w3-border-black w3-border w3-right bold'>read more</button>
   </div>`
    
  //tln_feed_obj.feed_data.push(str);
  getElem('DFR-prev-display').innerHTML += str;
}


function loadDataDisplayMain(title,category,image,intro,date,file_path){
    title = ellipseText(title,4)
      switch(category){
           case "headline" :
            str = `<div style="height:300px;width:100%;padding:0;margin:0;" class="w3-display-container tln-headline-carousel-item">
             <h1 style='margin-right:10px;' class="w3-small header w3-white w3-display-topright"><b class="w3-border-red w3-topbar w3-bottombar w3-small header">TLN</b></h1>
              <img class="" style="height:100%;width:100%;" src="${image}" alt="">
             <div style="width:100%;" class="pd-sm w3-container w3-large header banner-headline w3-text-white w3-display-bottomleft">
               <button setup-status="false" data-path='${file_path}' onclick="" type="button" style='margin:0;margin-top:5px;padding:5px;' class='btn-view-headline-article w3-btn w3-tiny w3-border w3-right'>read more</button>
               <span class="w3-medium">${title}</span>
             </div>
             </div>`;
                     
           getElem("tln-main-headline-display").innerHTML += str;
           // console.log(`Carousel Content Loaded`);
            break;
            case "feed" :
            str = `<div style="height:fit-content;width:100%;padding:0;margin:0;" class="w3-display-container w3-section w3-card-4 article-item">
             <h1 style='margin-right:10px;' class="w3-small header w3-white w3-display-topright"><b class="w3-border-red w3-topbar w3-bottombar w3-small header">TLN</b></h1>
              <img class="" style="height:100%;width:100%;" src="${image}" alt="">
             <div style="width:100%;" class="pd-sm w3-container w3-large header primary w3-text-white w3-display-bottomleft">
               <button setup-status="false" data-path="${file_path}" type="button" style='margin:0;margin-top:5px;padding:5px;' class='btn-view-feed-article w3-btn w3-border w3-tiny w3-right'>read more</button>
               <span class="w3-medium">${title}</span>
             </div>
            </div>`

           // tln_feed_obj.feed_data.push(str); 
            
            getElem("tln-main-feed-display").innerHTML += str;
            break;
        }
   /* INIT_viewArticle();*/
   //   INIT_mainCarouselGUI();
}


function INIT_viewFeedArticle(){
   Array.from(getElems("btn-view-feed-article")).forEach((btn)=>{
    
      btn.addEventListener('click',function(){
        path = this.getAttribute('data-path');
        alert(path);
      });
    });
}

function INIT_viewHeadlineArticle(){
    Array.from(getElems("btn-view-headline-article")).forEach((btn)=>{
        
      btn.addEventListener('click',function(){
        path = this.getAttribute('data-path');
        alert(path);
      });
    });
}

/*
*Spec parameter specifies the page in which the search was initiated and
 where the results will be display
 There are 2 specs of interest: (1)main (page) and (2)search (page)
*/
function searchArticlesBy(query,arr,spec){
/*The arr parameter is an array of queries to be searched
The queries are picked 1 by 1 and matched after the query search type specified
*/
search_spec = spec;
    
 var match = false;
 var subsets = [];
 var query_map = null;
//console.log(`Searching Query "${query}"`);
 switch(query){
     case 'keyword' : query_map = keywords_muster_map; break;
     case 'tag' : query_map = tags_muster_map; break;
     case 'title' : query_map = title_muster_map; break;
     case 'author' : query_map = author_muster_map; break;
     default : query_map = ref_ID_muster_map; break;
 }
  
 arr.forEach((s_val)=>{
 //log(`s_val: ${s_val}`)
 //iterate over the specific muster map entries
 query_map.forEach((val,key)=>{
  
  rslt_obj = subsetExists(s_val,val);
  match = rslt_obj.found_match;
  //log(`Match Status: ${match}`)
     if(match == true){
       //log(`Key: ${key}`);
         
       subsets = concatArray(subsets,rslt_obj.subset_matches);
       //found_matches_muster.push(key);
       //log(`Found Match: ${s_val} <==> ${subsets}`);     
     }});
   });
}


function concatArray(arr1,arr2){
    //put all entries of array 2 into array 1
    arr2.forEach((val)=>{
      if(!arr1.includes(val)){
        arr1.push(val);
      }
    }); return arr1;
}

/**
 * Match each entry in an array against a single data entry
 */
function subsetExists(str,arr2){
    var str1 = "";
    var found = false;
    var s_sets = [];
  
       for(let j = 0; j < arr2.length; j++){
          str1 = arr2[j].toLowerCase();
          //console.log(str1);
          if((str1 == str) || 
             (str1.indexOf(str) > -1) || 
             (str1.search(`/${str}/i`) > -1)){
             found = true; 
             s_sets.push(str1);
          }
    }
     var result_obj={
       "found_match":found,
       "query":str,
       "subset_matches":s_sets,
     }
    return result_obj;
}

/**
 * Match each entry in an array against a single data entry
 */
function matchStrings(str1,str2){
  
    var found = false;
    var s_sets = [];
       
          str1 = str1.toLowerCase();
          str2 = str2.toLowerCase();
          
        //console.log(`[${str1}] <=> [${str2}]`)
          if((str1 == str2) || 
             (str1.indexOf(str2) > -1) || 
             (str1.search(`/${str2}/i`) > -1)){
             found = true; 
             s_sets.push(str1);
          }
    return found;
}


//populate the article meta maps by specific option
function INIT_ArticleSearch(option){
    /*option: tag,title,keyword,author,all
     retrieve all articles by option
    */
   //log(`Initializing '${option}' <==> '${file}'...`)
            
     DTO_arr.forEach((dto)=>{
         
          //tags:
          id = dto.ref_id;
          
            if(option == "keyword"){
             keywords_muster_map.set(id,dto.keywords);
             //log(`Keywords Muster Set ...`);
            }else if(option == "tag"){
             tags_muster_map.set(id,dto.tags);   
             //log(`Keywords Muster Set ...`);
            }else if(option == "title"){
             title_muster_map.set(id,dto.title);
             //log(`Titles Muster Set ...`);
            }else if(option == "author"){
             author_muster_map.set(id,dto.author);
             //log(`Keywords Muster Set ...`);
            }
        });
            //log(`All '${option}' Muster Map Data Set...\n`)
}

function searchByKeywords(str){
    //get the first letter of the search
    //get its matrix index value
    //search the index entries of that value for a match
    
    getElem("search-matches-box").innerHTML = "";
    
    ltr = str.substr(0,1).toLowerCase();
    index = alpha_map.get(ltr);
    arr = search_matrix[index];
    
    arr.forEach((val,i)=>{
      if((val.indexOf(str) > -1) || (val.search(`/${str}/i`) > -1)){
            
      //create a clickable bar item tag button; set it to untagged
       search_btn = createTag("button")
       search_btn.setAttribute("id","search-btn-"+i);
       search_btn.setAttribute("class","w3-tiny search-btn w3-btn w3-border-white w3-border w3-blue mg-sm pd-sm w3-bar-item w3-round-xlarge");
       search_btn.setAttribute("style","");
       search_btn.setAttribute("data-value",val);
       search_btn.setAttribute("data-status","untagged");
       search_btn.setAttribute("value",val);
        
       search_btn.innerHTML = `${val}&nbsp<i class="fas fa-plus-circle"></i>`;

       document.getElementById("search-matches-box").appendChild(search_btn);   
        }
    })
    INIT_SelectEvent();   
}

function INIT_matrix(){
    for(let i = 0; i < 26; i++){
        search_matrix.push(new Array());
    } //log("Search Matrix Initialized !")
}

/*
 seach matrix=>
[A],[B],[C],...[Z]

[A] => [single word sentence], [multiple words]
*/
function INIT_populateSearchMatrix(arr){
    //log("populating matrix");
    //take a 1D array and break it up alphabetically
    arr.forEach((val)=>{
        ltr = val.substr(0,1);
        index = alpha_map.get(ltr.toLowerCase());
        search_matrix[index].push(val);
    });
    //log("Matrix Population Complete!");
    // displayMatrix(search_matrix);
}

function INIT_loadKeywords(){
    //log("Obtaining Keywords.....")
    var lines = [],keywords = [],keyword = "";
    $.get("scripts/DummyFiles/keywords.txt",function(data,status){
       if(status == "success"){
           line = data.split("\n");
           line.forEach(function(val){
              kw_arr = val.split(","); 
               for(let i = 0; i < kw_arr.length; i++){
                   keyword = kw_arr[i];
                   if((keyword !== null) && (keyword !== "undefined")){
                   keywords.push(kw_arr[i]);
                   }
               }
           })
          ///log("Keywords Obtained !") 
          INIT_populateSearchMatrix(keywords);      
         } 
    });
}

/*
=========================================================================
*/

function INIT_SelectEvent(){
   //fetch all tag buttons
   search_elems = getElems("search-btn");
    
   //set their event listeners
    for(let i = 0; i < search_elems.length; i++){
        btn = search_elems[i];
        
        btn.addEventListener("click",function(){
           //alert(this.value); 
           //get the corresponding value
            val = this.value;
           //get its tag status
            if(!selected_searches.includes(val)){
             //if this value has not already been selected
                //and is not present in selected_searches
             selected_searches.push(val);
            //reset the styling and set status as tagged
            this.setAttribute("class","w3-btn w3-tiny w3-border-white w3-border w3-flat-midnight-blue mg-sm pd-sm w3-bar-item w3-round-xlarge");
            this.innerHTML = `${val}&nbsp<i class="w3-text-green fas fa-check-circle"></i>`
            //tag_status_map.set(val,"tagged")
                
            getElem("selected-searches-box").appendChild(this);
                
            if(search_selected == false){
                getElem("btn-search-matches").style.display = "block";
                search_selected = true;
            }
            }else if(selected_searches.includes(val)){
                //if this value already exists in the selected_searches array
                this.setAttribute("class","search-btn w3-tiny w3-btn w3-border-white w3-border w3-blue mg-sm pd-sm w3-bar-item w3-round-xlarge");
                this.innerHTML = `${val}&nbsp<i class="fas fa-plus-circle"></i>`

                this.remove();
                getElem("search-matches-box").appendChild(this);
             if(selected_searches.length <= 0){
                 getElem("btn-search-matches").style.display = 'none';
                 search_selected = false;
             }    
                trimSelected(val);
            }
        });
    }
}

function getSelectedKeywords(){
    var str = "";
    selected_searches.forEach((val,i)=>{
        str += (i == selected_searches.length-1)?`${val}` : `${val}+`;
    });
    //copy(str);
    return str;
}


//clip a specific number of sentences from the 
//first paragraph of a content text
function clipSnippet(text,n){
  var clipped = '',s_count = 1;
  var sentences = text.split(" ");
    
  for(let i = 0; i < sentences.length; i++){
     clipped += sentences[i]+" ";
      if(s_count == n){
          break;
      }s_count++;
  }  
   return clipped.trim();
}


/*
===============================================================================
*/

/*
sort by date format:
 [{id,date},{id,date}]
*/
function sortByTitle(obj_arr){
    
    n = obj_arr.length;
    var temp_arr = new Array();
    var sort_map = new Map(); //(title,[{meta_obj}])
    
  for(let j = 0;j < n; j++){
     obj = obj_arr[j];
     id = obj.id;
     title = obj.title;
      
     sort_map.set(title,obj);
     temp_arr.push(title);
  }
     obj_arr = new Array();
     temp_arr.sort();
  for(let j = 0; j < n; j++){
      title = temp_arr[j];
      obj = sort_map.get(title);
      
      obj_arr.push(obj);
  }
    // console.log("DFR Title Sorted");
     return obj_arr;
}


/*
sort by Category:
headline > normal
 [{id,date},{id,date}]
*/
//[{id,title,date,cover,category}]
//[{id,title,date,cover,category}]
function sortByCategory(arr){
 // console.log("Sorting By Category")
  n = arr.length;
 for(let i = 1; i <= n-1; i++){
   n_obj = arr[i]
   n_cat = n_obj.category;
    for(let j = 0; j < n; j++){
       p_obj = arr[j];
       p_cat = p_obj.category;
      
     if(p_cat == "headline"){
       temp = arr[j];
       arr[j] = arr[i];
       arr[i] = temp
     }
      
    }
 } //console.log("Category Sort Complete");
    return arr;
}


 /*
sort by date format:
 [{id,date},{id,date}]
*/
function sortByDate(obj_arr){
    
    n = obj_arr.length;
  for(let j = 1;j < n; j++){
     obj = obj_arr[j];
     d = obj.date;
     h = parseInt(d.split(" ")[0]);
      
     i = j - 1;
      
     s_obj = obj_arr[i];
     s_d = s_obj.date;
     s_h = parseInt(s_d.split(" ")[0]);
      
     while((i > -1) && (s_h > h)){
         obj_arr[i+1] = s_obj;
         i--;
     }obj_arr[i+1] = obj;
      
  } 
   // console.log("DFR Date Sorted");
    return obj_arr;
}


function trimSelected(val){
    var nw_arr = [];
    
    selected_searches.forEach((value)=>{
        if((value !== val) && (value.search(`/${val}/i`) == -1)){
            nw_arr.push();
        }
    }); 
    selected_searches = nw_arr;
}

function displayMap(map){
    console.log("Displaying Map...");
    
 if(map.size <= 0){
     console.log("Map Is empty!");
 }else if(map.size > 0){
  map.forEach(function(value,key){
   console.log(`ID: ${key}\nData: ${value.tags}\n\n`); 
  });
 }
}

function displayMatrix(arr	){
    log("Displaying Matrix...\n")
    for(var i = 0; i < arr.length; i++){
        console.log(`${alpha_obj[i]}=> `);
       for(var j = 0; j < arr[i].length; j++){
           word = arr[i][j];
        console.log(upperCaseF(word));
        
       }
           //console.log(`${arr[i][j]}`);
       }
    }


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



function displayArray(arr){
    alert(arr);
}

////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////
//append preview string to article preview display div



function loadFeedMatchesDisplay(){
   var feeds = tln_feed_obj.feed_data;
  //  alert(`Feeds Data Size: ${feeds.length}`)

    feeds.forEach((fdstr)=>{
      getElem("tln-main-feed-display").innerHTML += fdstr;  
    })
    INIT_viewFeedArticle();
}


function INIT_headlineCarousel(){
    
    
$('.headline-carousel').slick({
  dots: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  adaptiveHeight: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ] 
    });
    
}

/*
function INIT_mainCarouselGUI(){
    
    // getElem("tln-main-headline-display").innerHTML += hdstr;

    
   //INIT_viewHeadlineArticle();
    
  let owl = $('.owl-carousel');
    //console.log(`Initiating Carousel (${count})...`);
    
    //console.log('Setting Mains Carousel API')
    owl.owlCarousel({
        margin: 5,
        nav:false,
        loop: true,
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
    
        // Listen to owl events:
    owl.on('changed.owl.carousel', function(event) {
        var currentItem = event.item.index;
        console.log(currentItem);
        //window.location.hash = currentItem + 1;
    })
}*/

function ellipseText(text,lim){
  //ellipse by words count
  str_arr = text.split(" ");
  
  str = "";
  for(i = 0; i < str_arr.length; i++){
    str += (i == lim)? str_arr[i] : str_arr[i]+" ";
    if(i+1 == lim){
      break;
    }
    
  } if(str_arr.length > lim){
      str+='...'}
    
  return str;
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

function showInfoAlert(text,stat){
 FA = getElem('info-alert');
  switch(stat){
   case 'error' : 
    FA.classList.toggle('info');
    break;
   case 'info' : 
    FA.classList.toggle('warning');
    break;
  }
   FA.style.display = 'block';
   getElem('info-alert-text').innerText = text;
  setTimeout(function(){
    FA.style.display = 'none';
    if(stat == 'error'){
      FA.classList.toggle('info');
    }else{
     FA.classList.toggle('warning'); 
    }
  },2000);
   slideToTop();
}

function hideInfoAlert(){
 getElem('info-alert').style.display = 'none';  
}


function validateSpecialCharString(query_str){
     query_regexp = /^[a-zA-Z0-9_\.\-]+$/;
        //Validate TextBox value against the Regex.
        var isValid = query_regexp.test(query_str);
        if (!isValid) { //if is not valid
            //does not contain only alphanumerics,digits,dots,dashes,and hyphen
            //alert("Contains Other Special Characters.");
        } else { ///if is valid
            //alert("Does not contain Other Special Characters.");
        }
        return isValid;
 }

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

function upperCaseF(word){
    var wrd,f_ltr,word_str,wrds,str="";
    
    if(word.indexOf(" ") > -1){
        //two words
       var words = word.split(" ");
       for(let i = 0; i < words.length; i++){
          wrd = words[i];
          f_ltr = wrd.substr(0,1),
          word_str = wrd.substr(1);
          wrds = f_ltr.toUpperCase()+""+word_str+" ";
          str+=wrds;
       }
    }else if(word.indexOf(" ") == -1){
     f_ltr = word.substr(0,1),
     word_str = word.substr(1);  
     str = f_ltr.toUpperCase()+""+word_str;
    }
    return str;
}

function log(str){
    console.log(str);
}

function getElem(id){
    return document.getElementById(id);
}

function getElems(cls){
    return document.getElementsByClassName(cls);
}

function showElem(id){
    document.getElementById(id).style.display='block';
}

function hideElem(id){
    document.getElementById(id).style.display='none';
}

function createTag(type){
    obj = document.createElement(type);
    //console.log("Created Tage Object:=> "+type);
    return obj
}

//set window screen to the top
function slideToTop(){
 window.scrollTo(1,120); 
}
