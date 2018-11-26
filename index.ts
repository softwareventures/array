import {Comparator, Comparison} from "@softwareventures/ordered";

// tslint:disable-next-line:no-unbound-method
const internalSlice = Array.prototype.slice;

export const copy: <T>(array: ArrayLike<T>) => T[] =
    Array.from != null
        ? Array.from // tslint:disable-line:no-unbound-method
        : array => internalSlice.call(array);

// tslint:disable-next-line:no-unbound-method
const internalMap = Array.prototype.map;

export const map: <T, U>(array: ArrayLike<T>, f: (element: T, index: number) => U) => U[] =
    Array.from != null
        ? Array.from // tslint:disable-line:no-unbound-method
        : (array, f) => internalMap.call(array, f);

export function reverse<T>(array: ArrayLike<T>): T[] {
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

export function last<T>(array: ArrayLike<T>): T {
    if (array.length > 0) {
        return array[array.length - 1];
    } else {
        throw new Error("Empty array.");
    }
}

export function concatMap<T, U>(array: ArrayLike<T>, f: (element: T) => U[]): U[] {
    return map(array, f)
        .reduce((result, subarray) => result.concat(subarray), []);
}

export function group<T>(elements: ReadonlyArray<T>, compare: Comparator<T>): T[][] {
    return copy(elements)
        .sort(compare)
        .reduce((groups, element) => {
            if (groups.length === 0) {
                return [[element]];
            }

            const group = groups[groups.length - 1];
            const exemplar = group[0];

            if (compare(exemplar, element) === Comparison.equal) {
                return groups.slice(0, groups.length - 1)
                    .concat([group.concat([element])]);
            } else {
                return groups.concat([[element]]);
            }
        }, [] as T[][]);
}

export function sum<T>(array: ArrayLike<T>, value: (element: T) => number): number {
    return map(array, value)
        .reduce((sum, value) => sum + value, 0);
}
