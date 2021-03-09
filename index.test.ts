import test from "ava";
import {
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
    fold,
    fold1,
    foldMap,
    forEach,
    groupByIdentity,
    head,
    initial,
    isArray,
    isArrayLike,
    last,
    map,
    maximum,
    minimum,
    partition,
    partitionWhile,
    remove,
    removeFirst,
    slice,
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

test("head", t => {
    t.is(head([1, 2, 3]), 1);
    t.is(head([]), null);
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

type Result<T> = Success<T> | Error;

interface Success<T> {
    type: "success";
    value: T;
}

interface Error {
    type: "error";
}

function isSuccess<T>(result: Result<T>): result is Success<T> {
    return result.type === "success";
}

test("groupByIdentity", t => {
    t.deepEqual(
        groupByIdentity(["abc", "adef", "bghi"], a => a.substr(0, 1)),
        [["abc", "adef"], ["bghi"]]
    );
});

test("partition", t => {
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

test("forEach", t => {
    const a = ["a", "b", "c"];
    let s = "";
    const b = forEach(a, c => (s += c));
    t.is(b, a);
    t.is(s, "abc");
});
