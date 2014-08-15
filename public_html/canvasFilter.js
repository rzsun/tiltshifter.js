//set canvas and context, image and image src
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var imageObj = new Image();
imageObj.src = "demo.png";

imageObj.onload = function() {
    //draw image
    canvas.height = imageObj.height;
    canvas.width = imageObj.width;
    context.drawImage(imageObj, 0, 0);
    
    var imageData = context.getImageData(0, 0, imageObj.width, imageObj.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }
    context.putImageData(imageData, 0, 0);
};

