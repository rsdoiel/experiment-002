/**
 * Gruntfile.js for inky experiment.
 */
/*jslint node: true */
/*global module */
module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                expand: true,
                cwd: 'src/svg/',
                src: '**',
                dest: 'www/svg/',
                flatten: false,
                filter: 'isFile'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/js/handlebars.js', 'src/js/app.js'],
                dest: 'www/js/bundle.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'www/js/bundle.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'www/css/bundle.min.css': [
                        'src/css/base.css',
                        'src/css/layout.css',
                        'src/css/modules.css',
                        'src/css/state.css',
                        'src/css/theme.css'
                    ]
                }
            }
        },
        csslint: {
            strict: {
                options: {
                    "import": 2,
                    "qualified-headings": false,
                    "unique-headings": true,
                    "known-properties": false
                },
                src: ['src/css/*.css']
            },
            lax: {
                options: {
                    "import": false,
                    "qualified-headings": false,
                    "unique-headings": false,
                    "known-properties": false
                },
                src: ['www/css/*.css']
            }
        },
        csscss: {
            dist: {
                src: ['src/css/*.css']
            }
        },
        jslint: {
            server: {
                src: ['Gruntfile.js'],
                directives: {
                    node: true,
                    todo: true
                },
                options: {
                    errorsOnly: false,
                    failOnError: true
                }
            },
            client: {
                src: [ 'src/js/*.js' ],
                directives: {
                    browser: true,
                    predef:  [ 'Handlebars' ]
                },
                exclude:  ['src/js/handlebars.js']
            }
        },
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: 'src/js',
                    /* themedir: 'path/to/custom/theme/', */
                    outdir: 'docs/code'
                }
            }
        },
        markdown: {
            all: {
                files: [
                    {
                        expand: true,
                        src: '*.md',
                        dest: 'docs',
                        ext: '.html'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-csscss');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');

    grunt.registerTask('test', ['jslint', 'csslint', 'csscss']);
    grunt.registerTask('build', ['copy', 'concat', 'uglify', 'cssmin']);
    grunt.registerTask('docs', ['yuidoc', 'markdown']);
    grunt.registerTask('default', ['test', 'build', 'docs']);
};
