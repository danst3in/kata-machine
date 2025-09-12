export default function bs_list(haystack: number[], needle: number): boolean {
    let low = 0;
    let high = haystack.length;
    // let mid = Math.floor(low + (low+high)/2)
    while (low < high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (haystack[mid] === needle) {
            return true;
        } else if (haystack[mid] < needle) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return false;
}
