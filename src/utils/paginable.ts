export function getNextPage(count: number, currentCount : number): number {
    const limit = 10

    if (count == currentCount) return NaN;

    return Math.round(currentCount / limit);
}