var imgSrc = "https://upload.wikimedia.org/wikipedia/commons/7/75/Celeste_box_art_final_2.png"

var imgWidth = 25;
var imgHeight = 40;
var rows = 8;
var columns = 5;

var options;
var piecesCompleted = 0;

function randomize(puzzle){
   for(let i = puzzle.length-1;i>0;i--){
   var randomIndex = Math.floor(Math.random() * i);
   var valueAtRandomIndex = puzzle[randomIndex];

    puzzle[randomIndex] = puzzle[i];
    puzzle[i] = valueAtRandomIndex;
 }
}

$(function(){
  $("#pieces>.imgContainer").draggable()

    /* Firstly, use .change to detect any updates with .difficuly, then make a 
  variable and have the beginning start with this, refrencing the .difficulty. 
  After that get the children of it which would be options, next specify only the 
  selected option, and lastly use the JQuery function ".val()" to find the value of the 
  selected option. */
  $( ".difficulty" ).selectmenu({
    change: function(event, ui) 
    {
      options = $(this).children("option:selected").val();
      console.log(options)
      if(options == "Custom")
        {
          $("#rowCol").show()
        }
      else
        {
          $("#rowCol").hide()
        }
    }
  });

  $( "#rows" ).spinner({
    min: 1
  });
  
  $( "#columns" ).spinner({
    min: 1
  });

})

function init(){
  if(options == "Easy")
        {
          rows = 6;
          columns = 4;
        }
      else if(options == "Normal")
        {
          console.log("hard")
          rows = 8;
          columns = 5;   
        }
      else if(options == "Hard")
        {
          rows = 10;
          columns = 7;    
        }
      else if(options == "Novice")
        {
          var rows = 16;
          var columns = 10;    
        }
      else if(options == "Expert")
        {
          var rows = 20;
          var columns = 14; 
        }
      else if(options == "Custom")
        {
          var rows = $( "#rows" ).spinner( "value" );
          var columns = $( "#columns" ).spinner( "value" );
        }
      if(rows == null)
      {
        rows = 1;
        columns = 1;
      }
  $("h1").html("Solve the puzzle!")
  $("#final").hide()

  $("h1").css({
    "font-size": 60 + "px"
  });

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
  randomize(puzzle);

  puzzle.forEach(function(piece){
    $("#pieces").append(piece)
  })

 $(".imgContainer").css({
    "width": imgWidth / columns + "rem",
    "height": imgHeight / rows + "rem"
  });
  
  $("#pieces>.imgContainer").draggable()

 $("#drop-zone > .imgContainer").droppable({
   drop: function(event,ui){

    var destNum = $(this).attr("class").split(" ")[0]
    //console.log(destNum)

    var pieceNum = ui.draggable.attr("class").split(" ")[0]
    //console.log(pieceNum)

    if(pieceNum == destNum) 
    {
        //console.log(ui.draggable.find("img"))  

        $(this).append(ui.draggable.find("img"))
        ui.draggable.addClass("invisible")

        piecesCompleted += 1;
        console.log("completed " + piecesCompleted);
        console.log("total pieces " + puzzle.length);
        
        if(piecesCompleted == puzzle.length){
          $("h1").html("Puzzle Completed! Click to Replay!")
          $("h1").css({
            "font-size": 45 + "px"
          });
          $(".picture").empty()
          $("#final").show()
          piecesCompleted = 0;
        }
    }
    else{
     ui.draggable.css({
       "border":".1rem solid red"
       });
    }
   }
 });
  //var attributes = $("#pieces").attr("class").split(" ")
  //console.log(attributes)
}



$(document).ready(function(){
  $("#final").click(init)
  $( ".difficulty" ).selectmenu()
  $("#rowCol").hide()

});