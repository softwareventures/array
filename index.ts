import {Comparator, Comparison} from "@softwareventures/ordered";
import {Dictionary} from "dictionary-types";

// tslint:disable-next-line:no-unbound-method
const nativeSlice = Array.prototype.slice;

// tslint:disable-next-line:no-unbound-method
const nativeConcat = Array.prototype.concat;

// tslint:disable-next-line:no-unbound-method
const nativeMap = Array.prototype.map;

export const copy: <T>(array: ArrayLike<T>) => T[] =
    Array.from != null
        ? Array.from // tslint:disable-line:no-unbound-method
        : array => nativeSlice.call(array);

export function concat<T>(a: ArrayLike<T>, b: ArrayLike<T>): T[] {
    return nativeConcat.call(copy(a), copy(b));
}

export function prepend<T>(a: ArrayLike<T>): (b: ArrayLike<T>) => T[] {
    return b => concat(a, b);
}

export function append<T>(b: ArrayLike<T>): (a: ArrayLike<T>) => T[] {
    return a => concat(a, b);
}

export function head<T>(array: ArrayLike<T>): T | null {
    return array.length === 0
        ? null
        : array[0];
}

export function tail<T>(array: ArrayLike<T>): T[] {
    return nativeSlice.call(array, 1);
}

export function initial<T>(array: ArrayLike<T>): T[] {
    return array.length === 0
        ? []
        : nativeSlice.call(array, array.length - 1);
}

export function last<T>(array: ArrayLike<T>): T | null {
    return array.length === 0
        ? null
        : array[array.length - 1];
}

export function empty<T>(array: ArrayLike<T>): boolean {
    return array.length === 0;
}

export function reverse<T>(array: ArrayLike<T>): T[] {
    const result = copy<T>({length: array.length});
    for (let i = 0; i < array.length; ++i) {
        result[i] = array[array.length - i - 1];
    }
    return result;
}

export function slice<T>(array: ArrayLike<T>, start?: number, end?: number): T[] {
    return nativeSlice.call(array, start, end);
}

export function sliceFn<T>(start?: number, end?: number): (array: ArrayLike<T>) => T[] {
    return array => nativeSlice.call(array, start, end);
}

export function take<T>(array: ArrayLike<T>, count: number): T[] {
    return nativeSlice.call(array, 0, count);
}

export function takeFn<T>(count: number): (array: ArrayLike<T>) => T[] {
    return array => nativeSlice.call(array, 0, count);
}

export function drop<T>(array: ArrayLike<T>, count: number): T[] {
    return nativeSlice.call(array, count);
}

export function dropFn<T>(count: number): (array: ArrayLike<T>) => T[] {
    return array => nativeSlice.call(array, count);
}

export const map: <T, U>(array: ArrayLike<T>, f: (element: T, index: number) => U) => U[] =
    Array.from != null
        // tslint:disable-next-line:no-unbound-method
        ? Array.from as any // TypeScript 3.2 incorrectly requires this cast to any.
        : (array, f) => nativeMap.call(array, f);

export function mapFn<T, U>(f: (element: T, index: number) => U): (array: ArrayLike<T>) => U[] {
    return array => map(array, f);
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

export function concatMap<T, U>(array: ArrayLike<T>, f: (element: T) => U[]): U[] {
    return map(array, f)
        .reduce((result, subarray) => result.concat(subarray), []);
}

export function concatMapFn<T, U>(f: (element: T) => U[]): (array: ArrayLike<T>) => U[] {
    return array => concatMap(array, f);
}

export function group<T>(array: ArrayLike<T>, compare: Comparator<T>): T[][] {
    return copy(array)
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

export function sum<T>(array: ArrayLike<T>, f: (element: T) => number): number {
    return map(array, f)
        .reduce((sum, value) => sum + value, 0);
}

export function sumFn<T>(f: (element: T) => number): (array: ReadonlyArray<T>) => number {
    return array => sum(array, f);
}