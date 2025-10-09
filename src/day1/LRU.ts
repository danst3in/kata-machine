type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};

function createNode<V>(value: V): Node<V> {
    return { value };
}
export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;

    private lookup: Map<K, Node<V>>;
    private reverseLookup: Map<Node<V>, K>;

    constructor(private capacity: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        // does it exist?
        let node = this.lookup.get(key);
        if (!node) {
            // if not we need to insert
            node = createNode(value);
            this.length++;
            this.prepend(node);
            this.trimCache();
        } else {
            // if it does we need to update to front of list and update the value
            this.detach(node);
            // node = createNode(value)
            this.prepend(node);
        }
        // check capacity and evict if over capacity
    }
    get(key: K): V | undefined {
        //  check the cache for existence
        const node = this.lookup.get(key);
        if (!node) {
            return undefined;
        }

        //  update value found by moving it to the head
        this.detach(node);
        this.prepend(node);
        //  return out value found or undefined if doesn't exist
        return node.value;
    }

    private detach(node: Node<V>) {}
    private prepend(node: Node<V>) {}
    private trimCache(): void {}
}
