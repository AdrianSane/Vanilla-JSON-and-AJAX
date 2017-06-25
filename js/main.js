// src: https://www.youtube.com/watch?v=rJesac0_Ftw&list=FLJdr0dqG_C6JjbSGFSUtFjA&index=3&t=2157s
//      http://www.filltext.com/
//      https://www.w3schools.com/tags/ref_httpmessages.asp
"use strict";

//setup variables
var btn = document.getElementById("btn"),
    info = document.getElementById("info"),
    userClick = 1;

// ---------------------------------------------------- Run AJAX on button click
btn.addEventListener("click", function(){

  // establish a connection with a specified url using: XMLHttpRequest
  // define the request
  // xml is a data format
  // AJAX call set to dataRequest
  var dataRequest = new XMLHttpRequest();

  // send data using: post
  // recieve data using: get
  // open the request
  dataRequest.open("GET", "js/data/data" + userClick + ".json");

  // once data is loaded
  dataRequest.onload = function(){

    // error handeling - server error
    if(dataRequest.status >= 200 && dataRequest.status < 400){

      // to tell the browser to interpret the data as json objects use: parse
      var data = JSON.parse(dataRequest.responseText);

      // send data to the function that will render it to the page using html
      render(data);
    }


  };

  // error handling - connection error
  dataRequest.onerror = function(){
    console.log("connection error");
  }

  // send the request for the data to initialize the response
  dataRequest.send();

  // when a user clicks, the counter will run and return the next json data in the iteration
  userClick ++;

  // hide button when a user clicks to the last set of json data
  if(userClick > 3){
    btn.classList.add("hide");
    //console.log("test");
  }

});




// --------------------------------------------------------- render data to html
function render(obj){
  var renderHTML = "";

  // loop through json data objects
  for(var i = 0; i < obj.length; i++){
    // add / concatinate onto the renderHTML string
    // create a paragraph element for each object in the json array of objects
    renderHTML += "<h1>" + obj[i].origin + "</h1>" +
    "<p>" + "Make: " + obj[i].make + "<br>" +
    "Model: " + obj[i].model + "<br>" +
    "Trim: " + obj[i].trim + "<br>" +
    "Year: " + obj[i].year + "<br>" +
    "Color: " + obj[i].color + "<br>" +
    "Engine: " + obj[i].engine + "<br>" +
    "Drive: " + obj[i].drive  + "<br>" +

    // get images
    "<img src='" + obj[i].img + "'" + "width='350'" + "height='250'>" + "<br>" + "Options: ";

    // loop through available options objects for each car
    // this loop will run once for each of the items in the options object
    for(var ii = 0; ii < obj[i].options.late.length; ii++){

      // switch between options on cars based on year
      if(obj[i].year < 2005){
        renderHTML +=  "<em>" + obj[i].options.early[ii] + "</em>"  + ", ";
        if(ii == ii.length - 1){
          renderHTML += ".";
          console.log("test");
        };
      }else{
        renderHTML +=  "<em>" + obj[i].options.late[ii]  + "</em>" + ", ";
      };

    }

    renderHTML += "</p>" + "<hr>";

  }

  // insert info into the html
  //info.insertAdjacentHTML("beforeend", renderHTML);
  info.innerHTML += renderHTML;
}
