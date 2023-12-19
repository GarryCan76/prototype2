// your-script.js
let zoomFactor = 20;
let keysDown = {};
let gridSize = 80;
let canvasSize = {'width':1000, 'height':1000}
let layer = [];

//defining resources
let resources = {
    'water':{'cords':Math.floor(Math.random() * 10000), 'zoom': 20, 'cutOff':0.5},
    'copper':{'cords':Math.floor(Math.random() * 10000), 'zoom': 7, 'color':[255, 100, 50], 'cutOff':0.60, 'abundance': 1.5},
    'gold':{'cords':Math.floor(Math.random() * 10000), 'zoom': 5, 'color':[255, 255, 100], 'cutOff':0.7, 'abundance': 0.5},
    'noise':{'cords':Math.floor(Math.random() * 10000), 'zoom': 2, 'color':[255, 255, 255], 'cutOff':0, 'abundance': 1}
}
console.log(resources)
function setup() {
    createCanvas(canvasSize.width, canvasSize.height);
    matrix = [];
    for (let y = 0; y < gridSize;y++){
        let yArray = [];
        for (let x = 0; x < gridSize;x++){
            let tileResources = {};
            Object.keys(resources).forEach(resource=>{
                if (resources[resource].color){
                    tileResources[resource] = {'val':noise((resources[resource].cords + x) / resources[resource].zoom, (resources[resource].cords + y) / resources[resource].zoom), 'color':resources[resource].color, 'cutOff':resources[resource].cutOff, 'abundance':resources[resource].abundance}
                }else {
                    tileResources[resource] = {'val':noise((resources[resource].cords + x) / resources[resource].zoom, (resources[resource].cords + y) / resources[resource].zoom)}
                }
            })
            yArray.push(tileResources)
        }
        matrix.push(yArray)
    }
    window.addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e){
        delete keysDown[e.keyCode];
    }, false);

    console.log(Object.keys(matrix[0][0]))
    console.log(matrix)
    Object.keys(matrix[0][0]).forEach(key=>{
        layer.push(key)
    })
}

let zoom = 10;
let tileSize = 20;
let camera = {'x':0, 'y':0};
let cameraSpeed = 1;
let zoomSpeed = 10;
let space = true;
let ctrl = false;
let viewIndex = 0;
function draw() {
    background(10);
    if (keysDown['68'] && gridSize > camera.x + zoom){
        camera.x += cameraSpeed ;
    }
    if (keysDown['65'] && camera.x > 0){
        camera.x -= cameraSpeed;
    }
    if (keysDown['83'] && gridSize > camera.y + zoom){
        camera.y += cameraSpeed;
    }
    if (keysDown['87'] && camera.y > 0){
        camera.y -= cameraSpeed;
    }

    if (keysDown['39']){
        if (!(space)){
            space = true;
            viewIndex++
        }
    }else if (keysDown['37']){
        if (!(space)){
            space = true;
            viewIndex -= 1;
        }
    }else if (keysDown['81']){
        if (!(space)){
            space = true;
            zoom += zoomSpeed;
            camera.x -= zoomSpeed /  2;
            camera.y -= zoomSpeed /  2;
        }
    }else if (keysDown['69']) {
        if (!(space)) {
            space = true;
            zoom -= zoomSpeed;
            camera.x += zoomSpeed / 2;
            camera.y += zoomSpeed /  2;
        }
    }else {
        space = false;
    }


    tileSize = parseInt(canvasSize.width / zoom);
    // console.log(canvasSize.width / tileSize)
    for (let y = 0; y - 1 < zoom;y++){
        if (y + camera.y < gridSize && y + camera.y >= 0){
            for (let x = 0; x - 1 < zoom;x++){
                if (x + camera.x < gridSize && x + camera.x >= 0){
                    let c;
                    let ground = matrix[y + camera.y][x + camera.x][layer[0]];
                    let tile = matrix[y + camera.y][x + camera.x][layer[viewIndex]];

                    if (ground.val > 0.70){
                        c = color(150 * ground.val, 150 * ground.val, 150 * ground.val);
                    }else if (ground.val > 0.45){
                        c = color(100 * ground.val, 255 * ground.val, 100 * ground.val);
                    }else if (ground.val > 0.43){
                        c = color(255 * ground.val*1.5, 255 * ground.val*1.5, 200 * ground.val*1.5);
                    } else {
                        c = color(100 * ground.val, 100 * ground.val, 255 * ground.val);
                    }
                    if (tile.color){
                        if (tile.val > tile.cutOff){
                            c = color(tile.color[0] * (tile.val * tile.abundance), tile.color[1] * (tile.val * tile.abundance), tile.color[2] * (tile.val * tile.abundance));
                        }
                    }
                    fill(c);
                    noStroke();
                    rect( (tileSize*x), (tileSize*y), tileSize, tileSize);
                }
            }
        }
    }
}
