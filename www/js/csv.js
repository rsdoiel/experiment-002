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
            cur = '',
            i = 0,
            l = 0,
            results = [];
        
        function saveColumn(s) {
            var l;
            s = s.trim();
            l = s.length - 1;
            if ((s[0] === '"' && s[l] === '"') ||
                    (s[0] === "'" && s[l] === "'")) {
                // We have a quoted string so remove/unescape any quotes
                // based on s[0]
                s = s.substr(1, s.length - 2).replace(new RegExp(escape + escape + s[0], 'g'), s[0]);
            }
            return s;
        }

        for (i = 0, l = buf.length, cut_from = 0; i < l; i += 1) {
            cur = buf[i];
            if (cur === delimiter && quote === '') {
                // save the column's data
                results.push(saveColumn(buf.substr(cut_from, i - cut_from)));
                cut_from = i + 1;
                quote = '';
            } else if (cur === escape) {
                i += 1;
            } else if ((cur === '"' || cur === "'") && quote === '') {
                // Starting of a quote
                quote = cur;
            } else if (cur === quote && quote !== "") {
                // Ending of a quote
                quote = '';
            }
        }
        // get last column
        if (cut_from <= l) {
            results.push(saveColumn(buf.substr(cut_from), l - cut_from));
        }
        return results;
    }
    // Export as module
    modules("CSV", {parseLine: parseLine});
}())
