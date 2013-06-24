# chains-pages

## Overview
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install chains-pages --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('chains-pages');
```

## Pages task
_Run this task with the `grunt pages` command._


## Example

```js
pages: {
  options: {
    partials: ['include/*'],
    template: 'layout/template.hogan',
    context: function(src, dest){
      return {title: 'Hello World!'};
    },
    engine: 'hogan'
  },
  test: {
    files: [
      {
        expand: true,
        cwd: 'content/',
        src: ['*'],
        dest: 'out/'
      }
    ]
  }
}
```


## Options

#### files
Type: `String|Array`

This plugin supports use of the [files API](http://gruntjs.com/configuring-tasks#files) introduced in Grunt 0.4.0. Files may be specified using any one of the [Compact Format](http://gruntjs.com/configuring-tasks#compact-format), [Files Objects Format](http://gruntjs.com/configuring-tasks#files-object-format), or [Files Array Format](http://gruntjs.com/configuring-tasks#files-array-format) (as in the above example).

#### template
Type: `String`

This defines which tepmlate to use when precessing files.

#### partials
Type: `String|Array`

This defines which partials to use in the `template` option. 
It accepts either comma separated globbing patterns or an array of globbing patterns.Paths matching patterns that begin with ! will be excluded from the returned array.Patterns are processed in order, so inclusion and exclusion order is significant. Refer [grunt.file.expand](http://gruntjs.com/api/grunt.file#grunt.file.expand)


#### engine
Type: `String`

This option accecpts all template engine names that `consolidate.js` supports.
Refer [consolidate.js](https://github.com/visionmedia/consolidate.js).
Default is `hogan`.

#### context
Type: `Function|Object`

This defines extra Context when render templates. It will add a `partials` property
 and a `content` property. So, in your template you can use `content` to output the content specified in `files.src`.
 If defined it as a Function, you must return an Object with all properties accessed in your template.