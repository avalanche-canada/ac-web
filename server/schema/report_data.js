/*
 * converters will conver the raw ac-components style description of a field
 * into a json schema fragment for that field. They are indexed by their
 * ac-component types
 */
var converters = {
    multiple: (field) => {
        var out = {
            "type": "object",
            "properties":{},
            "required":[]
        };
        Object.keys(field.options).forEach( k => {
            out.properties[k] = {"type": "boolean"}
            out.required.push(k)
        }) 
        return out;
    },
    single: f => {
        return {
			"anyOf": [
				{"type": "string",
            	 "enum": f.options},
				{"type": "null"}
             ]
        }
    },
    datetime: f => {
        var key = 'format';
        var val = 'date-time';

        if(f.showOnlyDate) {
            key = 'pattern';
            val = '^\\d\\d\\d\\d-\\d\\d-\\d\\d$';

        } else  if(f.showOnlyTime) {
            key = 'pattern';
            val = '^(1|2|3|4|5|6|7|8|9|10|11|12):[0-5][0-9] (AM|PM)$';
        }
        var out = {
            "type": "string",
        };
        out[key] = val;
        return out;
    },
    number: f => {
        var out = {
            "type": ["integer", "null"],
            "minimum": f.options.min,
            "maximum": f.options.max,
        };
        return out;
    },
    textarea:   _ => new Object({type:["string", "null"]}),
    text:       _ => new Object({type:["string", "null"]}),
    calculated: _ => new Object({type:["number", "null"]}),

};

converters.checkbox = converters.multiple;
converters.radio = converters.single;

/*
 * toJsonSchema converts a top level ac-component field spec into json schema.
 */
function toJsonSchema(fields){
  var out  = {
    "type": "object",
    "properties": {},
    "required": []
  };
  
  Object.keys(fields).forEach( key =>{
    var field = fields[key];
    var xx = {};
    //console.log(field.type);
    var fn = converters[field.type];
    xx = fn(field);
    out.properties[key] = xx;
    out.required.push(key);
  });
  
 return out;
}



/* 
 * Assembly of the raw ac-components descrtiptions
 */
var raw = {
  quickReport:     require('./reports/quick').rawDescription,
  avalancheReport: require('./reports/avalanche'),
  snowpackReport:  require('./reports/snowpack'),
  weatherReport:   require('./reports/weather'),
  incidentReport:  require('./reports/incident')
};


/*
 * A full json schema to validate the input to the MIN service
 */
var jsonSchema = {
    type: "object",
    properties: {
      quickReport:      require('./reports/quick').jsonSchema,
      avalancheReport:  toJsonSchema(raw.avalancheReport),
      snowpackReport:   toJsonSchema(raw.snowpackReport),
      weatherReport:    toJsonSchema(raw.weatherReport),
      incidentReport:   toJsonSchema(raw.incidentReport),
    },
    anyOf: [
        {"required": ['quickReport']},
        {"required": ['avalancheReport']},
        {"required": ['snowpackReport']},
        {"required": ['weatherReport']},
        {"required": ['incidentReport']}
    ]
}




module.exports =  {
    raw: raw,
    jsonSchema: jsonSchema,
    converters: converters
};


