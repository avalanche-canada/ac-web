let id = 0

const MountainInformationNetwork = {
    id: id++,
    label: 'Mountain Information Network',
    header: true,
    to: '/mountain-information-network',
    children: [{
        id: id++,
        label: 'How to GET information?',
        to: '/mountain-information-network#get-information',
    }, {
        id: id++,
        label: 'How to GIVE information?',
        to: '/mountain-information-network#give-information',
    }, {
        id: id++,
        label: 'Create a Report',
        to: '/mountain-information-network/submit',
    }]
}
const Gear = {
    id: id++,
    label: 'Essential Gear',
    to: '/gear',
}
const TripPlanner = {
    id: id++,
    label: 'Trip Planner',
    to: '/trip-planner'
}
const Forecasts = {
    id: id++,
    label: 'Forecast Regions',
    to: '/forecasts',
}
const MountainWeatherForecast = {
    id: id++,
    label: 'Mountain Weather Forecast',
    to: '/weather'
}
const ForecasterBlog = {
    id: id++,
    label: "Forecasters’ Blogs",
    to: '/blogs?category=forecaster+blog'
}
const AvCanTrainingCourses = {
    id: id++,
    label: 'AvCan Training Courses',
    header: true,
    to: '/training',
    children: [{
        id: id++,
        label: 'Find a course',
        to: '/training/courses',
    }, {
        id: id++,
        label: 'Find a provider',
        to: '/training/providers',
    }, {
        id: id++,
        label: 'Avalanche Skills Training 1',
        to: '/training#ast1',
    }, {
        id: id++,
        label: 'Avalanche Skills Training 2',
        to: '/training#ast2',
    }, {
        id: id++,
        label: 'Managing Avalanche Terrain',
        to: '/training#mat',
    }, {
        id: id++,
        label: 'Companion Rescue Skills',
        to: '/training#crs',
    }, {
        id: id++,
        label: 'Teaching Avalanche Skills Training',
        to: '/instructing-ast',
    }]
}
const Planning = {
    id: id++,
    label: 'Planning',
    to: '/planning',
    header: true,
    children: [
        MountainWeatherForecast,
        ForecasterBlog,
        Gear,
        TripPlanner,
        Forecasts
    ]
}

export const AvalancheCanada = {
    children: [{
        id: id++,
        label: 'Backcountry Resources',
        children: [
            {...MountainInformationNetwork, id: id++},
            Planning, {
                id: id++,
                label: 'Information',
                to: '/information',
                header: true,
                children: [{
                    id: id++,
                    label: 'Forecast Archive',
                    to: '/forecasts/archives'
                }, {
                    id: id++,
                    label: 'HotZone Archive',
                    to: '/hot-zone-reports/archives'
                }, {
                    id: id++,
                    label: 'Avalanche Incident Database',
                    to: '/incidents'
                }]
            }
        ]
    }, {
        id: id++,
        label: 'Learn',
        children: [{...AvCanTrainingCourses, id: id++}, {
            id: id++,
            label: 'Online Education',
            header: true,
            to: '/training',
            children: [{
                id: id++,
                label: 'Online Avalanche Tutorial',
                to: '/tutorial',
            }, {
                id: id++,
                label: 'Cours d’avalanche en ligne (français)',
                to: '/tutoriel',
            }, {
                id: id++,
                label: 'Rescue at Cherry Bowl',
                to: '/cherry-bowl',
            }, {
                id: id++,
                label: 'Land of Thundering Snow',
                to: 'http://www.landofthunderingsnow.ca'
            }]
        }, {
            id: id++,
            label: 'Youth Education',
            header: true,
            to: '/youth',
            children: [{
                id: id++,
                label: 'Teaching Guidelines',
                to: '/youth#teaching-guidelines',
            }, {
                id: id++,
                label: 'Our Programs',
                to: '/youth#our-programs',
            }, {
                id: id++,
                label: 'Curriculum & Resources',
                to: '/youth#curriculum',
            }, {
                id: id++,
                label: 'External Programs',
                to: '/youth#external-programs',
            }],
        }]
    }, {
        id: id++,
        label: 'Snowmobilers',
        to: '/sled',
        children: [{
            id: id++,
            label: 'Mountain Sledding',
            header: true,
            to: '/sled',
            children: [{
                id: id++,
                label: 'Avalanche Basics',
                to: '/sled#avalanche-basics',
            }, {
                id: id++,
                label: 'Featured Resources',
                to: '/sled#featured-resources',
            }, {
                id: id++,
                label: 'Throttle Decisions',
                to: '/sled#throttle-decisions',
            }, {
                id: id++,
                label: 'News',
                to: '/news?tags=snowmobiler&tags=snowmobile+',
            }, {
                id: id++,
                label: 'Events',
                to: '/events?tags=snowmobiler&timeline=upcoming',
            }, {
                id: id++,
                label: 'SledComm',
                to: '/sled#sledcomm',
            }]
        },
        {...MountainInformationNetwork, id: id++},
        Planning,
        {...AvCanTrainingCourses, id: id++}
    ]
    }, {
        id: id++,
        label: 'News & Events',
        children: [{
            id: id++,
            to: '/news',
            label: 'News',
            headline: 'Visit our latest News.',
        }, {
            id: id++,
            to: '/events',
            label: 'Events',
            headline: 'Visit our upcoming Events.',
        }]
    }, {
        id: id++,
        label: 'About',
        noWrap: true,
        children: [{
            id: id++,
            label: 'About',
            header: true,
            to: '/about',
            children: [{
                id: id++,
                label: 'Annual Reports',
                to: '/about#annual-reports',
            }, {
                id: id++,
                label: 'Subscribe to our Newsletter',
                to: '/about#newsletter',
            }, {
                id: id++,
                label: 'Board of Directors',
                to: '/about#board',
            }, {
                id: id++,
                label: 'Our Staff',
                to: '/about#staff',
            }, {
                id: id++,
                label: 'Service Awards',
                to: '/about#awards',
            // }, {
            //     label: 'Tech',
            //     to: '/tech',
            }, {
                id: id++,
                label: 'Contact Us',
                to: '/about#contact-us',
            }]
        }, {
            id: id++,
            label: 'Membership',
            header: true,
            to: '/membership',
            children: [{
                id: id++,
                to: 'https://membership.avalanche.ca/np/clients/cac/membershipJoin.jsp',
                label: 'Individual',
            }, {
                id: id++,
                to: 'https://membership.avalanche.ca/np/clients/cac/membershipJoin.jsp?&constTypeFlag=org',
                label: 'Organization',
            }, {
                id: id++,
                to: 'https://membership.avalanche.ca/np/clients/cac/login.jsp',
                label: 'Already a Member?',
            }]
        }, {
            id: id++,
            label: 'Ambassadors',
            header: true,
            to: '/ambassadors',
            children: [{
            //     label: 'Connect',
            //     to: '/ambassadors#connect',
            // }, {
                id: id++,
                label: 'Nadine Overwater',
                to: '/ambassadors#nadine-overwater',
            }, {
                id: id++,
                label: 'Chris Rubens',
                to: '/ambassadors#chris-rubens',
            }, {
                id: id++,
                label: 'Wayne Flann',
                to: '/ambassadors#wayne-flann',
            }, {
                id: id++,
                label: 'Brodie Evans',
                to: '/ambassadors#brodie-evans',
            }, {
                id: id++,
                label: 'Piper Noble',
                to: '/ambassadors#piper-noble',
            }, {
                id: id++,
                label: 'Keegan Capel',
                to: '/ambassadors#keegan-capel',
            }],
        }, {
            id: id++,
            label: 'Sponsors & Collaborators',
            header: true,
            to: '/sponsors',
            children: [{
                id: id++,
                label: 'Program Partners',
                to: 'sponsors#partner'
            }, {
                id: id++,
                label: 'Premier Sponsors',
                to: 'sponsors#funding'
            }, {
                id: id++,
                label: 'Supporters',
                to: 'sponsors#supplier'
            }, {
                id: id++,
                label: 'Contributors',
                to: 'sponsors#associate'
            }, {
                id: id++,
                label: 'Government Partners',
                to:'collaborators#government'
            }, {
                id: id++,
                label: 'Other Agencies and Organizations',
                to:'collaborators#other'
            }]
        }]
    }, {
        id: id++,
        label: 'Store',
        children: [{
            id: id++,
            to: '/auction',
            label: 'Web Auction',
            headline: 'Visit our Web auction.',
        }]
    }]
}
export const AvalancheCanadaFoundation = {
    children: [{
        id: id++,
        label: 'About',
        children: [{
            id: id++,
            label: 'Mission',
            to: '/foundation/about#mission',
            header: true,
        }, {
            id: id++,
            label: 'Annual Reports and Financial Statements',
            to: '/foundation/about#reports',
            header: true,
        }, {
            id: id++,
            label: 'Subscribe to newsletter',
            to: '/foundation/about#subscribe',
            header: true,
        }, {
            id: id++,
            label: 'Board Of Directors',
            to: '/foundation/about#board',
            header: true,
        }, {
            id: id++,
            label: 'Honourary Directors',
            to: '/foundation/about#honourary',
            header: true,
        }, {
            id: id++,
            label: 'Contact',
            to: '/foundation/about#contact',
            header: true,
        }]
    }, {
        id: id++,
        label: 'Programs',
        children: [{
            id: id++,
            label: 'Avalanche Canada',
            to: '/foundation/programs#avalanche-canada',
            headline: 'Headline for Avalanche Canada',
        }, {
            id: id++,
            label: 'Memorial Funds and Scholarships',
            to: '/foundation/programs#memorial-funds',
            headline: 'Headline for Memorial Funds and Scholarships',
        }, {
            id: id++,
            label: 'Memorial Donations',
            to: '/foundation/programs#memorial-donations',
            headline: 'Headline for Memorial Donations',
        }]
    }, {
        id: id++,
        label: 'Funds',
        children: [{
            id: id++,
            label: 'Hugh & Helen Hincks Memorial Fund',
            to: '/foundation/funds/hugh-and-helen-hincks-memorial',
            header: true,
        }, {
            id: id++,
            label: 'Craig Kelly Memorial Scholarship Fund',
            to: '/foundation/funds/craig-kelly-memorial-scholarship',
            header: true,
        }, {
            id: id++,
            label: 'Cora Shea Memorial Fund',
            to: '/foundation/funds/cora-shea-memorial',
            header: true,
        }, {
            id: id++,
            label: 'Al Hodgson Memorial Fund',
            to: '/foundation/funds/al-hodgson-memorial',
            header: true,
        }, {
            id: id++,
            label: 'ISSW Fund',
            to: '/foundation/funds/issw',
            header: true,
        }],
    }, {
        id: id++,
        label: 'Contributors',
        children: [{
            id: id++,
            label: 'Donors',
            to: '/foundation/donors',
            headline: 'Headline for Donors',
        }, {
            id: id++,
            label: 'Event Sponsors',
            to: '/foundation/event-sponsors',
            headline: 'Headline for Event Sponsors',
        }]
    }, {
        id: id++,
        label: 'News & Events',
        children: [{
            id: id++,
            label: 'News',
            to: '/foundation/news-and-events#news',
            headline: 'Visit our latest News.',
        }, {
            id: id++,
            label: 'Events',
            to: '/foundation/news-and-events#events',
            headline: 'Visit our upcoming Events.',
        }]
    }]
}
