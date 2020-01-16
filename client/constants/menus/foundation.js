let id = 100

module.exports = {
    id: id++,
    label: 'Avalanche Canada Foundation',
    to: '/foundation',
    children: [
        {
            id: id++,
            label: 'About',
            children: [
                {
                    id: id++,
                    label: 'About',
                    to: '/foundation/about',
                    header: true,
                    children: [
                        {
                            id: id++,
                            label: 'Mission',
                            to: '/foundation/about#mission',
                        },
                        {
                            id: id++,
                            label: 'Vision',
                            to: '/foundation/about#vision',
                        },
                        {
                            id: id++,
                            label: 'Subscribe to newsletter',
                            to: '/foundation/about#subscribe',
                        },
                        {
                            id: id++,
                            label: 'Annual Reports and Financial Statements',
                            to: '/foundation/about#reports',
                        },
                        {
                            id: id++,
                            label: 'Board Of Directors',
                            to: '/foundation/about#board',
                        },
                        {
                            id: id++,
                            label: 'Honorary Directors',
                            to: '/foundation/about#honorary',
                        },
                        {
                            id: id++,
                            label: 'Contact',
                            to: '/foundation/about#contact',
                        },
                    ],
                },
            ],
        },
        {
            id: id++,
            label: 'Programs',
            children: [
                {
                    id: id++,
                    label: 'Programs',
                    to: '/foundation/programs',
                    header: true,
                    children: [
                        {
                            id: id++,
                            label: 'Avalanche Canada',
                            to: '/foundation/programs#avalanche-canada',
                        },
                        {
                            id: id++,
                            label: 'Memorial Funds and Scholarships',
                            to: '/foundation/programs#memorial-funds',
                        },
                        {
                            id: id++,
                            label: 'Memorial Donations',
                            to: '/foundation/programs#memorial-donations',
                        },
                    ],
                },
            ],
        },
        {
            id: id++,
            label: 'Funds',
            children: [
                {
                    id: id++,
                    label: 'Funds',
                    header: true,
                    children: [
                        {
                            id: id++,
                            label: 'Hugh & Helen Hincks Memorial Fund',
                            to:
                                '/foundation/funds/hugh-and-helen-hincks-memorial',
                        },
                        {
                            id: id++,
                            label: 'Craig Kelly Memorial Scholarship Fund',
                            to:
                                '/foundation/funds/craig-kelly-memorial-scholarship',
                        },
                        {
                            id: id++,
                            label: 'Cora Shea Memorial Fund',
                            to: '/foundation/funds/cora-shea-memorial',
                        },
                        {
                            id: id++,
                            label: 'Al Hodgson Memorial Fund',
                            to: '/foundation/funds/al-hodgson-memorial',
                        },
                        {
                            id: id++,
                            label: 'ISSW Fund',
                            to: '/foundation/funds/issw',
                        },
                    ],
                },
            ],
        },
        {
            id: id++,
            label: 'Contributors',
            children: [
                {
                    id: id++,
                    label: 'Contributors',
                    header: true,
                    children: [
                        {
                            id: id++,
                            label: 'Donors',
                            to: '/foundation/donors',
                        },
                        {
                            id: id++,
                            label: 'Event Sponsors',
                            to: '/foundation/event-sponsors',
                        },
                    ],
                },
            ],
        },
        {
            id: id++,
            label: 'News & Events',
            children: [
                {
                    id: id++,
                    label: 'News',
                    to: '/foundation/news-and-events#news',
                    headline: 'Visit our latest News.',
                },
                {
                    id: id++,
                    label: 'Events',
                    to: '/foundation/news-and-events#events',
                    headline: 'Visit our upcoming Events.',
                },
            ],
        },
    ],
}
