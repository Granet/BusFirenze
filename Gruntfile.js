module.exports = function (grunt) {
    'use strict';
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-firefox-manifest');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.initConfig({
        wiredep: {
            task: {
                src: ['app/index.html']
            }
        },
        firefoxManifest: {
            options: {
                packageJson: 'package.json',
                manifest: ' app/manifest.webapp'
            }
        },
        clean: {
            build: 'build'
        },
        concat: {
            css: {
                  src: [
                    'app/bower_components/building-blocks/style/*.css',
                    'app/bower_components/building-blocks/style_unstable/*.css',
                    'app/bower_components/building-blocks/*.css',
                    '!app/bower_components/building-blocks/style/cross_browser.css'
                    ],
                  dest: 'build/app/css/style.css'
            },
            js: {
                options: {
                    separator: ';'
                },
                src: [
                    'app/js/**/*.js'
                ],
                dest: 'build/app/js/app.js'
            }
        },
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'build/app/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/app/css/',
                    ext: '.min.css'
                }]
            }
        },
        jshint: {
            all: [
                'app/js/**/*.js',
                '!app/js/templates/templates.js',
                '!app/js/service.js'
            ],
            options: {
                reporter: require('jshint-stylish')
            }
        },
        watch: {
            scripts: {
                files: ['app/js/**/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                }
            },
            templates: {
                files: ['app/js/templates/*.handlebars'],
                task: ['handlebars']
            },
            bower: {
                files: ['bower.json'],
                task: ['wiredep']
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: "App.templates",
                    processName: function(filePath) {
                        return filePath.replace(/^app\/js\/templates\//, '').replace(/\.handlebars$/, '');
                    }
                },
                files: {
                    "app/js/templates/templates.js": "app/js/templates/*.handlebars"
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: '0.0.0.0',
                    base: ['app', '../bower_components']
                }
            }
        }
    });
    grunt.registerTask('default', [
        'jshint',
        'wiredep',
        'connect',
        'watch'
    ]);
    grunt.registerTask('css', [
        'clean',
        'mkdir',
        'concat:css'
    ]);
};