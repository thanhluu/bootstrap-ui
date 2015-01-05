'use strict';
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var jsFileList = [
    'vendor/bootstrap/js/transition.js',
    'vendor/bootstrap/js/alert.js',
    'vendor/bootstrap/js/button.js',
    'vendor/bootstrap/js/carousel.js',
    'vendor/bootstrap/js/collapse.js',
    'vendor/bootstrap/js/dropdown.js',
    'vendor/bootstrap/js/modal.js',
    'vendor/bootstrap/js/tooltip.js',
    'vendor/bootstrap/js/popover.js',
    'vendor/bootstrap/js/scrollspy.js',
    'vendor/bootstrap/js/tab.js',
    'vendor/bootstrap/js/affix.js',
    'js/_*.js'
  ];

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'js/*.js',
        '!js/bootstrap-ui.js',
        '!**/*.min.*'
      ]
    },
    less: {
      watch: {
        files: {
          'css/bootstrap-ui.css': [
            'less/bootstrap-ui.less'
          ]
        },
        options: {
          compress: true
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'js/bootstrap-ui.js': [jsFileList]
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
      },
      watch: {
        src: 'css/bootstrap-ui.css'
      }
    },
    watch: {
      less: {
        files: [
          'less/*.less',
          'less/**/*.less'
        ],
        tasks: ['less:watch', 'autoprefixer:watch']
      },
      js: {
        files: [
          jsFileList,
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'uglify']
      },
      livereload: {
        options: {
          livereload: false
        },
        files: [
          'css/bootstrap-ui.css',
          'js/bootstrap-ui.js',
          '*.html'
        ]
      }
    }
  });

  grunt.registerTask('default', [
    'watch'
  ]);
};
