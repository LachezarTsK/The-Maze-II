
import java.util.Arrays;
import java.util.PriorityQueue;

public class Solution {

    private record Point(int row, int column, int distanceFromStart){}
    private static final int EMPTY_SPACE = 0;
    private static final int WALL = 1;
    private static final int BALL_CANNOT_STOP_AT_DESTINATION = -1;
    private static final int[][] MOVES = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    private int rows;
    private int columns;

    public int shortestDistance(int[][] maze, int[] start, int[] destination) {
        rows = maze.length;
        columns = maze[0].length;
        return dijkstraSearchForShortestDistance(maze, start, destination);
    }

    private int dijkstraSearchForShortestDistance(int[][] maze, int[] start, int[] destination) {
        PriorityQueue<Point> minHeap = new PriorityQueue<>((x, y) -> x.distanceFromStart - y.distanceFromStart);
        minHeap.add(new Point(start[0], start[1], 0));

        int[][] shortestDistance = new int[rows][columns];
        Arrays.stream(shortestDistance).forEach(row -> Arrays.fill(row, Integer.MAX_VALUE));
        shortestDistance[start[0]][start[1]] = 0;

        while (!minHeap.isEmpty()) {
            Point point = minHeap.poll();

            for (int[] move : MOVES) {
                int nextRow = point.row + move[0];
                int nextColumn = point.column + move[1];
                int path = 0;

                if (!pointIsInMaze(nextRow, nextColumn) || maze[nextRow][nextColumn] != EMPTY_SPACE) {
                    continue;
                }

                while (pointIsInMaze(nextRow, nextColumn) && maze[nextRow][nextColumn] == EMPTY_SPACE) {
                    nextRow += move[0];
                    nextColumn += move[1];
                    ++path;
                }
                nextRow -= move[0];
                nextColumn -= move[1];

                if (pointIsInMaze(nextRow, nextColumn) && point.distanceFromStart + path < shortestDistance[nextRow][nextColumn]) {
                    shortestDistance[nextRow][nextColumn] = point.distanceFromStart + path;
                    minHeap.add(new Point(nextRow, nextColumn, point.distanceFromStart + path));
                }
            }
        }
        return shortestDistance[destination[0]][destination[1]] != Integer.MAX_VALUE
                ? shortestDistance[destination[0]][destination[1]]
                : BALL_CANNOT_STOP_AT_DESTINATION;
    }

    private boolean pointIsInMaze(int row, int column) {
        return row < rows && row >= 0 && column < columns && column >= 0;
    }
}
