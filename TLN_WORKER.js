var tln_data;

onmessage = (e) => {
  var dta = "";
  //tln_data = e.data;
    console.log("Type: "+typeof e.data)
 if(typeof(e.data) == 'object'){
  console.log("Popping Array")
  dta = e.data.pop();
 }else if(typeof(e.data) == 'string'){
     console.log("Destringifying...")
     dta = e.data;
 }
    console.log("DTA: "+dta)
  console.log("Message received from main script: "+e.data);
 /* const workerResult = `Result: ${e.data[0] * e.data[1]}`;
  console.log("Posting message back to main script");
  postMessage(workerResult);*/
 // loadPage("../index.html");
 if(dta == "s"){
     tln_data = e.data;
     console.log("Data Saved!")
 }
    if(dta == "f"){
        console.log("Saved Data: "+tln_data);
    }
    else if(dta !== "s"){
     console.log("Data Not Saved")
 }
    console.log(e.data);;
  //postMessage(tln_data);
};

