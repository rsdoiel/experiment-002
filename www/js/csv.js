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
        buf = buf.trim();
	console.log("DEBUG buf", buf);
        for (i = 0, l = buf.length; i < l; i += 1) {
            cur = buf[i];
	    console.log("DEBUG cur", i, cur);
            if (cut_from >= i) {
                // We're looking for the start of a column
		cut_length = 0;
                if (cur === '"' || cur === "'") {
                    quote = cur;
                    cut_from = i + 1;
                } else if (cur === delimiter) {
                    results.push("");
                    cut_from = -1;
	            console.log("DEBUG pushing empty");
		}
            } else {
                // We in a column and looking for an end.
                if (quote === '' && cur === delimiter) {
                    // save the column's data
                    results.push(buf.substr(cut_from, cut_length).trim());
                    cut_from = i + 1;
	            cut_length = 0;
	            console.log("DEBUG pushing", results[results.length - 1]);
                } else if (cur === '\\') {
                    // We hit an escape char, skip ahead a character.
                    i += 1;
                } else if (cur === quote) {
	            //clear the quote, set cut_length
	            cut_length = i - cut_from;
		    quote = '';
                } else {
		   // Update cut_length
		   cut_length = (i - cut_from) + 1;
		}
            }
        }
	console.log("DEBUG final i", i);
	
	if (buf.lastIndexOf(delimiter) === (buf.length - 1)) {
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
