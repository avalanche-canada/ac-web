import {heading} from 'constants/utils'

export default function disclaimer(level = 2) {
    return `
${heading(level)} USE AT YOUR OWN RISK

Avalanche Canada's Public Avalanche Bulletin, and other information and services provided by Avalanche Canada, are intended for personal and recreational purposes only.

**THIS INFORMATION IS PROVIDED "AS IS" AND IN NO EVENT SHALL THE PROVIDERS BE LIABLE FOR ANY DAMAGES, INCLUDING, WITHOUT LIMITATION, DAMAGES RESULTING FROM DISCOMFORT, INJURY, OR DEATH, CLAIMS BY THIRD PARTIES OR FOR OTHER SIMILAR COSTS, OR ANY SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, ARISING OUT OF THE USE OF THE INFORMATION.**

The user acknowledges that it is impossible to accurately predict natural events such as avalanches in every instance, and uses the data in this bulletin with this always foremost in mind. The accuracy or reliability of the data is not guaranteed or warranted in any way and the Providers disclaim liability of any kind whatsoever, including, without limitation, liability for quality, performance, merchantability and fitness for a particular purpose arising out of the use, or inability to use the data.
`
}
