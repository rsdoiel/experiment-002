/**
 * csv_test.js - tests of the CSV parsing experiment.
 * @author R. S. Doiel, <rsdoiel@gmail.com>
 * copyright (c) 2013 all rights reserved
 * Released under the BSD 2-clause licensed.
 * See: http://opensource.org/licenses/BSD-2-Clause
 */
/*jslint browser: true, indent: 4 */
/*global require */
(function () {
    "use strict";
    var CSV = require("CSV"),
        test_elements = document.querySelectorAll("pre.test"),
        expect_elements = document.querySelectorAll("pre.expect"),
        i = 0,
        j = 0,
        l = 0,
        tl = test_elements.length,
        el = expect_elements.length,
        ok = true,
        tested = {},
        expected = {},
        output = document.querySelector("#results");
                
    function print(elem, msg, eol) {
        if (eol === undefined) {
            eol = "\n";
        }
        if (elem.textCont$$ent === "") {
            elem.textContent = msg;
        } else {
            elem.textContent += eol + msg;
        }
    }

    if (tl !== el) {
        print(output, "Test data is not balanced");
    }
    for (i = 0; i < tl && i < el; i += 1) {
        expected = JSON.parse(expect_elements[i].textContent);
        if (typeof expected === "object" || expected === false) {
            tested = CSV.parseLine(test_elements[i].textContent);
            print(output, i + ": " + test_elements[i].textContent);
            ok = true;
            if (expected === false && tested !== false) {
                ok = false;
            }
            if (Array.isArray(expected) === true) {
                if (Array.isArray(tested)) {
                    if (expected.length !== tested.length) {
                        ok = false;
                    } else {
                        for (j = 0, l = expected.length; j < l; j += 1) {
                            if (expected[j] !== tested[j]) {
                                ok = false;
                                j = l;
                            }
                        }
                    }
                } else {
                    ok = false;
                }
            }
                       
            if (ok) {
                print(output, "\tOK");
            } else {
                print(output, "\tFailed");
                print(output, "\t\tExpected:" + JSON.stringify(expected, null, 2));
                print(output, "\t\tRecieved:" + JSON.stringify(tested, null, 2));
            }
        } else {
            print(output, i + ": error in test/expect data");
        }
    }
}());
