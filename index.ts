export function reverse<T>(array: ReadonlyArray<T>): T[] {
    let result = new Array<T>(array.length);
    for (let i = 0; i < array.length; ++i) {
        result[i] = array[array.length - i - 1];
    }
    return result;
}

export interface Grouped<TElement> {
    [key: string]: TElement[];
}

export function groupBy<TElement>(array: ReadonlyArray<TElement>, keyOf: (element: TElement) => string): Grouped<TElement> {
    let grouped = {} as Grouped<TElement>;

    for (let element of array) {
        let key = keyOf(element);
        let group = grouped[key] || [];
        group.push(element);
        grouped[key] = group;
    }

    return grouped;
}

export function last<T>(array: ReadonlyArray<T>): T {
    if (array.length > 0) {
        return array[array.length - 1];
    } else {
        throw new Error("Empty array.");
    }
}