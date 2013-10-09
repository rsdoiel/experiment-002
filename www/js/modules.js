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
        var moduleCache = outerspace.Modules || {},
            keys = Object.keys(module),
            i = 0,
            l = 0,
            ky;
        if (moduleCache[namespace] === undefined) {
            moduleCache[namespace] = module;
        } else {
            for (i = 0, l = keys.length; i < l; i += 1) {
                ky = keys[i];
                if (module.hasOwnProperty(ky) &&
                        moduleCache[namespace][ky] === undefined) {
                    moduleCache[namespace][ky] = module[ky];
                } else {
                    throw "property " + ky +
                        " already exists in object " + namespace;
                }
            }
        }
        outerspace.Modules = moduleCache;
        return outerspace;
    }

    function require(name) {
        if (outerspace.Modules === undefined) {
            throw "no modules found.";
        }

        if (outerspace.Modules[name] === undefined) {
            throw "module named " + name + " doesn't exist";
        }
        return outerspace.Modules[name];
    }
    outerspace.modules = modules;
    outerspace.require = require;
}(this));
