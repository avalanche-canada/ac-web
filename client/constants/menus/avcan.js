import { useIntlMemo } from 'hooks/intl'

export default function useMenu() {
    return useIntlMemo(intl => {
        let id = 0
        const Gear = {
            id: id++,
            label: intl.formatMessage({
                description: 'AvCan menu',
                defaultMessage: 'Essential gear',
            }),
            to: '/gear',
        }
        const TripPlanner = {
            id: id++,
            label: intl.formatMessage({
                description: 'AvCan menu',
                defaultMessage: 'Trip planner',
            }),
            to: '/planning/trip-planner',
        }
        const Dangerator = {
            id: id++,
            label: intl.formatMessage({
                description: 'AvCan menu',
                defaultMessage: 'Dangerator',
            }),
            to: '/dangerator',
        }
        const ForecastRegionsListView = {
            id: id++,
            label: intl.formatMessage({
                description: 'AvCan menu',
                defaultMessage: 'Forecast regions list view',
            }),
            to: '/forecasts',
        }
        const WeatherStationsListView = {
            id: id++,
            label: intl.formatMessage({
                description: 'AvCan menu',
                defaultMessage: 'Weather stations list view',
            }),
            to: '/weather/stations',
        }
        const MountainWeatherForecast = {
            id: id++,
            label: intl.formatMessage({
                description: 'AvCan menu',
                defaultMessage: 'Mountain Weather Forecast',
            }),
            to: '/weather',
        }
        const ForecasterBlog = {
            id: id++,
            label: intl.formatMessage({
                description: 'AvCan menu',
                defaultMessage: 'Forecasters’ blogs',
            }),
            to: '/blogs?category=forecaster+blog',
        }
        const AvCanTrainingCourses = {
            id: id++,
            label: intl.formatMessage({
                description: 'AvCan menu',
                defaultMessage: 'AvCan Training Courses',
            }),
            header: true,
            to: '/training',
            children: [
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'Find a course',
                    }),
                    to: '/training/courses',
                },
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'Find a provider',
                    }),
                    to: '/training/providers',
                },
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'Avalanche Skills Training 1',
                    }),
                    to: '/training#ast1',
                },
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'Companion Rescue Skills',
                    }),
                    to: '/training#crs',
                },
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'Managing Avalanche Terrain',
                    }),
                    to: '/training#mat',
                },
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'AST 1+',
                    }),
                    to: '/training#ast1+',
                },
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'Avalanche Skills Training 2',
                    }),
                    to: '/training#ast2',
                },
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'Teaching Avalanche Skills Training',
                    }),
                    to: '/instructing-ast',
                },
            ],
        }
        const MountainInformationNetworkListView = {
            id: id++,
            label: intl.formatMessage({
                description: 'AvCan menu',
                defaultMessage: 'Reports list view',
            }),
            to: '/mountain-information-network/submissions',
        }
        const MountainInformationNetwork = {
            id: id++,
            label: intl.formatMessage({
                description: 'AvCan menu',
                defaultMessage: 'Mountain Information Network',
            }),
            header: true,
            to: '/mountain-information-network',
            children: [
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'How to GET information?',
                    }),
                    to: '/mountain-information-network#get-information',
                },
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'How to GIVE information?',
                    }),
                    to: '/mountain-information-network#give-information',
                },
                MountainInformationNetworkListView,
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'Create a report',
                    }),
                    to: '/mountain-information-network/submit',
                },
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'My account',
                    }),
                    to: '/account',
                },
            ],
        }
        const Planning = {
            id: id++,
            label: intl.formatMessage({
                description: 'AvCan menu',
                defaultMessage: 'Planning',
            }),
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
        const OnlineEducation = {
            id: id++,
            label: intl.formatMessage({
                description: 'AvCan menu',
                defaultMessage: 'Online Education',
            }),
            header: true,
            to: '/education',
            children: [
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'Online avalanche tutorial',
                    }),
                    to: '/tutorial',
                },
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'Cours d’avalanche en ligne (français)',
                    }),
                    to: '/tutoriel',
                },
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'Glossary',
                    }),
                    to: '/glossary',
                },
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'Rescue at Cherry Bowl',
                    }),
                    to: 'https://avalanche.ca/cherry-bowl',
                },
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'Land of Thundering Snow',
                    }),
                    to: 'http://www.landofthunderingsnow.ca',
                },
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'Videos',
                    }),
                    to: 'https://vimeo.com/avalanchecanada',
                },
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'Recorded Webinars',
                    }),
                    to: '/education/recorded-webinars',
                },
            ],
        }

        return {
            id: id++,
            label: intl.formatMessage({
                description: 'AvCan menu',
                defaultMessage: 'Avalanche Canada',
            }),
            to: '/',
            children: [
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'Backcountry Resources',
                    }),
                    children: [
                        Object.assign({}, MountainInformationNetwork, {
                            id: id++,
                        }),
                        Planning,
                        {
                            id: id++,
                            label: intl.formatMessage({
                                description: 'AvCan menu',
                                defaultMessage: 'Information',
                            }),
                            to: '/information',
                            header: true,
                            children: [
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'Forecast archive',
                                    }),
                                    to: '/forecasts/archives',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage:
                                            'Avalanche advisory archive',
                                    }),
                                    to: '/advisories/archives',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage:
                                            'Avalanche incident database',
                                    }),
                                    to: '/incidents',
                                },
                            ],
                        },
                    ],
                },
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'Learn',
                    }),
                    children: [
                        Object.assign({}, AvCanTrainingCourses, { id: id++ }),
                        Object.assign({}, OnlineEducation, { id: id++ }),
                        {
                            id: id++,
                            label: intl.formatMessage({
                                description: 'AvCan menu',
                                defaultMessage: 'Mountain Sledding',
                            }),
                            header: true,
                            to: '/sled',
                            children: [
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'Avalanche basics',
                                    }),
                                    to: '/sled#avalanche-basics',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'Featured resources',
                                    }),
                                    to: '/sled#featured-resources',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'Throttle Decisions',
                                    }),
                                    to: '/sled#throttle-decisions',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'News',
                                    }),
                                    to: '/sled#news',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'Events',
                                    }),
                                    to: '/sled#events',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'SledComm',
                                    }),
                                    to: '/sled#sledcomm',
                                },
                            ],
                        },
                        {
                            id: id++,
                            label: intl.formatMessage({
                                description: 'AvCan menu',
                                defaultMessage: 'Youth Education',
                            }),
                            header: true,
                            to: '/youth',
                            children: [
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'Teaching guidelines',
                                    }),
                                    to: '/youth#teaching-guidelines',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'Our programs',
                                    }),
                                    to: '/youth#programs',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage:
                                            'Curriculum & resources',
                                    }),
                                    to: '/youth#curriculum',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'External programs',
                                    }),
                                    to: '/youth#external-programs',
                                },
                            ],
                        },
                    ],
                },
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'Start Here',
                    }),
                    children: [
                        {
                            id: id++,
                            label: intl.formatMessage({
                                description: 'AvCan menu',
                                defaultMessage:
                                    'Fresh to the Backcountry? Start Here',
                            }),
                            header: true,
                            to: '/start-here',
                            children: [
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage:
                                            'What is avalanche terrain?',
                                    }),
                                    to: '/start-here#avalanche-terrain',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage:
                                            'What are avalanche conditions?',
                                    }),
                                    to: '/start-here#weather-factors',
                                },
                                {
                                    id: id++,
                                    label:
                                        'What does snowpack instability look like?',
                                    to: '/start-here#instability-signs',
                                },
                            ],
                        },
                        Object.assign({}, OnlineEducation, { id: id++ }),
                        Object.assign({}, AvCanTrainingCourses, { id: id++ }),
                    ],
                },
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'News & Events',
                    }),
                    children: [
                        {
                            id: id++,
                            to: '/news',
                            label: intl.formatMessage({
                                description: 'AvCan menu',
                                defaultMessage: 'News',
                            }),
                            headline: 'Visit our latest news.',
                        },
                        {
                            id: id++,
                            to: '/events',
                            label: intl.formatMessage({
                                description: 'AvCan menu',
                                defaultMessage: 'Events',
                            }),
                            headline: 'Visit our upcoming events.',
                        },
                    ],
                },
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'About',
                    }),
                    children: [
                        {
                            id: id++,
                            label: intl.formatMessage({
                                description: 'AvCan menu',
                                defaultMessage: 'About',
                            }),
                            header: true,
                            to: '/about',
                            children: [
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'Annual reports',
                                    }),
                                    to: '/about#annual-reports',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'The Aspect newsletter',
                                    }),
                                    to: '/about#newsletters',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'Our staff',
                                    }),
                                    to: '/about#staff',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'Board of directors',
                                    }),
                                    to: '/about#board',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'Service awards',
                                    }),
                                    to: '/about#awards',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'Contact us',
                                    }),
                                    to: '/about#contact-us',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'Careers',
                                    }),
                                    to: '/careers',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'COVID-19 Safety Plan',
                                    }),
                                    to:
                                        'https://avalanche.ca/assets/documents/AvCan+COVID-19+Safety+Plan+2020-09-24.pdf',
                                },
                            ],
                        },
                        {
                            id: id++,
                            label: intl.formatMessage({
                                description: 'AvCan menu',
                                defaultMessage: 'Ambassadors',
                            }),
                            header: true,
                            to: '/ambassadors',
                        },
                        {
                            id: id++,
                            label: intl.formatMessage({
                                description: 'AvCan menu',
                                defaultMessage: 'Sponsors & Collaborators',
                            }),
                            header: true,
                            to: '/sponsors',
                            children: [
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'Program partners',
                                    }),
                                    to: '/sponsors#partner',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'Premier sponsors',
                                    }),
                                    to: '/sponsors#premier',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'Supporters',
                                    }),
                                    to: '/sponsors#supporter',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'Contributors',
                                    }),
                                    to: '/sponsors#contributors',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage: 'Government partners',
                                    }),
                                    to: '/collaborators#government-partners',
                                },
                                {
                                    id: id++,
                                    label: intl.formatMessage({
                                        description: 'AvCan menu',
                                        defaultMessage:
                                            'Other agencies and organizations',
                                    }),
                                    to: '/collaborators#agencies',
                                },
                            ],
                        },
                    ],
                },
                {
                    id: id++,
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'Store',
                    }),
                    to: 'https://store.avalanche.ca',
                },
                {
                    id: 'foundation',
                    label: intl.formatMessage({
                        description: 'AvCan menu',
                        defaultMessage: 'Donate to Foundation',
                    }),
                    to: '/foundation',
                },
            ],
        }
    })
}
