### How to use 

    Below is a gif that shows how to operator the web canvas.
![first](https://raw.githubusercontent.com/rickho886/WebCanvas/refs/heads/master/readme%20image/assignment01.gif)

| **Button** | **Name** | **Feature** |
| :----: | :-------: | :-------
|![](https://raw.githubusercontent.com/rickho886/WebCanvas/refs/heads/master/image/brush.png)|Brush| Press left click mouse to start draw on canvas based on cursor position|
|![](https://raw.githubusercontent.com/rickho886/WebCanvas/refs/heads/master/image/eraser.png)|Eraser| Press left click mouse to start erase canvas based on cursor position | 
|![](https://raw.githubusercontent.com/rickho886/WebCanvas/refs/heads/master/image/text.png)|Text| Press left click mouse to show textbox on canvas to input text based on cursor position
|![](https://raw.githubusercontent.com/rickho886/WebCanvas/refs/heads/master/image/rectangle.png)|Rectangle| Press left click mouse to start draw rectangle on canvas
|![](https://raw.githubusercontent.com/rickho886/WebCanvas/refs/heads/master/image/circle.png)|Circle| Press left click mouse to start draw circle on canvas   |
|![](https://raw.githubusercontent.com/rickho886/WebCanvas/refs/heads/master/image/triangle.png)|Triangle| Press left click mouse to start draw triangle on canvas       |
|![](https://raw.githubusercontent.com/rickho886/WebCanvas/refs/heads/master/image/line.png)|Line| Press left click mouse to start draw line on canvas       |
|![](https://raw.githubusercontent.com/rickho886/WebCanvas/refs/heads/master/image/magnifier.png)|Magnifier| Direct mouse to desired enlarge image position |
|![](https://raw.githubusercontent.com/rickho886/WebCanvas/refs/heads/master/image/undo.png)|Undo| Return to previous saved canvas |
|![](https://raw.githubusercontent.com/rickho886/WebCanvas/refs/heads/master/image/redo.png)|Redo| Return to next saved canvas       |
|![](https://raw.githubusercontent.com/rickho886/WebCanvas/refs/heads/master/image/reset.png)|Reset| Clear the canvas       |
|![](https://raw.githubusercontent.com/rickho886/WebCanvas/refs/heads/master/image/download.png)|Download| Store the canvas image to local path      |
|![](https://raw.githubusercontent.com/rickho886/WebCanvas/refs/heads/master/image/upload.png)|Upload| Upload image to canvas       |
        


### Function description

* **Magnifier** <br>

Create a small canvas filled with zoomed-in main canvas image and the small canvas moves to cursor position. <br>

    if(mode == "magnifier") {
        zoomCtx.fillStyle = "white";
        zoomCtx.fillRect(0,0, zoom.width, zoom.height);
        zoomCtx.drawImage(canvas, e.offsetX, e.offsetY, 200, 100, 0,0, 400, 200);
        zoom.style.top = e.pageY + 10 + "px"
        zoom.style.left = e.pageX + 10 + "px"
        zoom.style.display = "block";
    }
    
![first](https://raw.githubusercontent.com/rickho886/WebCanvas/refs/heads/master/readme%20image/magnifier.gif)

* **Fill** <br>

In order to fill shape, I directly use the function provided by javascript.

    context.fillRect(startX, startY, lastX, lastY); // for rectangle
    context.fill(); // for circle and triangle

![first](https://raw.githubusercontent.com/rickho886/WebCanvas/refs/heads/master/readme%20image/fill.gif)

### Gitlab page link

[https://107062361.gitlab.io/AS_01_WebCanvas](https://107062361.gitlab.io/AS_01_WebCanvas)
