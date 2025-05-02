
var accounts_db = new Array(); // [string]
var user_accounts = new Array(); //[[string]]
var db_loaded = false;


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


var username = "", user_email = "", user_password = "", user_phone = '';
var log_arr = [];
//SYSTEMout23;

$(document).ready(()=>{
    
    loadAccounts();
    
  $('#btn-user-signup').click(()=>{
    var inp_arr = [];
    creds = getElems('signup-inp-field');
    cred1 = creds[0].value;
    cred2 = creds[1].value;
    cred3 = creds[2].value;
    
    
    //ensure every field is filled
    for(i = 0; i < creds.length; i++){
         cred = creds[i].value;
         cred_id = creds[i].getAttribute('id');
      if((cred == "") || (cred == null)){
       showFormAlert('Please fill out all form fields !','error'); 
        setTimeout(function(){
          $(`#${cred_id}`).focus();
        },1100);
        break;
      }else{
        inp_arr.push(cred); 
      }
    }
      
  if(inp_arr.length == creds.length){
    
    //determine validate whether user gave email or phone number
     cred1 = inp_arr[0];
     phonemail_status = determinePhoneMail(cred1);
    if(phonemail_status == 0){
        log_arr.push("Email or Phone number provided is invalid! Please cross-check");
    }else if((phonemail_status == 1) || (phonemail_status == 2)){
    //validate password
     cred2 = inp_arr[1];
     password_status = validatePassword(cred2);
     if(password_status){
     // console.log('Password Validated !'); 
      user_password = cred2
     }else{
      log_arr.push('Invalid Password !'); 
     }
    
    //confirm confirmation password
     cred3 = inp_arr[2];
     pass_confirmed = false;
     if(cred3 === cred2){
      pass_confirmed = true;
      //console.log('Password Confirmed !'); 
     }if(!pass_confirmed){
         log_arr.push("Passwords do not match")
     }
    }
   if(log_arr.length > 0){
     loadLogAlert();  
   }else if(log_arr.length <= 0){
    //check whether user already exists
    //run/cross-check creds against exusting database entries
    //if matches == 0, then go ahead and create a new account
    if((password_status) && (pass_confirmed)){
        signupUser(cred1,cred2);
    }
   }
  }
});
    
    $("#close-signup-modal").click(function(){
       document.getElementById("tln-signup-modal").style.display = "none";
    });
   
    
});

///////////////////////////////////////////////
//////////////////////////////////////////////////

function signupUser(phonemail,password){
    var user_exists_status = false;
    var log_arr = [];
    accounts_db.forEach((user)=>{
       phone = user.phone;
       email = user.social_handles.email;
        
       if((phonemail == phone) || (phonemail == email)){
           log_arr = []; 
           user_exists_status = true;
           log_arr.push("The phone number or email provided is already registered to an account!")
       }
    });
    
    if(user_exists_status == false){
        INIT_alertModal("Data Validated <span class='fas fa-check'></span>")
        setTimeout(()=>{
            INIT_inputModal("Please provide a personalized username for your account!")
        },1500)
    }else{
        log_arr.push("Proceed to login page ?")
        //alert(log_arr)
        INIT_redirectConfirmationModal(log_arr,"login.html")
    }
      return user_exists_status;
}


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function determinePhoneMail(query_str){
    /*
     The given string could either be phone number or an email
     We are to determine if the string is in phone no. format
     or if it is in email format.
    * First check phone number
    * Then check Email
    */
    phone_regexp = /^([0-9]{11})$/
    // /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
    email_regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;    
    
    var isPhone = phone_regexp.test(query_str);
    var isEmail = email_regexp.test(query_str);
    if(isPhone){
        console.log('Phone Value Validated');
        return 1
    }else if(isEmail){
        console.log('Email Value Validated')
        return 2
    }else{
        console.log('Invalid Input Field!')
        return 0;
    }
}

function validateUsername(username) {
  const regex = /^[a-zA-Z0-9_\.\-]{8,12}$/;
  return regex.test(username);
}

function validatePassword(pwd) {
       var errors = [];
    if (pwd.length < 8) {
        errors.push("Your password must be at least 8 characters"); 
    }
    if (pwd.search(/[a-z]/i) < 0) {
        errors.push("Your password must contain at least one letter.");
    }
    if (pwd.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one digit."); 
    }
    if (pwd.search(/[a-z]/) < 0) {
        errors.push("Your password must contain at least one lowercase letter.")
    }
    if (pwd.search(/[A-Z]/) < 0) {
        errors.push("Your password must contain at least one uppercase letter.")
    }
      
      if (errors.length > 0) {
        INIT_alertModal(errors.join("\n"));
        return false;
    }else if(errors.length <= 0){
        password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return password_regex.test(pwd);
    }
    return true;
}


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function loadAccounts(){
    //alert("Yo")
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

function showFormAlert(text,stat){
 FA = getElem('form-alert');
  switch(stat){
   case 'error' : 
    FA.classList.toggle('w3-green');
    break;
   case 'info' : 
    FA.classList.toggle('w3-red');
    break;
  }
   FA.style.display = 'block';
   getElem('form-alert-text').innerText = text;
   slideToTop();
}

function hideFormAlert(){
 getElem('form-alert').style.display = 'none';  
}

function handleUsernameInput(){
   if(validateUsername(username)){
         INIT_alertModal("Username Set",`Your profile username <b class="w3-text-blue"><q>${username}</q></b> has been successfully set<br>You can change it later if you wish.`);
         generateUserSessionKey(username,user_password)
        setTimeout(()=>{
          INIT_buttonActionRouter("about.html");
        },3000);
      }else if(!validateUsername(username)){
          INIT_alertModal("Username provided not valid !<br>-Username should contain only (A-Za-z0-9 _)<br>-Username must be 8 characters long or more ");
          setTimeout(()=>{
            closeSignupModal();
            INIT_inputModal("Please provide a personalized username for your account!");
          },3000);
      }
}


///////////////////////////////////////////////
//////////////////////////////////////////////////

var redirect_link = '';

function INIT_buttonActionRouter(link_path){
      INIT_alertModal(`You are being redirected to: <span class="w3-small w3-text-blue"><q>${link_path}</q></span>`)
      setTimeout(()=>{
        window.location.href = link_path;      
      },3000);
}


function INIT_confirmationModal(){
    
    $("#tln-signup-modal #modal-content").html(modal_dialog);
    
    if(arguments.length > 1){
     //arguments[0] => title
     //arguments[1] => text 
     $("#modal-title").text(arguments[0]);
     $("#modal-text").text(arguments[1]);
    }else if(arguments.length == 1){
        $("#modal-text").text(arguments[0]);
    }
    
    
    $("#btn-modal-dialog-no").click(()=>{
       console.log("Dialog Response: NO")
       closeSignupModal();
    });
     $("#btn-modal-dialog-yes").click(()=>{
       console.log("Dialog Response: YES")
       closeSignupModal();  
         
       //INIT_buttonActionRouter("login.html");
    });
    
    openSignupModal();
}


function INIT_redirectConfirmationModal(){
    
    $("#tln-signup-modal #modal-content").html(modal_dialog);
    
    if(arguments.length == 3){
     //arguments[0] => title
     //arguments[1] => text 
     //arguments[2] =< redirect link path
     $("#modal-title").text(arguments[0]);
     $("#modal-text").text(arguments[1]);
     redirect_link = arguments[2];
    }else if(arguments.length == 2){
      //arguments[0] => text
      //arguments[1] => link
        $("#modal-text").text(arguments[0]);
        redirect_link = arguments[1];
    }else if(arguments.length == 1){
        redirect_link = arguments[0];
    }
    
    $("#tln-signup-modal #modal-content #btn-modal-dialog-no").click(()=>{
       console.log("Dialog Response: NO")
       closeSignupModal();
    });
     $("#tln-signup-modal #modal-content #btn-modal-dialog-yes").click(()=>{
       console.log("Dialog Response: YES")
       closeSignupModal();  
         
       INIT_buttonActionRouter(redirect_link);
    });
    
    openSignupModal();
}


function INIT_alertModal(){
    
  $("#tln-signup-modal #modal-content").html(modal_alert);
    
   if(arguments.length > 1){
    //arguments[0] => title
     //arguments[1] => text 
     $("#modal-title").html(arguments[0]);
     $("#modal-text").html(arguments[1]);
    }else if(arguments.length == 1){
        $("#modal-text").html(arguments[0]);
    }
   openSignupModal();
}


function INIT_inputModal(){
  $("#tln-signup-modal #modal-content").html(modal_input);
    
   if(arguments.length > 1){
    //arguments[0] => title
     //arguments[1] => text 
     $("#modal-title").html(arguments[0]);
     $("#modal-text").html(arguments[1]);
    }else if(arguments.length == 1){
        $("#modal-text").html(arguments[0]);
    }
    
    openSignupModal();   
    
    $("#tln-signup-modal #modal-content #btn-modal-input").click(()=>{
      username = $("#tln-signup-modal #modal-content #modal-input-box").val();
        
      handleUsernameInput();
    });
    
}


function openSignupModal(){
  getElem("tln-signup-modal").style.display = "block"; 
}

function closeSignupModal(){
  getElem("tln-signup-modal").style.display = "none"; 
}


///////////////////////////////////////////////
//////////////////////////////////////////////////


function getElem(id){
  return document.getElementById(id);
}

function getElems(cls){
  return document.getElementsByClassName(cls);
}

//set window screen to the top
function slideToTop(){
 window.scrollTo(1,120); 
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
   
    json = JSON.stringify(sess_obj);
    console.log(`CREATED USER DATA OBJECT: ${json}\n\n`)
    encr_json = encryptText(json);
    console.log(`ENCRYPTED OBJECT DATA: ${encr_json}`)
    localStorage.setItem("user_session_object",encr_json);
    console.log(`USER SESSION OBJECT SAVED & PERSISTED!`)
}

///////////////////////////////////////////////
//////////////////////////////////////////////////

const modal_input = `
<div class="w3-panel w3-card-4">
<center>
<h1 class="w3-xlarge w3-underline bolder w3-text-red" id="modal-title">Alert !</h1>

<p class="w3-small bold" id="modal-text">Provide Data Value</p><br>
<div>
<input type="text" id="modal-input-box" class="w3-input w3-small w3-hover-sand" placeholder="choose a unique username">
<button id="btn-modal-input" onclick="" class="w3-btn w3-blue w3-small">OK</button>
</div>
</center>
</div>
`;

const modal_dialog = `<div class="w3-panel w3-card-4">
<center>
<h1 class="w3-xlarge w3-underline bolder w3-text-red" id="modal-title">Alert !</h1>

<p class="w3-small bold" id="modal-text">Confirm Action ?</p>

<div class="w3-panel">
<button class="w3-btn w3-border w3-text-blue w3-left" id="btn-modal-dialog-no">No</button>
<button class="w3-btn w3-border w3-blue w3-right" id="btn-modal-dialog-yes">Yes</button>
</div>
</center>
</div>` ;

const modal_alert = `
<div class="w3-panel w3-card-4">
<center>
<h1 class="w3-xlarge w3-underline bolder w3-text-red" id="modal-title">Alert !</h1>

<p class="w3-small bold" id="modal-text">Action Taking Place</p><br>
<button onclick="closeSignupModal()" class="w3-btn w3-blue w3-small">OK</button>
</center>
</div>
`
