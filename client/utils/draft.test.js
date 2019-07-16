import { toHTML } from './draft'

test('convert raw draft.js object to HTML', () => {
    expect(toHTML({})).toEqual('')
    expect(toHTML({ blocks: [] })).toEqual('')

    for (let index = 0; index < 5; index++) {
        expect(toHTML({ blocks: [RAW.blocks[index]] })).toEqual(HTMLS[index])
    }

    expect(toHTML({ blocks: [RAW.blocks[0], RAW.blocks[1]] })).toEqual(
        HTMLS[0] + HTMLS[1]
    )
    expect(toHTML(RAW)).toEqual(HTMLS.join(''))
})

const HTMLS = [
    '<h1>This is a Title</h1>',
    '<p>A</p>',
    '<p><strong>This text should be bold!</strong></p>',
    '<p><u>This text should be underlined.</u></p>',
    '<p><em>And this text should be italic.</em></p>',
    '<ul><li>thing 1</li><li><em>thing</em> 2</li></ul>',
]
const RAW = {
    entityMap: {},
    blocks: [
        {
            key: '8l6bm',
            text: 'This is a Title',
            type: 'header-one',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
        },
        {
            key: '4no7m',
            text: 'A',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
        },
        {
            key: '8i090',
            text: 'This text should be bold!',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [
                {
                    offset: 0,
                    length: 25,
                    style: 'BOLD',
                },
            ],
            entityRanges: [],
            data: {},
        },
        {
            key: '42ncd',
            text: 'This text should be underlined.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [
                {
                    offset: 0,
                    length: 31,
                    style: 'UNDERLINE',
                },
            ],
            entityRanges: [],
            data: {},
        },
        {
            key: '327r6',
            text: 'And this text should be italic.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [
                {
                    offset: 0,
                    length: 31,
                    style: 'ITALIC',
                },
            ],
            entityRanges: [],
            data: {},
        },
        {
            key: '12tpo',
            text: 'thing 1',
            type: 'unordered-list-item',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
        },
        {
            key: '3cb4g',
            text: 'thing 2',
            type: 'unordered-list-item',
            depth: 0,
            inlineStyleRanges: [
                {
                    offset: 0,
                    length: 5,
                    style: 'ITALIC',
                },
            ],
            entityRanges: [],
        },
    ],
}
