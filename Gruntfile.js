/*
 * chains-pages
 * https://github.com/saiwang/chains-pages
 *
 * Copyright (c) 2013 WangSai
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: 'default'
    },

    jshint: {
      all: ['tasks/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    pages: {
      options: {
        partials: ['test/include/*'],
        template: 'test/layout/template.hogan',
        context: function(src, dest){
          grunt.log.writeln('Processing file : ' + src);
          var content = grunt.file.read(src),
          title = content.match(/<h1>.*<\/h1>/).toString();
          return {title: title.replace(/<[\/]?h1>/g, '')};
        },
        engine: 'hogan'
      },
      test: {
        files: [
          {
            expand: true,
            cwd: 'test/content/',
            src: ['*'],
            dest: 'test/out/'
          }
        ]
      }
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'pages']);
  grunt.registerTask('dev', ['watch', 'jshint']);

};
