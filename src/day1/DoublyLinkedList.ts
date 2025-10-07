type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};
export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }
    private debug() {
        let curr = this.head;
        let out = "";

        for (let i = 0; i <= this.length && curr; i++) {
            out += `${i} => ${curr.value}, head = ${this.head?.value}, tail = ${this.tail?.value} `;
            curr = curr.next;
        }
        console.log(
            "🚀 ~ DoublyLinkedList.ts:22 ~ DoublyLinkedList ~ debug ~ out:",
            out,
        );
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
        return;
    }
    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error("index too great. you don't have the right.");
        } else if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }
        this.length++;
        const node = { value: item } as Node<T>;
        let curr = this.getAt(idx);
        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next;
        }
        curr = curr as Node<T>;
        node.next = curr;
        node.prev = curr.prev;
        curr.prev = node;

        if (node.prev) {
            node.prev.next = node;
        }
        return;
    }
    append(item: T): void {
        this.length++;
        const node = { value: item } as Node<T>;
        if (!this.tail) {
            this.head = this.tail = node;
            // this.debug();
            return;
        }
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
        // this.debug();
        return;
    }
    remove(item: T): T | undefined {
        let curr = this.head;
        if (!curr) {
            return undefined;
        }
        for (let i = 0; curr && i < this.length; i++) {
            if (curr?.value === item) {
                break;
            }
            curr = curr.next;
        }

        return this.removeNode(curr as Node<T>);
    }
    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
    }
    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);
        if (!node) {
            return undefined;
        }
        return this.removeNode(node);
    }

    private removeNode(node: Node<T>): T | undefined {
        if (this.length === 0) {
            const val = this.head?.value;
            // this.debug();
            this.head = this.tail = undefined;
            return val;
        }
        this.length--;

        node = node as Node<T>;

        if (node?.prev) {
            node.prev.next = node.next;
        }

        if (node?.next) {
            node.next.prev = node.prev;
        }

        if (node === this.head) {
            this.head = node.next;
        }
        if (node === this.tail) {
            this.tail = node.prev;
        }

        if (node?.prev) {
            node.prev = undefined;
        }
        if (node?.next) {
            node.next = undefined;
        }
        // this.debug();

        return node?.value;
    }
    private getAt(idx: number): Node<T> | undefined {
        let curr = this.head;

        for (let i = 0; i < idx && curr; i++) {
            curr = curr.next;
        }
        return curr;
    }
}
