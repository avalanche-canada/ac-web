
var icon_set = require('./icon_set');

var danger_data = {
    standard_time: [
        {
            "date": "2019-01-01T00:00:00Z",
            "dangerRating": {
                "alp": "2:Moderate",
                "tln": "3:Considerable",
                "btl": "5:Extreme"
            }
        },
        {
            "date": "2019-01-02T00:00:00Z",
            "dangerRating": {
                "alp": "2:Moderate",
                "tln": "2:Moderate",
                "btl": "1:Low"
            }
        },
        {
            "date": "2019-01-03T00:00:00Z",
            "dangerRating": {
                "alp": "2:Moderate",
                "tln": "2:Moderate",
                "btl": "1:Low"
            }
        }
    ],
    daylight_time:[
        {
            "date": "2019-10-02T00:00:00",
            "dangerRating": {
                "alp": "N/A:No Rating",
                "tln": "N/A:No Rating",
                "btl": "N/A:No Rating"
            }
        },
        {
            "date": "2019-10-03T00:00:00",
            "dangerRating": {
                "alp": "N/A:No Rating",
                "tln": "N/A:No Rating",
                "btl": "N/A:No Rating"
            }
        },
        {
            "date": "2019-10-04T00:00:00",
            "dangerRating": {
                "alp": "N/A:No Rating",
                "tln": "N/A:No Rating",
                "btl": "N/A:No Rating"
            }
        },
    ]
};


describe('movingDangerIconSet', function(){
    describe('the basics', function() {
        Object.keys(danger_data).map(function(key){
            var set = icon_set.genMovingDangerIconSet('America/Vancouver', danger_data[key]);
            test(key + ' is defined', function(){
                expect(set).toBeDefined();
            });
            test(key + ' has 3 items', function(){
                expect(set.length).toBe(3);
            });
            test(key + ' first item starts at year 0', function(){
                var first = set[0];
                expect(first.from).toMatch(/^0001-/);
            });
            test(key + ' last item is from year 9999', function(){
                var last = set[set.length - 1];
                expect(last.to).toMatch(/^9999-/);
            });
            test(key + ' from/to days line up ', function(){
                expect(set[0].to).toEqual(set[1].from);
                expect(set[1].to).toEqual(set[2].from);
            });
        });
    });

    describe('timezone shifts', function(){
        test('standard time mountain is -7', function(){
            var set = icon_set.genMovingDangerIconSet('America/Edmonton', danger_data['standard_time']);
            expect(set[0].to).toMatch(/07:00:00/);
        });
        test('standard time pacific is -8', function(){
            var set = icon_set.genMovingDangerIconSet('America/Vancouver', danger_data['standard_time']);
            expect(set[0].to).toMatch(/08:00:00/);
        });
        test('standard time mountain is -7', function(){
            var set = icon_set.genMovingDangerIconSet('America/Edmonton', danger_data['daylight_time']);
            expect(set[0].to).toMatch(/06:00:00/);
        });
        test('standard time pacific is -8', function(){
            var set = icon_set.genMovingDangerIconSet('America/Vancouver', danger_data['daylight_time']);
            expect(set[0].to).toMatch(/07:00:00/);
        });
    });
});
describe('genSingleDangerIconSet', function(){
    describe('the basics', function() {
        Object.keys(danger_data).map(function(key){
            var set = icon_set.genSingleDangerIconSet('America/Vancouver', danger_data[key]);
            test(key + ' is defined', function(){
                expect(set).toBeDefined();
            });
            test(key + ' only has a single icon', function(){
                expect(set.length).toBe(1);
            });
            test(key + ' goes from MIN to MAX', function(){
                expect(set[0].from).toMatch(/^0001/);
                expect(set[0].to  ).toMatch(/^9999/);
            });
        });
    });
    describe('standard_time', function() {
        test('ratings match the first day', function(){
            var set = icon_set.genSingleDangerIconSet('America/Vancouver', danger_data['standard_time']);
            expect(set[0].dangerRating.alp).toBe(2);
            expect(set[0].dangerRating.tln).toBe(3);
            expect(set[0].dangerRating.btl).toBe(5);
        });
    });
});
