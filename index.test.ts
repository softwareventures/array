import test from "ava";
import {foldMap} from "./index";

test("foldMap", t => {
    t.is(foldMap(["2", "3", "4"], (a, b) => a + b, parseFloat), 9);
    t.is(
        foldMap([true, false, false],
            (a, b) => a.substr(0, a.length - 1) + b.substr(1),
            String),
        "trualsalse");
    t.is(foldMap(["2"], (a, b) => a + b, parseFloat), 2);
});