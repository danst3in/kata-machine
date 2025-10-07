function walk(curr: BinaryNode<number | undefined>, path: number[]): number[] {
    if (!curr) {
        return path;
    } else if (curr.value) {
        path.push(curr.value);
    }

    if (curr.left) {
        walk(curr.left, path);
    }

    if (curr.right) {
        walk(curr.right, path);
    }

    return path;
}
export default function pre_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
