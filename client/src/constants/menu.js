const MountainInformationNetwork = {
    label: 'Mountain Information Network',
    header: true,
    to: '/mountain-information-network',
    children: [{
        label: 'How to GET information?',
        to: '/mountain-information-network#get-information',
    }, {
        label: 'How to GIVE information?',
        to: '/mountain-information-network#give-information',
    }, {
        label: 'Create a Report',
        to: '/mountain-information-network/submit',
    }]
}
const Gear = {
    label: 'Essential Gear',
    to: '/gear',
}
const TripPlanner = {
    label: 'Trip Planner',
    to: '/trip-planner'
}
const Forecasts = {
    label: 'Forecast Regions',
    to: '/forecasts',
}
const MountainWeatherForecast = {
    label: 'Mountain Weather Forecast',
    to: '/weather'
}
const ForecasterBlog = {
    label: "Forecasters’ Blogs",
    to: '/blogs?category=forecaster+blog'
}
const AvCanTrainingCourses = {
    label: 'AvCan Training Courses',
    header: true,
    to: '/training',
    children: [{
        label: 'Find a course',
        to: '/training/courses',
    }, {
        label: 'Find a provider',
        to: '/training/providers',
    }, {
        label: 'Avalanche Skills Training 1',
        to: '/training#ast1',
    }, {
        label: 'Avalanche Skills Training 2',
        to: '/training#ast2',
    }, {
        label: 'Managing Avalanche Terrain',
        to: '/training#mat',
    }, {
        label: 'Companion Rescue Skills',
        to: '/training#crs',
    }, {
        label: 'Teaching Avalanche Skills Training',
        to: '/instructing-ast',
    }]
}
const Planning = {
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
        label: 'Backcountry Resources',
        children: [
            MountainInformationNetwork,
            Planning, {
                label: 'Information',
                to: '/information',
                header: true,
                children: [{
                //     label: 'FAQ',
                //     to: '/faq'
                // }, {
                    label: 'Forecast Archive',
                    to: '/forecasts/archives'
                }, {
                    label: 'Avalanche Incident Database',
                    to: '/incidents'
                }]
            }
        ]
    }, {
        label: 'Learn',
        children: [AvCanTrainingCourses, {
            label: 'Online Education',
            header: true,
            to: '/training',
            children: [{
                label: 'Online Avalanche Tutorial',
                to: '/tutorial',
            }, {
                label: 'Cours d’avalanche en ligne (français)',
                to: '/tutoriel',
            }, {
                label: 'Rescue at Cherry Bowl',
                to: '/cherry-bowl',
            }, {
                label: 'Land of Thundering Snow',
                to: 'http://www.landofthunderingsnow.ca'
            }]
        }, {
            label: 'Youth Education',
            header: true,
            to: '/youth',
            children: [{
                label: 'Teaching Guidelines',
                to: '/youth#teaching-guidelines',
            }, {
                label: 'Our Programs',
                to: '/youth#our-programs',
            }, {
                label: 'Curriculum & Resources',
                to: '/youth#curriculum',
            }, {
                label: 'External Programs',
                to: '/youth#external-programs',
            }],
        }]
    }, {
        label: 'Snowmobilers',
        to: '/sled',
        children: [{
            label: 'Mountain Sledding',
            header: true,
            to: '/sled',
            children: [{
                label: 'Avalanche Basics',
                to: '/sled#avalanche-basics',
            }, {
                label: 'Featured Resources',
                to: '/sled#featured-resources',
            }, {
                label: 'Throttle Decisions',
                to: '/sled#throttle-decisions',
            }, {
                label: 'News',
                to: '/news?tags=snowmobiler&tags=snowmobile+',
            }, {
                label: 'Events',
                to: '/events?tags=snowmobiler&timeline=upcoming',
            }, {
                label: 'SledComm',
                to: '/sled#sledcomm',
            }]
        },
        MountainInformationNetwork,
        Planning,
        AvCanTrainingCourses
    ]
    }, {
        label: 'News & Events',
        children: [{
            to: '/news',
            label: 'News',
            headline: 'Visit our latest News.',
        }, {
            to: '/events',
            label: 'Events',
            headline: 'Visit our upcoming Events.',
        }]
    }, {
        label: 'About',
        noWrap: true,
        children: [{
            label: 'About',
            header: true,
            to: '/about',
            children: [{
                label: 'Annual Reports',
                to: '/about#annual-reports',
            }, {
                label: 'Subscribe to our Newsletter',
                to: '/about#newsletter',
            }, {
                label: 'Board of Directors',
                to: '/about#board',
            }, {
                label: 'Our Staff',
                to: '/about#staff',
            }, {
                label: 'Service Awards',
                to: '/about#awards',
            // }, {
            //     label: 'Tech',
            //     to: '/tech',
            }, {
                label: 'Contact Us',
                to: '/about#contact-us',
            }]
        }, {
            label: 'Membership',
            header: true,
            to: '/membership',
            children: [{
                to: 'https://membership.avalanche.ca/np/clients/cac/membershipJoin.jsp',
                label: 'Individual',
            }, {
                to: 'https://membership.avalanche.ca/np/clients/cac/membershipJoin.jsp?&constTypeFlag=org',
                label: 'Organization',
            }, {
                to: 'https://membership.avalanche.ca/np/clients/cac/login.jsp',
                label: 'Already a Member?',
            }]
        }, {
            label: 'Ambassadors',
            header: true,
            to: '/ambassadors',
            children: [{
            //     label: 'Connect',
            //     to: '/ambassadors#connect',
            // }, {
                label: 'Nadine Overwater',
                to: '/ambassadors#nadine-overwater',
            }, {
                label: 'Chris Rubens',
                to: '/ambassadors#chris-rubens',
            }, {
                label: 'Wayne Flann',
                to: '/ambassadors#wayne-flann',
            }, {
                label: 'Brodie Evans',
                to: '/ambassadors#brodie-evans',
            }, {
                label: 'Piper Noble',
                to: '/ambassadors#piper-noble',
            }, {
                label: 'Keegan Capel',
                to: '/ambassadors#keegan-capel',
            }],
        }, {
            label: 'Sponsors & Collaborators',
            header: true,
            to: '/sponsors',
            children: [{
                label: 'Program Partners',
                to: 'sponsors#partner'
            }, {
                label: 'Premier Sponsors',
                to: 'sponsors#funding'
            }, {
                label: 'Supporters',
                to: 'sponsors#supplier'
            }, {
                label: 'Contributors',
                to: 'sponsors#associate'
            }, {
                label: 'Government Partners',
                to:'collaborators#government'
            }, {
                label: 'Other Agencies and Organizations',
                to:'collaborators#other'
            }]
        }]
    }, {
        label: 'Store',
        children: [{
            to: '/auction',
            label: 'Web Auction',
            headline: 'Visit our Web auction.',
        }]
    }]
}
export const AvalancheCanadaFoundation = {
    children: [{
        label: 'About',
        children: [{
            label: 'Mission',
            to: '/foundation/about#mission',
            header: true,
        }, {
            label: 'Annual Reports and Financial Statements',
            to: '/foundation/about#reports',
            header: true,
        }, {
            label: 'Subscribe to newsletter',
            to: '/foundation/about#subscribe',
            header: true,
        }, {
            label: 'Board Of Directors',
            to: '/foundation/about#board',
            header: true,
        }, {
            label: 'Honourary Directors',
            to: '/foundation/about#honourary',
            header: true,
        }, {
            label: 'Contact',
            to: '/foundation/about#contact',
            header: true,
        }]
    }, {
        label: 'Programs',
        children: [{
            label: 'Avalanche Canada',
            to: '/foundation/programs#avalanche-canada',
            headline: 'Headline for Avalanche Canada',
        }, {
            label: 'Memorial Funds and Scholarships',
            to: '/foundation/programs#memorial-funds',
            headline: 'Headline for Memorial Funds and Scholarships',
        }, {
            label: 'Memorial Donations',
            to: '/foundation/programs#memorial-donations',
            headline: 'Headline for Memorial Donations',
        }]
    }, {
        label: 'Funds',
        children: [{
            label: 'Hugh & Helen Hincks Memorial Fund',
            to: '/foundation/funds/hugh-and-helen-hincks-memorial',
            header: true,
        }, {
            label: 'Craig Kelly Memorial Scholarship Fund',
            to: '/foundation/funds/craig-kelly-memorial-scholarship',
            header: true,
        }, {
            label: 'Cora Shea Memorial Fund',
            to: '/foundation/funds/cora-shea-memorial',
            header: true,
        }, {
            label: 'Al Hodgson Memorial Fund',
            to: '/foundation/funds/al-hodgson-memorial',
            header: true,
        }, {
            label: 'ISSW Fund',
            to: '/foundation/funds/issw',
            header: true,
        }],
    }, {
        label: 'Contributors',
        children: [{
            label: 'Donors',
            to: '/foundation/donors',
            headline: 'Headline for Donors',
        }, {
            label: 'Event Sponsors',
            to: '/foundation/event-sponsors',
            headline: 'Headline for Event Sponsors',
        }]
    }, {
        label: 'News & Events',
        children: [{
            label: 'News',
            to: '/foundation/news-and-events#news',
            headline: 'Visit our latest News.',
        }, {
            label: 'Events',
            to: '/foundation/news-and-events#events',
            headline: 'Visit our upcoming Events.',
        }]
    }]
}
