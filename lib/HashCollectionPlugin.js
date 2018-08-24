'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var fsExtra = require('fs-extra');
var path = require('path');
var pluginName = 'hash-collection-plugin';
var cwd = process.cwd();
var defaultProcessor = function defaultProcessor(hashMap) {
  return JSON.stringify(hashMap, null, 2);
};

function HashCollectionPlugin() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  this.options = options;
}

function collectHashMap(hashMap, asset, separator, pathRelative, reg) {
  var prefix = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';

  if (reg.test(asset)) {
    hashMap['' + prefix + asset.split(separator)[0]] = pathRelative + '/' + asset;
  }
}

/**
 * Hash collection plugin.
 * @param {Object} options plugin options.
 * @param {String} [outputPath=''./server/config''] output path of generated version file.
 * @param {String} [options.separator='_'] separator to split key from hashed resource name.
 * @param {Boolean} [options.isMerge=false] flag that mark whether js hash and css hash should be merged together.
 * @param {String} [options.filename='version'] filename of exported version file with prefix css_ and js_.
 * @param {String} [options.extension='json'] extension of exported version file.
 * @param {Function} [options.processor=json-like processor] processor function used to process exported file before it is written to destination folder.
 * @param {String} [options.prefix=''] prefix of each key of hash chunk.
 */
HashCollectionPlugin.prototype.apply = function (compiler) {
  var _options = this.options,
      _options$separator = _options.separator,
      separator = _options$separator === undefined ? '_' : _options$separator,
      _options$outputPath = _options.outputPath,
      outputPath = _options$outputPath === undefined ? './server/config' : _options$outputPath,
      _options$isMerge = _options.isMerge,
      isMerge = _options$isMerge === undefined ? false : _options$isMerge,
      _options$filename = _options.filename,
      filename = _options$filename === undefined ? 'version' : _options$filename,
      _options$extension = _options.extension,
      extension = _options$extension === undefined ? 'json' : _options$extension,
      _options$processor = _options.processor,
      processor = _options$processor === undefined ? defaultProcessor : _options$processor,
      prefix = _options.prefix;

  compiler.hooks.emit.tap(pluginName, function (compilation) {
    var assets = compilation.assets,
        outputOptions = compilation.outputOptions;

    var pathRelative = path.relative(__dirname, outputOptions.path);
    var cssHashMap = {};
    var jsHashMap = {};
    var jsReg = /^js\//;
    var cssReg = /^css\//;
    Object.keys(assets).map(function (asset) {
      collectHashMap(cssHashMap, asset, separator, pathRelative, cssReg, prefix);
      collectHashMap(jsHashMap, asset, separator, pathRelative, jsReg, prefix);
    });
    if (isMerge) {
      var hashMap = _extends({}, cssHashMap, jsHashMap);
      fsExtra.outputFileSync(path.resolve(cwd, outputPath, filename + '.' + extension), processor(hashMap));
    } else {
      fsExtra.outputFileSync(path.resolve(cwd, outputPath, 'css_' + filename + '.' + extension), processor(cssHashMap));
      fsExtra.outputFileSync(path.resolve(cwd, outputPath, 'js_' + filename + '.' + extension), processor(jsHashMap));
    }
    console.info('===> Version file is generated ~');
  });
};

module.exports = HashCollectionPlugin;