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

    var originalData = context.getImageData(0, 0, imageObj.width, imageObj.height);
    var modifiedData = context.getImageData(0, 0, imageObj.width, imageObj.height);
    boxBlur(modifiedData.data, imageObj.width, imageObj.height, 10);
    applyMask(modifiedData.data, originalData.data);
    context.putImageData(modifiedData, 0, 0);
};

function boxBlur(inputData, imageWidth, imageHeight, radius) {
    for (var i = radius; i < imageWidth - radius; i++) {
        for (var j = 0; j < imageHeight; j++) {
            totalRed = 0;
            totalGreen = 0;
            totalBlue = 0;
            for (var ki = -radius; ki <= radius; ki++) {
                totalRed += inputData[((imageWidth * j + i + ki)) * 4];
                totalGreen += inputData[((imageWidth * j + i + ki)) * 4 + 1];
                totalBlue += inputData[((imageWidth * j + i + ki)) * 4 + 2];
            }
            inputData[((imageWidth * j + i)) * 4] = totalRed / (radius * 2 + 1);
            inputData[((imageWidth * j + i)) * 4 + 1] = totalGreen / (radius * 2 + 1);
            inputData[((imageWidth * j + i)) * 4 + 2] = totalBlue / (radius * 2 + 1);
        }
    }
    for (var j = radius; j < imageHeight - radius; j++) {
        for (var i = 0; i < imageWidth; i++) {
            totalRed = 0;
            totalGreen = 0;
            totalBlue = 0;
            for (var kj = -radius; kj <= radius; kj++) {
                totalRed += inputData[((imageWidth * (j + kj) + i)) * 4];
                totalGreen += inputData[((imageWidth * (j + kj) + i)) * 4 + 1];
                totalBlue += inputData[((imageWidth * (j + kj) + i)) * 4 + 2];
            }
            inputData[((imageWidth * j + i)) * 4] = totalRed / (radius * 2 + 1);
            inputData[((imageWidth * j + i)) * 4 + 1] = totalGreen / (radius * 2 + 1);
            inputData[((imageWidth * j + i)) * 4 + 2] = totalBlue / (radius * 2 + 1);
        }
    }
}

function applyMask(mergedData, originalData) {
    for (var i = 0; i < mergedData.length; i += 4) {
        mergedData[i] = (mergedData[i] + originalData[i])/2;
        mergedData[i + 1] = (mergedData[i + 1] + originalData[i + 1])/2;
        mergedData[i + 2] = (mergedData[i + 2] + originalData[i + 2])/2;
    }
}

