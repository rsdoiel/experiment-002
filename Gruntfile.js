/*jslint node: true */
/*global module */
module.exports = function (grunt) {
    "use strict";
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jslint: {
            server:  {
                src: [
                    "Gruntfile.js"
                ],
                directive: {
                    node: true,
                    white: false,
                    indent: 4,
                    maxerr: 25,
                    maxlen: 80
                },
                options: {}
            },
            client: {
                // define the files to lint
                src: [
                    'www/js/*.js'
                ],
                exclude: [
                    'www/js/handlebars.js'
                ],
                directives: {
                    browser: true,
                    white: false,
                    indent: 4,
                    maxerr: 25,
                    maxlen: 80
                },
                predef: [
                ],
                options: {}
            }
        },
        csslint: {
            strict: {
                options: {
                    /* 'qualified-headings': false,
                    'unique-headings': false,
                    'known-properties': false,
                    'box-model': false,
                    'overqualified-elements': false,
                    'shorthand': false, */
                    'text-indent': false,
                    'qualified-headings': false,
                    'box-model': false,
                    'ids': false,
                    'import': 2
                },
                src: [
                    'www/css/*.css'
                ]
            }//,
            //lax: {
            //    options: {
            //        'text-indent': false,
            //        'ids': false,
            //        'qualified-headings': false,
            //        'unique-headings': false,
            //        'known-properties': false,
            //        'box-model': false,
            //        'overqualified-elements': false,
            //        'shorthand': false,
            //        'import': false
            //    },
            //    src: [
            //        'www/css/*.css'
            //    ]
            //}
        },
        csscss: {
            dist: {
                src: ['www/css/*.css']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-csslint");
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-csscss');

    // Default task(s).
    grunt.registerTask('test', ['jslint', 'csslint', 'csscss']);
    grunt.registerTask('default', ['test']);
};
