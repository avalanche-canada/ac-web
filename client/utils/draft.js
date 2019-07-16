// Copied and modified (removed the class) from https://github.com/rkpasia/draft-js-exporter/blob/master/src/main.js
// Another project: https://github.com/evanc/backdraft-js/blob/master/index.js (similar algorith)

export function toHTML(data) {
    return render(data, FORMATS.HTML)
}

const FORMATS = {
    HTML: {
        BLOCK: {
            'header-one': ['<h1>', '</h1>'],
            'header-two': ['<h1>', '</h1>'],
            unstyled: ['<p>', '</p>'],
            'code-block': ['<pre><code>', '</code></pre>'],
            blockquote: ['<blockquote>', '</blockquote>'],
            'ordered-list-item': ['<li>', '</li>'],
            'unordered-list-item': ['<li>', '</li>'],
            default: ['<p>', '</p>'],
        },
        INLINE: {
            BOLD: ['<strong>', '</strong>'],
            ITALIC: ['<em>', '</em>'],
            UNDERLINE: ['<u>', '</u>'],
            CODE: ['<code>', '</code>'],
            STRIKETHROUGH: ['<del>', '</del>'],
            default: ['<span>', '</span>'],
        },
        NESTED: {
            'ordered-list-item': ['<ol>', '</ol>'],
            'unordered-list-item': ['<ul>', '</ul>'],
        },
    },
}

function render({ blocks = [] }, { BLOCK, INLINE, NESTED }) {
    const lastBlockIndex = blocks.length - 1
    const nesting = []

    function renderBlock({ inlineStyleRanges, text, type }, index) {
        const tags = BLOCK[type]
        const parts = []

        // close tag if not consecutive same nested
        if (nesting.length > 0 && nesting[0] !== type) {
            parts.push(NESTED[nesting.shift()][1])
        }

        // open tag if nested
        if (type in NESTED && nesting[0] !== type) {
            parts.push(NESTED[type][0])
            nesting.unshift(type)
        }

        parts.push(tags[0])

        for (let index = 0; index < text.length; index++) {
            for (const { offset, style } of inlineStyleRanges) {
                if (index === offset && style in INLINE) {
                    parts.push(INLINE[style][0])
                }
            }

            parts.push(text.charAt(index))

            for (const { offset, length, style } of inlineStyleRanges) {
                if (index === offset + length - 1 && style in INLINE) {
                    parts.push(INLINE[style][1])
                }
            }
        }

        parts.push(tags[1])

        // close any unclosed blocks if we've processed all the blocks
        if (index === lastBlockIndex && nesting.length > 0) {
            while (nesting.length > 0) {
                parts.push(NESTED[nesting.shift()][1])
            }
        }

        return parts.join('')
    }

    return blocks.map(renderBlock).join('')
}
