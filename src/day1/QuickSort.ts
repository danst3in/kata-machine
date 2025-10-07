const qs = (arr: number[], lo: number, hi: number): void => {
    // Base Case
    //  where lo and hi meet
    if (lo >= hi) {
        return;
    }
    const pivotIdx = partition(arr, lo, hi);
    qs(arr, lo, pivotIdx - 1);
    qs(arr, pivotIdx + 1, hi);
};
const partition = (arr: number[], lo: number, hi: number): number => {
    const pivot = arr[hi];
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
        if (arr[j] <= pivot) {
            i++;
            const tmp = arr[j];
            arr[j] = arr[i];
            arr[i] = tmp;
        }
    }
    i++;

    arr[hi] = arr[i];
    arr[i] = pivot;

    return i;
};
export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
