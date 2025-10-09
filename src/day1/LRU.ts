export default class LRU<K, V> {
    private length: number;

    constructor() {}

    update(key: K, value: V): void {
        // does it exist?
        // if not we need to insert
        // check capacity and evict if over capacity
        // if it does we need to update to front of list and update the value
    }
    get(key: K): V | undefined {
        //  check the cache for existence
        //  update value found by moving it to the head
        //  return out value found or undefined if doesn't exist
    }
}
