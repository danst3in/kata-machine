export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    private debug() {
        let out = "";

        this.data.forEach((node, i) => {
            out += `${i} => ${node}, `;
        });
        out += ` , head = ${this.data[0]}, tail = ${this.data[this.length]} `;
        console.log("🚀 ~ MinHeap.ts:21 ~ MinHeap ~ debug ~ out:", out);
    }
    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }
    delete(): number {
        // this.debug();
        if (this.length === 0) {
            return -1; // return sentinel value
        }
        const out = this.data[0];
        this.length--;
        if (this.length === 0) {
            this.data = [];
            return out;
        }
        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return out;
    }

    private heapifyDown(idx: number): void {
        const lIdx = this.leftChild(idx);
        const rIdx = this.rightChild(idx);

        if (idx >= this.length || lIdx >= this.length) {
            return;
        }

        const lV = this.data[lIdx];
        const rV = this.data[rIdx];
        const v = this.data[idx];

        if (lV > rV && v > rV) {
            [this.data[idx], this.data[rIdx]] = [rV, v];
            this.heapifyDown(rIdx);
        } else if (rV > lV && v > lV) {
            [this.data[idx], this.data[lIdx]] = [lV, v];
            this.heapifyDown(lIdx);
        }
    }
    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return;
        }

        const p = this.parent(idx);
        const parentV = this.data[p];
        const v = this.data[idx];

        if (parentV > v) {
            [this.data[idx], this.data[p]] = [parentV, v];
            this.heapifyUp(p);
        }
    }
    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private leftChild(idx: number): number {
        return idx * 2 + 1;
    }
    private rightChild(idx: number): number {
        return idx * 2 + 2;
    }
}
