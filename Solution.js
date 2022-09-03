
/**
 * @param {number[][]} maze
 * @param {number[]} start
 * @param {number[]} destination
 * @return {number}
 */
var shortestDistance = function (maze, start, destination) {
    this.EMPTY_SPACE = 0;
    this.WALL = 1;
    this.BALL_CANNOT_STOP_AT_DESTINATION = -1;
    this.MOVES = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    this.rows = maze.length;
    this.columns = maze[0].length;
    return dijkstraSearchForShortestDistance(maze, start, destination);
};

/**
 * @param {number[][]} maze
 * @param {number[]} start
 * @param {number[]} destination
 * @return {number}
 */
function dijkstraSearchForShortestDistance(maze, start, destination) {
    const {PriorityQueue} = require('@datastructures-js/priority-queue');
    const minHeap = new MinPriorityQueue({compare: (x, y) => x.distanceFromStart - y.distanceFromStart});//MinPriorityQueue<Point>
    minHeap.enqueue(new Point(start[0], start[1], 0));

    const shortestDistance = Array.from(new Array(this.rows), () => new Array(this.columns).fill(Number.MAX_SAFE_INTEGER));
    shortestDistance[start[0]][start[1]] = 0;

    while (!minHeap.isEmpty()) {
        const point = minHeap.dequeue();

        for (let move of this.MOVES) {

            let nextRow = point.row + move[0];
            let nextColumn = point.column + move[1];
            let path = 0;

            if (!pointIsInMaze(nextRow, nextColumn) || maze[nextRow][nextColumn] !== this.EMPTY_SPACE) {
                continue;
            }

            while (pointIsInMaze(nextRow, nextColumn) && maze[nextRow][nextColumn] === this.EMPTY_SPACE) {
                nextRow += move[0];
                nextColumn += move[1];
                ++path;
            }
            nextRow -= move[0];
            nextColumn -= move[1];

            if (pointIsInMaze(nextRow, nextColumn) && point.distanceFromStart + path < shortestDistance[nextRow][nextColumn]) {
                shortestDistance[nextRow][nextColumn] = point.distanceFromStart + path;
                minHeap.enqueue(new Point(nextRow, nextColumn, point.distanceFromStart + path));
            }
        }
    }
    return shortestDistance[destination[0]][destination[1]] !== Number.MAX_SAFE_INTEGER
            ? shortestDistance[destination[0]][destination[1]]
            : this.BALL_CANNOT_STOP_AT_DESTINATION;
}

/**
 * @param {number} row
 * @param {number} column
 * @return {boolean}
 */
function pointIsInMaze(row, column) {
    return row < this.rows && row >= 0 && column < this.columns && column >= 0;
}

/**
 * @param {number} row
 * @param {number} column
 * @param {number} distanceFromStart
 */
function Point(row, column, distanceFromStart) {
    this.row = row;
    this.column = column;
    this.distanceFromStart = distanceFromStart;
}
