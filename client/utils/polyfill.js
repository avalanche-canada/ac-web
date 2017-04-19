// Polyfill for Element.matches()
// https://developer.mozilla.org/en/docs/Web/API/Element/matches#Polyfill
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(selector) {
            const matches = (this.document || this.ownerDocument).querySelectorAll(selector)
            let i = matches.length
            /* eslint-disable no-empty */
            while (--i >= 0 && matches.item(i) !== this) {}
            /* eslint-disable no-empty */
            return i > -1
        }
}
