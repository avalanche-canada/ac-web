/*
 * The quick report schema cannot be generated from the "raw" format in a
 * simple manner because it required the embedding of some fields to a second
 * level. It also includes all the question texts and the available options.
 * It was simpler to convert the schema once and verify it.
 *
 * NOTE: The json schema does not verify that the `prompt` values are the
 * correct values or that the `options` are the correct options only that they
 * are strings and string arrays respectively.
 */
module.exports.rawDescription = {
    ridingQuality: {
        prompt: 'Riding quality was:',
        type: 'single',
        options: ['Amazing', 'Good', 'OK', 'Terrible'],
        selected: null,
    },

    snowConditions: {
        type: 'multiple',
        prompt: 'Snow conditions were:',
        options: {
            Crusty: false,
            Powder: false,
            'Deep powder': false,
            Wet: false,
            Heavy: false,
            'Wind affected': false,
            Hard: false,
        },
    },

    rideType: {
        type: 'multiple',
        prompt: 'We rode:',
        options: {
            'Mellow slopes': false,
            'Steep slopes': false,
            'Convex slopes': false,
            'Sunny slopes': false,
            'Cut-blocks': false,
            'Open trees': false,
            'Dense trees': false,
            'Alpine slopes': false,
        },
    },

    stayedAway: {
        type: 'multiple',
        prompt: 'We stayed away from:',
        options: {
            'Steep slopes': false,
            'Convex slopes': false,
            'Sunny slopes': false,
            'Cut-blocks': false,
            'Open trees': false,
            'Alpine slopes': false,
        },
    },

    weather: {
        type: 'multiple',
        prompt: 'The day was:',
        options: {
            Stormy: false,
            Windy: false,
            Sunny: false,
            Cold: false,
            Warm: false,
            Cloudy: false,
            Foggy: false,
            Wet: false,
        },
    },
    avalancheConditions: {
        prompt: 'Avalanche conditions',
        type: 'multiple',
        order: 2,
        options: {
            slab: false,
            sound: false,
            snow: false,
            temp: false,
        },
    },
};

/*
TODO(wnh): these need to be mapped in the interface ot a larger label

conditionsToLabel = {
    'slab': 'Slab avalanches today or yesterday.',
    'sound': 'Whumpfing or drum-like sounds or shooting cracks.',
    'snow': '30cm + of new snow, or significant drifting, or rain in the last 48 hours.',
    'temp': 'Rapid temperature rise to near zero degrees or wet surface snow.'
}

*/

module.exports.jsonSchema = {
    type: 'object',
    required: ['avalancheConditions', 'comment', 'ridingConditions'],
    properties: {
        ridingConditions: {
            required: [
                'ridingQuality',
                'weather',
                'snowConditions',
                'stayedAway',
                'rideType',
            ],
            properties: {
                rideType: {
                    type: 'object',
                    properties: {
                        prompt: {
                            type: 'string',
                        },
                        type: {
                            type: 'string',
                        },
                        options: {
                            properties: {
                                'Alpine slopes': {
                                    type: 'boolean',
                                },
                                'Convex slopes': {
                                    type: 'boolean',
                                },
                                'Cut-blocks': {
                                    type: 'boolean',
                                },
                                'Steep slopes': {
                                    type: 'boolean',
                                },
                                'Open trees': {
                                    type: 'boolean',
                                },
                                'Mellow slopes': {
                                    type: 'boolean',
                                },
                                'Dense trees': {
                                    type: 'boolean',
                                },
                                'Sunny slopes': {
                                    type: 'boolean',
                                },
                            },
                            required: [
                                'Mellow slopes',
                                'Convex slopes',
                                'Alpine slopes',
                                'Dense trees',
                                'Steep slopes',
                                'Open trees',
                                'Cut-blocks',
                                'Sunny slopes',
                            ],
                            type: 'object',
                        },
                    },
                    required: ['type', 'prompt', 'options'],
                },
                ridingQuality: {
                    properties: {
                        type: {
                            type: 'string',
                        },
                        options: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                        },
                        selected: {
                            type: 'string',
                            enum: ['Amazing', 'Good', 'OK', 'Terrible'],
                        },
                        prompt: {
                            type: 'string',
                        },
                    },
                    required: ['selected', 'type', 'prompt', 'options'],
                    type: 'object',
                },
                stayedAway: {
                    properties: {
                        options: {
                            properties: {
                                'Sunny slopes': {
                                    type: 'boolean',
                                },
                                'Open trees': {
                                    type: 'boolean',
                                },
                                'Steep slopes': {
                                    type: 'boolean',
                                },
                                'Cut-blocks': {
                                    type: 'boolean',
                                },
                                'Convex slopes': {
                                    type: 'boolean',
                                },
                                'Alpine slopes': {
                                    type: 'boolean',
                                },
                            },
                            required: [
                                'Convex slopes',
                                'Alpine slopes',
                                'Cut-blocks',
                                'Sunny slopes',
                                'Steep slopes',
                                'Open trees',
                            ],
                            type: 'object',
                        },
                        type: {
                            type: 'string',
                        },
                        prompt: {
                            type: 'string',
                        },
                    },
                    required: ['prompt', 'type', 'options'],
                    type: 'object',
                },
                snowConditions: {
                    type: 'object',
                    required: ['options', 'prompt', 'type'],
                    properties: {
                        prompt: {
                            type: 'string',
                        },
                        options: {
                            type: 'object',
                            required: [
                                'Deep powder',
                                'Wet',
                                'Crusty',
                                'Powder',
                                'Heavy',
                                'Wind affected',
                                'Hard',
                            ],
                            properties: {
                                Wet: {
                                    type: 'boolean',
                                },
                                Powder: {
                                    type: 'boolean',
                                },
                                'Wind affected': {
                                    type: 'boolean',
                                },
                                'Deep powder': {
                                    type: 'boolean',
                                },
                                Hard: {
                                    type: 'boolean',
                                },
                                Heavy: {
                                    type: 'boolean',
                                },
                                Crusty: {
                                    type: 'boolean',
                                },
                            },
                        },
                        type: {
                            type: 'string',
                        },
                    },
                },
                weather: {
                    required: ['type', 'prompt', 'options'],
                    properties: {
                        type: {
                            type: 'string',
                        },
                        options: {
                            required: [
                                'Warm',
                                'Foggy',
                                'Cloudy',
                                'Stormy',
                                'Windy',
                                'Cold',
                                'Wet',
                                'Sunny',
                            ],
                            properties: {
                                Windy: {
                                    type: 'boolean',
                                },
                                Warm: {
                                    type: 'boolean',
                                },
                                Sunny: {
                                    type: 'boolean',
                                },
                                Cloudy: {
                                    type: 'boolean',
                                },
                                Cold: {
                                    type: 'boolean',
                                },
                                Wet: {
                                    type: 'boolean',
                                },
                                Stormy: {
                                    type: 'boolean',
                                },
                                Foggy: {
                                    type: 'boolean',
                                },
                            },
                            type: 'object',
                        },
                        prompt: {
                            type: 'string',
                        },
                    },
                    type: 'object',
                },
            },
            type: 'object',
        },
        avalancheConditions: {
            type: 'object',
            required: ['snow', 'slab', 'sound', 'temp'],
            properties: {
                slab: {
                    type: 'boolean',
                },
                sound: {
                    type: 'boolean',
                },
                temp: {
                    type: 'boolean',
                },
                snow: {
                    type: 'boolean',
                },
            },
        },
        comment: {
            type: 'string',
        },
    },
};
