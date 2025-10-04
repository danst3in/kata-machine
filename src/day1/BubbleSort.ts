export default function bubble_sort(arr: number[]): void {
    // cycle through the entire array once up to but not including final value because final value n+1 doesn't exist for comparison
    for (let i = 0; i < arr.length; i++) {
        // shrink the array to search by 1 each time since the most recent final value will be sorted in previous iteration
        // also shrink the array to search by i each time since i values will already have been sorted in previous loops
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
