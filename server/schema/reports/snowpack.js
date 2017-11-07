module.exports = {
    snowpackObsType: {
        type: 'radio',
        prompt: 'Is this a point observation or a summary of your day?',
        options: ['Point observation', 'Summary'],
        inline: true,
        value: null,
        order: 1,
    },

    snowpackSiteElevation: {
        type: 'number',
        prompt: 'Elevation:',
        options: {
            min: 0,
            max: 4000,
        },
        placeholder: 'Metres above sea level',
        value: null,
        errorMessage: 'Number between 0 and 4000 please.',
        order: 2,
    },

    snowpackSiteElevationBand: {
        type: 'checkbox',
        prompt: 'Elevation band:',
        options: {
            Alpine: false,
            Treeline: false,
            'Below treeline': false,
        },
        inline: true,
        value: null,
        order: 3,
    },

    snowpackSiteAspect: {
        type: 'checkbox',
        prompt: 'Aspect:',
        options: {
            N: false,
            NE: false,
            E: false,
            SE: false,
            S: false,
            SW: false,
            W: false,
            NW: false,
        },
        value: null,
        inline: true,
        order: 4,
        limit: 3,
        errorMessage: 'Please check maximum 3 options.',
    },

    snowpackDepth: {
        type: 'number',
        prompt: 'Snowpack depth (cm):',
        options: {
            min: 0,
            max: 10000,
        },
        helpText:
            'Total height of snow in centimetres. Averaged if this is a summary.',
        value: null,
        errorMessage: 'Number between 0 and 10000 please.',
        order: 5,
    },

    snowpackWhumpfingObserved: {
        type: 'radio',
        prompt: 'Did you observe whumpfing?',
        options: ['Yes', 'No'],
        inline: true,
        value: null,
        helpText:
            'A whumpf is a rapid settlement of the snowpack caused by the collapse of a weak layer. It is accompanied by an audible noise.',
        order: 6,
    },

    snowpackCrackingObserved: {
        type: 'radio',
        prompt: 'Did you observe cracking?',
        options: ['Yes', 'No'],
        inline: true,
        value: null,
        helpText:
            'Cracking is shooting cracks radiating more than a couple of metres from your sled or skis.',
        order: 7,
    },

    snowpackSurfaceCondition: {
        type: 'checkbox',
        prompt: 'Surface condition:',
        options: {
            'New snow': false,
            Crust: false,
            'Surface hoar': false,
            Facets: false,
            Corn: false,
            Variable: false,
        },
        inline: true,
        order: 8,
    },

    snowpackFootPenetration: {
        type: 'number',
        prompt: 'Foot penetration (cm):',
        options: {
            min: 0,
            max: 200,
        },
        helpText:
            'How far you sink into the snow when standing on one fully-weighted foot.',
        value: null,
        errorMessage: 'Number between 0 and 200 please.',
        order: 9,
    },

    snowpackSkiPenetration: {
        type: 'number',
        prompt: 'Ski penetration (cm):',
        options: {
            min: 0,
            max: 200,
        },
        helpText:
            'How far  you sink into the snow when standing on one fully-weighted ski.',
        value: null,
        errorMessage: 'Number between 0 and 200 please.',
        order: 10,
    },

    snowpackSledPenetration: {
        type: 'number',
        prompt: 'Sled penetration (cm):',
        options: {
            min: 0,
            max: 200,
        },
        helpText:
            'The depth a sled sinks into the snow after stopping slowly on level terrain.',
        value: null,
        errorMessage: 'Number between 0 and 200 please.',
        order: 11,
    },

    snowpackTestInitiation: {
        type: 'radio',
        prompt: 'Snowpack test result:',
        options: ['None', 'Very easy', 'Easy', 'Moderate', 'Hard'],
        helpText: 'Average if you did a number of tests.',
        value: null,
        inline: true,
        order: 12,
    },

    snowpackTestFracture: {
        type: 'radio',
        prompt: 'Snowpack test fracture character:',
        options: ['Sudden ("pop" or "drop")', 'Resistant', 'Uneven break'],
        helpText:
            'Average if you did a number of tests. Describe further in comments if variable results.',
        value: null,
        inline: true,
        order: 13,
    },

    snowpackTestFailure: {
        type: 'number',
        prompt: 'Snowpack test failure depth:',
        options: {
            min: 0,
            max: 200,
        },
        helpText: 'Depth below the surface that failure occurred.',
        value: null,
        errorMessage: 'Number between 0 and 200 please.',
        order: 14,
    },

    snowpackTestFailureLayerCrystalType: {
        type: 'checkbox',
        prompt: 'Snowpack test failure layer crystal type:',
        limit: 2,
        options: {
            'Surface hoar': false,
            Facets: false,
            'Depth hoar': false,
            'Storm snow': false,
            Crust: false,
            Other: false,
        },
        inline: true,
        order: 15,
        errorMessage: 'Please check maximum 2 options.',
    },

    snowpackObsComment: {
        type: 'textarea',
        prompt: 'Observation comment:',
        value: null,
        helpText:
            'Please add additional information about the snowpack, especially notes about weak layer, how the snow varied by aspect/elevation, and details of any slope testing performed.',
        order: 16,
    },
};
