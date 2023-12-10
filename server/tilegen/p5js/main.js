// your-script.js
let zoomFactor = 20;
let keysDown = {};
let gridSize = 80;
let canvasSize = {'width':1000, 'height':1000}
function setup() {
    createCanvas(canvasSize.width, canvasSize.height);
    matrix = [];
    for (let y = 0; y < gridSize;y++){
        let yArray = [];
        for (let x = 0; x < gridSize;x++){
            let noiseValue = noise(x / zoomFactor, y / zoomFactor);
            yArray.push(noiseValue)
        }
        matrix.push(yArray)
    }
    window.addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e){
        delete keysDown[e.keyCode];
    }, false);




}
let tileSize = 25;
let camera = {'x':0, 'y':0};
let cameraSpeed = 7;
function draw() {
    background(10);
    if (keysDown['68'] && camera.x + canvasSize.width < tileSize * gridSize *  1.3){
        camera.x += cameraSpeed ;
    }
    if (keysDown['65'] && camera.x > -400){
        camera.x -= cameraSpeed;
    }
    if (keysDown['83'] && camera.y + canvasSize.height < tileSize * gridSize * 1.3){
        camera.y += cameraSpeed;
    }
    if (keysDown['87'] && camera.y > -400){
        camera.y -= cameraSpeed;
    }
    let zoom = 25;
    if (keysDown['32']){
        tileSize += 1;
        camera.y += zoom;
        camera.x += zoom;
    }
    if (keysDown['17']){
        tileSize -= 1;
        camera.y -= zoom;
        camera.x -= zoom;
    }

    matrix.forEach(function (row, y){
        row.forEach(function (tile, x){
            let c;
            if (tile > 0.70){
                c = color(150 * tile, 150 * tile, 150 * tile);
            }else if (tile > 0.45){
                c = color(100 * tile, 255 * tile, 100 * tile);
            }else if (tile > 0.43){
                c = color(255 * tile*1.5, 255 * tile*1.5, 200 * tile*1.5);
            } else {
                c = color(100 * tile, 100 * tile, 255 * tile);
            }
            fill(c);
            noStroke();
            rect( (tileSize*x) - camera.x, (tileSize*y) - camera.y, tileSize, tileSize);
        })
    })
}
