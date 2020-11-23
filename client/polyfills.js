// Should be loaded using script, but scripts load async and Promise.all is used in dynamic imports by webpack.
import 'core-js/features/promise'
import { shouldPolyfill as shouldPolyfillIntlGetCanonicalLocales } from '@formatjs/intl-getcanonicallocales/should-polyfill'
import { shouldPolyfill as shouldPolyfillIntlDisplayNames } from '@formatjs/intl-displaynames/should-polyfill'
import { shouldPolyfill as shouldPolyfillIntlPluralRules } from '@formatjs/intl-pluralrules/should-polyfill'
import { shouldPolyfill as shouldPolyfillIntlNumberFormat } from '@formatjs/intl-numberformat/should-polyfill'
import { shouldPolyfill as shouldPolyfillIntlDatetimeFormat } from '@formatjs/intl-datetimeformat/should-polyfill'
import { shouldPolyfill as shouldPolyfillIntlRelativetimeFormat } from '@formatjs/intl-relativetimeformat/should-polyfill'
import { shouldPolyfill as shouldPolyfillIntlListFormat } from '@formatjs/intl-listformat/should-polyfill'
import { shouldPolyfill as shouldPolyfillIntlLocaleFormat } from '@formatjs/intl-locale/should-polyfill'

export default async function polyfills(self) {
    try {
        if (typeof self.Set === 'undefined') {
            await import('core-js/features/set')
        }

        if (typeof self.Map === 'undefined') {
            await import('core-js/features/map')
        } else {
            try {
                // Older version of Safari has Map object, but does not accept parameter in the constructor
                // https://sentry.io/organizations/avalanche-canada/issues/1339976404/events/bfbce505e45b4cb18359094e3c846306/?project=99286
                new self.Map([[9, 9]])
            } catch (error) {
                await import('core-js/features/map')
            }
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

        if (typeof self.HTMLDetailsElement === 'undefined') {
            await import('details-element-polyfill')
        }

        // This platform already supports Intl.getCanonicalLocales
        if (shouldPolyfillIntlGetCanonicalLocales()) {
            await import('@formatjs/intl-getcanonicallocales/polyfill')
        }

        // This platform already supports Intl.Locale
        if (shouldPolyfillIntlLocaleFormat()) {
            await import('@formatjs/intl-locale/polyfill')
        }

        if (shouldPolyfillIntlPluralRules()) {
            // Load the polyfill 1st BEFORE loading data
            await import('@formatjs/intl-pluralrules/polyfill')
        }

        if (Intl.PluralRules.polyfilled) {
            await import('@formatjs/intl-pluralrules/locale-data/en')
            await import('@formatjs/intl-pluralrules/locale-data/fr')
        }

        if (shouldPolyfillIntlNumberFormat()) {
            await import('@formatjs/intl-numberformat/polyfill')
        }

        if (Intl.NumberFormat.polyfilled) {
            await import('@formatjs/intl-numberformat/locale-data/en')
            await import('@formatjs/intl-numberformat/locale-data/fr')
        }

        if (shouldPolyfillIntlDisplayNames()) {
            await import('@formatjs/intl-displaynames/polyfill')
        }

        if (Intl.DisplayNames.polyfilled) {
            await import('@formatjs/intl-displaynames/locale-data/en')
            await import('@formatjs/intl-displaynames/locale-data/fr')
        }

        if (shouldPolyfillIntlDatetimeFormat()) {
            // Load the polyfill 1st BEFORE loading data
            await import('@formatjs/intl-datetimeformat/polyfill')
        }

        if (Intl.DateTimeFormat.polyfilled) {
            await Promise.all([
                import('@formatjs/intl-datetimeformat/add-all-tz'),
                import('@formatjs/intl-datetimeformat/locale-data/en'),
                import('@formatjs/intl-datetimeformat/locale-data/fr'),
            ])
        }

        if (shouldPolyfillIntlRelativetimeFormat()) {
            // Load the polyfill 1st BEFORE loading data
            await import('@formatjs/intl-relativetimeformat/polyfill')
        }

        if (Intl.RelativeTimeFormat.polyfilled) {
            await import('@formatjs/intl-relativetimeformat/locale-data/en')
            await import('@formatjs/intl-relativetimeformat/locale-data/fr')
        }

        // This platform already supports Intl.ListFormat
        if (shouldPolyfillIntlListFormat()) {
            // Load the polyfill 1st BEFORE loading data
            await import('@formatjs/intl-listformat/polyfill')
        }

        if (Intl.ListFormat.polyfilled) {
            await import('@formatjs/intl-listformat/locale-data/en')
            await import('@formatjs/intl-listformat/locale-data/fr')
        }
    } catch (error) {
        if (error.name === 'ChunkLoadError') {
            window.location.reload()

            return
        }

        throw error
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
            nativeURLSearchParams && new nativeURLSearchParams({ a: 1 }).toString() === 'a=1',
        // There is a bug in safari 10.1 (and earlier) that incorrectly decodes `%2B` as an empty space and not a plus.
        decodesPlusesCorrectly =
            nativeURLSearchParams && new nativeURLSearchParams('s=%2B').get('s') === '+',
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
