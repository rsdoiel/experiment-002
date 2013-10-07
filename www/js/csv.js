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
            eol = '\n',
            quote = '',
            cut_from = 0,
            cut_length = 0,
            cur = '',
            i = 0,
            l = 0,
            results = [];
        
        function saveColumn(s) {
            var quoted = '', l = s.length - 2;
            s = s.trim();
            if (s[0] === '"' || s[0] === "'") {
                quoted = s[0];
                s = s.substr(1, l).replace(new RegExp(escape + quoted, 'g'), quoted);
            }
            console.log("DEBUG saveColumn(" + s + ")");
            return s;
        }

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
            if (cur === escape) {
                console.log("DEBUG escape " + cur + " -> " + buf.substr(i, 3));
                i += 2;
                cut_length += 2;
            } else if (cur === delimiter && quote === '') {
                // save the column's data
                results.push(saveColumn(buf.substr(cut_from, cut_length)));
                cut_from += 1;
                cut_length = 0;
                quote = '';
            } else if (cur === quote) {
                // Ending of a quote
                results.push(saveColumn(buf.substr(cut_from, cut_length)));
                cut_from += 1;
                cut_length = 0;
                quote = '';
            } else if ((cur === '"' || cur === "'") && quote === '') {
                // Starting of a quote
                cut_from += 1;
                cut_length += 1;
                quote = cur;
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
