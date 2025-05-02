

var temp_data_key, //key of the last temp data
last_retrieved_key, //key of the last localStorage retrieved data
last_inserted_key; //key of the last localStorage inserted data

var temp_data_keys = new Set();

function storeData(key,value){
 localStorage.setItem(key,value);
 last_inserted_key = key;
 temp_data_keys.add(key);
    
 console.log(`Temporary Data Inserted To Local Storage!\nTemp Key: ${key}`)
}

function eraseItem(key){
    localStorage.removeItem(key);
    console.log('Erased LS Item: '+key);
}

/*This function was created to enable me store data of several news article files 
in a single JSON object called the DTO Array.
The news article data are stored as JS objects,
The Article JS objects are called Data Transfer Objects (DTO)
The DTO_Array holds these several DTO objects,
The DTO_Array is stringified to a JSON string in order to be stored on LS,
The DTO_Array gets parsed back to object on retrieval and the DTOs are made accessible
*/
/*
Why I employed this approach:
Its time consuming and inefficient to get and load data from individual article txt files as 
the JQuery .get API takes atleast 200 ms to complete one file retrieval.
So, storing the articles data as objects, and storing the objects in a single object array
makes retrieval easier.
*/
//Deprecated: Not in use anymore
function storeDTOData(dto_arr){
    //store entire Data Transfer Object Array to localStorage
    //stringify the DTO_array
    var dto_str = JSON.stringify(dto_arr);
    
    localStorage.setItem('DTO',dto_str);
    console.log('DTO Entries Stored Successfully')
}

//Save/persist a DTO entry
/* DTO Layout Format:
ref_id, file_path, title, category{headline|feed}, intro, cover, author, date, content, keywords, tags
*/
function saveDTODataEntry(dto){
    //get the DTO string
    dto_str = localStorage.getItem('DTO');
    //Parse DTO
    dto_arr_obj = JSON.parse(dto_str);
    //Push new entry to DTO Array
    dto_arr_obj.push(dto);
    //stringify and save DTO
    dto_str = JSON.stringify(dto_arr_obj);
    localStorage.removeItem('DTO');
    localStorage.setItem('DTO',dto_str);
    console.log('DTO Entry Stored Successfully!')
   return dto_str;   
}

//Return a DTO entry based on given index
function getDTODataEntry(index){
    //get the DTO string
    dto_str = localStorage.getItem('DTO');
    //Parse DTO
    dto_arr_obj = JSON.parse(dto_str);
    //Push new entry to DTO Array
    dto_entry = dto_arr_obj[index];
    //stringify and save DTO
   return dto_entry;   
}

//Remove and Return the last DTO entry of the DTO Array
function popDTODataEntry(){
    //get the DTO string
    dto_str = localStorage.getItem('DTO');
    //Parse DTO
    dto_arr_obj = JSON.parse(dto_str);
    //Push new entry to DTO Array
    dto_entry = dto_arr_obj.pop();
    //stringify and save DTO
    dto_str = JSON.stringify(dto_arr_obj);
    localStorage.removeItem('DTO');
    localStorage.setItem('DTO',dto_str);
   return dto_entry;   
}

//Return the Parsed DTO Array 
function getDTODataArray(){
    var dto_arr = [];
        dto_str = localStorage.getItem('DTO');
        dto_arr = JSON.parse(dto_str);
        //console.log(`Retrieved DTO Array: ${dto_str}`)
   return dto_arr;
}

function INIT_DTO(){
    var dto_str = localStorage.getItem('DTO');
    var dto_obj = null;
    
    if(dto_str == null){
        console.log('Creating DTO Array')
        $.get('scripts/articles-file.txt',function(data,status){
            alert(data);
           if(status == 'success'){
               localStorage.setItem('DTO',data);
               dto_str = data;
               dto_obj = JSON.parse(data);
               console.log('DTO Created and Initialized')
           } 
        });
    }else{
        dto_obj = JSON.parse(dto_str)
        //console.log(dto_str);
    } console.log('DTO Initialized!')
      //console.log(dto_str);    
    return dto_obj;
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


function storeObjectData(key,obj){
    //stringify object
    obj_str = JSON.stringify(obj);
    //Set data type of data to store
    setDataType(key,'object');
    //save object to LS with key
    localStorage.setItem(key,obj_str);
}

function storeObjectArrayData(key,obj_arr){
    //stringify object
    obj_str = JSON.stringify(obj_arr);
    //Set data type of data to store
    setDataType(key,'array');
    //save object to LS with key
    localStorage.setItem(key,obj_str);
}

function setDataType(key,type){
    config_str = localStorage.getItem('saved-config');
    obj = JSON.parse(config_str);
    obj[key] = type;
    obj_str = JSON.stringify(obj);
    console.log(obj_str)
    localStorage.setItem('saved-config',obj_str);
}

function getData(key){
    data = localStorage.getItem(key);
    //localStorage.delete(key);
    last_retrieved_key = key;
    //temp_data_keys.delete(key);
    
    console.log(`Data Retrieved From Local Storage\nKey: ${key}`);
    
    return data;
}


function loadPostsContent(){
    
}

function clearDB(){
    localStorage.clear();
    temp_data_keys.clear();
    temp_data_key = "";
    
    console.log("Cleared Local Storage DB")
}


function INIT_sessionCookies(){
    
}

