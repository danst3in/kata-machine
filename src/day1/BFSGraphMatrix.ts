export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const prev: number[] = new Array(graph.length).fill(-1);

    const q: number[] = [source];
    seen[source] = true;

    do {
        const curr = q.shift() as number;
        if (curr === needle) {
            break;
        }

        seen[curr] = true; // Always true before this anyway?

        const adjs = graph[curr];
        for (let i = 0; i < adjs.length; i++) {
            // if no edge
            if (adjs[i] === 0) {
                continue;
            }
            // if already seen/handled edge
            if (seen[i]) {
                continue;
            }

            seen[i] = true;

            // parent that lead to [i]
            prev[i] = curr;
            q.push(i);
        }
    } while (q.length);

    // build it backwards
    let curr = needle;
    const out: number[] = [];

    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }
    if (out.length) {
        return [source].concat(out.reverse());
    }
    return null;
}
