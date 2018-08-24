# hash-collection-plugin

A hash #⃣️  collection plugin with webpack like api.

## Usage

hash-collection-plugin should be placed after hash generate plugin, then it will generate hash version file of javascript and css according to options or default options.

### jsdoc

```javascript
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
```

### Example

```javascript
new HashPlugin({
  outputPath: '../is-join/is-join-config/src/main/resources',
  isMerge: true,
  filename: 'version',
  extension: 'properties',
  processor: function(data) {
    return Object.keys(data).map(key => `${key.replace(/\//g, '.')}=${data[key]}\n`).join('');
  }
})
```

TBD