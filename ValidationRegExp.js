/*
   REGULAR EXPRESSION SAMPLES QUICK REFERENCE SCRIPT
   WRITTEN INITIALLY FOR USE IN JS, BUT CAN BE ADAPTED TO OTHER LANGUAGES
   [28/MAR/2024]
*/

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

/* RegExp for Name Username Validation */
const username_regex1 = /^[A-Za-z][A-Za-z0-9_]{7,29}$/,
username_regex2 = /^[a-zA-Z0-9]+$/,
name_regex = /^[A-Z]+[a-zA-Z\-]+$/,
name_regex2 = /^[a-zA-Z]+ [a-zA-Z]+$/;

//////////////////////////////////////////////////////////////////////////////////////////

/*  RegExp For Password validation*/
const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/,
password_regex2 =  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

//Minimum eight characters, at least one letter and one number:
pass_regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

//Minimum eight characters, at least one letter, one number and one special character:
pass_regexp2 = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

//Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
pass_regexp3 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

//Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
pass_regexp4 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
pass_regexp5 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;

//////////////////////////////////////////////////////////////////////////////////////////

/*  RegExp for email validations*/
const email_regex = /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\\. [a-zA-Z]{2,}$/,
email_regex2 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
email_regex_strict = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/,
email_regex_TLDs = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
email_regex_IDNs = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/u;

//////////////////////////////////////////////////////////////////////////////////////////

/*RegExp For Special Characters*/
//const specialChars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/
const special_char = /[^A-Za-z 0-9]/g,
special_char = /^[a-zA-Z0-9_\.\-]{1,40}$/, //allows only [. _ -] disallows the rest
special_char3 = /[^\w\.\-]/; //anything other than [a-z 0-9 . -]
/*
mystring.match(/[^\w\.\-]/)
If this function returns null, then the string complies with your rules.
If it returns anything else, there was one or more illegal characters in it.
*/

//////////////////////////////////////////////////////////////////////////////////////////

/*RegExp for validating phone numbers*/
const phone_regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
phone_regex2 = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
phone_regex3 = /^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/;

//////////////////////////////////////////////////////////////////////////////////////////

const simple_date_regexp = /^\d{2}\/\d{2}\/\d{4}$/; // [00/00/0000]
//tight_date_regexp = /^(0[1                                                                                                                                                                                      -9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
const time_regexp = /^[0-9]?[0-9]:[0-9][0-9]$/;

//////////////////////////////////////////////////////////////////////////////////////////

const url_regexp = "(((ftp|http|https):\/\/)|(www\.))([-\w\.\/#$\?=+@&%_:;]+)"; //ftp/http/https
const url_ftp_regexp = "(((ftp):\/\/)|(www\.))([-\w\.\/#$\?=+@&%_:;]+)"; //ftp only
const url_https_regexp = "(((https):\/\/)|(www\.))([-\w\.\/#$\?=+@&%_:;]+)"; //https only
const url_www_regexp = "(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)"; //http/https/www

//////////////////////////////////////////////////////////////////////////////////////////

const ip_regexp = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
/*Accepts: 127.0.0.1
192.168.1.1
192.168.1.255
255.255.255.255
0.0.0.0
1.1.1.01

Rejects:
30.168.1.255.1
127.1
192.168.1.256
-1.2.3.4
1.1.1.1.
3...3
*/

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

function determineUserMail(query_str){
    /*
     The given string could either be username or an email
     We are to determine if the string is in username format
     or if it is in email format.
    * First check username
    * Then check Email
    */
    username_regexp = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
    email_regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;    
    
    var isUsername = username_regexp.test(query_str);
    var isEmail = email_regexp.test(query_str);
    if(isUsername){
        return 1
    }else if(isEmail){
        return 2
    }else{
        return 0;
    }
}

function determinePhoneMail(query_str){
    /*
     The given string could either be phone number or an email
     We are to determine if the string is in phone no. format
     or if it is in email format.
    * First check phone number
    * Then check Email
    */
    phone_regexp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
    email_regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;    
    
    var isPhone = phone_regexp.test(query_str);
    var isEmail = email_regexp.test(query_str);
    if(isPhone){
        return 1
    }else if(isEmail){
        return 2
    }else{
        return 0;
    }
}

function determineUserPhone(query_str){
    /*
     The given string could either be username or a phone number
     We are to determine if the string is in username format
     or if it is in phone number format.
    * First check username
    * Then check phone
    */
    username_regexp = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
    phone_regexp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    
    var isUsername = username_regexp.test(query_str);
    var isPhone = phone_regexp.test(query_str);
    if(isUsername){
        return 1
    }else if(isPhone){
        return 2
    }else{
        return 0;
    }
}

function validateName(name) {
  const regex = /^[A-Z]+[a-zA-Z\-]+$/;
  return regex.test(name);
}

function validateName2(name) {
  const regex = /^[a-zA-Z]+ [a-zA-Z]+$/; 
  return regex.test(name);
}

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

function validateUsername(username) {
  const regex = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
  return regex.test(username);
}

function validateUsername2(username) {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(username);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\\. [a-zA-Z]{2,}$/;
  return regex.test(email);
}

function validateEmail2(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function validateEmailStrict(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
  return regex.test(email);
}

function validateEmailTLD(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
  return regex.test(email);
}

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
function phonenumber(inputtxt) {
    /* Matches:
      XXX-XXX-XXXX
      XXX.XXX.XXXX
      XXX XXX XXXX
          OR
      +XX-XXXX-XXXX
      +XX.XXXX.XXXX
      +XX XXXX XXXX
    */
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  //phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    //for using + in front
    
  if(inputtxt.value.match(phoneno)) {
    return true;
  }
  else {
    alert("message");
    return false;
  }
}

function validatePhone(phone) {
  const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return regex.test(phone);
}
/*
validate('1234567890')     // true
validate(1234567890)       // true
validate('(078)789-8908')  // true
*/

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

function ValidateString() {
        //Regex for Valid Characters i.e. Alphabets, Numbers and Space.
        var regex = /^[A-Za-z0-9 ]+$/
        //Validate TextBox value against the Regex.
        var isValid = regex.test(document.getElementById("txtName").value);
        if (!isValid) {
            alert("Contains Special Characters.");
        } else {
            alert("Does not contain Special Characters.");
        }
        return isValid;
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
        alert(errors.join("\n"));
        return false;
    }else if(errors.length <= 0){
        password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return password_regex.test(pwd);
    }
    return true;
}

function validatePassword2(pwd) {
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
        alert(errors.join("\n"));
        return false;
    }else if(errors.length <= 0){
        password_regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return password_regex.test(pwd);
    }
    return true;
}

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

/*
  Validate User Input Search
 - ensure complies with XSS safety regulations
 - basic search can only have alphabets, numbers, and 1 special symbol
*/
 function basicSearchValidate(query_str){
     search_regexp = /^[A-Za-z0-9 ]+$/;
        //Validate TextBox value against the Regex.
        var isValid = search_regexp.test(query_str);
        if (!isValid) { //if is not valid
            //contains other characters other than space(" ")
            alert("Contains Special Characters.");
        } else { ///if is valid
            alert("Does not contain Special Characters.");
        }
        return isValid;
 }

function secondarySearchValidate(query_str){
     search_regexp = /^[A-Za-z0-9 _]+$/;
        //Validate TextBox value against the Regex.
        var isValid = search_regexp.test(query_str);
        if (!isValid) { //if is not valid
            //contains other characters other than space(" ") and dash(_)
            alert("Contains Special Characters.");
        } else { ///if is valid
            alert("Does not contain Special Characters.");
        }
        return isValid;
 }

function validateSpecialCharString(query_str){
     query_regexp = /^[a-zA-Z0-9_\.\-]+$/;
        //Validate TextBox value against the Regex.
        var isValid = query_regexp.test(query_str);
        if (!isValid) { //if is not valid
            //does not contain only alphanumerics,digits,dots,dashes,and hyphen
            alert("Contains Other Special Characters.");
        } else { ///if is valid
            alert("Does not contain Other Special Characters.");
        }
        return isValid;
 }

/*
If you’re taking URLs as input and redirecting or
making requests based on those URLs, 
ensure they are safe.
*/
function sanitizeURL(url) {
  var url_regexp = new RegExp("(((ftp|http|https):\/\/)|(www\.))([-\w\.\/#$\?=+@&%_:;]+)"); //ftp/http/https
  isValidURL = url_regexp.test(url);
   if(isValidURL){
   let a = document.createElement('a');
   a.href = url;
   return a.protocol + "//" + a.host + a.pathname + a.search + a.hash;
   }
    return "Invalid URL";
}


function sanitizeURLSecure(url) {
  var url_regexp = new RegExp("(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)"); //http/https/www
  isValidURL = url_regexp.test(url);
   if(isValidURL){
   let a = document.createElement('a');
   a.href = url;
   return a.protocol + "//" + a.host + a.pathname + a.search + a.hash;
   }
    return "Invalid URL";
}



