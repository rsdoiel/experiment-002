/**
 * csv.js - an experiment in parse CSV content.
 * @author R. S. Doiel, <rsdoiel@gmail.com>
 * copyright (c) 2013 all rights reserved
 * Released under the BSD 2-clause licensed.
 * See: http://opensource.org/licenses/BSD-2-Clause
 */
(function () {
    "use strict";
                
    function parseLine(buf) {
        var delimiter = ',',
            quote = '',
            cut_from = 0,
	    cut_length = 0,
            cur = '',
            i = 0,
            l = 0,
            results = [];
	console.log("DEBUG buf", buf);
        for (i = 0, l = buf.length; i < l; i += 1) {
            cur = buf[i];
            if (cut_from === -1) {
                // We're looking for the start of a column
                if (cur === '"' || cur === "'") {
                    quote = cur;
                    cut_from = i + 1;
                }
            } else {
                // We in a column and looking for an end.
                if (quote === '' && cur === delimiter) {
                    // save the column's data
                    results.push(buf.substr(cut_from, cut_length).trim());
                    cut_from = -1;
	            cut_length = -1;
	            console.log("DEBUG pushing", results[results.length - 1]);
                } else if (cur === '\\') {
                    // We hit an escape char, skip ahead a character.
                    i += 2;
                } else if (cur === quote) {
	            //clear the quote, set cut_length
	            cut_length = (i - 1) - cut_from;
		    quote = '';
                } else {
		   // Update cut_length
		   cut_length = i - cut_from;
		}
            }
        }
        return results;
    }
                
    // Export as module
    modules("CSV", {parseLine: parseLine});
}());
