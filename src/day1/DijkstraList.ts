function hasUnvisited(seen: boolean[], dists: number[]): boolean {
    return seen.some((s, i) => !s && dists[i] < Infinity);
}
function getLowestUnvisited(seen: boolean[], dists: number[]): number {
    let idx = -1;
    let lowestDistance = Infinity;
    for (let i = 0; i < seen.length; i++) {
        if (seen[i]) {
            continue;
        }
        if (lowestDistance > dists[i]) {
            lowestDistance = dists[i];
            idx = i;
        }
    }
    return idx;
}

export default function dijkstra_list(
    source: number,
    sink: number,
    arr: WeightedAdjacencyList,
): number[] {
    const seen: boolean[] = new Array(arr.length).fill(false);
    const dists: number[] = new Array(arr.length).fill(Infinity);
    const prev: number[] = new Array(arr.length).fill(-1);

    dists[source] = 0;

    while (hasUnvisited(seen, dists)) {
        const low = getLowestUnvisited(seen, dists);
        seen[low] = true;
        const adjs = arr[low];

        for (let i = 0; i < adjs.length; i++) {
            const edge = adjs[i];
            if (seen[edge.to]) {
                continue;
            }
            const dist = dists[low] + edge.weight;
            if (dist < dists[edge.to]) {
                dists[edge.to] = dist;
                prev[edge.to] = low;
            }
        }
    }

    const out: number[] = [];
    let curr = sink;
    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }
    out.push(source);
    return out.reverse();
}
