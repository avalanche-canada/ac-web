// import React from 'react'
// import loadAvalancheCanada from 'bundle-loader?lazy!./AvalancheCanada'
// import loadAvalancheCanadaFoundation from 'bundle-loader?lazy!./AvalancheCanadaFoundation'
// import { Loading } from 'components/text'
// import Bundle from 'components/Bundle'
//
// export function AvalancheCanada(props) {
//     return (
//         <Bundle load={loadAvalancheCanada}>
//             {Component => (Component ? <Component {...props} /> : <Loading />)}
//         </Bundle>
//     )
// }
//
// export function AvalancheCanadaFoundation(props) {
//     return (
//         <Bundle load={loadAvalancheCanadaFoundation}>
//             {Component => (Component ? <Component {...props} /> : <Loading />)}
//         </Bundle>
//     )
// }

export AvalancheCanada from './AvalancheCanada'
export AvalancheCanadaFoundation from './AvalancheCanadaFoundation'
