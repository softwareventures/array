export function reverse<T>(array: ReadonlyArray<T>): T[] {
    const result = new Array<T>(array.length);
    for (let i = 0; i < array.length; ++i) {
        result[i] = array[array.length - i - 1];
    }
    return result;
}

export interface Grouped<TElement> {
    [key: string]: TElement[];
}

export function groupBy<TElement>(array: ReadonlyArray<TElement>,
                                  keyOf: (element: TElement) => string): Grouped<TElement> {
    const grouped = {} as Grouped<TElement>;

    for (const element of array) {
        const key = keyOf(element);
        const group = grouped[key] || [];
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

export function concatMap<T, U>(array: ReadonlyArray<T>, f: (element: T) => U[]): U[] {
    return array
        .map(f)
        .reduce((result, subarray) => result.concat(subarray), []);
}
