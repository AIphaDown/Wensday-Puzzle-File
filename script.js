var imgSrc = "https://upload.wikimedia.org/wikipedia/commons/7/75/Celeste_box_art_final_2.png"

var imgWidth = 25;
var imgHeight = 40;
var rows = 5;
var columns = 8;

function randomize(param){
  //build a function which randomizes the pieces of an array
}

$(function(){
  $("#pieces>.imgContainer").draggable()
})

function init(){
  $("h1").html("Solve the puzzle!")
  $("#final").hide()

  var puzzle = []

  for(var i = 0;i<rows;i++){
    for(var j = 0;j<columns; j++){
      puzzle.push("<div class='"+(i*columns+j)+" imgContainer'>"+
      "<img src="+imgSrc+
      " style='margin-left: -"+(j*imgWidth/columns)+"rem;"+
      "margin-top: -"+(i*imgHeight/rows)+"rem;'></img></div>");

      $("#drop-zone").append("<div class='"+(i*columns+j)+
    " imgContainer'></div>");   
    }
  }

  puzzle.forEach(function(piece){
    $("#pieces").append(piece)
  })

 $(".imgContainer").css({
    "width": imgWidth / columns + "rem",
    "height": imgHeight / rows + "rem"
  });
  
  $("#pieces>.imgContainer").draggable()
}

$(document).ready(function(){
  $("#final").click(init)
});