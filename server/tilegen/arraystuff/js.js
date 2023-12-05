function createHTMLElement(elementType, parent, attributes, childrenArray) {
    let e = document.createElement(elementType);

    // add attributes to element
    if (attributes) {
        const keys = Object.keys(attributes);
        keys.forEach(key => {
            if (key === 'classList') {
                const classList = attributes[key].split(" ")
                classList.forEach(classItem => {
                    e[key].add(classItem)
                })
            } else if (key === 'addEventListener') {
                e[key](attributes[key][0], attributes[key][1])
            } else {
                e[key] = attributes[key];
            }
        })
    }
    //append children
    if (childrenArray) {
        childrenArray.forEach(child => {
            if (Object.keys(child).length > 0) {
                this.createHTMLElement(Object.keys(child), e, child[Object.keys(child)]['attributes'], child[Object.keys(child)]['children'])
            } else {
                e.appendChild(child)
            }
        })
    }
    if (parent) {
        parent.appendChild(e)
    }
    return e
}

let matrix = [];
for (let r = 0; r < 10;r++){
    let row = createHTMLElement('div', document.body)
    let matrixRow = [];
    if (r % 2 != 0) {
        let space = createHTMLElement('div', row, {'classList':'tile-space', 'addEventListener':['click',()=>{}]})
    }
    for (let i = 0; i < 10;i++){
        let tile = createHTMLElement('div', row, {'classList':'tile', 'addEventListener':['click',()=>{}]})
        matrixRow.push(tile)
    }
    matrix.push(matrixRow)
}
function neighborsOf(arrayLocation, array){
    let y = arrayLocation.y;
    let x = arrayLocation.x;
    let arrayValue = [];
    // for (let yNeighbor = -1; yNeighbor < 2;yNeighbor += 2){
    //     for (let xNeighbor = -1; xNeighbor < 2;xNeighbor += 2){
    //         neighbors.push({'y':(y + yNeighbor), 'x':(x + xNeighbor)})
    //     }
    //
    // }

    for (let yNeighbor = 0; yNeighbor < array.length;yNeighbor++){
        for (let xNeighbor = 0; xNeighbor < array.length;xNeighbor++){
            arrayValue.push(Math.max(Math.abs(yNeighbor - y),Math.abs(xNeighbor - x)))
        }

    }
    return arrayValue;
}

console.log(matrix)
let targetNode = {'y':7, 'x':8};
let startNode = {'y':3, 'x':5};
let startNodeValue = updateNeighbors(matrix, startNode.y, targetNode.x);
startNodeValue.forEach(node=>{
    console.log(node)
})
let targetNodeValue = updateNeighbors(matrix, targetNode.y, targetNode.x);
let path;
for (let i = 1; i < startNodeValue.length;i++){
    if (startNodeValue[i] === 0 || targetNodeValue[i] === 0){
        path = startNodeValue[i] + targetNodeValue[i];
        console.log(path)
    }
}
for (let y = 1; y < matrix.length;y++){
    for (let x = 1; x < matrix.length;x++){
        let pathNum = startNodeValue[x + matrix.length * y] + targetNodeValue[x + matrix.length * y];
        if (pathNum === path){
            // let addition = createHTMLElement('p', matrix[y][x], {'innerText':startNodeValue[x + matrix.length * y] + targetNodeValue[x + matrix.length * y]})
            matrix[y][x].style.backgroundColor = 'blue'
        }else {
            let addition = createHTMLElement('p', matrix[y][x], {'innerText':startNodeValue[x + matrix.length * y] + targetNodeValue[x + matrix.length * y]})
        }
    }

}

matrix[startNode.y][startNode.x].style.backgroundColor = 'rgb(0, 200, 0)';
matrix[targetNode.y][targetNode.x].style.backgroundColor = 'rgb(200, 0, 0)';

let i = 1;
// Function to update neighbors based on distance
function updateNeighbors(matrix, row, col) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    let neighborList = [];

    // Iterate through all cells in the matrix
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            // Calculate the distance from the selected point
            const distance = Math.abs(row - i) + Math.abs(col - j);
            createHTMLElement('p', matrix[i][j], {'innerText':'('+ distance + ")",})
            // Update the cell value based on distance
            neighborList.push(distance)
        }
    }
    return neighborList
}


// neighbors.forEach((neighbor)=>{
//     console.log(neighbor)
//     createHTMLElement('p', matrix[neighbor.y][neighbor.x], {'innerText':1})
//     matrix[neighbor.y][neighbor.x].style.backgroundColor = 'rgb(0, '+ (100 + 20*i) +', 0)';
//     i++
// })

function createHTMLElement(elementType, parent, attributes, childrenArray) {
    let e = document.createElement(elementType);

// add attributes to element
    if (attributes) {
        const keys = Object.keys(attributes);
        keys.forEach(key => {
            if (key === 'classList') {
                const classList = attributes[key].split(" ")
                classList.forEach(classItem => {
                    e[key].add(classItem)
                })
            } else if (key === 'addEventListener') {
                e[key](attributes[key][0], attributes[key][1])
            } else {
                e[key] = attributes[key];
            }
        })
    }
//append children
    if (childrenArray) {
        childrenArray.forEach(child => {
            if (Object.keys(child).length > 0) {
                this.createHTMLElement(Object.keys(child), e, child[Object.keys(child)]['attributes'], child[Object.keys(child)]['children'])
            } else {
                e.appendChild(child)
            }
        })
    }
    if (parent) {
        parent.appendChild(e)
    }
    return e
}

let domMatrix = [];
for (let y = 0; y < gridSize;y++){
    let row = createHTMLElement('div', document.body)
    let domRow = [];
    for (let x = 0; x < gridSize;x++){
        let tile = createHTMLElement('div', row, {'classList':'tile'})
        domRow.push(tile)
    }
    domMatrix.push(domRow)
}
console.log(domMatrix)
path.forEach(step=>{
    domMatrix[step.row][step.col].style.backgroundColor = 'blue'
})
