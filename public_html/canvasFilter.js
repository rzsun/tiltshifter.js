
var imageObj = new Image();
imageObj.src = "demo.jpg";
imageObj.onload = initializeCanvas;

function initializeCanvas() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    canvas.height = imageObj.height;
    canvas.width = imageObj.width;
    context.drawImage(imageObj, 0, 0);
    var originalData = context.getImageData(0, 0, imageObj.width, imageObj.height);
    var blurredData = context.getImageData(0, 0, imageObj.width, imageObj.height);
    boxBlur(blurredData.data, imageObj.width, imageObj.height, 1);
    mergeBlur(originalData.data, blurredData.data, imageObj.width, imageObj.height, 30);
    boxBlur(blurredData.data, imageObj.width, imageObj.height, 1);
    mergeBlur(originalData.data, blurredData.data, imageObj.width, imageObj.height, 40);
    boxBlur(blurredData.data, imageObj.width, imageObj.height, 2);
    mergeBlur(originalData.data, blurredData.data, imageObj.width, imageObj.height, 50);
    boxBlur(blurredData.data, imageObj.width, imageObj.height, 2);
    mergeBlur(originalData.data, blurredData.data, imageObj.width, imageObj.height, 60);
    context.putImageData(originalData, 0, 0);
}

function boxBlur(inputData, imageWidth, imageHeight, radius) {
    for (var i = 0; i < imageWidth; i++) {
        for (var j = 0; j < imageHeight; j++) {
            totalRed = 0;
            totalGreen = 0;
            totalBlue = 0;
            for (var ki = -radius; ki <= radius; ki++) {
                if (i + ki > imageWidth - 1) {
                    totalRed += inputData[(imageWidth * j + imageWidth - 1) * 4];
                    totalGreen += inputData[(imageWidth * j + imageWidth - 1) * 4 + 1];
                    totalBlue += inputData[(imageWidth * j + imageWidth - 1) * 4 + 2];
                }
                else if (i + ki < 0) {
                    totalRed += inputData[imageWidth * j * 4];
                    totalGreen += inputData[imageWidth * j * 4 + 1];
                    totalBlue += inputData[imageWidth * j * 4 + 2];
                } else {
                    totalRed += inputData[(imageWidth * j + i + ki) * 4];
                    totalGreen += inputData[(imageWidth * j + i + ki) * 4 + 1];
                    totalBlue += inputData[(imageWidth * j + i + ki) * 4 + 2];
                }
            }
            inputData[(imageWidth * j + i) * 4] = totalRed / (radius * 2 + 1);
            inputData[(imageWidth * j + i) * 4 + 1] = totalGreen / (radius * 2 + 1);
            inputData[(imageWidth * j + i) * 4 + 2] = totalBlue / (radius * 2 + 1);
        }
    }
    for (var j = 0; j < imageHeight; j++) {
        for (var i = 0; i < imageWidth; i++) {
            totalRed = 0;
            totalGreen = 0;
            totalBlue = 0;
            for (var kj = -radius; kj <= radius; kj++) {
                if (j + kj > imageHeight - 1) {
                    totalRed += inputData[(imageWidth * (imageHeight - 1) + i) * 4];
                    totalGreen += inputData[(imageWidth * (imageHeight - 1) + i) * 4 + 1];
                    totalBlue += inputData[(imageWidth * (imageHeight - 1) + i) * 4 + 2];
                }
                else if (j + kj < 0) {
                    totalRed += inputData[i * 4];
                    totalGreen += inputData[i * 4 + 1];
                    totalBlue += inputData[i * 4 + 2];
                }
                else {
                    totalRed += inputData[(imageWidth * (j + kj) + i) * 4];
                    totalGreen += inputData[(imageWidth * (j + kj) + i) * 4 + 1];
                    totalBlue += inputData[(imageWidth * (j + kj) + i) * 4 + 2];
                }
            }
            inputData[(imageWidth * j + i) * 4] = totalRed / (radius * 2 + 1);
            inputData[(imageWidth * j + i) * 4 + 1] = totalGreen / (radius * 2 + 1);
            inputData[(imageWidth * j + i) * 4 + 2] = totalBlue / (radius * 2 + 1);
        }
    }
}

function mergeBlur(mergedData, originalData, imageWidth, imageHeight, radius, offset) {
    for (var j = 0; j < imageHeight; j++) {
        if(j > imageHeight/2 + radius * 2 || j < imageHeight/2 - radius * 2)
            blendHeight(j, 1);
        else if(j > imageHeight/2 + radius * 1.9 || j < imageHeight/2 - radius * 1.9)
            blendHeight(j, 0.9);
        else if(j > imageHeight/2 + radius * 1.8 || j < imageHeight/2 - radius * 1.8)
            blendHeight(j, 0.8);
        else if(j > imageHeight/2 + radius * 1.7 || j < imageHeight/2 - radius * 1.7)
            blendHeight(j, 0.7);
        else if(j > imageHeight/2 + radius * 1.6 || j < imageHeight/2 - radius * 1.6)
            blendHeight(j, 0.6);
        else if(j > imageHeight/2 + radius * 1.5 || j < imageHeight/2 - radius * 1.5)
            blendHeight(j, 0.5);
        else if(j > imageHeight/2 + radius * 1.4 || j < imageHeight/2 - radius * 1.4)
            blendHeight(j, 0.4);
        else if(j > imageHeight/2 + radius * 1.3 || j < imageHeight/2 - radius * 1.3)
            blendHeight(j, 0.3);
        else if(j > imageHeight/2 + radius * 1.2 || j < imageHeight/2 - radius * 1.2)
            blendHeight(j, 0.2);
        else if(j > imageHeight/2 + radius * 1.1 || j < imageHeight/2 - radius * 1.1)
            blendHeight(j, 0.1);
    }
    
    function blendHeight(j, opacity) {
        function blend(layer1, layer2) {
            return (layer1 * opacity * 2 + layer2 * (2 - opacity * 2)) / 2;
        }
        for (var i = 0; i < imageWidth; i++) {
            mergedData[((imageWidth * j + i)) * 4] = blend(originalData[((imageWidth * j + i)) * 4],
                    mergedData[((imageWidth * j + i)) * 4]);
            mergedData[((imageWidth * j + i)) * 4 + 1] = blend(originalData[((imageWidth * j + i)) * 4 + 1],
                    mergedData[((imageWidth * j + i)) * 4 + 1]);
            mergedData[((imageWidth * j + i)) * 4 + 2] = blend(originalData[((imageWidth * j + i)) * 4 + 2],
                    mergedData[((imageWidth * j + i)) * 4 + 2]);
        }
    }
}