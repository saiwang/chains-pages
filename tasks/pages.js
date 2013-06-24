'use strict';

module.exports = function(grunt) {

  var path = require('path'),
      cons = require('./lib/consolidate'),
      async = require('async');

  grunt.registerMultiTask('pages', 'Compiles templates with content to html.', function() {

    var options = this.options({
      partials: [],
      context: function(src, dest){return {};},
      template: path.join(__dirname, 'template.hogan'),
      engine: 'hogan'
    });

    //validate 'engine'
    var engine = options.engine;
    if(!cons[engine])
    {
      grunt.fail.warn('Template engine is valid! Please refer consolidate.js manual!');
      return false;
    }

    //Read template partials
    var partials = {};
    options.partials = grunt.file.expand(options.partials);
    options.partials.forEach(function(file){
        var name = path.basename(file, path.extname(file));
        partials[name] = file;
        grunt.log.writeln('Get Partial: ' + name + ' --> '+ file);
    });

    
    // Iterate over all specified file groups.
    async.each(this.files, function (file, next) {
        convert(file.src, file.dest, next);
    }.bind(this), this.async());

    function convert(src, dest, next){
      //compose 'context' 
      var context = {};
      if(typeof options.context === 'function')
      {
        context = options.context(src,dest);
      }
      else if(typeof options.context  === 'object')
      {
        context = options.context;
      }

       //Set 'partials'
      context.partials = partials;

      //set 'content'
      context.content = grunt.file.read(src);
      
      cons[engine](options.template, context, function(err, html){
        if(err)
        {
          grunt.fail.warn(err);
        }

        grunt.file.write(dest, html);
        grunt.log.writeln('File "' + dest + '" created.');
        next();
      });
    }

  });

};
