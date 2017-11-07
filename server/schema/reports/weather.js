module.exports = {
    skyCondition: {
        type: 'radio',
        prompt: 'Cloud cover:',
        options: [
            'Clear',
            'Few clouds (<2/8)',
            'Scattered clouds (2/8-4/8)',
            'Broken clouds (5/8-7/8)',
            'Overcast (8/8)',
            'Fog',
        ],
        inline: true,
        helpText:
            'Values expressed in eighths refer to the proportion of the sky that was covered with clouds. E.g. 2/8 refers to a sky approximately one quarter covered with cloud.',
        order: 1,
    },

    precipitationType: {
        type: 'radio',
        prompt: 'Precipitation type:',
        options: ['Snow', 'Rain', 'Mixed snow & rain', 'None'],
        value: null,
        inline: true,
        order: 2,
    },

    snowfallRate: {
        type: 'number',
        prompt: 'Snowfall rate (cm/hour):',
        options: {
            min: 1,
            max: 20,
        },
        value: null,
        helpText: 'If there was no snow, please leave this field blank.',
        errorMessage: 'Number between 1 and 20 please.',
        order: 3,
    },

    rainfallRate: {
        type: 'radio',
        prompt: 'Rainfall rate:',
        options: ['Drizzle', 'Showers', 'Raining', 'Pouring'],
        value: null,
        inline: true,
        helpText: 'If there was no rain, please leave this field blank.',
        order: 4,
    },

    temperature: {
        type: 'number',
        prompt: 'Temperature at time of observation (deg C):',
        options: {
            min: -50,
            max: 40,
        },
        value: null,
        errorMessage: 'Number between -50 and 40 please.',
        order: 5,
    },

    minTemp: {
        type: 'number',
        prompt: 'Minimum temperature in last 24 hours (deg C)',
        options: {
            min: -50,
            max: 30,
        },
        value: null,
        errorMessage: 'Number between -50 and 30 please.',
        order: 6,
    },

    maxTemp: {
        type: 'number',
        prompt: 'Maximum temperature in last 24 hours (deg C):',
        options: {
            min: -40,
            max: 40,
        },
        value: null,
        errorMessage: 'Number between -40 and 40 please.',
        order: 7,
    },

    temperatureTrend: {
        type: 'radio',
        prompt: 'Temperature trend:',
        options: ['Falling', 'Steady', 'Rising'],
        value: null,
        inline: true,
        helpText: 'Describe how the temperature changed in the last 3 hours.',
        order: 8,
    },

    newSnow24Hours: {
        type: 'number',
        prompt: 'Amount of new snow in last 24 hours (cm):',
        options: {
            min: 0,
            max: 100,
        },
        value: null,
        errorMessage: 'Number between 0 and 100 please.',
        order: 9,
    },

    precipitation24Hours: {
        type: 'number',
        prompt: 'Total rain and snow combined in last 24 hours (mm):',
        options: {
            min: 0,
            max: 100,
        },
        value: null,
        errorMessage: 'Number between 0 and 100 please.',
        order: 10,
    },

    stormSnowAmount: {
        type: 'number',
        prompt: 'Total snow from the most recent storm (cm):',
        options: {
            min: 0,
            max: 300,
        },
        value: null,
        helpText:
            'Please enter the amount of snow that has fallen during the current storm cycle. You can specify a storm start date to describe the time period over which this snow fell.',
        errorMessage: 'Number between 0 and 300 please.',
        order: 11,
    },

    stormStartDate: {
        type: 'datetime',
        prompt: 'Storm start date:',
        showOnlyDate: true,
        value: null,
        helpText:
            'The date on which the most recent storm started. Leave blank if there has not been a recent storm.',
        order: 12,
        maxDateToday: true,
    },

    windSpeed: {
        type: 'radio',
        prompt: 'Wind speed:',
        options: [
            'Calm',
            'Light (1-25 km/h)',
            'Moderate (26-40 km/h)',
            'Strong (41-60 km/h)',
            'Extreme (>60 km/h)',
        ],
        value: null,
        inline: true,
        helpText:
            'Calm: smoke rises. Light: flags and twigs move. Moderate: snow begins to drift. Strong: whole tress in motion. Extreme: difficulty walking.',
        order: 13,
    },

    windDirection: {
        type: 'radio',
        prompt: 'Wind direction:',
        options: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
        inline: true,
        value: null,
        order: 14,
    },

    blowingSnow: {
        type: 'radio',
        prompt: 'Blowing snow:',
        options: ['None', 'Light', 'Moderate', 'Intense'],
        inline: true,
        helpText:
            'How much snow is blowing at ridge crest elevation. Light: localized snow drifting. Moderate: a plume of snow is visible. Intense: a large plume moving snow well down the slope.',
        order: 15,
        value: null,
    },

    weatherObsComment: {
        type: 'textarea',
        prompt: 'Weather observation comment',
        value: null,
        order: 16,
    },
};
