import {Comparator, Comparison} from "@softwareventures/ordered";
import {Dictionary} from "dictionary-types";

// tslint:disable-next-line:no-unbound-method
const nativeSlice = Array.prototype.slice;

export const copy: <T>(array: ArrayLike<T>) => T[] =
    Array.from != null
        ? Array.from // tslint:disable-line:no-unbound-method
        : array => nativeSlice.call(array);

export function copyFn(): typeof copy {
    return copy;
}

// tslint:disable-next-line:no-unbound-method
const nativeMap = Array.prototype.map;

export const map: <T, U>(array: ArrayLike<T>, f: (element: T, index: number) => U) => U[] =
    Array.from != null
        // tslint:disable-next-line:no-unbound-method
        ? Array.from as any // TypeScript 3.2 incorrectly requires this cast to any.
        : (array, f) => nativeMap.call(array, f);

export function mapFn<T, U>(f: (element: T, index: number) => U): (array: ArrayLike<T>) => U[] {
    return array => map(array, f);
}

export function reverse<T>(array: ArrayLike<T>): T[] {
    const result = copy<T>({length: array.length});
    for (let i = 0; i < array.length; ++i) {
        result[i] = array[array.length - i - 1];
    }
    return result;
}

export function reverseFn(): typeof reverse {
    return reverse;
}

export function keyBy<T>(array: ArrayLike<T>,
                         f: (element: T) => string): Dictionary<T[]> {
    const dictionary = {} as Dictionary<T[]>;

    for (let i = 0; i < array.length; ++i) {
        const element = array[i];
        const key = f(element);
        const group = dictionary[key] || [];
        group.push(element);
        dictionary[key] = group;
    }

    return dictionary;
}

export function keyByFn<T>(f: (element: T) => string): (array: ArrayLike<T>) => Dictionary<T[]> {
    return array => keyBy(array, f);
}

export function last<T>(array: ArrayLike<T>): T {
    if (array.length > 0) {
        return array[array.length - 1];
    } else {
        throw new Error("Empty array.");
    }
}

export function lastFn(): typeof last {
    return last;
}

export function concatMap<T, U>(array: ArrayLike<T>, f: (element: T) => U[]): U[] {
    return map(array, f)
        .reduce((result, subarray) => result.concat(subarray), []);
}

export function concatMapFn<T, U>(f: (element: T) => U[]): (array: ArrayLike<T>) => U[] {
    return array => concatMap(array, f);
}

export function group<T>(elements: ArrayLike<T>, compare: Comparator<T>): T[][] {
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

export function groupFn<T>(compare: Comparator<T>): (array: ArrayLike<T>) => T[][] {
    return array => group(array, compare);
}

export function sum<T>(array: ArrayLike<T>, value: (element: T) => number): number {
    return map(array, value)
        .reduce((sum, value) => sum + value, 0);
}

export function sumFn<T>(value: (element: T) => number): (array: ReadonlyArray<T>) => number {
    return array => sum(array, value);
}