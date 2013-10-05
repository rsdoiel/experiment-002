/**
 * modules.js - an experiment in maintaining module namespaces
 * in a browser environment.
 * @author R. S. Doiel, <rsdoiel@gmail.com>
 * copyright (c) 2013 all rights reserved
 * Released under the BSD 2-clause licensed.
 * See: http://opensource.org/licenses/BSD-2-Clause
 */
(function (outerspace) {
    "use strict";
    function modules(namespace, module) {
        var keys = Object.keys(module),
            i = 0,
            l = 0,
            ky; 
        if (outerspace[name] === undefined) {
            outerspace[name] = exports;
        } else {
            for (i = 0, l = keys.length; i < l; i += 1) {
                ky = keys[i];
                if (exports.hasOwnProperty(ky) &&
                        outerspace[name][ky] === undefined) {
                    outerspace[name][ky] = exports[ky];
                } else {
                    throw "property " + ky +
                        " already exists in object " + name;
                }
            }
        }
        return outerspace;
    }
    global.modules = modules;
}(this));
