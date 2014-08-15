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
    
    for (var i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = 255 - imageData.data[i];
        imageData.data[i + 1] = 255 - imageData.data[i + 1];
        imageData.data[i + 2] = 255 - imageData.data[i + 2];
    }
    imageData.data = boxBlur(imageData.data, imageObj.width, imageObj.height, 10)
    context.putImageData(imageData, 0, 0);
};

function boxBlur(inputData, imageWidth, imageHeight, radius) {
    var newData = inputData;
    for(var i = 0; i < imageWidth; i++) {
        for(var j = 0; j < imageHeight; j++) {
            totalRed = 0;
            totalGreen = 0;
            totalBlue = 0;
            for (var ki = -radius; ki <= radius; ki++) {
                totalRed += inputData[((imageWidth * j + i)) * 4];
                totalGreen += inputData[((imageWidth * j + i)) * 4 + 1];
                totalBlue += inputData[((imageWidth * j + i)) * 4 + 2];
            }
            newData[((imageWidth * j + i)) * 4] = totalRed/(radius * 2 + 1);
            newData[((imageWidth * j + i)) * 4 + 1] = totalGreen/(radius * 2 + 1);
            newData[((imageWidth * j + i)) * 4 + 2] = totalBlue/(radius * 2 + 1);
        }
    }
    
}