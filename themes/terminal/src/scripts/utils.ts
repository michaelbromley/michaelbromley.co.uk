
export interface ArrayLike<T> {
    length: number;
    [index: number]: T;
}

export function toArray<T>(arrayLike: ArrayLike<T>): T[] {
    return Array.prototype.slice.call(arrayLike);
}
