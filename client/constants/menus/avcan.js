let id = 0

const Gear = {
    id: id++,
    label: 'Essential gear',
    to: '/gear',
}
const TripPlanner = {
    id: id++,
    label: 'Trip planner',
    to: '/planning/trip-planner',
}
const Dangerator = {
    id: id++,
    label: 'Dangerator',
    to: '/dangerator',
}
const ForecastRegionsListView = {
    id: id++,
    label: 'Forecast regions list view',
    to: '/forecasts',
}
const WeatherStationsListView = {
    id: id++,
    label: 'Weather stations list view',
    to: '/weather/stations',
}
const MountainWeatherForecast = {
    id: id++,
    label: 'Mountain Weather Forecast',
    to: '/weather',
}
const ForecasterBlog = {
    id: id++,
    label: 'Forecasters’ blogs',
    to: '/blogs?category=forecaster+blog',
}
const AvCanTrainingCourses = {
    id: id++,
    label: 'AvCan Training Courses',
    header: true,
    to: '/training',
    children: [
        {
            id: id++,
            label: 'Find a course',
            to: '/training/courses',
        },
        {
            id: id++,
            label: 'Find a provider',
            to: '/training/providers',
        },
        {
            id: id++,
            label: 'Avalanche Skills Training 1',
            to: '/training#ast1',
        },
        {
            id: id++,
            label: 'Companion Rescue Skills',
            to: '/training#crs',
        },
        {
            id: id++,
            label: 'Managing Avalanche Terrain',
            to: '/training#mat',
        },
        {
            id: id++,
            label: 'AST 1+',
            to: '/training#ast1+',
        },
        {
            id: id++,
            label: 'Avalanche Skills Training 2',
            to: '/training#ast2',
        },
        {
            id: id++,
            label: 'Teaching Avalanche Skills Training',
            to: '/instructing-ast',
        },
    ],
}
const MountainInformationNetworkListView = {
    id: id++,
    label: 'Reports list view',
    to: '/mountain-information-network/submissions',
}
const MountainInformationNetwork = {
    id: id++,
    label: 'Mountain Information Network',
    header: true,
    to: '/mountain-information-network',
    children: [
        {
            id: id++,
            label: 'How to GET information?',
            to: '/mountain-information-network#get-information',
        },
        {
            id: id++,
            label: 'How to GIVE information?',
            to: '/mountain-information-network#give-information',
        },
        MountainInformationNetworkListView,
        {
            id: id++,
            label: 'Create a report',
            to: '/mountain-information-network/submit',
        },
        {
            id: id++,
            label: 'My account',
            to: '/account',
        },
    ],
}
const Planning = {
    id: id++,
    label: 'Planning',
    to: '/planning',
    header: true,
    children: [
        MountainWeatherForecast,
        ForecasterBlog,
        TripPlanner,
        Dangerator,
        Gear,
        ForecastRegionsListView,
        WeatherStationsListView,
    ],
}

module.exports = {
    id: id++,
    label: 'Avalanche Canada',
    to: '/',
    children: [
        {
            id: id++,
            label: 'Backcountry Resources',
            children: [
                Object.assign({}, MountainInformationNetwork, {
                    id: id++,
                }),
                Planning,
                {
                    id: id++,
                    label: 'Information',
                    to: '/information',
                    header: true,
                    children: [
                        {
                            id: id++,
                            label: 'Forecast archive',
                            to: '/forecasts/archives',
                        },
                        {
                            id: id++,
                            label: 'Avalanche advisory archive',
                            to: '/advisories/archives',
                        },
                        {
                            id: id++,
                            label: 'Avalanche incident database',
                            to: '/incidents',
                        },
                    ],
                },
            ],
        },
        {
            id: id++,
            label: 'Learn',
            children: [
                {
                    id: id++,
                    label: 'Fresh to the Backcountry?',
                    header: true,
                    to: '/start-here',
                    children: [
                        {
                            id: id++,
                            label: 'What is avalanche terrain?',
                            to: '/start-here#avalanche-terrain',
                        },
                        {
                            id: id++,
                            label: 'What are avalanche conditions?',
                            to: '/start-here#weather-factors',
                        },
                        {
                            id: id++,
                            label: 'What does snowpack instability look like?',
                            to: '/start-here#instability-signs',
                        },
                    ],
                },
                Object.assign({}, AvCanTrainingCourses, { id: id++ }),
                {
                    id: id++,
                    label: 'Online Education',
                    header: true,
                    to: '/education',
                    children: [
                        {
                            id: id++,
                            label: 'Online avalanche tutorial',
                            to: '/tutorial',
                        },
                        {
                            id: id++,
                            label: 'Cours d’avalanche en ligne (français)',
                            to: '/tutoriel',
                        },
                        {
                            id: id++,
                            label: 'Glossary',
                            to: '/glossary',
                        },
                        {
                            id: id++,
                            label: 'Rescue at Cherry Bowl',
                            to: 'https://avalanche.ca/cherry-bowl',
                        },
                        {
                            id: id++,
                            label: 'Land of Thundering Snow',
                            to: 'http://www.landofthunderingsnow.ca',
                        },
                        {
                            id: id++,
                            label: 'Videos',
                            to: 'https://vimeo.com/avalanchecanada',
                        },
                    ],
                },
                {
                    id: id++,
                    label: 'Youth Education',
                    header: true,
                    to: '/youth',
                    children: [
                        {
                            id: id++,
                            label: 'Teaching guidelines',
                            to: '/youth#teaching-guidelines',
                        },
                        {
                            id: id++,
                            label: 'Our programs',
                            to: '/youth#programs',
                        },
                        {
                            id: id++,
                            label: 'Curriculum & resources',
                            to: '/youth#curriculum',
                        },
                        {
                            id: id++,
                            label: 'External programs',
                            to: '/youth#external-programs',
                        },
                    ],
                },
            ],
        },
        {
            id: id++,
            label: 'Snowmobilers',
            to: '/sled',
            children: [
                {
                    id: id++,
                    label: 'Mountain Sledding',
                    header: true,
                    to: '/sled',
                    children: [
                        {
                            id: id++,
                            label: 'Avalanche basics',
                            to: '/sled#avalanche-basics',
                        },
                        {
                            id: id++,
                            label: 'Featured resources',
                            to: '/sled#featured-resources',
                        },
                        {
                            id: id++,
                            label: 'Throttle Decisions',
                            to: '/sled#throttle-decisions',
                        },
                        {
                            id: id++,
                            label: 'News',
                            to: '/sled#news',
                        },
                        {
                            id: id++,
                            label: 'Events',
                            to: '/sled#events',
                        },
                        {
                            id: id++,
                            label: 'SledComm',
                            to: '/sled#sledcomm',
                        },
                    ],
                },
                Object.assign({}, MountainInformationNetwork, {
                    id: id++,
                }),
                Planning,
                Object.assign({}, AvCanTrainingCourses, { id: id++ }),
            ],
        },
        {
            id: id++,
            label: 'News & Events',
            children: [
                {
                    id: id++,
                    to: '/news',
                    label: 'News',
                    headline: 'Visit our latest news.',
                },
                {
                    id: id++,
                    to: '/events',
                    label: 'Events',
                    headline: 'Visit our upcoming events.',
                },
            ],
        },
        {
            id: id++,
            label: 'About',
            children: [
                {
                    id: id++,
                    label: 'About',
                    header: true,
                    to: '/about',
                    children: [
                        {
                            id: id++,
                            label: 'Annual reports',
                            to: '/about#annual-reports',
                        },
                        {
                            id: id++,
                            label: 'The Aspect newsletter',
                            to: '/about#newsletters',
                        },
                        {
                            id: id++,
                            label: 'Our staff',
                            to: '/about#staff',
                        },
                        {
                            id: id++,
                            label: 'Board of directors',
                            to: '/about#board',
                        },
                        {
                            id: id++,
                            label: 'Service awards',
                            to: '/about#awards',
                        },
                        {
                            id: id++,
                            label: 'Contact us',
                            to: '/about#contact-us',
                        },
                        {
                            id: id++,
                            label: 'Careers',
                            to: '/careers',
                        },
                    ],
                },
                {
                    id: id++,
                    label: 'Ambassadors',
                    header: true,
                    to: '/ambassadors',
                },
                {
                    id: id++,
                    label: 'Sponsors & Collaborators',
                    header: true,
                    to: '/sponsors',
                    children: [
                        {
                            id: id++,
                            label: 'Program partners',
                            to: '/sponsors#partner',
                        },
                        {
                            id: id++,
                            label: 'Premier sponsors',
                            to: '/sponsors#premier',
                        },
                        {
                            id: id++,
                            label: 'Supporters',
                            to: '/sponsors#supporter',
                        },
                        {
                            id: id++,
                            label: 'Contributors',
                            to: '/sponsors#contributors',
                        },
                        {
                            id: id++,
                            label: 'Government partners',
                            to: '/collaborators#government-partners',
                        },
                        {
                            id: id++,
                            label: 'Other agencies and organizations',
                            to: '/collaborators#agencies',
                        },
                    ],
                },
            ],
        },
        {
            id: id++,
            label: 'Store',
            to: 'https://store.avalanche.ca',
        },
        {
            id: 'donate',
            label: 'Text to Donate',
            to: '/donate',
        },
        {
            id: 'foundation',
            label: 'Donate to Foundation',
            to: '/foundation',
        },
    ],
}
