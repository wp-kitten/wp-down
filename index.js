'use strict';

var Download = require('download');
var path = require('path');
var RELEASE_BASE_URL = 'http://wordpress.org/wordpress-';


module.exports = function(options, callback) {
  options = options || {};

  if (typeof options === 'string') {
    options = {version: options};
  }

  if (!options.version) {
    options.version = '4.1';
  }
  if (!options.format) {
    options.format = 'zip';
  }
  if (typeof options.extract === 'undefined') {
    options.extract = true;
  }
  options.dir = (options.dir || './wordpress-{version}').replace('{version}', options.version);

  var archiveUrl = RELEASE_BASE_URL + options.version + '.' + options.format;
  var download = new Download({extract: !!options.extract, strip: 1 }).get(archiveUrl);

  if (options.extract) {
    download.dest(options.dir);
  }
  download.run(callback);
};

