var app = new Framework7({
  // App root element
  el: '#app',
  // ... other parameters
  routes: [
    {
      path: '/',
      url: 'index.html',
    },
    {
      path: '/newentry/',
      url: 'pages/newentry.html',
    },
    {
      path: '/viewentry/',
      url: 'pages/viewentry.html',
    },
  ],

});
var mainView = app.views.create('.view-main')

const entries = [];
var index = 0;
function setIndex(aInt){
  console.log(aInt);
  index = aInt;
}
function loadSave(){
  var temp = "";
  temp = localStorage.getItem('localSave');
  if(temp == null){

  }
  else{
    entries = temp.split(';');
  }
  
}
function saveAll(){
  var length = entries.size;
  var i = 0;
  var temp = "";
 
  while (i< length){
    temp+=entries[i]+";";
    i++;
  }
  localStorage.setItem('save', temp);
}
function addEntry(aString){
  var temp = getCurrentDate+":"+aString;
  entries.unshift(temp);
}
function getDate(aString, aIndex){
  const splitResult = entries[aIndex].split(':');
  return splitResult[0];
}
function getContents(aString, aIndex){
  const splitResult = entries[aIndex].split(':');
  return splitResult[1];
}

function getCurrentDate(){
  return getDate()+"/"+getMonth()+getFullYear()+"/";
}
function generateCards(){
  var length = entries.length;
  var i = 0;
  var temp = "";
  var temp2;
  console.log("Length: " + length);
  if(length == 0){
    console.log("No save found");
      return "<div class=\"card\"><div class=\"card-header date\"><div id=\""+getCurrentDate()+"\">Date</div></div><div class=\"card-content card-content-padding\">You have not made any entries yet. Press the New button to get started.</div></div>";
  }
  else{
    console.log("Save found");
    while (i< length){
      index = i;
      temp2 = getContents();
      if(temp2.length > 200){
        temp2 = temp2.substring(0, 200)+"...";
      }
      temp+="<a href=\"/viewentry/\" onclick=\"setIndex("+i+")\"><div class=\"card\"><div class=\"card-header date\"><div id=\""+getDate()+"\">Date</div></div><div class=\"card-content card-content-padding\">"+getContents()+"</div></div></a>";
      i++;
    }
    return temp;
  }
}
//Handle Events
$("#save").on("click", function () {
  //addEntry(getCurrentDate+":"+.getValue());
  console.log("saved");
  saveAll();
})

//pageloaders
$(document).on('page:init','.page[data-name="home"]', function(){
  console.log("reading save")
  loadSave();
  document.getElementById("cards").innerHTML = generateCards();
})

$(document).on('page:init','.page[data-name="newentry"]', function(){
  document.getElementById("date").innerHTML = getCurrentDate();
})

$(document).on('page:init','.page[data-name="viewentry"]', function(){
  document.getElementById("cards").innerHTML = "<div class=\"card\"><div class=\"card-header date\"><div id=\""+getDate()+"\">Date</div></div><div class=\"card-content card-content-padding\">"+getContents()+"</div></div>";
})
