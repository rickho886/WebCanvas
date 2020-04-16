var colorBlock = document.getElementById('color-block');
var ctx1 = colorBlock.getContext('2d');
var width1 = colorBlock.width;
var height1 = colorBlock.height;

var colorStrip = document.getElementById('color-strip');
var ctx2 = colorStrip.getContext('2d');
var width2 = colorStrip.width;
var height2 = colorStrip.height;

var colorLabel = document.getElementById('color-label');
var colorInput = document.getElementById("color-input");
var colorPicker = document.getElementById("color-picker");
var x = 0;
var y = 0;
var drag = false;
var rgbaColor = 'rgba(0,0,0,1)';

var canvas = document.getElementById("mycanvas");
var context = canvas.getContext("2d");
var brushButton = document.getElementById('brush');
var eraserButton = document.getElementById('eraser');
var downloadButton = document.getElementById('download');
var textButton = document.getElementById('textInput');
var rectButton = document.getElementById('rect');
var circleButton = document.getElementById('circle');
var imageLoader = document.getElementById('uploadImage');
var triButton = document.getElementById('tri');
var lineButton = document.getElementById('line');
var magButton = document.getElementById('magnifier');
var undoButton = document.getElementById('undo');
var redoButton = document.getElementById('redo');
var checkbox = document.querySelector('input[type="checkbox"]');
var curColor = document.getElementById('flatSpectrum');
var resetButton = document.getElementById('reset');
var virtualTextLocation = document.getElementById('virtualText');
var bodyCursor = document.getElementById('bigbody');
var fontSize = document.getElementById("select-size");
var fontType = document.getElementById("select-font");
var step = -1;
var canvasStep = [];
var mode = "pen";
var radius = 1;
var startX;
var startY;
var lastX;
var lastY;
var storeImg = new Image();
var dragging = false;
var fillMode;
var zoom = document.getElementById("zoom");
var zoomCtx = zoom.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 70;
context.lineWidth = radius*2; 

ctx1.rect(0, 0, width1, height1);
fillGradient();

ctx2.rect(0, 0, width2, height2);
var grd1 = ctx2.createLinearGradient(0, 0, 0, height1);
grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
ctx2.fillStyle = grd1;
ctx2.fill();

function click(e) {
  x = e.offsetX;
  y = e.offsetY;
  var imageData = ctx2.getImageData(x, y, 1, 1).data;
  rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  fillGradient();
}

function fillGradient() {
  ctx1.fillStyle = rgbaColor;
  ctx1.fillRect(0, 0, width1, height1);

  var grdWhite = ctx2.createLinearGradient(0, 0, width1, 0);
  grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
  grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
  ctx1.fillStyle = grdWhite;
  ctx1.fillRect(0, 0, width1, height1);

  var grdBlack = ctx2.createLinearGradient(0, 0, 0, height1);
  grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
  grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
  ctx1.fillStyle = grdBlack;
  ctx1.fillRect(0, 0, width1, height1);
}

function mousedown(e) {
  drag = true;
  changeColor(e);
}

function mousemove(e) {
  if (drag) {
    changeColor(e);
  }
}

function mouseup(e) {
  drag = false;
}

function changeColor(e) {
  x = e.offsetX;
  y = e.offsetY;
  var imageData = ctx1.getImageData(x, y, 1, 1).data;
  rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  colorLabel.style.backgroundColor = rgbaColor;
}

colorStrip.addEventListener("click", click, false);

colorBlock.addEventListener("mousedown", mousedown, false);
colorBlock.addEventListener("mouseup", mouseup, false);
colorBlock.addEventListener("mousemove", mousemove, false);

colorInput.addEventListener('change', function() {
    if(colorInput.checked == true) {
        colorPicker.style.left = 545;
    } else {
        colorPicker.style.left = -400;
    }
    
})

function changeCursor() {
    if(mode == "pen") {
        bodyCursor.style.cursor = "url('image/brush.png') 0 20, auto"; 
    } else if(mode == "eraser") {
        bodyCursor.style.cursor = "url('image/eraser.png') 0 20, auto"; 
    } else if(mode == "rect" || mode == "circle" || mode == "tri" || mode == "line") {
        bodyCursor.style.cursor = "crosshair"; 
    } else if(mode == "textInput") {
        bodyCursor.style.cursor = "text"; 
    } else if(mode == "magnifier") {
        bodyCursor.style.cursor = "url('image/magnifier.png') 0 20, auto";
    } else {
        bodyCursor.style.cursor = "default"; 
    }
}

function downloadImage() {
    var link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = "image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img,0,0);
            context.lineWidth = radius*2; 
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]); 
    storeCanvas();
}

function resetFunction() {
    if(confirm("Are you sure want to reset?")) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        storeCanvas();
    }
}

function storeCanvas() {
    step++;
    canvasStep.length = step + 1;
    canvasStep[step] = canvas.toDataURL();
}

document.onkeydown = function(event) {
    var key_code = event.keyCode;
    virtualTextLocation.style.fontSize = fontSize.value + "px";
    if(key_code == 13 && mode == "textInput") {
        var String = virtualTextLocation.value;
        context.font =  fontSize.value + "px " + fontType.value;
        context.fillStyle = rgbaColor;
        context.strokeStyle = rgbaColor;
        context.fillText(String, lastX, lastY, 1000);
        virtualTextLocation.style.left = -300;
        virtualTextLocation.style.top = -300;
        virtualTextLocation.value = "";
        storeCanvas();
    } else if(key_code == 27){
        context.fillStyle = rgbaColor;
        context.strokeStyle = rgbaColor;
        virtualTextLocation.style.left = -300;
        virtualTextLocation.style.top = -300;
        virtualTextLocation.value = "";
    }
}

var putPoint = function(e) {
    if(dragging) {
        if(mode != "textInput") {
            virtualTextLocation.style.left = -300;
            virtualTextLocation.style.top = -300;
            virtualTextLocation.value = "";
        }
        changeCursor();
        if(mode == "pen" || mode == "eraser") {
            context.globalCompositeOperation= (mode == "pen") ? "source-over" : "destination-out";
            context.fillStyle = rgbaColor;
            context.strokeStyle = rgbaColor;
            context.lineTo(e.offsetX, e.offsetY);
            context.stroke();
            context.beginPath();
            context.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2);
            context.fill();
            context.beginPath();
            context.moveTo(e.offsetX, e.offsetY);
        } else {
            lastX = e.offsetX - startX;
            lastY = e.offsetY - startY;
            context.globalCompositeOperation = "source-over";
            canvas.width = canvas.width;
            context.drawImage(storeImg, 0, 0);
            context.lineWidth = radius*2; 
            context.fillStyle = rgbaColor;
            context.strokeStyle = rgbaColor;
            if(mode == "rect") {
                if(fillMode)
                    context.fillRect(startX, startY, lastX, lastY);
                else
                    context.strokeRect(startX, startY, lastX, lastY);
            } else if(mode == "circle") {
                context.arc(startX, startY, Math.sqrt(Math.pow(lastX, 2) + Math.pow(lastY, 2)), 0, Math.PI * 2, true);
                if(fillMode)
                    context.fill();
                else
                    context.stroke();
            } else if(mode == "tri") {
                context.moveTo(startX + ((lastX) / 2), startY)
                context.lineTo(e.offsetX, e.offsetY)
                context.lineTo(e.offsetX - (lastX), e.offsetY)
                context.closePath()
                if(fillMode)
                    context.fill()
                else
                    context.stroke()
            } else if(mode == "line") {
                context.beginPath();
                context.moveTo(startX, startY);
                context.lineTo(e.offsetX, e.offsetY);
                context.stroke();
                context.closePath();
            } else if(mode == "textInput") {
                var mouseX = e.offsetX + 100;
                var mouseY = e.offsetY + 60;
                lastX = mouseX - 100;
                lastY = mouseY - 50;
                virtualTextLocation.style.left = mouseX;
                virtualTextLocation.style.top = mouseY;
            }
        }
    }
    if(mode == "magnifier") {
        zoomCtx.fillStyle = "white";
        zoomCtx.fillRect(0,0, zoom.width, zoom.height);
        zoomCtx.drawImage(canvas, e.offsetX, e.offsetY, 200, 100, 0,0, 400, 200);
        zoom.style.top = e.pageY + 10 + "px"
        zoom.style.left = e.pageX + 10 + "px"
        zoom.style.display = "block";
    }
}

var engage = function(e) {
    dragging = true;
    virtualTextLocation.style.fontSize = fontSize.value + "px";
    startX = e.offsetX;
    startY = e.offsetY;
    storeImg.src = canvas.toDataURL();
    if(colorInput.checked == true) {
        colorInput.checked = false;
        colorPicker.style.left = -400;
    }
}

var disengage = function(e) {
    if(mode != "magnifier") {
        storeCanvas();
    }
    dragging = false;
    context.beginPath();
}

var outofrange = function() {
    zoom.style.display = "none";
    if(dragging == true && mode != "magnifier") {
        dragging = false;
        storeCanvas();
    }
    context.beginPath();
}

var setRadius = function(newRadius) {
    radius = newRadius;
    context.lineWidth = radius*2;
}

brushButton.addEventListener('click', function() {
    mode = "pen";
    changeCursor();
    
});

eraserButton.addEventListener('click', function() {
    mode = "eraser";
    changeCursor();
});

textButton.addEventListener('click', function() {
    mode = "textInput";
    changeCursor();
});

rectButton.addEventListener('click', function() {
    mode = "rect";
    changeCursor();
});

circleButton.addEventListener('click', function() {
    mode = "circle";
    changeCursor();
});

triButton.addEventListener('click', function() {
    mode = "tri";
    changeCursor();
});

lineButton.addEventListener('click', function() {
    mode = "line";
    changeCursor();
});

magButton.addEventListener('click', function() {
    mode = "magnifier";
    changeCursor();
});

redoButton.addEventListener('click', function() {
    if (step < canvasStep.length - 1) {
        step++;
        let canImg = new Image()
        canImg.src = canvasStep[step]
        canImg.onload = function () {
            canvas.height = canvas.height;
            context.drawImage(canImg, 0, 0);
            context.lineWidth = radius*2;
        }
    }
});

undoButton.addEventListener('click', function() {
    if (step > 0) {
        step--;
        let canImg = new Image()
        canImg.src = canvasStep[step]
        canImg.onload = function () {
            canvas.height = canvas.height;
            context.drawImage(canImg, 0, 0);
            context.lineWidth = radius*2;
        }
    }
    else {
        step = -1;
        canvas.height = canvas.height;
        context.lineWidth = radius*2;
    }
});

checkbox.addEventListener('change', function (e) {
    fillMode = this.checked;
});

canvas.addEventListener('mouseup', disengage);
canvas.addEventListener('mouseout', outofrange);
canvas.addEventListener('mousemove', putPoint);
canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousedown', putPoint);

downloadButton.addEventListener('click', downloadImage);
imageLoader.addEventListener('change', handleImage, false);
resetButton.addEventListener('click', resetFunction);

