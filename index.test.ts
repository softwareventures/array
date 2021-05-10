import test from "ava";
import {
    all,
    and,
    any,
    append,
    concat,
    concatMap,
    contains,
    dropWhile,
    empty,
    exclude,
    excludeFirst,
    excludeNull,
    filter,
    filterFirst,
    find,
    findIndex,
    first,
    fold,
    fold1,
    foldMap,
    forEach,
    groupByIdentity,
    initial,
    isArray,
    isArrayLike,
    keyBy,
    keyFirstBy,
    keyLastBy,
    last,
    map,
    mapKeyBy,
    mapKeyFirstBy,
    maximum,
    minimum,
    or,
    partition,
    partitionWhile,
    prepend,
    product,
    remove,
    removeFirst,
    scan,
    scan1,
    scanRight,
    scanRight1,
    slice,
    split,
    sum,
    tail,
    takeWhile
} from "./index";

test("isArray", t => {
    t.true(isArray([1, 2, 3]));
    t.false(isArray({length: 3}));
});

test("isArrayLike", t => {
    t.true(isArrayLike([1, 2, 3]));
    t.true(isArrayLike({length: 3}));
    t.false(isArrayLike({}));
    t.false(isArrayLike(3));
});

test("first", t => {
    t.is(first([1, 2, 3]), 1);
    t.is(first([]), null);
});

test("tail", t => {
    t.deepEqual(tail([1, 2, 3, 4]), [2, 3, 4]);
    t.deepEqual(tail([]), []);
});

test("initial", t => {
    t.deepEqual(initial([1, 2, 3, 4]), [1, 2, 3]);
    t.deepEqual(initial([]), []);
});

test("last", t => {
    t.is(last([]), null);
    t.is(last([1, 2, 3]), 3);
});

test("empty", t => {
    t.true(empty([]));
    t.false(empty([1, 2, 3]));
});

test("slice", t => {
    t.deepEqual(slice([1, 2, 3, 4], 1), [2, 3, 4]);
    t.deepEqual(slice([1, 2, 3, 4, 5], 1, 4), [2, 3, 4]);
    t.deepEqual(slice([1, 2, 3], 2), [3]);
    t.deepEqual(slice([1, 2, 3], 0, 2), [1, 2]);
    t.deepEqual(slice([], 3, 5), []);
});

test("takeWhile", t => {
    t.deepEqual(
        takeWhile([1, 2, 3, 4, 3, 2, 1], e => e < 4),
        [1, 2, 3]
    );
    t.deepEqual(
        takeWhile([1, 2, 3], (_, i) => i < 2),
        [1, 2]
    );
});

test("dropWhile", t => {
    t.deepEqual(
        dropWhile([1, 2, 3, 4, 3, 2, 1], e => e < 4),
        [4, 3, 2, 1]
    );
    t.deepEqual(
        dropWhile([1, 2, 3], (_, i) => i < 2),
        [3]
    );
});

test("map", t => {
    t.deepEqual(
        map([1, 2, 3], e => e + 1),
        [2, 3, 4]
    );
    t.deepEqual(
        map([1, 2, 3], (e, i) => (i === 1 ? e * 10 : e)),
        [1, 20, 3]
    );
});

test("filter", t => {
    t.deepEqual(
        filter([1, 2, 3], e => e % 2 === 1),
        [1, 3]
    );
    t.deepEqual(
        filter([1, 3, 2, 4, 5], (_, i) => i % 2 === 0),
        [1, 2, 5]
    );
});

test("filterFirst", t => {
    t.deepEqual(
        filterFirst([1, 2, 3, 4, 3, 2, 1], n => n < 3),
        [1, 2, 4, 3, 2, 1]
    );
});

test("exclude", t => {
    t.deepEqual(
        exclude([1, 2, 3, 4, 3, 2, 1], n => n < 3),
        [3, 4, 3]
    );
});

test("excludeNull", t => {
    t.deepEqual(excludeNull(["a", null, "b"]), ["a", "b"]);
});

test("excludeFirst", t => {
    t.deepEqual(
        excludeFirst([1, 2, 3, 4, 3, 2, 1], n => n > 2),
        [1, 2, 4, 3, 2, 1]
    );
});

test("remove", t => {
    t.deepEqual(remove([1, 2, 3, 4, 3, 2, 1], 3), [1, 2, 4, 2, 1]);
});

test("removeFirst", t => {
    t.deepEqual(removeFirst([1, 2, 3, 4, 3, 2, 1], 3), [1, 2, 4, 3, 2, 1]);
});

test("fold", t => {
    t.is(
        fold([1, 2, 3], (a, e, i) => a + e * i, 0),
        8
    );
});

test("fold1", t => {
    t.is(
        fold1([1, 2, 3], (a, e, i) => a + e * i),
        9
    );
});

test("foldMap", t => {
    t.is(
        foldMap(["2", "3", "4"], (a, b) => a + b, parseFloat, 2),
        11
    );
    t.is(
        foldMap(
            [true, false, false],
            (a, b) => a.substr(0, a.length - 1) + b.substr(1),
            String,
            "jam"
        ),
        "jarualsalse"
    );
    t.is(
        foldMap(["2"], (a, b) => a + b, parseFloat, 0),
        2
    );
});

test("contains", t => {
    t.true(contains([1, 2, 3], 1));
    t.false(contains([1, 2, 3], 0));
});

test("findIndex", t => {
    t.is(
        findIndex([1, 2, 3, 4, 3, 2, 1], n => n >= 3),
        2
    );
});

test("find", t => {
    t.is(
        find([1, 2, 3, 4, 3, 2, 1], n => n >= 3),
        3
    );
});

test("maximum", t => {
    t.is(maximum([1, 2, 3]), 3);
    t.is(maximum([1, 2, 3, 4, 3, 2, 1]), 4);
    t.is(maximum([]), null);
});

test("minimum", t => {
    t.is(minimum([1, 2, 3]), 1);
    t.is(minimum([2, 3, 4, 1, 2, 3]), 1);
    t.is(minimum([]), null);
});

test("sum", t => {
    t.is(sum([1, 2, 3]), 6);
    t.is(sum([]), 0);
});

test("product", t => {
    t.is(product([1, 2, 3]), 6);
    t.is(product([]), 1);
});

test("and", t => {
    t.true(and([true, true, true]));
    t.false(and([true, false, true]));
    t.true(and([]));
});

test("or", t => {
    t.true(or([true, false, true]));
    t.false(or([false, false, false]));
    t.false(or([]));
});

test("any", t => {
    t.true(any([1, 2, 3], e => e > 2));
    t.false(any([1, 2, 3], e => e > 4));
});

test("all", t => {
    t.true(all([1, 2, 3], e => e < 4));
    t.false(all([1, 2, 3], e => e > 2));
});

test("concat", t => {
    t.deepEqual(concat([[1, 2], [], [3], [4, 5]]), [1, 2, 3, 4, 5]);
    t.deepEqual(concat([[], []]), []);
});

test("prepend", t => {
    t.deepEqual(prepend([1, 2, 3])([4, 5, 6]), [1, 2, 3, 4, 5, 6]);
    t.deepEqual(prepend<number>([])([4, 5, 6]), [4, 5, 6]);
    t.deepEqual(prepend([1, 2, 3])([]), [1, 2, 3]);
});

test("append", t => {
    t.deepEqual(append([4, 5, 6])([1, 2, 3]), [1, 2, 3, 4, 5, 6]);
    t.deepEqual(append<number>([])([1, 2, 3]), [1, 2, 3]);
    t.deepEqual(append([4, 5, 6])([]), [4, 5, 6]);
});

test("concatMap", t => {
    t.deepEqual(
        concatMap(["1,2,3", "4,5,6"], s => s.split(",")),
        ["1", "2", "3", "4", "5", "6"]
    );
});

test("scan", t => {
    t.deepEqual(
        scan([1, 2, 3], (a, e, i) => a + e * i, 0),
        [0, 2, 8]
    );
    t.deepEqual(
        scan(["a", "b", "c"], (a, e, i) => `${a} ${i} ${e}`, "_"),
        ["_ 0 a", "_ 0 a 1 b", "_ 0 a 1 b 2 c"]
    );
});

test("scan1", t => {
    t.deepEqual(
        scan1([1, 2, 3], (a, e, i) => a + e * i),
        [1, 3, 9]
    );
});

test("scanRight", t => {
    t.deepEqual(
        scanRight(["a", "b", "c"], (a, e, i) => `${a} ${i} ${e}`, "_"),
        ["_ 2 c 1 b 0 a", "_ 2 c 1 b", "_ 2 c"]
    );
});

test("scanRight1", t => {
    t.deepEqual(
        scanRight1(["a", "b", "c"], (a, e, i) => `${a} ${i} ${e}`),
        ["c 1 b 0 a", "c 1 b", "c"]
    );
});

type Result<T> = Success<T> | Error;

interface Success<T> {
    type: "success";
    value: T;
}

interface Error {
    type: "error";
}

test("split", t => {
    t.deepEqual(split([2, 1, 3, 4, 5, 6], 2), [
        [2, 1],
        [3, 4, 5, 6]
    ]);
    t.deepEqual(split([2, 1, 3, 4, 5, 6], 0), [[], [2, 1, 3, 4, 5, 6]]);
    t.deepEqual(split([2, 1, 3, 4, 5, 6], 10), [[2, 1, 3, 4, 5, 6], []]);
});

function isSuccess<T>(result: Result<T>): result is Success<T> {
    return result.type === "success";
}

test("partition", t => {
    t.deepEqual(
        partition([2, 1, 3, 4, 5, 6], e => e % 2 === 1),
        [
            [1, 3, 5],
            [2, 4, 6]
        ]
    );

    t.deepEqual(
        partition(["abc", "def", "ghi"], (_: string, i: number) => i % 2 === 0),
        [["abc", "ghi"], ["def"]]
    );

    const results: Array<Result<string>> = [
        {type: "success", value: "hello"},
        {type: "error"},
        {type: "success", value: "goodbye"}
    ];

    const partitionedResults: [Array<Success<string>>, Error[]] = partition(results, isSuccess);

    t.deepEqual(partitionedResults, [
        [
            {type: "success", value: "hello"},
            {type: "success", value: "goodbye"}
        ],
        [{type: "error"}]
    ]);
});

test("partitionWhile", t => {
    t.deepEqual(
        partitionWhile([1, 3, 2, 4, 5, 6], e => e % 2 === 1),
        [
            [1, 3],
            [2, 4, 5, 6]
        ]
    );

    t.deepEqual(
        partitionWhile(["abc", "def", "ghi"], (_: string, i: number) => i % 2 === 0),
        [["abc"], ["def", "ghi"]]
    );

    const results: Array<Result<string>> = [
        {type: "success", value: "hello"},
        {type: "error"},
        {type: "success", value: "goodbye"}
    ];

    const partitionedResults: [Array<Success<string>>, Array<Result<string>>] = partitionWhile(
        results,
        isSuccess
    );

    t.deepEqual(partitionedResults, [
        [{type: "success", value: "hello"}],
        [{type: "error"}, {type: "success", value: "goodbye"}]
    ]);
});

test("keyBy", t => {
    const map = keyBy([1, 3, 4, 2, 5, 6], e => (e % 2 === 0 ? "even" : "odd"));
    t.deepEqual(map.get("even"), [4, 2, 6]);
    t.deepEqual(map.get("odd"), [1, 3, 5]);
    t.deepEqual(Array.from(map.keys()), ["odd", "even"]);
});

test("keyFirstBy", t => {
    const map = keyFirstBy([1, 3, 4, 2, 5, 6], e => (e % 2 === 0 ? "even" : "odd"));
    t.is(map.get("even"), 4);
    t.is(map.get("odd"), 1);
    t.deepEqual(Array.from(map.keys()), ["odd", "even"]);
});

test("keyLastBy", t => {
    const map = keyLastBy([1, 3, 4, 2, 5, 6], e => (e % 2 === 0 ? "even" : "odd"));
    t.is(map.get("even"), 6);
    t.is(map.get("odd"), 5);
    t.deepEqual(Array.from(map.keys()), ["odd", "even"]);
});

test("mapKeyBy", t => {
    const map = mapKeyBy([1, 3, 4, 2, 5, 6], e => [e % 2 === 0 ? "even" : "odd", String(e)]);
    t.deepEqual(map.get("even"), ["4", "2", "6"]);
    t.deepEqual(map.get("odd"), ["1", "3", "5"]);
    t.deepEqual(Array.from(map.keys()), ["odd", "even"]);
});

test("groupByIdentity", t => {
    t.deepEqual(
        groupByIdentity(["abc", "adef", "bghi"], a => a.substr(0, 1)),
        [["abc", "adef"], ["bghi"]]
    );
});

test("forEach", t => {
    const a = ["a", "b", "c"];
    let s = "";
    const b = forEach(a, c => (s += c));
    t.is(b, a);
    t.is(s, "abc");
});

test("mapKeyFirstBy", t => {
    const map = mapKeyFirstBy([1, 3, 4, 2, 5, 6], e => [e % 2 === 0 ? "even" : "odd", String(e)]);
    t.is(map.get("even"), "4");
    t.is(map.get("odd"), "1");
    t.deepEqual(Array.from(map.keys()), ["odd", "even"]);
});
