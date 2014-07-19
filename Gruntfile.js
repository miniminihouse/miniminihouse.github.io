'use strict';

var CONNECT_PORT = 9001;
var LIVERELOAD_PORT = 35731;


module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;

  // Project configuration.
  grunt.initConfig({
    // Read JSON metadata stored in package.json. (optional)
    pkg: grunt.file.readJSON('package.json'),

    configureRewriteRules: {
      options: {
        rulesProvider: 'connect.rules'
      }
    },

    connect: {
      options: {
        hostname: '0.0.0.0'
      },
      rules: [
        { from: 'profile$', to: '/' },
        { from: 'portfolio$', to: '/' },
        { from: 'contact$', to: '/' }
      ],
      livereload: {
        options: {
          port: CONNECT_PORT,
          middleware: function(connect, options) {
            var path = require('path');

            var middlewares = [];

            middlewares.push(rewriteRulesSnippet);

            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }

            var directory = options.directory || options.base[options.base.length - 1];

            options.base.forEach(function (base) {
              // Serve static files.
              middlewares.push(connect.static(base));
            });

            middlewares.push( 
              require('connect-livereload')({
                hostname: '0.0.0.0',
                port: LIVERELOAD_PORT
              })
            );

            middlewares.push(connect.static(path.resolve('app')));

            return middlewares;
          }
        }
      },
      dist: {
        options: {
          port: CONNECT_PORT,
          middleware: function (connect, options) {
            var path = require('path');
            var middlewares = [];

            middlewares.push(rewriteRulesSnippet);

            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }

            var directory = options.directory || options.base[options.base.length - 1];

            options.base.forEach(function (base) {
              // Serve static files.
              middlewares.push(connect.static(base));
            });

            middlewares.push(connect.static(path.resolve('dist')));

            return middlewares;
          }
        }
      }
    },

    watch: {
      livereload: {
        options: {
          livereload: 35731
        },
        files: [
          'app/images/**/*.{png,jpg,gif}',
          'app/styles/**/*.css',
          'app/scripts/**/*.js',
          'app/**/*.html'
        ]
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            'dist'
          ]
        }]
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app',
          dest: 'dist',
          src: [
            'images/**/*.{png,jpg,gif}',
            '**/*.html'
          ]
        }]
      }
    },
    
    useminPrepare: {
      html: 'app/index.html',
      options: {
        dest: 'dist'
      }
    },

    filerev: {
      images: {
        files: [{
          expand: true,
          cwd: 'dist',
          dest: 'dist',
          src: [
            'images/**/*.{png,jpg,gif}'
          ]
        }]
      },
      styles: {
        files: [{
          expand: true,
          cwd: 'dist',
          dest: 'dist',
          src: [
            'styles/**/*.css'
          ]
        }]
      },
      scripts: {
        files: [{
          expand: true,
          cwd: 'dist',
          dest: 'dist',
          src: [
            'scripts/**/*.js'
          ]
        }]
      }
    },

    usemin: {
      html: 'dist/**/*.html',
      css: 'dist/styles/**/*.css'
    },

    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'dist',
          src: [
            'index.html'
          ],
          dest: 'dist'
        }]
      }
    },
    
    shell: {
      sassWatch: {
        command: 'sass --compass --sourcemap -l -t expanded --watch app/styles/sass:app/styles',
        //command: 'compass watch', // compass watch is too late
        options: {
          async: true,
          stdout: true,
          stderr: true
        }
      },
      sassUpdate: {
        command: 'sass --compass --sourcemap -l -t expanded --update app/styles/sass:app/styles',
        options: {
          async: true,
          stdout: true,
          stderr: true
        }
      }
    }, // shell
  });

  // Server task.
  grunt.registerTask('server', 'Launch local web server and enable live-reloading.', function(target) {
    var tasks = [];
    
    if (target === 'dist') {
      tasks = [
        'configureRewriteRules',
        'connect:dist:keepalive'
      ];
    } else {
      tasks = [
        'configureRewriteRules',
        'connect:livereload', 
        'shell:sassWatch',
        'watch'
      ];
    }
    
    grunt.task.run(tasks);
  });

  // Build task.
  grunt.registerTask('build', 'Minify CSS/JS/HTML and revisioning all static files.', function() {
    var tasks = [
      'clean:dist',
      'copy:build',
      'useminPrepare',
      'concat',
      'cssmin',
      'filerev:images',
      'usemin:css',
      'uglify',
      'filerev:styles',
      'filerev:scripts',
      'usemin:html',
      'htmlmin:dist'
    ];

    grunt.task.run(tasks);
  });

  // Default task(s).
  grunt.registerTask('default', [
    'build'
  ]);
  
};
