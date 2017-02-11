document.addEventListener("DOMContentLoaded", function(){

var board = document.getElementsByClassName("board")[0];
var pallette = document.getElementsByClassName("pallette")[0];
var formbutton = document.getElementById('formB');
var resetbutt = document.getElementById('formA');
var randbutt = document.getElementById('randomC');
var defbutt = document.getElementById('defaultC');
var response = document.getElementById('response');
var apply = document.getElementById('apply');
var coloPick = document.getElementById('colorPick');
var saveslots = document.getElementsByClassName('saves')[0];
var loadslots = document.getElementsByClassName('loads')[0];
var save =[];
var load = [];
var clicker = {
  'current' : ""
};

var boardStat = {
  'columns' : 50,
  'rows' : 30,
  'width' : 15,
  'height' : 15
};

var randoColor = function(){
  var color = "rgb(";
  for(var i = 0; i < 2; i++){
    color += ((Math.floor(Math.random()*255)) + ",");
  }
  color += ((Math.floor(Math.random()*255)) + ")");
  return color;
};

function makeDivs(columns, rows, width, height){
  var countrow = 0;
  var countcol = 0;
  while((columns*width) > 600){
    columns-=1;
    countcol+=1;
  }
  // console.log("col*width ",columns*width);
  // console.log("row*height ",rows*height);
  while((rows*height) > 400){
    rows -= 1;
    countrow+=1;
  }
  var itemsArr = [columns, rows, width, height];
//  console.log("row*height ",rows*height);
  if(countrow > 0 || countcol > 0){
    response.innerText = "Had to delete " + countrow + "rows, and " + countcol +"columns.";
  }
  while (board.hasChildNodes()) {
    board.removeChild(board.lastChild);
  }
  for (var i = 0; i < rows; i++) {
    var row = document.createElement('div');
    row.style.lineHeight = 0;
    row.style.lineSpacing = 0;
  //  console.log("-------Row "+i);
    for (var j = 0; j < columns; j++) {
      var box = document.createElement('div');
      box.style.border= "1px dotted black";
      box.style.width= width + 'px';
      box.style.height= height + "px";
      box.style.float = "left";
      box.style.borderCollapse = "collapse";
      box.classList.add("exists");
      row.appendChild(box);
    //  console.log("Box "+j);
    }
    board.appendChild(row);

  }
  return itemsArr;
}
function makePallette(palle){
  while (pallette.hasChildNodes()) {
    pallette.removeChild(pallette.lastChild);
  }
  var colorArr = [0,0,0,0,0,0,0,0,0,0];
  var defArr = ["red", "pink", "orange", "green", "blue", "purple", "teal", "yellow", "black", "white"];
  var greyArr = ["#FFF","#F2F3F4", "#DADEDF", "#C1C7C9", "#A7AFB2", "#8C9798", "#6F7C80", "#555F61", "#373D3F", "#131516"];
  for (var i = 0; i < colorArr.length; i++) {
    colorArr[i] = randoColor();
  }
  var finalArr = [defArr, greyArr, colorArr];
  for(var j = 0; j<finalArr.length; j++){
    var row = document.createElement('div');
    row.style.lineHeight = 0;
    row.style.lineSpacing = 0;
    row.style.textAlign = "center";
    for (var i = 0; i < 10; i++) {
      var box = document.createElement('div');
      box.style.border= "2px solid grey";
      box.style.width= '20px';
      box.style.height= '20px';
      box.style.margin= "10px";
      box.style.borderRadius= "50%";
      box.style.display = "inline-block";
      box.style.backgroundColor = finalArr[j][i];
      row.appendChild(box);
    }
    pallette.appendChild(row);

  }
}

var chooseColor = function() {
  if(event.target === this){
  }
  else{
    clicker.current = event.target.style.backgroundColor;
  }
};

var applyColor = function() {
  if(event.target === this){}
  else{
    event.target.style.backgroundColor = clicker.current;
    board.addEventListener("mouseover", applyColor);
    board.addEventListener("mouseup", function(){
      board.removeEventListener("mouseover", applyColor);
    });
  }
};

var saveBoard = function(loader){
  var saveArr = [];
  saveArr.push(save[0]);
  saveArr.push(save[1]);
  saveArr.push(save[2]);
  saveArr.push(save[3]);
  var divs = document.getElementsByClassName("exists");
  for (var i = 0; i < divs.length; i++) {
    saveArr.push(divs[i].style.backgroundColor);
  }
  console.log(saveArr);
  localStorage.setItem(loader, JSON.stringify(saveArr));
current.clicker = "";
};

var getBoard = function(){
  var loadArr = JSON.parse(localStorage.getItem(event.target.innerText));
  console.log(loadArr);
  makeDivs(loadArr[0],loadArr[1],loadArr[2],loadArr[3]);
  var divs = document.getElementsByClassName("exists");
  for(var i = 4; i < loadArr.length; i++){
    divs[i-4].style.backgroundColor = loadArr[i];
  }
  current.clicker = "";
};

board.addEventListener("mousedown", applyColor);
pallette.addEventListener("click", chooseColor);
randbutt.addEventListener("click", function(){
  makePallette();
});
resetbutt.addEventListener("click", function(){
  makeDivs(boardStat.columns,boardStat.rows,boardStat.width,boardStat.height);
});
formbutton.addEventListener("click", function(){
  boardStat.columns = document.getElementsByTagName('input')[0].value;
  boardStat.rows = document.getElementsByTagName('input')[1].value;
  boardStat.width = document.getElementsByTagName('input')[2].value;
  boardStat.height = document.getElementsByTagName('input')[3].value;
  save = makeDivs(boardStat.columns,boardStat.rows,boardStat.width,boardStat.height);
});
apply.addEventListener("click", function(){
  console.log(coloPick.value);
  clicker.current = coloPick.value;
});

saveslots.addEventListener("click", function(){
  var loader = "Load" + event.target.innerText.substring(event.target.innerText.length-1, event.target.innerText.length);
  saveBoard(loader);

});
loadslots.addEventListener("click", getBoard);



save = makeDivs(50,50,15,15);
makePallette(true);

});
