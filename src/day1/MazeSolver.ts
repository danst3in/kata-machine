function walk(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    // Base Cases
    // 1. off the map
    if (
        curr.x < 0 ||
        curr.x >= maze[0].length ||
        curr.y < 0 ||
        curr.y >= maze.length
    ) {
        return false;
    }

    // 2. its a wall
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }
    // 3. reached the end of maze
    if (curr.x === end.x && curr.y === end.y) {
        return true;
    }
    // 4. previously visited
    if (seen[curr.y][curr.x]) {
        return false;
    }

    // Recurse
    // pre

    // start recurse
    // post
}
export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    // Base Cases
    // 1. its a wall
    // 2. off the map
    // 3. previously visited
    // 4. reached the end of maze
}
