function sharpen(arg){

savec();
var data = document.getElementById("draw").toDataURL();
var iDiv = document.createElement('div');
iDiv.id = 'wait';
iDiv.style="position: absolute; left: 850 px;     top: 350px; z-index: 0; ";
iDiv.innerHTML = '<img src = /static/images/wait.gif>';
document.getElementsByTagName('body')[0].appendChild(iDiv);

$.post("/sharpen/", {
    imageData : data,

    }, function(data) {

 $("#wait").remove();
 document.getElementById("draw").toDataURL();
 canvas = document.getElementById("draw");
 var obCanvas = canvas.getContext('2d');
 obCanvas.putImageData(data, 0, 0);
    });
}



function median(arg){

savec();
var data = document.getElementById("draw").toDataURL();
var iDiv = document.createElement('div');
iDiv.id = 'wait';
iDiv.style="position: absolute; left: 850 px;     top: 350px; z-index: 0; ";
iDiv.innerHTML = '<img src = /static/images/wait.gif>';
document.getElementsByTagName('body')[0].appendChild(iDiv);

$.post("/median/", {
    imageData : data,

    }, function(data) {

 $("#wait").remove();
 document.getElementById("draw").toDataURL();
 canvas = document.getElementById("draw");
 var obCanvas = canvas.getContext('2d');
 obCanvas.putImageData(data, 0, 0);
    });
}




function MyFill(x,y,r_old,g_old,b_old,r_new,g_new,b_new,w,h){


canvas = document.getElementById("draw");
var obCanvas = canvas.getContext('2d');
var imgData = obCanvas.getImageData(x, y, 1, 1);
var d = imgData.data;
//
//var imgData2 = obCanvas.getImageData(4, 4, 1, 1);
//alert(imgData2.data[0]);
//
var R = d[0];
var G = d[1];
var B = d[2];

if(x >= 0 && x < w && y >= 0 && y < h && R != r_new && G != g_new && B != b_new &&  R == r_old && G == g_old && B == b_old)
 {

//alert(r_new);

d[0] = r_new;
d[1] = g_new;
d[2] = b_new;


  obCanvas.putImageData(imgData,x,y);

}
}



function mousemove(event){

}


$(function() {
		$( "#upload" ).dialog({
			autoOpen: false,
			width: 250,
			height: 100,
	});

	$( "#upload_computer" ).dialog({
			autoOpen: false,
			width: 450,
			height: 100,
	});

    $( "#upload_internet" ).dialog({
    		autoOpen: false,
			width: 750,
			height: 100,
	});

    $( "#new" ).dialog({
       	autoOpen: false,
			width: 350,
			height: 150,
	});

    $( "#rotate" ).dialog({
           autoOpen: false,
			width: 350,
			height: 150,
	});

    $( "#resize" ).dialog({
           autoOpen: false,
    		width: 350,
			height: 150,
	});

    $( "#text" ).dialog({
           autoOpen: false,
        	width: 350,
			height: 230,
	});

     $( "#clarity" ).dialog({
           autoOpen: false,
            width: 250,
			height: 130,
	});

     $( "#vdz" ).dialog({
           autoOpen: false,
            width: 800,
    		height: 600,
	});
///////////////////////////////////////////////

///////////////////////////////////////////////

var canvas = document.getElementById("draw"); //$("#draw")[0],
    context = canvas.getContext("2d"),
    video = $("#video")[0],
	videoObj = { "video": true },
   canvas.onmousemove = mousemove,
   canvas.onmouseup = doMouseUp,
	errBack = function(error) {
		console.log("Error: ", error.code);
	};

	// Подключение потока
	if(navigator.getUserMedia) {
		navigator.getUserMedia(videoObj, function(stream) {
			video.src = stream;
			video.play();
		}, errBack);
	} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
		navigator.webkitGetUserMedia(videoObj, function(stream){
			video.src = window.webkitURL.createObjectURL(stream);
			video.play();
		}, errBack);
	}

	// Получение и отправка изображения
$('#snap').click(function() {
    savec();
    $( "#vdz" ).dialog("close");
     context.drawImage(video, 0, 0, canvas.width, canvas.height);

	})
/////////////////////////////////////////

});



function vd(){
   $( "#upload" ).dialog("close");
  $( "#vdz" ).dialog("open");

}


function txt2() {
    zoom_cursor_undo('');
    $( "#text" ).dialog( "open" );
}

function opn() {
	$( "#upload" ).dialog( "open" );
}

function upload_computer(){
	$( "#upload" ).dialog( "close" );
	$( "#upload_computer" ).dialog( "open" );
}

function nw(){

	$( "#new" ).dialog( "open" );
}

function resize(){

    $( "#resize" ).dialog( "open" );
}

function upload_internet(){
    $( "#upload" ).dialog( "close" );
	$( "#upload_internet" ).dialog( "open" );
}

function doMouseUp(event) {
window.drag = 0;
}
function doMouseDown(event) {
window.drag = 1;

if (window.tp == 1){ //line

savec();
if (window.fl_line == 1){
window.fl_line = 0;
window.x2 = event.pageX - parseInt($("#draw").css("left"));
window.y2 = event.pageY-parseInt($("#draw").css("top"));
canvas = document.getElementById("draw");
var obCanvas = canvas.getContext('2d');
obCanvas.beginPath();
obCanvas.lineWidth = window.t;
obCanvas.strokeStyle = window.clr;
obCanvas.moveTo(window.x1,window.y1);
obCanvas.lineTo(window.x2,window.y2);
obCanvas.stroke();
 window.x1 = 0;
 window.y1 = 0;
 window.x2 = 0;
 window.y2 = 0;
 window.tp = 0;
 window.fl_line = 0;
 return;
}

if (window.fl_line == 0 ) {
 window.fl_line = 1;
 window.x1 = event.pageX-parseInt($("#draw").css("left"));
 window.y1 = event.pageY-parseInt($("#draw").css("top"));
 canvas = document.getElementById("draw");
 var obCanvas = canvas.getContext('2d');
 obCanvas.beginPath();
 obCanvas.strokeStyle = window.clr;
 obCanvas.arc(window.x1,window.y1,1,0,Math.PI*2,true);
 obCanvas.stroke();

}

}


if (window.tp == 2){ // broken line
savec();
if (window.fl_line == 1){

window.x2 = event.pageX - parseInt($("#draw").css("left"));
window.y2 = event.pageY-parseInt($("#draw").css("top"));
canvas = document.getElementById("draw");
var obCanvas = canvas.getContext('2d');
obCanvas.beginPath();
obCanvas.lineWidth = window.t;
obCanvas.strokeStyle = window.clr;
obCanvas.moveTo(window.x1,window.y1);
obCanvas.lineTo(window.x2,window.y2);
obCanvas.stroke();

window.x1 = window.x2;
window.y1 = window.y2;
window.x2 = 0;
window.y2 = 0;


}


if (window.fl_line == 0 ) {
 window.fl_line = 1;
 window.x1 = event.pageX-parseInt($("#draw").css("left"));
 window.y1 = event.pageY-parseInt($("#draw").css("top"));
 canvas = document.getElementById("draw");
 var obCanvas = canvas.getContext('2d');
 obCanvas.beginPath();
 obCanvas.strokeStyle = window.clr;
 obCanvas.arc(window.x1,window.y1,1,0,Math.PI*2,true);
 obCanvas.stroke();

}
}


if (window.tp == 3){ //rectangle
savec();
if (window.fl_line == 0 ) {
window.fl_line = 1;
window.x1 = event.pageX-parseInt($("#draw").css("left"));
window.y1 = event.pageY-parseInt($("#draw").css("top"));
canvas = document.getElementById("draw");
var obCanvas = canvas.getContext('2d');
obCanvas.beginPath();
obCanvas.strokeStyle = window.clr;
obCanvas.arc(window.x1,window.y1,1,0,Math.PI*2,true);
obCanvas.stroke();
return;
}


if (window.fl_line == 1){
window.x2 = event.pageX - parseInt($("#draw").css("left"));
window.y2 = event.pageY-parseInt($("#draw").css("top"));
var z = 0;
if (window.x2 < window.x1){
    z = window.x2;
    window.x2= window.x1;
    window.x1=z;
}

if (window.y2 < window.y1){
    z = window.y2;
    window.y2= window.y1;
    window.y1=z;
}

canvas = document.getElementById("draw");
var obCanvas = canvas.getContext('2d');
obCanvas.beginPath();
obCanvas.lineWidth = window.t;
obCanvas.strokeStyle = window.clr;
obCanvas.moveTo(window.x1,window.y1);
obCanvas.rect(window.x1,window.y1,window.x2-window.x1,window.y2-window.y1);
obCanvas.stroke();

window.x1 = 0;
window.y1 = 0;
window.x2 = 0;
window.y2 = 0;
window.tp = 0;
window.fl_line = 0;
}

}

if (window.tp == 4){ //circle
savec();
if (window.fl_line == 1){
window.fl_line = 0;
window.x2 = event.pageX - parseInt($("#draw").css("left"));
window.y2 = event.pageY-parseInt($("#draw").css("top"));
canvas = document.getElementById("draw");
var obCanvas = canvas.getContext('2d');
obCanvas.beginPath();
obCanvas.lineWidth = window.t;
obCanvas.strokeStyle = window.clr;
obCanvas.moveTo(window.x1,window.y1);
var r = Math.sqrt((window.x2-window.x1)*(window.x2-window.x1) + (window.y2-window.y1)*(window.y2-window.y1));
 obCanvas.arc(window.x1,window.y1,r,0,Math.PI*2,false);
obCanvas.stroke();
 window.x1 = 0;
 window.y1 = 0;
 window.x2 = 0;
 window.y2 = 0;
 window.tp = 0;
 window.fl_line = 0;
 return;
}

if (window.fl_line == 0 ) {
 window.fl_line = 1;
 window.x1 = event.pageX-parseInt($("#draw").css("left"));
 window.y1 = event.pageY-parseInt($("#draw").css("top"));
 canvas = document.getElementById("draw");
 var obCanvas = canvas.getContext('2d');
 obCanvas.beginPath();
 obCanvas.strokeStyle = window.clr;
 obCanvas.arc(window.x1,window.y1,1,0,Math.PI*2+0.3,true);
 obCanvas.stroke();

}

}


if (window.tp == 5){ //text
savec();
window.x1 = event.pageX - parseInt($("#draw").css("left"));
window.y1 = event.pageY-parseInt($("#draw").css("top"));
txt2('');
 return;
}



if (window.tp == 8){ //fill
//savec();

canvas = document.getElementById("draw");
var obc = canvas.getContext('2d');
imgData = obc.getImageData(event.pageX, event.pageY, 1, 1).data;
var R = imgData[0];
var G = imgData[1];
var B = imgData[2];
w = canvas.width;
h = canvas.height;
MyFill(event.pageX,event.pageY,R,G,B,255,255,255,w,h);

}

   //  }

//zoom_cursor_undo();
// window.x1 = 0;
// window.y1 = 0;
// window.x2 = 0;
// window.y2 = 0;
// window.tp = 0;
// window.fl_line = 0;
// return;
}
//}

$(document).ready(function() {
 window.fl_line = 0;
 window.x1 = 0;
 window.y1 = 0;
 window.x2 = 0;
 window.y2 = 0;
 window.t = 2;
 window.drag = 0;
 var canvas = $("#draw")[0];
 canvas.addEventListener('mousedown', doMouseDown, false);
 window.tp = 0;
 window.clr = "black";
savec();
});

function greyscale(arg){
savec();

canvas = document.getElementById("draw");
var obCanvas = canvas.getContext('2d');
var imageData = obCanvas.getImageData(0, 0, canvas.width, canvas.height);
var d = imageData.data;
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      d[i] = d[i + 1] = d[i + 2] = (r+g+b)/3;
    }
obCanvas.putImageData(imageData, 0, 0);
}


function serpia(arg){
savec();

canvas = document.getElementById("draw");
var obCanvas = canvas.getContext('2d');
var imageData = obCanvas.getImageData(0, 0, canvas.width, canvas.height);
var d = imageData.data;
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      d[i]     = (r * 0.393)+(g * 0.769)+(b * 0.189); // red
      d[i + 1] = (r * 0.349)+(g * 0.686)+(b * 0.168); // green
      d[i + 2] = (r * 0.272)+(g * 0.534)+(b * 0.131); // blue
    }
obCanvas.putImageData(imageData, 0, 0);
}

function to_red(arg){
savec();

canvas = document.getElementById("draw");
var obCanvas = canvas.getContext('2d');
var imageData = obCanvas.getImageData(0, 0, canvas.width, canvas.height);
var d = imageData.data;
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      d[i] = (r+g+b)/3;        // apply average to red channel
      d[i + 1] = d[i + 2] = 0; // zero out green and blue channel
    }
obCanvas.putImageData(imageData, 0, 0);
}

function brightens(arg, delta){
savec();
$("#undo").innerHTML = document.getElementById("draw").toDataURL();
canvas = document.getElementById("draw");
var obCanvas = canvas.getContext('2d');
var imageData = obCanvas.getImageData(0, 0, canvas.width, canvas.height);
var d = imageData.data;

    for (var i = 0; i < d.length; i += 4) {
          d[i] += delta;     // red
          d[i + 1] += delta; // green
          d[i + 2] += delta; // blue
        }
obCanvas.putImageData(imageData, 0, 0);
}

function sv(){
    savec();
    var data = document.getElementById("draw").toDataURL();
    var iDiv = document.createElement('div');
    iDiv.id = 'wait';
    iDiv.style="position: absolute; left: 850 px; 	top: 350px; z-index: 0; ";
    iDiv.innerHTML = '<img src = /static/images/wait.gif>';

    document.getElementsByTagName('body')[0].appendChild(iDiv);

    $.post("/save/", {
	imageData : data
    }, function(data) {
	$("#wait").remove();
    savec();
    });
}

function save_as(){
    var data = document.getElementById("draw").toDataURL();
    var data = document.getElementById("draw").toDataURL();
    var iDiv = document.createElement('div');
    iDiv.id = 'wait';
    iDiv.style="position: absolute; left: 850 px;     top: 350px; z-index: 0; ";
    iDiv.innerHTML = '<img src = /static/images/wait.gif>';

    document.getElementsByTagName('body')[0].appendChild(iDiv);

    $.post("/save/", {
    imageData : data
    }, function(data) {
    $("#wait").remove();
    savec();
	document.location.href='/save_as';
    });
}

function savec(){
    var data = document.getElementById("draw").toDataURL();
    $.post("/saved/", {
	imageData : data
    }, function(data) {
        hh =1;
        //alert(3);
//	$("#wait").remove();
    });
}
function undo(){
document.location.href="/undo";
}

function rotor(){
savec();
   $( "#rotate" ).dialog( "open" );
}

function resize(){
savec();
   $( "#resize" ).dialog( "open" );
}

function txt3(){
 var f = $( "#font" ).val();
 var s = $( "#stroke").is(':checked');
 var tx = document.getElementById('txt4').value;
 var sz= $("#sz").val();
 var f4 = $("#ff").val();
 $( "#text" ).dialog( "close" );
 ctx.fillStyle = window.clr;//"#00F";
 ctx.strokeStyle = window.clr; // "#F00";
 ff="";
 ff += f4;
 ff +=" ";
 ff +=sz;
 ff +="pt ";
 ff += f;
 ctx.font = ff;
 if (s == false){
ctx.fillText(tx, window.x1, window.y1);
}
else {
 ctx.strokeText(tx, window.x1, window.y1);
}
window.x1=0;
window.y1=0;

}


function exposure(arg){
savec();
$( "#clarity" ).dialog('close');
var p = $( "#step" ).val();
var data = document.getElementById("draw").toDataURL();
var iDiv = document.createElement('div');
iDiv.id = 'wait';
iDiv.style="position: absolute; left: 850 px;     top: 350px; z-index: 0; ";
iDiv.innerHTML = '<img src = /static/images/wait.gif>';
document.getElementsByTagName('body')[0].appendChild(iDiv);

$.post("/exposure/", {
    imageData : data,
    step: p,
    }, function(data) {
 $("#wait").remove();
    });
}


function invert(){
savec();

canvas = document.getElementById("draw");
var obCanvas = canvas.getContext('2d');
var imageData = obCanvas.getImageData(0, 0, canvas.width, canvas.height);
var d = imageData.data;
    for (var i = 0; i < d.length; i += 4) {

      d[i]     = 255-d[i]; // red
      d[i + 1] = 255-d[i+1]; // green
      d[i + 2] = 255-d[i+2]; // blue
    }

obCanvas.putImageData(imageData, 0, 0);
}


function noise(){
savec();

canvas = document.getElementById("draw");
var obCanvas = canvas.getContext('2d');
var imageData = obCanvas.getImageData(0, 0, canvas.width, canvas.height);
var d = imageData.data;
var rr = 0;
var k = 0;
    for (var i = 0; i < d.length; i += 4) {
        k +=1;
        if (k > 37){
            k=0;
            rr = Math.random();
        }
        if (rr<0.025){
    if (Math.random() < 0.09){
      d[i]     = 0; // red
      d[i + 1] = 0; // green
      d[i + 2] = 0; // blue
    }
    }}

obCanvas.putImageData(imageData, 0, 0);
}

function zoom_cursor(){
    document.body.style.cursor = "url('http://oskolki1.pythonanywhere.com/static/images/zoom.ico'), default" ;
}

function zoom_cursor_undo(){
    document.body.style.cursor = "auto";
}
//function select(arg){
 //   ar = $("css3button");
 //   for (var i = 0; i < ar.length; i++) {
  //  ar[i].style("background: green");
//       n += i
//}

//}