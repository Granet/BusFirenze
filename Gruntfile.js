module.exports = function (grunt) {
    'use strict';
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-firefox-manifest');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower');
    grunt.loadNpmTasks('grunt-image-resize');
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
        bower: {
            dev: {
                dest: 'build/app/bower_components',
                options: {
                    ignorePackages: ['building-blocks'],
                    packageSpecific: {
                        'handlebars': {
                            files: [
                                "handlebars.runtime.js"
                            ]
                        }
                    },
                    expand: true
                }
            }
        },
        clean: {
            build: 'build'
        },
        compress: {
            main: {
                options: {
                    archive: 'build/application.zip'
                },
                files: [
                    {
                        src: './**',
                        cwd: 'build/app',
                        expand: true
                    }
                ]
            }
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
            }
        },
        copy: {
            app: {
                src: [
                    'app/*',
                    'app/js/**/*.js',
                    '!bower_components'
                ],
                dest: 'build/'
            },
            bower: {
                src: [
                    'bower.json'
                ],
                dest: 'build/app/'
            },
            gaia: {
                src: [
                    'app/bower_components/building-blocks/style/**/*',
                    '!app/bower_components/building-blocks/style/**/*.css',
                    '!app/bower_components/building-blocks/style/**/*.html',
                    'app/bower_components/building-blocks/style_unstable/**/*',
                    '!app/bower_components/building-blocks/style_unstable/**/*.css',
                    '!app/bower_components/building-blocks/style_unstable/**/*.html'
                ],
                dest: 'build/'
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
        image_resize: {
            '16': {
                options: {
                    width: 16
                },
                files: {
                    'build/app/img/icons/icon16x16.png': 'app/img/icons/icon200x200.png'
                }
            },
            '48': {
                options: {
                    width: 48
                },
                files: {
                    'build/app/img/icons/icon48x48.png': 'app/img/icons/icon200x200.png'
                }
            },
            '60': {
                options: {
                    width: 60
                },
                files: {
                    'build/app/img/icons/icon60x60.png': 'app/img/icons/icon200x200.png'
                }
            },
            '128':{
                options: {
                    width: 128
                },
                files: {
                    'build/app/img/icons/icon128x128.png': 'app/img/icons/icon200x200.png'
                }
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
        'concat:css'
    ]);
    grunt.registerTask('build', [
        'css',
        'copy',
        'bower',
        'image_resize'
    ]);
    grunt.registerTask('dist', [
        'compress'
    ]);
};