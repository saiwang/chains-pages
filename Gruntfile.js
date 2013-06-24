'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: 'default'
    },

    jshint: {
      all: ['tasks/*'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        node: true
      }
    },
    pages: {
      options: {
        partials: ['test/include/*'],
        template: 'test/layout/template.hogan',
        context: function(src, dest){
          dest = dest;
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
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('dev', ['watch', 'jshint']);

};
