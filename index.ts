import {dictionary} from "@softwareventures/dictionary";
import {Comparator, compare as defaultCompare, Comparison} from "@softwareventures/ordered";
import {Dictionary, Key} from "dictionary-types";

// eslint-disable-next-line @typescript-eslint/unbound-method
const nativeSlice = Array.prototype.slice;

// eslint-disable-next-line @typescript-eslint/unbound-method
const nativeConcat = Array.prototype.concat;

// eslint-disable-next-line @typescript-eslint/unbound-method
const nativeMap = Array.prototype.map;

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

export const copy: <T>(array: ArrayLike<T>) => T[] =
    Array.from ?? (array => nativeSlice.call(array));

// eslint-disable-next-line @typescript-eslint/unbound-method
const toString = Object.prototype.toString;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore duplicate identifier: This is the exported declaration, the implementation is below.
export function isArray<T = unknown>(value: readonly T[] | unknown): value is readonly T[];

/** @internal This implementation is for internal use only, the exported declaration is above */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore duplicate identifier: This is the actual implementation, the exported declaration is above.
export const isArray: (value: any) => value is any[] =
    Array.isArray ?? (((value: any) => toString.call(value) === "[object Array]") as any);

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

export function head<T>(array: ArrayLike<T>): T | null {
    return array.length === 0 ? null : array[0];
}

export function tail<T>(array: ArrayLike<T>): T[] {
    return nativeSlice.call(array, 1);
}

export function initial<T>(array: ArrayLike<T>): T[] {
    return array.length === 0 ? [] : nativeSlice.call(array, array.length - 1);
}

export function last<T>(array: ArrayLike<T>): T | null {
    return array.length === 0 ? null : array[array.length - 1];
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

export const map: <T, U>(array: ArrayLike<T>, f: (element: T, index: number) => U) => U[] =
    Array.from != null
        ? (Array.from as any) // TypeScript 3.2 incorrectly requires this cast to any.
        : (array, f) => nativeMap.call(array, f);

export function mapFn<T, U>(f: (element: T, index: number) => U): (array: ArrayLike<T>) => U[] {
    return array => map(array, f);
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
    return array => filter(array, predicate);
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

export const findIndex: <T>(
    array: ArrayLike<T>,
    predicate: (element: T, index: number) => boolean
) => number | null =
    nativeFindIndex == null
        ? (array, predicate) => {
              for (let i = 0; i < array.length; ++i) {
                  if (predicate(array[i], i)) {
                      return i;
                  }
              }
              return null;
          }
        : (array, predicate) => {
              const index = nativeFindIndex.call(array, predicate);
              return index === -1 ? null : index;
          };

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
    return any(array, e => e == null) ? null : (array as ArrayLike<T>);
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

export function keyBy<TElement, TKey extends Key>(
    array: ArrayLike<TElement>,
    f: (element: TElement, index: number) => TKey
): Dictionary<TElement[], TKey> {
    const result = dictionary<TElement[], TKey>();

    for (let i = 0; i < array.length; ++i) {
        const element = array[i];
        const key = f(element, i);
        const group = result[key] || [];
        group.push(element);
        result[key] = group;
    }

    return result;
}

export function keyByFn<TElement, TKey extends Key>(
    f: (element: TElement, index: number) => TKey
): (array: ArrayLike<TElement>) => Dictionary<TElement[], TKey> {
    return array => keyBy(array, f);
}

export function keyFirstBy<TElement, TKey extends Key>(
    array: ArrayLike<TElement>,
    f: (element: TElement, index: number) => TKey
): Dictionary<TElement, TKey> {
    const result = dictionary<TElement, TKey>();

    for (let i = 0; i < array.length; ++i) {
        const element = array[i];
        const key = f(element, i);
        if (!(key in result)) {
            result[key] = element;
        }
    }

    return result;
}

export function keyFirstByFn<TElement, TKey extends Key>(
    f: (element: TElement, index: number) => TKey
): (array: ArrayLike<TElement>) => Dictionary<TElement, TKey> {
    return array => keyFirstBy(array, f);
}

export function keyLastBy<TElement, TKey extends Key>(
    array: ArrayLike<TElement>,
    f: (element: TElement, index: number) => TKey
): Dictionary<TElement, TKey> {
    const result = dictionary<TElement, TKey>();

    for (let i = 0; i < array.length; ++i) {
        const element = array[i];
        result[f(element, i)] = element;
    }

    return result;
}

export function keyLastByFn<TElement, TKey extends Key>(
    f: (element: TElement, index: number) => TKey
): (array: ArrayLike<TElement>) => Dictionary<TElement, TKey> {
    return array => keyLastBy(array, f);
}

export interface IdentityGrouping<T> {
    readonly identity: (element: T) => unknown;
    readonly hash?: (element: T) => Key;
}

export interface EqualityGrouping<T> {
    readonly equal: (a: T, b: T) => boolean;
    readonly hash?: (element: T, index: number) => Key;
}

export interface OrderedGrouping<T> {
    readonly compare: Comparator<T>;
    readonly hash?: (element: T, index: number) => Key;
}

export interface HashGrouping<T> {
    readonly hash: (element: T, index: number) => Key;
}

export type Grouping<T> =
    | IdentityGrouping<T>
    | EqualityGrouping<T>
    | OrderedGrouping<T>
    | HashGrouping<T>;

export function group<T>(array: ArrayLike<T>, grouping: Grouping<T>): T[][] {
    if ("identity" in grouping) {
        if (typeof grouping.hash === "function") {
            return groupByIdentityWithHash(array, grouping.identity, grouping.hash);
        } else {
            return groupByIdentity(array, grouping.identity);
        }
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

export function groupByIdentity<T>(array: ArrayLike<T>, identity?: (element: T) => unknown): T[][] {
    return groupByIdentityInternal(array, identity ?? (element => element));
}

const groupByIdentityInternal =
    Map == null
        ? <T>(array: ArrayLike<T>, identity: (element: T) => unknown): T[][] =>
              groupByEquality(array, (a, b) => identity(a) === identity(b))
        : <T>(array: ArrayLike<T>, identity: (element: T) => unknown): T[][] => {
              const groups: T[][] = [];
              const map = new Map<unknown, T[]>();
              for (let i = 0; i < array.length; ++i) {
                  const element = array[i];
                  const key = identity(element);
                  const group = map.get(key) ?? [];
                  group.push(element);
                  if (map.has(key)) {
                      groups.push(group);
                      map.set(key, group);
                  }
              }
              return groups;
          };

export function groupByIdentityFn<T>(
    identity: (element: T) => unknown
): (array: ArrayLike<T>) => T[][] {
    return array => groupByIdentityInternal(array, identity);
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
    hash: (element: T, index: number) => Key
): T[][] {
    const groups = dictionary<T[], Key>();
    const result: T[][] = [];

    for (let i = 0; i < array.length; ++i) {
        const element = array[i];
        const h = hash(element, i);

        if (h in groups) {
            groups[h as any].push(element); // Cast to any because TypeScript doesn't support symbol indexers yet
        } else {
            const group = [element];
            groups[h as any] = group; // Cast to any because TypeScript doesn't support symbol indexers yet
            result.push(group);
        }
    }

    return result;
}

export function groupByHashFn<T>(
    hash: (element: T, index: number) => Key
): (array: ArrayLike<T>) => T[][] {
    return array => groupByHash(array, hash);
}

export const groupByIdentityWithHash =
    Map == null
        ? <T>(
              array: ArrayLike<T>,
              identity: (element: T) => unknown,
              hash: (element: T, index: number) => Key
          ): T[][] => groupByEqualityWithHash(array, (a, b) => identity(a) === identity(b), hash)
        : groupByIdentityInternal;

export function groupByIdentityWithHashFn<T>(
    identity: (element: T) => unknown,
    hash: (element: T, index: number) => Key
): (array: ArrayLike<T>) => T[][] {
    return array => groupByIdentityWithHash(array, identity, hash);
}

export function groupByEqualityWithHash<T>(
    array: ArrayLike<T>,
    equal: (a: T, b: T) => boolean,
    hash: (element: T, index: number) => Key
): T[][] {
    const groups = dictionary<T[][], Key>();
    const result: T[][] = [];

    outer: for (let i = 0; i < array.length; ++i) {
        const element = array[i];
        const h = hash(element, i);

        if (h in groups) {
            const hashGroups = groups[h as any]; // Cast to any because TypeScript doesn't support symbol indexers yet
            for (let j = 0; j < hashGroups.length; ++j) {
                if (equal(hashGroups[j][0], element)) {
                    hashGroups[j].push(element);
                    continue outer;
                }
            }

            const group = [element];
            hashGroups.push(group);
            result.push(group);
        } else {
            const group = [element];
            groups[h as any] = [group]; // Cast to any because TypeScript doesn't support symbol indexers yet
            result.push(group);
        }
    }

    return result;
}

export function groupByEqualityWithHashFn<T>(
    equal: (a: T, b: T) => boolean,
    hash: (element: T, index: number) => Key
): (array: ArrayLike<T>) => T[][] {
    return array => groupByEqualityWithHash(array, equal, hash);
}

export function groupByOrderWithHash<T>(
    array: ArrayLike<T>,
    compare: Comparator<T>,
    hash: (element: T, index: number) => Key
): T[][] {
    return groupByEqualityWithHash(array, (a, b) => compare(a, b) === Comparison.equal, hash);
}

export function groupByOrderWithHashFn<T>(
    compare: Comparator<T>,
    hash: (element: T, index: number) => Key
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
    hash: (element: T, index: number) => Key
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
    hash: (element: T, index: number) => string
): (array: ArrayLike<T>) => T[][] {
    return array => groupAdjacentByHash(array, hash);
}

export function unique<T>(array: ArrayLike<T>, grouping: Grouping<T>): T[] {
    if ("identity" in grouping) {
        if (typeof grouping.hash === "function") {
            return uniqueByIdentityWithHash(array, grouping.identity, grouping.hash);
        } else {
            return uniqueByIdentityInternal(array, grouping.identity);
        }
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

const uniqueByIdentityInternal =
    Set == null
        ? <T>(array: ArrayLike<T>, identity: (element: T) => unknown): T[] =>
              uniqueByEquality(array, (a, b) => identity(a) === identity(b))
        : <T>(array: ArrayLike<T>, identity: (element: T) => unknown): T[] => {
              const seen = new Set<T>();
              const result: T[] = [];
              for (let i = 0; i < array.length; ++i) {
                  const element = array[i];
                  if (!seen.has(element)) {
                      seen.add(element);
                      result.push(element);
                  }
              }
              return result;
          };

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
    hash: (element: T, index: number) => Key
): T[] {
    const seen = dictionary<boolean, Key>();
    const result: T[] = [];

    for (let i = 0; i < array.length; ++i) {
        const element = array[i];
        const h = hash(element, i);
        if (seen[h as any] == null) {
            // Cast to any because TypeScript doesn't support symbol indexers yet
            seen[h as any] = true;
            result.push(element);
        }
    }

    return result;
}

export function uniqueByHashFn<T>(
    hash: (element: T, index: number) => Key
): (array: ArrayLike<T>) => T[] {
    return array => uniqueByHash(array, hash);
}

export const uniqueByIdentityWithHash =
    Set == null
        ? <T>(
              array: ArrayLike<T>,
              identity: (element: T) => unknown,
              hash: (element: T, index: number) => Key
          ): T[] => uniqueByEqualityWithHash(array, (a, b) => identity(a) === identity(b), hash)
        : uniqueByIdentityInternal;

export function uniqueByIdentityWithHashFn<T>(
    identity: (element: T) => unknown,
    hash: (element: T, index: number) => Key
): (array: ArrayLike<T>) => T[] {
    return array => uniqueByIdentityWithHash(array, identity, hash);
}

export function uniqueByEqualityWithHash<T>(
    array: ArrayLike<T>,
    equal: (a: T, b: T) => boolean,
    hash: (element: T, index: number) => Key
): T[] {
    const seenGroups = dictionary<T[], Key>();
    const result: T[] = [];

    outer: for (let i = 0; i < array.length; ++i) {
        const element = array[i];
        const h = hash(element, i);

        const seenGroup = seenGroups[h as any]; // Cast to any because TypeScript doesn't support symbol indexers yet
        if (seenGroup == null) {
            seenGroups[h as any] = [element];
            result.push(element);
        } else {
            for (let j = 0; j < seenGroup.length; ++j) {
                if (equal(seenGroup[j], element)) {
                    continue outer;
                }
            }

            seenGroup.push(element);
            result.push(element);
        }
    }

    return result;
}

export function uniqueByEqualityWithHashFn<T>(
    equal: (a: T, b: T) => boolean,
    hash: (element: T, index: number) => Key
): (array: ArrayLike<T>) => T[] {
    return array => uniqueByEqualityWithHash(array, equal, hash);
}

export function uniqueByOrderWithHash<T>(
    array: ArrayLike<T>,
    compare: Comparator<T>,
    hash: (element: T, index: number) => Key
): T[] {
    return uniqueByEqualityWithHash(array, (a, b) => compare(a, b) === Comparison.equal, hash);
}

export function uniqueByOrderWithHashFn<T>(
    compare: Comparator<T>,
    hash: (element: T, index: number) => Key
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
    hash: (element: T, index: number) => Key
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
    hash: (element: T, index: number) => Key
): (array: ArrayLike<T>) => T[] {
    return array => uniqueAdjacentByHash(array, hash);
}

export function shuffle<T>(array: readonly T[]): T[] {
    const result = copy(array);
    for (let i = 0; i < array.length; ++i) {
        const j = i + Math.floor(Math.random() * (array.length - i));
        const replacement = result[j];
        result[j] = result[i];
        result[i] = replacement;
    }
    return result;
}
