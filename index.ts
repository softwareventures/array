import {isNotNull, isNull} from "@softwareventures/nullable";
import {Comparator, compare as defaultCompare, Comparison} from "@softwareventures/ordered";

// eslint-disable-next-line @typescript-eslint/unbound-method
const nativeSlice = Array.prototype.slice;

// eslint-disable-next-line @typescript-eslint/unbound-method
const nativeReverse = Array.prototype.reverse;

// eslint-disable-next-line @typescript-eslint/unbound-method
const nativeConcat = Array.prototype.concat;

// eslint-disable-next-line @typescript-eslint/unbound-method
const nativeFilter = Array.prototype.filter;

// eslint-disable-next-line @typescript-eslint/unbound-method
const nativeReduce = Array.prototype.reduce;

// eslint-disable-next-line @typescript-eslint/unbound-method
const nativeReduceRight = Array.prototype.reduceRight;

// eslint-disable-next-line @typescript-eslint/unbound-method
const nativeIndexOf = Array.prototype.indexOf;

// eslint-disable-next-line @typescript-eslint/unbound-method
const nativeFindIndex = Array.prototype.findIndex;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore duplicate identifier: This is the exported declaration, the implementation is below.
export function copy<T>(array: ArrayLike<T>): T[];

/** @internal This implementation is for internal use only, the exported declaration is above */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore duplicate identifier: This is the actual implementation, the exported declaration is above.
export const copy: <T>(array: ArrayLike<T>) => T[] = Array.from;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore duplicate identifier: This is the exported declaration, the implementation is below.
export function isArray<T = unknown>(value: readonly T[] | unknown): value is readonly T[];

/** @internal This implementation is for internal use only, the exported declaration is above */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore duplicate identifier: This is the actual implementation, the exported declaration is above.
export const isArray: (value: any) => value is any[] = Array.isArray;

export function isArrayLike<T>(value: ArrayLike<T> | unknown): value is ArrayLike<T> {
    return (
        typeof value === "object" &&
        value != null &&
        "length" in value &&
        typeof (value as {length: unknown}).length === "number"
    );
}

export function coerce<T>(array: ArrayLike<T>): readonly T[] {
    return isArray(array) ? array : copy(array);
}

export function first<T>(array: ArrayLike<T>): T | null {
    return array.length === 0 ? null : array[0];
}

/** @deprecated Use {@link first} instead. */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore duplicate identifier: This is the exported declaration, the implementation is below.
export function head<T>(array: ArrayLike<T>): T | null;

/** @internal This implementation is for internal use only, the exported declaration is above */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore duplicate identifier: This is the actual implementation, the exported declaration is above.
const head = first;

export function tail<T>(array: ArrayLike<T>): T[] {
    return nativeSlice.call(array, 1);
}

export function initial<T>(array: ArrayLike<T>): T[] {
    return array.length === 0 ? [] : nativeSlice.call(array, 0, array.length - 1);
}

export function last<T>(array: ArrayLike<T>): T | null {
    return array.length === 0 ? null : array[array.length - 1];
}

export function empty<T>(array: ArrayLike<T>): boolean {
    return array.length === 0;
}

export function reverse<T>(array: ArrayLike<T>): T[] {
    return nativeReverse.call(array);
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

export function takeWhile<T, U extends T>(
    array: ArrayLike<T>,
    predicate: (element: T, index: number) => element is U
): U[];
export function takeWhile<T>(
    array: ArrayLike<T>,
    predicate: (element: T, index: number) => boolean
): T[];
export function takeWhile<T>(
    array: ArrayLike<T>,
    predicate: (element: T, index: number) => boolean
): T[] {
    let i = 0;
    while (i < array.length && predicate(array[i], i)) {
        ++i;
    }
    return take(array, i);
}

export function takeWhileFn<T, U extends T>(
    predicate: (element: T, index: number) => element is U
): (array: ArrayLike<T>) => U[];
export function takeWhileFn<T>(
    predicate: (element: T, index: number) => boolean
): (array: ArrayLike<T>) => T[];
export function takeWhileFn<T>(
    predicate: (element: T, index: number) => boolean
): (array: ArrayLike<T>) => T[] {
    return array => takeWhile(array, predicate);
}

export function dropWhile<T>(
    array: ArrayLike<T>,
    predicate: (element: T, index: number) => boolean
): T[] {
    let i = 0;
    while (i < array.length && predicate(array[i], i)) {
        ++i;
    }
    return drop(array, i);
}

export function dropWhileFn<T>(
    predicate: (element: T, index: number) => boolean
): (array: ArrayLike<T>) => T[] {
    return array => dropWhile(array, predicate);
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore duplicate identifier: This is the exported declaration, the implementation is below.
export function map<T, U>(array: ArrayLike<T>, f: (element: T, index: number) => U): U[];

/** @internal This implementation is for internal use only, the exported declaration is above */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore duplicate identifier: This is the actual implementation, the exported declaration is above.
export const map: <T, U>(array: ArrayLike<T>, f: (element: T, index: number) => U) => U[] =
    Array.from;

export function mapFn<T, U>(f: (element: T, index: number) => U): (array: ArrayLike<T>) => U[] {
    return array => Array.from(array, f);
}

export function filter<T, U extends T>(
    array: ArrayLike<T>,
    predicate: (element: T, index: number) => element is U
): U[];
export function filter<T>(
    array: ArrayLike<T>,
    predicate: (element: T, index: number) => boolean
): T[];
export function filter<T>(
    array: ArrayLike<T>,
    predicate: (element: T, index: number) => boolean
): T[] {
    return nativeFilter.call(array, predicate);
}

export function filterFn<T, U extends T>(
    predicate: (element: T, index: number) => element is U
): (array: ArrayLike<T>) => U[];
export function filterFn<T>(
    predicate: (element: T, index: number) => boolean
): (array: ArrayLike<T>) => T[];
export function filterFn<T>(
    predicate: (element: T, index: number) => boolean
): (array: ArrayLike<T>) => T[] {
    return array => nativeFilter.call(array, predicate);
}

export function filterFirst<T>(
    array: ArrayLike<T>,
    predicate: (element: T, index: number) => boolean
): T[] {
    const result = [];
    let i = 0;
    for (; i < array.length; ++i) {
        const element = array[i];
        if (predicate(element, i)) {
            result.push(element);
        } else {
            break;
        }
    }
    for (++i; i < array.length; ++i) {
        result.push(array[i]);
    }
    return result;
}

export function filterFirstFn<T>(
    predicate: (element: T, index: number) => boolean
): (array: ArrayLike<T>) => T[] {
    return array => filterFirst(array, predicate);
}

export function exclude<T, U>(
    array: ArrayLike<T | U>,
    predicate: (element: T | U) => element is T
): U[];
export function exclude<T>(
    array: ArrayLike<T>,
    predicate: (element: T, index: number) => boolean
): T[];
export function exclude<T>(
    array: ArrayLike<T>,
    predicate: (element: T, index: number) => boolean
): T[] {
    return filter(array, (element, index) => !predicate(element, index));
}

export function excludeFn<T, U>(
    predicate: (element: T | U) => element is T
): (array: ArrayLike<T | U>) => T[];
export function excludeFn<T>(
    predicate: (element: T, index: number) => boolean
): (array: ArrayLike<T>) => T[];
export function excludeFn<T>(
    predicate: (element: T, index: number) => boolean
): (array: ArrayLike<T>) => T[] {
    return array => exclude(array, predicate);
}

export function excludeNull<T>(array: ArrayLike<T | null | undefined>): T[] {
    return filter(array, isNotNull);
}

export function excludeFirst<T>(
    array: ArrayLike<T>,
    predicate: (element: T, index: number) => boolean
): T[] {
    return filterFirst(array, (element, index) => !predicate(element, index));
}

export function excludeFirstFn<T>(
    predicate: (element: T, index: number) => boolean
): (array: ArrayLike<T>) => T[] {
    return array => excludeFirst(array, predicate);
}

export function remove<T>(array: ArrayLike<T>, value: T): T[] {
    return exclude(array, element => element === value);
}

export function removeFn<T>(value: T): (array: ArrayLike<T>) => T[] {
    return array => remove(array, value);
}

export function removeFirst<T>(array: ArrayLike<T>, value: T): T[] {
    return excludeFirst(array, element => element === value);
}

export function removeFirstFn<T>(value: T): (array: ArrayLike<T>) => T[] {
    return array => removeFirst(array, value);
}

export function fold<T, U>(
    array: ArrayLike<T>,
    f: (accumulator: U, element: T, index: number) => U,
    initial: U
): U {
    return (nativeReduce as (...args: any[]) => any).call(array, f, initial);
}

export function foldFn<T, U>(
    f: (accumulator: U, element: T, index: number) => U,
    initial: U
): (array: ArrayLike<T>) => U {
    return array => (nativeReduce as (...args: any[]) => any).call(array, f, initial);
}

export function fold1<T>(
    array: ArrayLike<T>,
    f: (accumulator: T, element: T, index: number) => T
): T {
    return (nativeReduce as (...args: any[]) => any).call(array, f);
}

export function fold1Fn<T>(
    f: (accumulator: T, element: T, index: number) => T
): (array: ArrayLike<T>) => T {
    return array => fold1(array, f);
}

export function foldRight<T, U>(
    array: ArrayLike<T>,
    f: (accumulator: U, element: T, index: number) => U,
    initial: U
): U {
    return (nativeReduceRight as (...args: any[]) => any).call(array, f, initial);
}

export function foldRightFn<T, U>(
    f: (accumulator: U, element: T, index: number) => U,
    initial: U
): (array: ArrayLike<T>) => U {
    return array => (nativeReduceRight as (...args: any[]) => any).call(array, f, initial);
}

export function foldRight1<T>(
    array: ArrayLike<T>,
    f: (accumulator: T, element: T, index: number) => T
): T {
    return (nativeReduceRight as (...args: any[]) => any).call(array, f);
}

export function foldRight1Fn<T>(
    f: (accumulator: T, element: T, index: number) => T
): (array: ArrayLike<T>) => T {
    return array => foldRight1(array, f);
}

export function foldMap<T, U>(
    array: ArrayLike<T>,
    f: (accumulator: U, element: U, index: number) => U,
    m: (element: T, index: number) => U,
    initial: U
): U {
    let accumulator = initial;
    for (let i = 0; i < array.length; ++i) {
        accumulator = f(accumulator, m(array[i], i), i);
    }

    return accumulator;
}

export function foldMapFn<T, U>(
    f: (accumulator: U, element: U, index: number) => U,
    m: (element: T, index: number) => U,
    initial: U
): (array: ArrayLike<T>) => U {
    return array => foldMap(array, f, m, initial);
}

export function foldMapRight<T, U>(
    array: ArrayLike<T>,
    f: (accumulator: U, element: U, index: number) => U,
    m: (element: T, index: number) => U,
    initial: U
): U {
    let accumulator = initial;
    const length = array.length;
    for (let i = 0; i < array.length; ++i) {
        accumulator = f(accumulator, m(array[length - i], i), i);
    }

    return accumulator;
}

export function foldMapRightFn<T, U>(
    f: (accumulator: U, element: U, index: number) => U,
    m: (element: T, index: number) => U,
    initial: U
): (array: ArrayLike<T>) => U {
    return array => foldMapRight(array, f, m, initial);
}

export function contains<T>(array: ArrayLike<T>, value: T): boolean {
    return nativeIndexOf.call(array, value) !== -1;
}

export function containsFn<T>(value: T): (array: ArrayLike<T>) => boolean {
    return array => nativeIndexOf.call(array, value) !== -1;
}

export function indexOf<T>(array: ArrayLike<T>, value: T): number | null {
    const index = nativeIndexOf.call(array, value);
    return index === -1 ? null : index;
}

export function indexOfFn<T>(value: T): (array: ArrayLike<T>) => number | null {
    return array => indexOf(array, value);
}

export function findIndex<T>(
    array: ArrayLike<T>,
    predicate: (element: T, index: number) => boolean
): number | null {
    const index = nativeFindIndex.call(array, predicate);
    return index === -1 ? null : index;
}

export function findIndexFn<T>(
    predicate: (element: T, index: number) => boolean
): (array: ArrayLike<T>) => number | null {
    return array => findIndex(array, predicate);
}

export function find<T, U extends T>(
    array: ArrayLike<T>,
    predicate: (element: T) => element is U
): U | null;
export function find<T>(
    array: ArrayLike<T>,
    predicate: (element: T, index: number) => boolean
): T | null;
export function find<T>(
    array: ArrayLike<T>,
    predicate: (element: T, index: number) => boolean
): T | null {
    const index = findIndex(array, predicate);
    return index == null ? null : array[index];
}

export function findFn<T, U extends T>(
    predicate: (element: T) => element is U
): (array: ArrayLike<T>) => U | null;
export function findFn<T>(
    predicate: (element: T, index: number) => boolean
): (array: ArrayLike<T>) => T | null;
export function findFn<T>(
    predicate: (element: T, index: number) => boolean
): (array: ArrayLike<T>) => T | null {
    return array => find(array, predicate);
}

export function maximum<T extends string | number | boolean>(array: ArrayLike<T>): T | null;
export function maximum<T>(array: ArrayLike<T>, compare: Comparator<T>): T | null;
export function maximum<T>(
    array: ArrayLike<T>,
    compare: Comparator<any> = defaultCompare
): T | null {
    return internalMaximum(array, compare);
}

export function maximumFn<T extends string | number | boolean>(): (array: ArrayLike<T>) => T | null;
export function maximumFn<T>(compare: Comparator<T>): (array: ArrayLike<T>) => T | null;
export function maximumFn<T>(
    compare: Comparator<any> = defaultCompare
): (array: ArrayLike<T>) => T | null {
    return array => internalMaximum(array, compare);
}

function internalMaximum<T>(array: ArrayLike<T>, compare: Comparator<T>): T | null {
    if (array.length === 0) {
        return null;
    }

    let result = array[0];

    for (let i = 1; i < array.length; ++i) {
        if (compare(array[i], result) > 0) {
            result = array[i];
        }
    }

    return result;
}

export function minimum<T extends string | number | boolean>(array: ArrayLike<T>): T | null;
export function minimum<T>(array: ArrayLike<T>, compare: Comparator<T>): T | null;
export function minimum<T>(
    array: ArrayLike<T>,
    compare: Comparator<any> = defaultCompare
): T | null {
    return internalMinimum(array, compare);
}

export function minimumFn<T extends string | number | boolean>(): (array: ArrayLike<T>) => T | null;
export function minimumFn<T>(compare: Comparator<T>): (array: ArrayLike<T>) => T | null;
export function minimumFn<T>(
    compare: Comparator<any> = defaultCompare
): (array: ArrayLike<T>) => T | null {
    return array => internalMinimum(array, compare);
}

function internalMinimum<T>(array: ArrayLike<T>, compare: Comparator<T>): T | null {
    if (array.length === 0) {
        return null;
    }

    let result = array[0];

    for (let i = 1; i < array.length; ++i) {
        if (compare(array[i], result) < 0) {
            result = array[i];
        }
    }

    return result;
}

export function sum(array: ArrayLike<number>): number {
    return fold(array, (a, b) => a + b, 0);
}

export function product(array: ArrayLike<number>): number {
    return fold(array, (a, b) => a * b, 1);
}

export function and(array: ArrayLike<boolean>): boolean {
    return findIndex(array, element => !element) == null;
}

export function or(array: ArrayLike<boolean>): boolean {
    return findIndex(array, element => !!element) != null;
}

export function any<T>(
    array: ArrayLike<T>,
    predicate: (element: T, index: number) => boolean
): boolean {
    return findIndex(array, predicate) != null;
}

export function anyFn<T>(
    predicate: (element: T, index: number) => boolean
): (array: ArrayLike<T>) => boolean {
    return array => any(array, predicate);
}

export function all<T>(
    array: ArrayLike<T>,
    predicate: (element: T, index: number) => boolean
): boolean {
    return !any(array, (element, index) => !predicate(element, index));
}

export function allFn<T>(
    predicate: (element: T, index: number) => boolean
): (array: ArrayLike<T>) => boolean {
    return array => all(array, predicate);
}

export function concat<T>(arrays: ArrayLike<ArrayLike<T>>): T[] {
    return nativeConcat.apply([], map(arrays, coerce));
}

export function prepend<T>(a: ArrayLike<T>): (b: ArrayLike<T>) => T[] {
    return b => concat([a, b]);
}

export function append<T>(b: ArrayLike<T>): (a: ArrayLike<T>) => T[] {
    return a => concat([a, b]);
}

export function concatMap<T, U>(
    array: ArrayLike<T>,
    f: (element: T, index: number) => ArrayLike<U>
): U[] {
    return concat(map(array, f));
}

export function concatMapFn<T, U>(
    f: (element: T, index: number) => ArrayLike<U>
): (array: ArrayLike<T>) => U[] {
    return array => concatMap(array, f);
}

export function noneNull<T>(array: ArrayLike<T | null>): ArrayLike<T> | null {
    return any(array, isNull) ? null : (array as ArrayLike<T>);
}

export function scan<T, U>(
    array: ArrayLike<T>,
    f: (accumulator: U, element: T, index: number) => U,
    initial: U
): U[] {
    const result: U[] = copy({length: array.length});
    let accumulator = initial;

    for (let i = 0; i < array.length; ++i) {
        result[i] = accumulator = f(accumulator, array[i], i);
    }

    return result;
}

export function scanFn<T, U>(
    f: (accumulator: U, element: T, index: number) => U,
    initial: U
): (array: ArrayLike<T>) => U[] {
    return array => scan(array, f, initial);
}

export function scanRight<T, U>(
    array: ArrayLike<T>,
    f: (accumulator: U, element: T, index: number) => U,
    initial: U
): U[] {
    const result: U[] = copy({length: array.length});
    let accumulator = initial;

    for (let i = array.length - 1; i >= 0; --i) {
        result[i] = accumulator = f(accumulator, array[i], i);
    }

    return result;
}

export function scanRightFn<T, U>(
    f: (accumulator: U, element: T, index: number) => U,
    initial: U
): (array: ArrayLike<T>) => U[] {
    return array => scanRight(array, f, initial);
}

export function partition<T, U extends T>(
    array: ArrayLike<T>,
    predicate: (element: T) => element is U
): [U[], Array<Exclude<T, U>>];
export function partition<T>(
    array: ArrayLike<T>,
    predicate: (element: T, index: number) => boolean
): [T[], T[]];
export function partition<T>(
    array: ArrayLike<T>,
    predicate: (element: T, index: number) => boolean
): [T[], T[]] {
    const a: T[] = [];
    const b: T[] = [];

    for (let i = 0; i < array.length; ++i) {
        if (predicate(array[i], i)) {
            a.push(array[i]);
        } else {
            b.push(array[i]);
        }
    }

    return [a, b];
}

export function partitionFn<T, U extends T>(
    predicate: (element: T) => element is U
): (array: ArrayLike<T>) => [U[], Array<Exclude<T, U>>];
export function partitionFn<T>(
    predicate: (element: T, index: number) => boolean
): (array: ArrayLike<T>) => [T[], T[]];
export function partitionFn<T>(
    predicate: (element: T, index: number) => boolean
): (array: ArrayLike<T>) => [T[], T[]] {
    return array => partition(array, predicate);
}

export function partitionWhile<T, U extends T>(
    array: ArrayLike<T>,
    predicate: (element: T) => element is U
): [U[], T[]];
export function partitionWhile<T>(
    array: ArrayLike<T>,
    predicate: (element: T, index: number) => boolean
): [T[], T[]];
export function partitionWhile<T>(
    array: ArrayLike<T>,
    predicate: (element: T, index: number) => boolean
): [T[], T[]] {
    let i;
    for (i = 0; i < array.length; ++i) {
        if (!predicate(array[i], i)) {
            break;
        }
    }

    return [take(array, i), drop(array, i)];
}

export function partitionWhileFn<T, U extends T>(
    predicate: (element: T) => element is U
): (array: readonly T[]) => [U[], T[]];
export function partitionWhileFn<T>(
    predicate: (element: T) => boolean
): (array: readonly T[]) => [T[], T[]];
export function partitionWhileFn<T>(
    predicate: (element: T) => boolean
): (array: readonly T[]) => [T[], T[]] {
    return array => partitionWhile(array, predicate);
}

export function keyBy<TKey, TElement>(
    array: ArrayLike<TElement>,
    f: (element: TElement, index: number) => TKey
): Map<TKey, TElement[]> {
    const result = new Map<TKey, TElement[]>();

    for (let i = 0; i < array.length; ++i) {
        const element = array[i];
        const key = f(element, i);
        const group = result.get(key) ?? [];
        if (!result.has(key)) {
            result.set(key, group);
        }
        group.push(element);
    }

    return result;
}

export function keyByFn<TKey, TElement>(
    f: (element: TElement, index: number) => TKey
): (array: ArrayLike<TElement>) => Map<TKey, TElement[]> {
    return array => keyBy(array, f);
}

export function keyFirstBy<TKey, TElement>(
    array: ArrayLike<TElement>,
    f: (element: TElement, index: number) => TKey
): Map<TKey, TElement> {
    const result = new Map<TKey, TElement>();

    for (let i = 0; i < array.length; ++i) {
        const element = array[i];
        const key = f(element, i);
        if (!result.has(key)) {
            result.set(key, element);
        }
    }

    return result;
}

export function keyFirstByFn<TKey, TElement>(
    f: (element: TElement, index: number) => TKey
): (array: ArrayLike<TElement>) => Map<TKey, TElement> {
    return array => keyFirstBy(array, f);
}

export function keyLastBy<TKey, TElement>(
    array: ArrayLike<TElement>,
    f: (element: TElement, index: number) => TKey
): Map<TKey, TElement> {
    const result = new Map<TKey, TElement>();

    for (let i = 0; i < array.length; ++i) {
        const element = array[i];
        const key = f(element, i);
        result.set(key, element);
    }

    return result;
}

export function keyLastByFn<TKey, TElement>(
    f: (element: TElement, index: number) => TKey
): (array: ArrayLike<TElement>) => Map<TKey, TElement> {
    return array => keyLastBy(array, f);
}

export interface IdentityGrouping<T> {
    readonly identity: (element: T) => unknown;
    readonly hash?: (element: T) => unknown;
}

export interface EqualityGrouping<T> {
    readonly equal: (a: T, b: T) => boolean;
    readonly hash?: (element: T, index: number) => unknown;
}

export interface OrderedGrouping<T> {
    readonly compare: Comparator<T>;
    readonly hash?: (element: T, index: number) => unknown;
}

export interface HashGrouping<T> {
    readonly hash: (element: T, index: number) => unknown;
}

export type Grouping<T> =
    | IdentityGrouping<T>
    | EqualityGrouping<T>
    | OrderedGrouping<T>
    | HashGrouping<T>;

export function group<T>(array: ArrayLike<T>, grouping: Grouping<T>): T[][] {
    if ("identity" in grouping) {
        return groupByIdentity(array, grouping.identity);
    } else if ("compare" in grouping) {
        if (typeof grouping.hash === "function") {
            return groupByOrderWithHash(array, grouping.compare, grouping.hash);
        } else {
            return groupByOrder(array, grouping.compare);
        }
    } else if ("equal" in grouping) {
        if (typeof grouping.hash === "function") {
            return groupByEqualityWithHash(array, grouping.equal, grouping.hash);
        } else {
            return groupByEquality(array, grouping.equal);
        }
    } else {
        return groupByHash(array, grouping.hash);
    }
}

export function groupFn<T>(grouping: Grouping<T>): (array: ArrayLike<T>) => T[][] {
    return array => group(array, grouping);
}

export function groupByIdentity<T>(
    array: ArrayLike<T>,
    identity: (element: T) => unknown = element => element
): T[][] {
    const groups: T[][] = [];
    const map = new Map<unknown, T[]>();
    for (let i = 0; i < array.length; ++i) {
        const element = array[i];
        const key = identity(element);
        const group = map.get(key) ?? [];
        group.push(element);
        if (!map.has(key)) {
            groups.push(group);
            map.set(key, group);
        }
    }
    return groups;
}

export function groupByIdentityFn<T>(
    identity: (element: T) => unknown
): (array: ArrayLike<T>) => T[][] {
    return array => groupByIdentity(array, identity);
}

export function groupByEquality<T>(array: ArrayLike<T>, equal: (a: T, b: T) => boolean): T[][] {
    const result: T[][] = [];

    outer: for (let i = 0; i < array.length; ++i) {
        for (let j = 0; j < result.length; ++j) {
            if (equal(result[j][0], array[i])) {
                result[j].push(array[i]);
                continue outer;
            }
        }

        result.push([array[i]]);
    }

    return result;
}

export function groupByEqualityFn<T>(
    equal: (a: T, b: T) => boolean
): (array: ArrayLike<T>) => T[][] {
    return array => groupByEquality(array, equal);
}

export function groupByOrder<T>(array: ArrayLike<T>, compare: Comparator<T>): T[][] {
    // TODO: This could use a binary tree to be way more efficient
    return groupByEquality(array, (a, b) => compare(a, b) === Comparison.equal);
}

export function groupByOrderFn<T>(compare: Comparator<T>): (array: ArrayLike<T>) => T[][] {
    return array => groupByOrder(array, compare);
}

export function groupByHash<T>(
    array: ArrayLike<T>,
    hash: (element: T, index: number) => unknown
): T[][] {
    const groups = new Map<unknown, T[]>();
    const result: T[][] = [];

    for (let i = 0; i < array.length; ++i) {
        const element = array[i];
        const h = hash(element, i);

        const group = groups.get(h) ?? [];
        if (!groups.has(h)) {
            result.push(group);
            groups.set(h, group);
        }
        group.push(element);
    }

    return result;
}

export function groupByHashFn<T>(
    hash: (element: T, index: number) => unknown
): (array: ArrayLike<T>) => T[][] {
    return array => groupByHash(array, hash);
}

export function groupByEqualityWithHash<T>(
    array: ArrayLike<T>,
    equal: (a: T, b: T) => boolean,
    hash: (element: T, index: number) => unknown
): T[][] {
    const groups = new Map<unknown, T[][]>();
    const result: T[][] = [];

    for (let i = 0; i < array.length; ++i) {
        const element = array[i];
        const h = hash(element, i);

        const hashGroup = groups.get(h) ?? [];
        if (!groups.has(h)) {
            groups.set(h, hashGroup);
        }
        const group = find(hashGroup, group => equal(group[0], element));
        if (group == null) {
            const newGroup = [element];
            hashGroup.push(newGroup);
            result.push(newGroup);
        } else {
            group.push(element);
        }
    }

    return result;
}

export function groupByEqualityWithHashFn<T>(
    equal: (a: T, b: T) => boolean,
    hash: (element: T, index: number) => unknown
): (array: ArrayLike<T>) => T[][] {
    return array => groupByEqualityWithHash(array, equal, hash);
}

export function groupByOrderWithHash<T>(
    array: ArrayLike<T>,
    compare: Comparator<T>,
    hash: (element: T, index: number) => unknown
): T[][] {
    return groupByEqualityWithHash(array, (a, b) => compare(a, b) === Comparison.equal, hash);
}

export function groupByOrderWithHashFn<T>(
    compare: Comparator<T>,
    hash: (element: T, index: number) => unknown
): (array: ArrayLike<T>) => T[][] {
    return array => groupByOrderWithHash(array, compare, hash);
}

export function groupAdjacent<T>(array: ArrayLike<T>, grouping: Grouping<T>): T[][] {
    if ("identity" in grouping) {
        return groupAdjacentByIdentity(array, grouping.identity);
    } else if ("equal" in grouping) {
        return groupAdjacentByEquality(array, grouping.equal);
    } else if ("compare" in grouping) {
        return groupAdjacentByOrder(array, grouping.compare);
    } else {
        return groupByHash(array, grouping.hash);
    }
}

export function groupAdjacentFn<T>(grouping: Grouping<T>): (array: ArrayLike<T>) => T[][] {
    return array => groupAdjacent(array, grouping);
}

export function groupAdjacentByIdentity<T>(
    array: ArrayLike<T>,
    identity?: (element: T) => unknown
): T[][] {
    return identity == null
        ? groupAdjacentByEquality(array, (a, b) => a === b)
        : groupAdjacentByEquality(array, (a, b) => identity(a) === identity(b));
}

export function groupAdjacentByIdentityFn<T>(
    identity: (element: T) => unknown
): (array: ArrayLike<T>) => T[][] {
    return array => groupAdjacentByEquality(array, (a, b) => identity(a) === identity(b));
}

export function groupAdjacentByEquality<T>(
    array: ArrayLike<T>,
    equal: (a: T, b: T) => boolean
): T[][] {
    if (array.length === 0) {
        return [];
    }

    let element: T = array[0];
    let group: T[] = [element];
    const result: T[][] = [group];

    for (let i = 1; i < array.length; ++i) {
        const prev = element;
        element = array[i];
        if (equal(prev, element)) {
            group.push(element);
        } else {
            group = [element];
            result.push(group);
        }
    }

    return result;
}

export function groupAdjacentByEqualityFn<T>(
    equal: (a: T, b: T) => boolean
): (array: ArrayLike<T>) => T[][] {
    return array => groupAdjacentByEquality(array, equal);
}

export function groupAdjacentByOrder<T>(array: ArrayLike<T>, compare: Comparator<T>): T[][] {
    return groupAdjacentByEquality(array, (a, b) => compare(a, b) === Comparison.equal);
}

export function groupAdjacentByOrderFn<T>(compare: Comparator<T>): (array: ArrayLike<T>) => T[][] {
    return array => groupAdjacentByOrder(array, compare);
}

export function groupAdjacentByHash<T>(
    array: ArrayLike<T>,
    hash: (element: T, index: number) => unknown
): T[][] {
    if (array.length === 0) {
        return [];
    }

    const element = array[0];
    let h = hash(element, 0);
    let group: T[] = [element];
    const result: T[][] = [group];

    for (let i = 1; i < array.length; ++i) {
        const element = array[i];
        const h1 = hash(element, i);
        if (h === h1) {
            group.push(element);
        } else {
            h = h1;
            group = [element];
            result.push(group);
        }
    }

    return result;
}

export function groupAdjacentByHashFn<T>(
    hash: (element: T, index: number) => unknown
): (array: ArrayLike<T>) => T[][] {
    return array => groupAdjacentByHash(array, hash);
}

export function unique<T>(array: ArrayLike<T>, grouping: Grouping<T>): T[] {
    if ("identity" in grouping) {
        return uniqueByIdentityInternal(array, grouping.identity);
    } else if ("compare" in grouping) {
        if (typeof grouping.hash === "function") {
            return uniqueByOrderWithHash(array, grouping.compare, grouping.hash);
        } else {
            return uniqueByOrder(array, grouping.compare);
        }
    } else if ("equal" in grouping) {
        if (typeof grouping.hash === "function") {
            return uniqueByEqualityWithHash(array, grouping.equal, grouping.hash);
        } else {
            return uniqueByEquality(array, grouping.equal);
        }
    } else {
        return uniqueByHash(array, grouping.hash);
    }
}

export function uniqueFn<T>(grouping: Grouping<T>): (array: ArrayLike<T>) => T[] {
    return array => unique(array, grouping);
}

export function uniqueByIdentity<T>(array: ArrayLike<T>, identity?: (element: T) => unknown): T[] {
    return uniqueByIdentityInternal(array, identity ?? (element => element));
}

function uniqueByIdentityInternal<T>(array: ArrayLike<T>, identity: (element: T) => unknown): T[] {
    const set = new Set<unknown>();
    const result: T[] = [];
    for (let i = 0; i < array.length; ++i) {
        const element = array[i];
        if (!set.has(identity(element))) {
            set.add(identity(element));
            result.push(element);
        }
    }
    return result;
}

export function uniqueByEquality<T>(array: ArrayLike<T>, equal: (a: T, b: T) => boolean): T[] {
    const result: T[] = [];

    outer: for (let i = 0; i < array.length; ++i) {
        const element = array[i];
        for (let j = 0; j < result.length; ++j) {
            if (equal(element, result[j])) {
                continue outer;
            }
        }
        result.push(element);
    }

    return result;
}

export function uniqueByEqualityFn<T>(
    equal: (a: T, b: T) => boolean
): (array: ArrayLike<T>) => T[] {
    return array => uniqueByEquality(array, equal);
}

export function uniqueByOrder<T>(array: ArrayLike<T>, compare: Comparator<T>): T[] {
    return uniqueByEquality(array, (a, b) => compare(a, b) === Comparison.equal);
}

export function uniqueByOrderFn<T>(compare: Comparator<T>): (array: ArrayLike<T>) => T[] {
    // TODO: This could use a binary tree to be more efficient
    return array => uniqueByOrder(array, compare);
}

export function uniqueByHash<T>(
    array: ArrayLike<T>,
    hash: (element: T, index: number) => unknown
): T[] {
    const seen = new Set<unknown>();
    const result: T[] = [];

    for (let i = 0; i < array.length; ++i) {
        const element = array[i];
        const h = hash(element, i);
        if (!seen.has(h)) {
            seen.add(h);
            result.push(element);
        }
    }

    return result;
}

export function uniqueByHashFn<T>(
    hash: (element: T, index: number) => unknown
): (array: ArrayLike<T>) => T[] {
    return array => uniqueByHash(array, hash);
}

export function uniqueByEqualityWithHash<T>(
    array: ArrayLike<T>,
    equal: (a: T, b: T) => boolean,
    hash: (element: T, index: number) => unknown
): T[] {
    const seenGroups = new Map<unknown, T[]>();
    const result: T[] = [];

    for (let i = 0; i < array.length; ++i) {
        const element = array[i];
        const h = hash(element, i);

        const seenGroup = seenGroups.get(h) ?? [];

        if (!seenGroups.has(h)) {
            seenGroups.set(h, seenGroup);
        }

        if (all(seenGroup, seenElement => !equal(seenElement, element))) {
            seenGroup.push(element);
            result.push(element);
        }
    }

    return result;
}

export function uniqueByEqualityWithHashFn<T>(
    equal: (a: T, b: T) => boolean,
    hash: (element: T, index: number) => unknown
): (array: ArrayLike<T>) => T[] {
    return array => uniqueByEqualityWithHash(array, equal, hash);
}

export function uniqueByOrderWithHash<T>(
    array: ArrayLike<T>,
    compare: Comparator<T>,
    hash: (element: T, index: number) => unknown
): T[] {
    return uniqueByEqualityWithHash(array, (a, b) => compare(a, b) === Comparison.equal, hash);
}

export function uniqueByOrderWithHashFn<T>(
    compare: Comparator<T>,
    hash: (element: T, index: number) => unknown
): (array: ArrayLike<T>) => T[] {
    return array => uniqueByOrderWithHash(array, compare, hash);
}

export function uniqueAdjacent<T>(array: ArrayLike<T>, grouping: Grouping<T>): T[] {
    if ("identity" in grouping) {
        return uniqueAdjacentByIdentity(array, grouping.identity);
    } else if ("equal" in grouping) {
        return uniqueAdjacentByEquality(array, grouping.equal);
    } else if ("compare" in grouping) {
        return uniqueAdjacentByOrder(array, grouping.compare);
    } else {
        return uniqueAdjacentByHash(array, grouping.hash);
    }
}

export function uniqueAdjacentFn<T>(grouping: Grouping<T>): (array: ArrayLike<T>) => T[] {
    return array => uniqueAdjacent(array, grouping);
}

export function uniqueAdjacentByIdentity<T>(
    array: ArrayLike<T>,
    identity?: (element: T) => unknown
): T[] {
    return identity == null
        ? uniqueAdjacentByEquality(array, (a, b) => a === b)
        : uniqueAdjacentByEquality(array, (a, b) => identity(a) === identity(b));
}

export function uniqueAdjacentByIdentityFn<T>(
    identity: (element: T) => unknown
): (array: ArrayLike<T>) => T[] {
    return array => uniqueAdjacentByIdentity(array, identity);
}

export function uniqueAdjacentByEquality<T>(
    array: ArrayLike<T>,
    equal: (a: T, b: T) => boolean
): T[] {
    if (array.length === 0) {
        return [];
    }

    let element: T = array[0];
    const result = [element];

    for (let i = 1; i < array.length; ++i) {
        const prev = element;
        element = array[i];
        if (!equal(prev, element)) {
            result.push(element);
        }
    }

    return result;
}

export function uniqueAdjacentByEqualityFn<T>(
    equal: (a: T, b: T) => boolean
): (array: ArrayLike<T>) => T[] {
    return array => uniqueAdjacentByEquality(array, equal);
}

export function uniqueAdjacentByOrder<T>(array: ArrayLike<T>, compare: Comparator<T>): T[] {
    return uniqueAdjacentByEquality(array, (a, b) => compare(a, b) === Comparison.equal);
}

export function uniqueAdjacentByOrderFn<T>(compare: Comparator<T>): (array: ArrayLike<T>) => T[] {
    return array => uniqueAdjacentByOrder(array, compare);
}

export function uniqueAdjacentByHash<T>(
    array: ArrayLike<T>,
    hash: (element: T, index: number) => unknown
): T[] {
    if (array.length === 0) {
        return [];
    }

    const element = array[0];
    let h = hash(element, 0);
    const result = [element];

    for (let i = 1; i < array.length; ++i) {
        const element = array[i];
        const h1 = hash(element, i);
        if (h !== h1) {
            h = h1;
            result.push(element);
        }
    }

    return result;
}

export function uniqueAdjacentByHashFn<T>(
    hash: (element: T, index: number) => unknown
): (array: ArrayLike<T>) => T[] {
    return array => uniqueAdjacentByHash(array, hash);
}

export function shuffle<T>(array: ArrayLike<T>): T[] {
    const result = copy(array);
    for (let i = 0; i < array.length; ++i) {
        const j = i + Math.floor(Math.random() * (array.length - i));
        const replacement = result[j];
        result[j] = result[i];
        result[i] = replacement;
    }
    return result;
}

export function forEach<T>(
    array: ArrayLike<T>,
    f: (element: T, index: number) => void
): typeof array {
    for (let i = 0; i < array.length; ++i) {
        f(array[i], i);
    }
    return array;
}

export function forEachFn<T>(
    f: (element: T, index: number) => void
): (array: ArrayLike<T>) => typeof array {
    return array => forEach(array, f);
}
