/**
 * csv.js - an experiment in parse CSV content.
 * @author R. S. Doiel, <rsdoiel@gmail.com>
 * copyright (c) 2013 all rights reserved
 * Released under the BSD 2-clause licensed.
 * See: http://opensource.org/licenses/BSD-2-Clause
 */
/*jslint browser: true, indent: 4 */
/*global console, modules */
(function () {
    "use strict";
                
    function parseLine(buf) {
        var delimiter = ',',
            escape = '\\',
            quote = '',
            cut_from = 0,
            cut_length = 0,
            cur = '',
            i = 0,
            l = 0,
            results = [];
        
        buf = buf.trim();
        console.log("DEBUG buf", buf);
        cut_from = 0;
        cut_length = 0;
        for (i = 0, l = buf.length; i < l; i += 1) {
            cur = buf[i];
            console.log([
                "DEBUG i = [",
                i,
                "], cur = [",
                cur,
                "], cut_from = [",
                cut_from,
                "], cut_length = [",
                cut_length,
                "]"].join(""));
            if (cur === delimiter && quote === '') {
                // save the column's data
                results.push(buf.substr(cut_from, cut_length).trim());
                console.log("DEBUG push(" + cut_from +
                            ", " + cut_length + ") -->" +
                            results[results.length - 1]);
                cut_from = i + 1;
                cut_length = 0;
                quote = '';
            } else if (cur === escape && buf[i + 1] === quote) {
                console.log("DEBUG escape " + cur + " -> " + buf[i + 1]);
                i += 1;
                cut_length += 1;
            } else if ((cur === '"' || cur === "'") && quote === '') {
                // Starting of a quote
                quote = cur;
                cut_from = i + 1;
                cut_length = 0;
            } else if (cur === quote) {
                console.log("DEBUG end quote " + buf.substr(cut_from, cut_length));
                // Ending of a quote
                results.push(buf.substr(cut_from, cut_length).trim());
                console.log("DEBUG push(" + cut_from +
                            ", " + cut_length + ") -->" +
                            results[results.length - 1]);
                // Fast forward to next delimiter.
                for (; i < l && buf[i] !== delimiter; i += 1) {
                    // nothing to do but advance to the delimiter.
                }
                cut_from = i + 1;
                cut_length = 0;
                quote = '';
            } else {
                cut_length += 1;
            }
        }
    
        if (buf.trim().lastIndexOf(delimiter) === (buf.trim().length - 1)) {
            results.push("");
            console.log("DEBUG push trailing empty colomn");
        } else if (cut_length > 0) {
            results.push(buf.substr(cut_from).trim());
            console.log("DEBUG pushing unquoted trailing column");
        }
        return results;
    }
    // Export as module
    modules("CSV", {parseLine: parseLine});
}());
