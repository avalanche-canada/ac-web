import 'core-js/features/promise'

export default async function polyfills(self) {
    if (!self.Set) {
        await import('core-js/features/set')
    }

    if (!self.fetch) {
        await import('whatwg-fetch')
    }

    if (!self.requestAnimationFrame) {
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
