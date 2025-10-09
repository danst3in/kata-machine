function walk(
    graph: WeightedAdjacencyList,
    curr: number,
    needle: number,
    seen: boolean[],
    path: number[],
): boolean {
    //  base case
    if (seen[curr]) {
        return false;
    }

    seen[curr] = true;
    //  recurse
    // pre
    path.push(curr);
    //  additional base case
    if (curr === needle) {
        return true;
    }
    // recursion
    const list = graph[curr]; // all edge connections for current node
    for (let i = 0; i < list.length; i++) {
        const edge = list[i];
        if (walk(graph, edge.to, needle, seen, path)) {
            return true;
        }
    }
    // post
    path.pop();

    return false;
}
export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const path: number[] = [];

    walk(graph, source, needle, seen, path);

    if (path.length === 0) {
        return null;
    }
    return path;
}
