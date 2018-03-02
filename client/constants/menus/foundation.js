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
                    label: 'About',
                    to: '/foundation/about',
                    header: true,
                    children: [
                        {
                            id: String(id++),
                            label: 'Mission',
                            to: '/foundation/about#mission',
                        },
                        {
                            id: String(id++),
                            label: 'Vision',
                            to: '/foundation/about#vision',
                        },
                        {
                            id: String(id++),
                            label: 'Subscribe to newsletter',
                            to: '/foundation/about#subscribe',
                        },
                        {
                            id: String(id++),
                            label: 'Annual Reports and Financial Statements',
                            to: '/foundation/about#reports',
                        },
                        {
                            id: String(id++),
                            label: 'Board Of Directors',
                            to: '/foundation/about#board',
                        },
                        {
                            id: String(id++),
                            label: 'Honourary Directors',
                            to: '/foundation/about#honourary',
                        },
                        {
                            id: String(id++),
                            label: 'Contact',
                            to: '/foundation/about#contact',
                        },
                    ],
                },
            ],
        },
        {
            id: String(id++),
            label: 'Programs',
            children: [
                {
                    id: String(id++),
                    label: 'Programs',
                    to: '/foundation/programs',
                    header: true,
                    children: [
                        {
                            id: String(id++),
                            label: 'Avalanche Canada',
                            to: '/foundation/programs#avalanche-canada',
                        },
                        {
                            id: String(id++),
                            label: 'Memorial Funds and Scholarships',
                            to: '/foundation/programs#memorial-funds',
                        },
                        {
                            id: String(id++),
                            label: 'Memorial Donations',
                            to: '/foundation/programs#memorial-donations',
                        },
                    ],
                },
            ],
        },
        {
            id: String(id++),
            label: 'Funds',
            children: [
                {
                    id: String(id++),
                    label: 'Funds',
                    header: true,
                    children: [
                        {
                            id: String(id++),
                            label: 'Hugh & Helen Hincks Memorial Fund',
                            to:
                                '/foundation/funds/hugh-and-helen-hincks-memorial',
                        },
                        {
                            id: String(id++),
                            label: 'Craig Kelly Memorial Scholarship Fund',
                            to:
                                '/foundation/funds/craig-kelly-memorial-scholarship',
                        },
                        {
                            id: String(id++),
                            label: 'Cora Shea Memorial Fund',
                            to: '/foundation/funds/cora-shea-memorial',
                        },
                        {
                            id: String(id++),
                            label: 'Al Hodgson Memorial Fund',
                            to: '/foundation/funds/al-hodgson-memorial',
                        },
                        {
                            id: String(id++),
                            label: 'ISSW Fund',
                            to: '/foundation/funds/issw',
                        },
                    ],
                },
            ],
        },
        {
            id: String(id++),
            label: 'Contributors',
            children: [
                {
                    id: String(id++),
                    label: 'Contributors',
                    header: true,
                    children: [
                        {
                            id: String(id++),
                            label: 'Donors',
                            to: '/foundation/donors',
                        },
                        {
                            id: String(id++),
                            label: 'Event Sponsors',
                            to: '/foundation/event-sponsors',
                        },
                    ],
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
