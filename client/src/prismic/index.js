// import Prismic from 'prismic.io'
//
// Prismic.Fragments.FileLink.prototype.asHtml = function() {
//     return `<a href="${this.url()}" target="_blank">
//                 <img src="${this.url()}" alt="${this.alt}">
//             </a>`
// }

export Html from './Html'
export Text from './Text'
export Image from './Image'

export { Api, Query, QueryDocument } from './Api'
export { Predicates } from 'prismic.io'
