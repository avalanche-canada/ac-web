// Should be loaded using script, but scripts load async and Promise.all is used in dynamic imports by webpack.
import 'core-js/features/promise'

export default async function polyfills(self) {
    if (typeof self.Set === 'undefined') {
        await import('core-js/features/set')
    }

    if (typeof self.fetch === 'undefined') {
        await import('whatwg-fetch')
    }

    if (typeof self.requestAnimationFrame === 'undefined') {
        await import('raf/polyfill')
    }

    if (!urlSearchParamsSupported(self)) {
        await import('url-search-params-polyfill')
    }
}

// Utils
// Copied from https://github.com/jerrybendy/url-search-params-polyfill/blob/master/index.js
function urlSearchParamsSupported(self) {
    var nativeURLSearchParams =
            self.URLSearchParams && self.URLSearchParams.prototype.get
                ? self.URLSearchParams
                : null,
        isSupportObjectConstructor =
            nativeURLSearchParams &&
            new nativeURLSearchParams({ a: 1 }).toString() === 'a=1',
        // There is a bug in safari 10.1 (and earlier) that incorrectly decodes `%2B` as an empty space and not a plus.
        decodesPlusesCorrectly =
            nativeURLSearchParams &&
            new nativeURLSearchParams('s=%2B').get('s') === '+',
        // Fix bug in Edge which cannot encode ' &' correctly
        encodesAmpersandsCorrectly = nativeURLSearchParams
            ? (function() {
                  var ampersandTest = new nativeURLSearchParams()
                  ampersandTest.append('s', ' &')
                  return ampersandTest.toString() === 's=+%26'
              })()
            : true

    return (
        nativeURLSearchParams &&
        isSupportObjectConstructor &&
        decodesPlusesCorrectly &&
        encodesAmpersandsCorrectly
    )
}
