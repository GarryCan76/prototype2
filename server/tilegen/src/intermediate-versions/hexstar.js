export default class Hexstar{
    constructor() {
    }
    flatToppedAStar(grid, start, target, barriers) {
        const openSet = [];
        const closedSet = [];
        const cameFrom = {};

        const calculateHeuristic = (a, b) => {
            return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
        };

        openSet.push(start);

        while (openSet.length > 0) {
            let current = openSet[0];
            for (let i = 1; i < openSet.length; i++) {
                if (openSet[i].f < current.f || (openSet[i].f === current.f && openSet[i].h < current.h)) {
                    current = openSet[i];
                }
            }

            if (current.row === target.row && current.col === target.col) {
                // Reconstruct path
                const path = [];
                let temp = current;
                while (cameFrom[temp.row + '-' + temp.col]) {
                    path.unshift(temp);
                    temp = cameFrom[temp.row + '-' + temp.col];
                }
                return path;
            }

            openSet.splice(openSet.indexOf(current), 1);
            closedSet.push(current);

            const neighbors = this.getFlatToppedNeighbors(current, grid);
            for (const neighbor of neighbors) {
                if (closedSet.find((node) => node.row === neighbor.row && node.col === neighbor.col) ||
                    barriers.find((barrier) => barrier.row === neighbor.row && barrier.col === neighbor.col)) {
                    continue;
                }

                const tentative_g = current.g + 1; // Assuming a constant cost of 1 for simplicity

                if (!openSet.includes(neighbor) || tentative_g < neighbor.g) {
                    neighbor.g = tentative_g;
                    neighbor.h = calculateHeuristic(neighbor, target);
                    neighbor.f = neighbor.g + neighbor.h;
                    cameFrom[neighbor.row + '-' + neighbor.col] = current;

                    if (!openSet.includes(neighbor)) {
                        openSet.push(neighbor);
                    }
                }
            }
        }

        // No path found
        return [];
    }
    createFlatToppedHexGrid(size) {
        const grid = [];
        for (let row = 0; row < size; row++) {
            grid[row] = [];
            for (let col = 0; col < size; col++) {
                grid[row][col] = { row, col, g: Infinity, h: 0, f: 0 };
            }
        }
        return grid;
    }

    getFlatToppedNeighbors(node, grid) {
        const neighbors = [];
        const row = node.row;
        const col = node.col;

        // Even column
        if (col % 2 === 0) {
            if (grid[row - 1]) neighbors.push(grid[row - 1][col]); // Top
            if (grid[row - 1] && grid[row - 1][col + 1]) neighbors.push(grid[row - 1][col + 1]); // Top-Right
            if (grid[row][col - 1]) neighbors.push(grid[row][col - 1]); // Left
            if (grid[row][col + 1]) neighbors.push(grid[row][col + 1]); // Right
            if (grid[row + 1]) neighbors.push(grid[row + 1][col]); // Bottom
            if (grid[row + 1] && grid[row + 1][col + 1]) neighbors.push(grid[row + 1][col + 1]); // Bottom-Right
        } else {
            // Odd column
            if (grid[row - 1]) neighbors.push(grid[row - 1][col]); // Top
            if (grid[row][col - 1]) neighbors.push(grid[row][col - 1]); // Left
            if (grid[row][col + 1]) neighbors.push(grid[row][col + 1]); // Right
            if (grid[row + 1]) neighbors.push(grid[row + 1][col]); // Bottom
            if (grid[row + 1] && grid[row + 1][col - 1]) neighbors.push(grid[row + 1][col - 1]); // Bottom-Left
            if (grid[row - 1] && grid[row - 1][col - 1]) neighbors.push(grid[row - 1][col - 1]); // Top-Left
        }

        return neighbors.filter((neighbor) => neighbor); // Filter out undefined neighbors
    }
}

// Example usage
// hexstar = new Hexstar()
// const gridSize = 10;
// const grid = hexstar.createFlatToppedHexGrid(gridSize);
// const startNode = { row: 0, col: 0 };
// const targetNode = { row: 9, col: 9 };
// const barriers = [
//     { row: 2, col: 2 },
//     { row: 3, col: 2 },
//     { row: 4, col: 2 },
//     { row: 5, col: 2 },
//     // Add more barrier nodes as needed
// ];
//
// const path = hexstar.flatToppedAStar(grid, startNode, targetNode, barriers);
// console.log('Shortest Path:', path);

// Function to create a flat-topped hex grid