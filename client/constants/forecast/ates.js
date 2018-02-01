export const SIMPLE = 1
export const CHALLENGING = 2
export const COMPLEX = 3

export default new Set([SIMPLE, CHALLENGING, COMPLEX])

export const Texts = new Map([
    [SIMPLE, 'Simple'],
    [CHALLENGING, 'Challenging'],
    [COMPLEX, 'Complex'],
])

export const Palette = new Map([
    [SIMPLE, '#3EA031'],
    [CHALLENGING, '#4248C2'],
    [COMPLEX, '#000000'],
])

export const Descriptions = new Map([
    [
        SIMPLE,
        'Exposure to low angle or primarily forested terrain. Some forest openings may involve the runout zones of infrequent avalanches. Many options to reduce or eliminate exposure. No glacier travel.',
    ],
    [
        CHALLENGING,
        'Exposure to well defined avalanche paths, starting zones or terrain traps; options exist to reduce or eliminate exposure with careful route-finding. Glacier travel is straightforward but crevasse hazards may exist.',
    ],
    [
        COMPLEX,
        'Exposure to multiple overlapping avalanche paths or large expanses of steep, open terrain; multiple avalanche starting zones and terrain traps below; minimal options to reduce exposure. Complicated glacier travel with extensive crevasse bands or icefalls.',
    ],
])
