export default function two_crystal_balls(breaks: boolean[]): number {
    let low = 0;
    let jump = Math.floor(Math.sqrt(breaks.length));
    let i = jump;

    // find where crystal ball is broken

    for (; i < breaks.length; i += jump)
        if (breaks[i]) {
            break;
        }

    // back up one jump and walk the length of a jump to find the exact spot where it breaks
    i -= jump;

    for (let j = 0; j < jump && i < breaks.length; j++, i++) {
        if (breaks[i]) {
            return i;
        }
    }
    return -1;
}
