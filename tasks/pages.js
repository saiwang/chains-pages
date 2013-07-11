'use strict';

module.exports = function(grunt) {

  var path = require('path'),
      cons = require('./lib/consolidate'),
      async = require('async'),
      inspect = require('eyes').inspector({ stream: null });

  grunt.registerMultiTask('pages', 'Compiles templates with content to html.', function() {

    var options = this.options({
      partials: [],  //it will useable for hogan, swig and so on. Jade will read partials itself in some dirs.
      context: function(src, dest){return {};}, //extra data to template, and will integrate other data
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

    //Read template partials. Note: not useful for Jade engine. Todo: ...
    var partials = {};
    options.partials = grunt.file.expand(options.partials);
    options.partials.forEach(function(file){
        var name = path.basename(file, path.extname(file));
        partials[name] = grunt.file.read(file);
        grunt.log.writeln('Read partial file: ' + name + ' --> '+ file);
    });

    grunt.log.debug(inspect(this.files));
    // Iterate over all specified file groups.
    async.eachSeries(this.files, function (file, next) {
        convert(file.src, file.dest, next);
    }.bind(this), this.async());

    function convert(src, dest, next){
      if(src.length > 0)
      {
          //compose 'context' 
          var context = {};
          if(typeof options.context === 'function')
          {
            context = options.context(src[0],dest);
          }
          else if(typeof options.context  === 'object')
          {
            context = options.context;
          }

           //Set 'partials'
          context.partials = partials;

          //set 'content'
          context.content = grunt.file.read(src[0]);
          
          cons[engine](options.template, context, function(err, html){
            if(err)
            {
              grunt.log.debug(inspect(err));
              grunt.fail.warn(err);
            }

            grunt.file.write(dest, html);
            grunt.log.writeln('File "' + dest + '" created.');
            next();
          });
      }
      else
      {
        // grunt.log.errorlns('No source file for creating"' + dest + '" !');
        next();
      }
    }

  });

};
