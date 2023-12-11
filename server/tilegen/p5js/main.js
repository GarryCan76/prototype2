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
let zoom = 0;
let tileSize = 40;
let camera = {'x':0, 'y':0};
let cameraSpeed = 1;
let space = false;
let ctrl = false;
function draw() {
    background(10);
    if (keysDown['68'] && camera.x + canvasSize.width < tileSize  + canvasSize.width + 16){
        camera.x += cameraSpeed ;
    }
    if (keysDown['65'] && camera.x > -1){
        camera.x -= cameraSpeed;
    }
    if (keysDown['83'] && camera.y + canvasSize.height < tileSize  + canvasSize.height + 16){
        camera.y += cameraSpeed;
    }
    if (keysDown['87'] && camera.y > -1){
        camera.y -= cameraSpeed;
    }
    console.log(keysDown['32'])
    if (keysDown['32'] && space !== true){
        tileSize += 1;
        space = true;
    }else if (space){
        space = false;
    }
    if (keysDown['17'] && ctrl !== true){
        tileSize -= 1;
        ctrl = true;
    }else if (ctrl){
        ctrl = false;
    }
    let viewSize = canvasSize.width / tileSize;
    // console.log(canvasSize.width / tileSize)
    for (let y = 0; y < viewSize;y++){
        for (let x = 0; x < viewSize;x++){
            try{
                if (matrix[y + camera.y][x + camera.x]){
                    let c;
                    let tile = matrix[y + camera.y][x + camera.x];
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
                    rect( (tileSize*x), (tileSize*y), tileSize, tileSize);
                }
            }catch (hands){

            }
        }
    }
}
