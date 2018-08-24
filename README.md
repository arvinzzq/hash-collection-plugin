# hash-collection-plugin

A hash #⃣️  collection plugin with webpack like api.

## Usage

hash-collection plugin should be placed after hash generate plugin, then it will generate hash version file of javascript and css according to options or default options.

### jsdoc

```javascript
**
 * Hash collection plugin.
 * @param {Object} options plugin options.
 * @param {String} options.separator separator to split key from hashed resource name.
 * @param {Boolean} options.isMerge flag that mark whether js hash and css hash should be merged together.
 * @param {String} options.filename filename of exported version file with prefix css_ and js_.
 * @param {String} options.extension extension of exported version file.
 * @param {Function} options.processor processor function used to process exported file before it is written to destination folder.
 * @param {String} options.prefix prefix of each key of hash chunk.
 */
```

TBD