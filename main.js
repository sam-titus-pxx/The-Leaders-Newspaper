
/********TLN MAIN JAVASCRIPT FILE************/

/*
The __MAIN global data object is responsible for the great majority of fuctions, tasks and operations of the platform.
these functions include:
• Data Objects Instantiation
• Data loading and imitialization
• Data retrieval 
• Operations sequence control & management
• Data configuration
• Data Encryption & Decryption
• Access Control
• Handling operations interfaces

The __MAIN is the bridge connecting the other 3 important globals:
__DB, __USER, __ADMIN.
The __MAIN interacts with the 3 most of the time to carry out the needed tasks required for smooth operations
*/

///////////// GLOBAL VARIABLES ///////////////////////

//SYSTEMoutPRINT24
//SamTitus3481
/*
var __USER = {
    logged: false,
    user_data: {}
}; //the user object variable
*/

/////////////// Service Workers ///////////////////

//var __USER_WORKER = new Worker("user_profile.js");
var __MAIN = {
    session_loaded: false,//has the session object been already loaded?
//if session object has been loaded then no need to carry out session checking
    session_obj: {},
    current_page: "",
    page_navigation: []    
}

/* LIST OF PERSISTED KEY ENTRIES
localStorage.setItem("encryption_mech")
"__USER"
"__MAIN"
"__ADMIN"

persist_object_data = {
 persist_status:{
  encr_mech: true|false,
  session_obj: true|false
 }
}
*/
var persist_data_object = null;
var encryption_mech = null;
var __USER = null;

/////////////// INITIALIZATION ///////////////////
//for just as page content is loaded
document.addEventListener('DOMContentLoaded',function(){
    
   
});

/*//For just before user exits page
window.onbeforeunload = function(){
  console.warn('Calling')
  persistSessionData();  
}*/

//window.addEventListener('beforeunload',persistSessionData);

///////////////////////////////////////////////////////////////

 //INIT_encryptionMech();
//its unwise to akways create a new encryption mech
//every time the user loads a page

 $(document).ready(function(){ 
  
  //killSession();
  INIT_linkRouting();
     
   setTimeout(()=>{
    runSessionCheck();
    INIT_handlePageHookup();
   },2000);
     
     
     /*Securedd H*/
   //dummy session
  //generateUserSessionKey('SamTitus045','SYSTEMoutPRINT24');
    
     
     setTimeout(()=>{
   //  persistSessionData()   
     },7000)
  });




function INIT_encryptionMech(){
 //create a script tag linking to require.js
 let encr_lib = createScriptTag(undefined,'cryptico'),
     encr_wrapper = createScriptTag(undefined,'encryption_mech');
    
  //Load this very first!
    encr_lib.setAttribute('async','false');
    let head = document.head;
    head.insertBefore(encr_lib,head.firstElementChild);
 //document.body.appendChild(encr_lib);
 
   encr_lib.addEventListener('load',function(){ 
            //Encryption Cipher mech loaded to doc
       document.body.appendChild(encr_wrapper);
       console.log('ENCRYPTION LIBRARY LOADED!')
   });
   encr_wrapper.addEventListener('load',function(){
      console.log('ENCRYPTION WRAPPER LOADED!');
       
     //first check if an encryption mech already exists
      let mech = localStorage.getItem('encryption_mech');
     if(mech == null){
       //initialize a new encryption mech         
       INIT_Cryptico(); 
       encryption_mech = getCrypticoEncryptionMech
     }else if(mech !== null){
       //parse mech string
         let mech_obj = JSON.parse(mech);
         encryption_mech = mech_obj;
       //load unpackMech()
         unpackEncrMech(mech_obj);
     }
   });
}

function persistEncryptionMech(){
    var encr_mech_str = JSON.stringify(encryption_mech);
    localStorage.setItem('enryption_mech',encr_mech_str);
    console.log('ENCRYPTION MECH PERSISTED SUCCESSFULLY!')
}

/*
<a data-href="next-page" href="page-url" class="page-link">a</a>
*/
/*
There are two type of pages: those needing authorization before access, and those that dont
•For pages that need authorization before they can be accessed:
 - The authorization is to be gotten, checked and validated before user is given access
 - The anchor link tag must contain a data-auth-type attribute
 - The 'data-auth-type' attribute has two options: private|public
<a data-href="" data-auth-type="private|public" class="page-link" href="">Link</a>
*/
function INIT_linkRouting(){
 //get all page links
    links = getElems("page-link");
    //console.log('PAGE LINKS: '+links.length)
 //iterate them individually
    Array.from(links).forEach((link)=>{
      //set event handler
      link.addEventListener('click',function(e){
       
          e.preventDefault(); //prevent default click action
          
          auth_type = this.getAttribute('data-auth-type'); 
         
        switch(auth_type){
         case 'public' :
          href = this.getAttribute('data-href');
          persistSessionData(); //persist existing session data
          window.location.href = href;
         break;
         case 'private' :
            //create a script tag linking to require.js
            let script_elem = createScriptTag(undefined,'require');
            script_elem.setAttribute('data-main','scripts/main');
            document.body.appendChild(script_elem);
            console.log('Private Link Handling')
            script_elem.addEventListener('load',function(){ 
            //import module dependencies
               var cstm_modal = require(['cstm_modal_module'],function(cstm_modal){
                   cstm_modal.INIT_modalDisplay();//('modal-anchor');
                   cstm_modal.INIT_timedInputModal('RESTRICTED ACCESS','Only Authorized Admin Can Access This Page.<br>Please provided the needed authorization passcode below.');
                   /* Initiate a timer mechanism: the user has 8 seconds to enter passcode.
                   */
               });  
            });
         break;
        } });        
    });
}

function handlePageExit(){
    persistSessionData();
}


/*
The Very First Function To Be Run On Page Load
handles:
 • unpacking of persisted data objects (if they exist)
 • creation, initialization and persisting of data objects
 • loading of data objects accordingly
*/
function runSessionCheck(){
 console.warn('STEP 1')
  //if persist_data_object = null, depersist
  if(persist_data_object == null){
      console.warn('STEP 2')
   //get persist_data_object persist string
    let e = localStorage.getItem('persist_data_object');
    //  let e_str = JSON.stringify(e);
    console.log(`Persist Data Obj: ${e}`)
    if(e !== null){
        console.warn('STEP 3')
        persist_data_object = JSON.parse(e);
        
        //check persist stats
        p_stat = persist_data_object.persist_stat;
        
       if(p_stat.encr_mech){
           console.warn('STEP 4')
         //encryption mech persisted data object exists
         //retrieve, parse, and load 
         let en = localStorage.getItem('encryption_mech');
           console.log(`ENCRYPTION MECH PERSIST: ${en}`);
          if(en !== null){ 
           encryption_mech = JSON.parse(en);
           unpackEncrMech(encryption_mech);
          }else{
              console.log('Could not unpack Encryption Mech')
          }
       }else if(!p_stat.encr_mech){
           console.warn('STEP 5')
           //create new encryption data object
           //load and persist it
           INIT_Cryptico(); 
           encryption_mech = getCrypticoEncryptionMech;
           persist_data_object.persist_stat.encr_mech = true;
       }
         console.warn('STEP 6')
        if(p_stat.session_obj){
         //session data object persist exists
         //retrieve, parse, and load
          let es = localStorage.getItem('session_object');
           console.log(`SESSION OBJECT PERSIST: ${es}`);
           __USER = JSON.parse(es);
           persist_data_object.persist_stat.session_obj = true;
        }
    }else if(e == null){
        console.warn('STEP 2•B')
        //persisted persist_data_object string does not exists
        //create a new persist_data_ibject instance, persist it
        persist_data_object = {
            persist_stat:{
                encr_mech: false,
                session_obj: false
            }
         }
        runSessionCheck()
      }
   }else if(persist_data_object !== null){
           console.warn('STEP 1•B')
   }
       
 }


function readSession(){
    //console.log("Reading Session")
    var user = __USER.user_data.username;
    var id = __USER.user_data.sessID;
    console.log(`ID: ${id}\nUsername: ${user}\n`)
}

function killSession(){
   
    __MAIN.session_loaded = false;
    __MAIN.session_obj = {};
    
    localStorage.removeItem('user_session_id');
    localStorage.removeItem('user_session_object');
    localStorage.removeItem('encryption_mech');
    localStorage.removeItem('persisted_data_object');
    console.log('CLEARED PERSISTENCE STORAGE!');
}


function persistSessionData(){
    /*
    • Encrypt the __USER data object:
     - Stringify the object
     - Encrypt the object string
     - persist it
    */
    console.log("Persisting Session Object");
    var json = JSON.stringify(__USER);
    console.log(`STRINGIFIED OBJECT DATA: ${json}`);
    //var encr_json = encryptText(json);
    //console.log(`ENCRYPTED OBJECT DATA: ${encr_json}`)
    localStorage.setItem('user_session_object',json);
    console.log('Session Object Data Persisted Successfully\n\n') 
    
    persistEncryptionMech();   
    
    //Persisting persist_data_object
    if((encryption_mech !== null) && (__USER !== null)){
      persist_data_object = {
           persist_stat:{
                "encr_mech":true,
                "session_obj":true
            }
         } 
    console.log(`PERSISTENCE: ${JSON.stringify(persist_data_object)}`);
    localStorage.setItem('persist_data_object',JSON.stringify(persist_data_object));   
    console.log('PERSISTED DATA OBJECT STATS!')
    }
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function loadAccounts(){
    $.get("scripts/UserAccountData.txt",function(data,status){
        if(status == "success"){
           //JSON Parse data
            data_obj_arr = JSON.parse(data)
            accounts_db = data_obj_arr;
           
            db_loaded = true;
            //alert("DB Loaded")
        }
    })
}

function loadLogAlert(){
    logs = ""
    if(log_arr.length > 0){
        log_arr.forEach((log)=>{
           logs += log+'<br>';
        });
     INIT_alertModal(logs);
    } console.log("Logs Displayed !");
}
///////////////////////////////////////////////
//////////////////////////////////////////////////

//check the current visited page
//the page that the user is on right now!
function currentPage(){
    pg = window.location.pathname.split("/")[5];
    path = pg.split(".")[0];
    //alert(path);
    return path;
}

function INIT_handlePageHookup(){
 //Initializes the working of the current page based on its purpose or function
 //every page should have a configurations or data-config object
  
 //depending on the page, we could initialize/instantiate the needed & neccessary functionalities
    //procedures and logic of the components of the page
    /*
    For example: In Login page, the actions that would be taken are:
    •Fetch existing users data from database
    •create and save new user session obj if login success
    •block/disable login function if user has tried 3 times unsuccessfully
    •block/disable login function if user attempts XSS attack
    */
 //We can also import script modules dependecies according to page
    const page = currentPage();
    __MAIN.current_page = page;
    __MAIN.page_navigation.push(page);
    //alert('Proceeding to handle ')
    switch(page){
        case "about" : 
            INIT_aboutPage();     
        break;
         case "index" :
             INIT_indexPage();
        break;
         case "login" :
             INIT_UserLogin();
        break;
         case "search-page" :
             INIT_searchPage();
        break;
    }
}


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////
//////////////////////////////////////////////////

function INIT_aboutPage(){
    
   /* getElem('session-user-stat').innerText = __USER.user_data.username;
    getElem('session-user-stat').setAttribute('data-session-stat','logged');
*/
    
    var dependencies = ['about','owl.carousel'];
    loadScriptDependencies(dependencies);
    
}


function INIT_indexPage(){
    var dependencies = ['owl.carousel','index','TLN_db','searcher','slick','PopUp','advert-page','SEGMENT_LOADER'];
    loadScriptDependencies(dependencies);
}

function INIT_searchPage(){
    var dependencies = ['searcher','owl.carousel','TLN_db','PopUp'];
    loadScriptDependencies(dependencies);
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////
//////////////////////////////////////////////////
function loadScriptDependencies(dep_arr){
    //accepts an array of JS page names as external dependencies
    
    dep_arr.forEach((script)=>{
        script_elem = document.createElement('script');
        script_elem.setAttribute('src',`scripts/${script}.js`);
        document.body.appendChild(script_elem);
    });
   console.log('SCRIPT DEPENDENCIES ADDED SUCCESSFULLY!')
}

function loadStyleDependencies(dep_arr){
    //accepts an array of css styles page names as external dependencies
    
    dep_arr.forEach((style)=>{
        style_elem = document.createElement('script');
        style_elem.setAttribute('src',`styles/${style}.css`);
        document.head.appendChild(style_elem);
    });
   console.log('STYLES DEPENDENCIES ADDED SUCCESSFULLY!')

}

function createScriptTag(dir='scripts',script){
    script_elem = document.createElement('script');
        script_elem.setAttribute('src',`${dir}/${script}.js`);
    
    //console.log(`${dir}/${script}`);    
    
return script_elem;
}
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function getElem(id){
  return document.getElementById(id);
}

function getElems(cls){
  return document.getElementsByClassName(cls); 
}

function generateUserSessionKey(username,password){
    var _id = "";
    
    for(i = 0; i < 7; i++){_id += Math.floor(Math.random()*9);}
    
    console.log(`SAVING=> ${username}:${password}`);
    const sess_obj = {
        id: `${_id}`,
        username: `${username}`,
        password: `${password}`
    }
   
    __USER = sess_obj;
    
    json = JSON.stringify(sess_obj);
    console.log(`CREATED USER DATA OBJECT: ${json}\n\n`)
    //encr_json = encryptText(json);
    //console.log(`ENCRYPTED OBJECT DATA: ${encr_json}`)
    localStorage.setItem("user_session_object",json);
    console.log(`USER SESSION OBJECT SAVED & PERSISTED!`)
}

///////////////////////////////////////////////
//////////////////////////////////////////////////




