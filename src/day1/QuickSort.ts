const qs = (arr: number[], lo: number, hi: number): void => {};
const partition = (arr: number[], lo: number, hi: number): number => {
    const pivot: number = arr[hi];
    let idx = lo - 1;
    for (let i = lo; i < hi; i++) {
        if (arr[i] <= pivot) {
            idx++;
            const tmp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = tmp;
        }
    }
    idx++;

    arr[hi] = arr[idx];
    arr[idx] = arr[pivot];

    return idx;
};
export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
