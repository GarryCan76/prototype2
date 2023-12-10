/** This version has basic Perlin noise shown in grayscale. */
// import * as exports from '../../libraries/p5.min.js';
function createHTMLElement(elementType, parent, attributes, childrenArray, color){
  let e = document.createElement(elementType);
  if (color){
    e.style.backgroundColor = color;
  }
  // add attributes to element
  if (attributes){
    const keys = Object.keys(attributes);
    keys.forEach(key =>{
      if (key === 'classList'){
        e[key].add(attributes[key])
      }else if (key === 'addEventListener'){
        e[key](attributes[key][0], attributes[key][1])
      }else {
        e[key] = attributes[key];
      }
    })
  }

  //append children
  if (childrenArray){
    childrenArray.forEach(child=>{
      if (Object.keys(child).length > 0){
        createHTMLElement(Object.keys(child), e, child[Object.keys(child)]['attributes'], child[Object.keys(child)]['children'])
      }else {
        e.appendChild(child)
      }
    })
  }
  if (parent){
    parent.appendChild(e)
  }
  return e
}
let zoomFactor = 8;

function setup() {
  createCanvas(40, 40);
  background(200);
  noLoop();
}

let barriers = [
  // Add more barrier nodes as needed
];

function draw() {
  let tilemap = [];
  for (x = 0; x < width; x++) {
    let terrainColor = color(0, 255, 0);
    let row = [];
    let rowdiv = createHTMLElement('div', document.body, {'classList':'row'})
    for (y = 0; y < height; y++) {
      // zoomFactor zooms in on the noise to make there be more steps between
      // each plotted value. If zoomFactor is 100, we're effectively zooming in
      // 100x on the noise map.
      let noiseValue = noise(x / zoomFactor, y / zoomFactor);
      noiseValue -= 0.1
      if (noiseValue < 0.4) {
        //water
        terrainColor = color(30 - 30 * noiseValue, 176 - 176 * noiseValue, 251 - 251 * noiseValue);
        barriers.push({ row: x, col: y },)
      } else if (noiseValue < 0.45) {
        //sand
        terrainColor = color(255 - 255 * noiseValue/2, 246 - 246 * noiseValue/2, 193 - 193 * noiseValue/2);
      } else if (noiseValue < 0.8) {
        //grass
        terrainColor = color(118 - 118 * noiseValue/2, 239 - 239 * noiseValue/2, 124 - 124 * noiseValue/2);
      } else {
        terrainColor = color(255 - 255 * noiseValue/2, 255 - 255 * noiseValue/2, 255 - 255 * noiseValue/2);
      }
      row.push(noiseValue)
      createHTMLElement('div', rowdiv,{'classList':'tile'}, [], terrainColor)
      //set(x, y, color(255 * Math.random()));
    }
    tilemap.push(row)
  }
  console.log(barriers)
  

  updatePixels();
}
