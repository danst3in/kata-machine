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
            // check capacity and evict if over capacity
            this.trimCache();

            this.lookup.set(key, node);
            this.reverseLookup.set(node, key);
        } else {
            // if it does we need to update to front of list and update the value
            this.detach(node);
            this.prepend(node);
            node.value = value;
        }
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

    private detach(node: Node<V>) {
        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }

        if (this.head === node) {
            this.head = this.head.next;
        }
        if (this.tail === node) {
            this.tail = this.tail.prev;
        }
        node.next = undefined;
        node.prev = undefined;
    }
    private prepend(node: Node<V>) {
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }
    private trimCache(): void {
        if (this.length <= this.capacity) {
            return;
        }
        const tail = this.tail!;
        this.detach(this.tail!);

        // remove the tail from map as well as dbl linked list

        const key = this.reverseLookup.get(tail);
        this.lookup.delete(key!);
        this.reverseLookup.delete(tail);
        this.length--;
    }
}
