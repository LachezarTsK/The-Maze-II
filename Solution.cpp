
#include <array>
#include <queue>
#include <vector>
using namespace std;

class Solution {

    struct Point {
        int row;
        int column;
        int distanceFromStart;
        Point(int row, int column, int distanceFromStart) : row{row}, column{column}, distanceFromStart{distanceFromStart}{}
    };
    inline static auto comparator = [](const Point& x, const Point& y) {return x.distanceFromStart > y.distanceFromStart;};
    inline static const int EMPTY_SPACE = 0;
    inline static const int WALL = 1;
    inline static const int BALL_CANNOT_STOP_AT_DESTINATION = -1;
    inline static const array<array<int, 2>, 4> MOVES{{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}};
    int rows;
    int columns;

public:
    int shortestDistance(vector<vector<int>>&maze, vector<int>& start, vector<int>& destination) {
        rows = maze.size();
        columns = maze[0].size();
        return dijkstraSearchForShortestDistance(maze, start, destination);
    }

private:
    int dijkstraSearchForShortestDistance(const vector<vector<int>>& maze, const vector<int>& start, const vector<int>& destination) {
        priority_queue<Point, vector<Point>, decltype(comparator) > minHeap(comparator);
        minHeap.emplace(Point(start[0], start[1], 0));

        vector<vector<int>> shortestDistance(rows, vector<int>(columns, INT_MAX));
        shortestDistance[start[0]][start[1]] = 0;

        while (!minHeap.empty()) {
            Point point = minHeap.top();
            minHeap.pop();

            for (const auto& move : MOVES) {
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
                    minHeap.emplace(Point(nextRow, nextColumn, point.distanceFromStart + path));
                }
            }
        }
        return shortestDistance[destination[0]][destination[1]] != INT_MAX
                ? shortestDistance[destination[0]][destination[1]]
                : BALL_CANNOT_STOP_AT_DESTINATION;
    }

    bool pointIsInMaze(int row, int column) {
        return row < rows && row >= 0 && column < columns && column >= 0;
    }
};
