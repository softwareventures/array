import test from "ava";
import {
    empty,
    exclude,
    excludeFirst,
    excludeNull,
    filterFirst,
    find,
    findIndex,
    fold1,
    foldMap,
    forEach,
    groupByIdentity,
    head,
    initial,
    isArray,
    isArrayLike,
    last,
    partition,
    partitionWhile,
    remove,
    removeFirst,
    slice,
    tail
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
    t.is(1, head([1, 2, 3]));
    t.is(null, head([]));
});

test("tail", t => {
    t.deepEqual([2, 3, 4], tail([1, 2, 3, 4]));
    t.deepEqual([], tail([]));
});

test("initial", t => {
    t.deepEqual([1, 2, 3], initial([1, 2, 3, 4]));
    t.deepEqual([], initial([]));
});

test("last", t => {
    t.is(null, last([]));
    t.is(3, last([1, 2, 3]));
});

test("empty", t => {
    t.true(empty([]));
    t.false(empty([1, 2, 3]));
});

test("slice", t => {
    t.deepEqual([2, 3, 4], slice([1, 2, 3, 4], 1));
    t.deepEqual([2, 3, 4], slice([1, 2, 3, 4, 5], 1, 4));
    t.deepEqual([3], slice([1, 2, 3], 2));
    t.deepEqual([1, 2], slice([1, 2, 3], 0, 2));
    t.deepEqual([], slice([], 3, 5));
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

test("fold1", t => {
    t.is(
        9,
        fold1([1, 2, 3], (a, e, i) => a + e * i)
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
