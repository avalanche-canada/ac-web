module.exports = {
    groupActivity: {
        type: 'checkbox',
        prompt: 'Activity:',
        options: {
            Snowmobiling: false,
            Skiing: false,
            'Climbing/Mountaineering': false,
            'Hiking/Scrambling': false,
            Snowshoeing: false,
            Tobogganing: false,
            Other: false,
        },
        inline: true,
        helpText: 'If other, please describe it below.',
        order: 1,
    },

    otherActivityDescription: {
        title: null,
        type: 'text',
        prompt: 'Describe other activity',
        value: null,
        order: 2,
        errorMessage: 'Please describe what other activity.',
        constraint: {
            field: 'groupActivity',
            option: 'Other',
        },
    },

    groupSize: {
        type: 'number',
        title: 'Group details:',
        prompt: 'Total in the group?',
        subTitle: 'Total in the group?',
        options: {
            min: 0,
            max: 100,
        },
        value: null,
        errorMessage: 'Number between 0 and 100 please.',
        order: 3,
    },

    numberFullyBuried: {
        type: 'number',
        prompt: 'People fully buried?',
        subTitle: 'People fully buried?',
        options: {
            min: 0,
            max: 100,
        },
        value: null,
        errorMessage: 'Number between 0 and 100 please.',
        order: 4,
    },

    numberPartlyBuriedImpairedBreathing: {
        type: 'number',
        prompt: 'People partly buried with impaired breathing?',
        subTitle: 'People partly buried with impaired breathing?',
        options: {
            min: 0,
            max: 100,
        },
        value: null,
        errorMessage: 'Number between 0 and 100 please.',
        order: 5,
    },

    numberPartlyBuriedAbleBreathing: {
        type: 'number',
        prompt: 'People partly buried with normal breathing?',
        subTitle: 'People partly buried with normal breathing?',
        options: {
            min: 0,
            max: 100,
        },
        value: null,
        errorMessage: 'Number between 0 and 100 please.',
        order: 6,
    },

    numberCaughtOnly: {
        type: 'number',
        prompt: 'People injured (caught but not buried)?',
        subTitle: 'People injured (caught but not buried)?',
        options: {
            min: 0,
            max: 100,
        },
        value: null,
        errorMessage: 'Number between 0 and 100 please.',
        order: 7,
    },

    numberPeopleInjured: {
        type: 'number',
        prompt: 'People not injured (caught but not buried)?',
        subTitle: 'People not injured (caught but not buried)?',
        options: {
            min: 0,
            max: 400,
        },
        value: null,
        errorMessage: 'Number between 0 and 400 please.',
        order: 8,
    },

    terrainShapeTriggerPoint: {
        type: 'radio',
        inline: true,
        prompt: 'Terrain shape at trigger point:',
        options: ['Convex', 'Planar', 'Concave', 'Unsupported'],
        value: null,
        helpText:
            'Convex: a roll. Concave: bowl-shaped. Planar: smooth with no significant convexities or concavities. Unsupported: a slope that drops off abruptly at the bottom.',
        order: 9,
    },

    snowDepthTriggerPoint: {
        type: 'radio',
        inline: true,
        prompt: 'Snow depth at trigger point:',
        options: ['Shallow', 'Deep', 'Average', 'Variable'],
        helpText:
            'The depth of the snowpack compared to the average conditions in the area. Shallow: shallower than average. Deep: deeper than average. Average: about the same as everywhere else. Variable: depth varies significantly in the place where the avalanche started.',
        value: null,
        order: 10,
    },

    terrainTrap: {
        type: 'checkbox',
        prompt: 'Terrain trap:',
        options: {
            'No obvious terrain trap': false,
            'Gully or depression': false,
            'Slope transition or bench': false,
            Trees: false,
            Cliff: false,
        },
        inline: true,
        helpText:
            'Terrain traps are features that increase the consequences of an avalanche.',
        order: 11,
    },

    incidentDescription: {
        prompt: 'Incident description',
        type: 'textarea',
        value: null,
        helpText: 'No names and no judging please.',
        guidelines:
            'http://www.avalanche.ca/fxresources/Submissions+Guidelines.pdf',
        order: 12,
    },

    numberInvolved: {
        type: 'calculated',
        value: 0,
        computeFields: [
            'numberFullyBuried',
            'numberPartlyBuriedImpairedBreathing',
            'numberPartlyBuriedAbleBreathing',
            'numberCaughtOnly',
            'numberPeopleInjured',
        ],
    },
};
