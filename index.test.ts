import test from "ava";
import {foldMap, partition} from "./index";

test("foldMap", t => {
    t.is(foldMap(["2", "3", "4"], (a, b) => a + b, parseFloat), 9);
    t.is(
        foldMap([true, false, false],
            (a, b) => a.substr(0, a.length - 1) + b.substr(1),
            String),
        "trualsalse");
    t.is(foldMap(["2"], (a, b) => a + b, parseFloat), 2);
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

test("partition", t => {
    t.deepEqual(partition(["abc", "def", "ghi"], (_: string, i: number) => (i % 2 === 0)),
        [["abc", "ghi"], ["def"]]);

    const results: Array<Result<string>> = [
        {type: "success", value: "hello"},
        {type: "error"},
        {type: "success", value: "goodbye"}
    ];

    const partitionedResults: [Array<Success<string>>, Error[]] = partition(results, isSuccess);

    t.deepEqual(partitionedResults, [[
        {type: "success", value: "hello"},
        {type: "success", value: "goodbye"}
    ], [
        {type: "error"}
    ]]);
});