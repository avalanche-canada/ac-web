let id = 1000

export default {
    id: String(id++),
    label: 'Avalanche Canada Foundation',
    to: '/foundation',
    children: [
        {
            id: String(id++),
            label: 'About',
            children: [
                {
                    id: String(id++),
                    label: 'Mission',
                    to: '/foundation/about#mission',
                    header: true,
                },
                {
                    id: String(id++),
                    label: 'Annual Reports and Financial Statements',
                    to: '/foundation/about#reports',
                    header: true,
                },
                {
                    id: String(id++),
                    label: 'Subscribe to newsletter',
                    to: '/foundation/about#subscribe',
                    header: true,
                },
                {
                    id: String(id++),
                    label: 'Board Of Directors',
                    to: '/foundation/about#board',
                    header: true,
                },
                {
                    id: String(id++),
                    label: 'Honourary Directors',
                    to: '/foundation/about#honourary',
                    header: true,
                },
                {
                    id: String(id++),
                    label: 'Contact',
                    to: '/foundation/about#contact',
                    header: true,
                },
            ],
        },
        {
            id: String(id++),
            label: 'Programs',
            children: [
                {
                    id: String(id++),
                    label: 'Avalanche Canada',
                    to: '/foundation/programs#avalanche-canada',
                    headline: 'Headline for Avalanche Canada',
                },
                {
                    id: String(id++),
                    label: 'Memorial Funds and Scholarships',
                    to: '/foundation/programs#memorial-funds',
                    headline: 'Headline for Memorial Funds and Scholarships',
                },
                {
                    id: String(id++),
                    label: 'Memorial Donations',
                    to: '/foundation/programs#memorial-donations',
                    headline: 'Headline for Memorial Donations',
                },
            ],
        },
        {
            id: String(id++),
            label: 'Funds',
            children: [
                {
                    id: String(id++),
                    label: 'Hugh & Helen Hincks Memorial Fund',
                    to: '/foundation/funds/hugh-and-helen-hincks-memorial',
                    header: true,
                },
                {
                    id: String(id++),
                    label: 'Craig Kelly Memorial Scholarship Fund',
                    to: '/foundation/funds/craig-kelly-memorial-scholarship',
                    header: true,
                },
                {
                    id: String(id++),
                    label: 'Cora Shea Memorial Fund',
                    to: '/foundation/funds/cora-shea-memorial',
                    header: true,
                },
                {
                    id: String(id++),
                    label: 'Al Hodgson Memorial Fund',
                    to: '/foundation/funds/al-hodgson-memorial',
                    header: true,
                },
                {
                    id: String(id++),
                    label: 'ISSW Fund',
                    to: '/foundation/funds/issw',
                    header: true,
                },
            ],
        },
        {
            id: String(id++),
            label: 'Contributors',
            children: [
                {
                    id: String(id++),
                    label: 'Donors',
                    to: '/foundation/donors',
                    headline: 'Headline for Donors',
                },
                {
                    id: String(id++),
                    label: 'Event Sponsors',
                    to: '/foundation/event-sponsors',
                    headline: 'Headline for Event Sponsors',
                },
            ],
        },
        {
            id: String(id++),
            label: 'News & Events',
            children: [
                {
                    id: String(id++),
                    label: 'News',
                    to: '/foundation/news-and-events#news',
                    headline: 'Visit our latest News.',
                },
                {
                    id: String(id++),
                    label: 'Events',
                    to: '/foundation/news-and-events#events',
                    headline: 'Visit our upcoming Events.',
                },
            ],
        },
    ],
}
