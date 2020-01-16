
var icon_set = require('./icon_set');
var fx_test_data = require('./t/fx_test_data.js');
var danger_data = require('./t/danger_ratings.js');



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
            expect(set[0].ratings.alp).toBe(2);
            expect(set[0].ratings.tln).toBe(3);
            expect(set[0].ratings.btl).toBe(5);
        });
    });
});
describe('addIconSet', function(){
    describe('the basics', function() {
        Object.keys(fx_test_data).map(function(key){
            test(key + ' works for Pacific time', function(){
                var fx = fx_test_data[key];
			    var newfx = icon_set.addStaticIcons('America/Vancouver', fx);
                expect(newfx.iconSet).toBeDefined();
                expect(newfx.iconSet.length).toBeGreaterThanOrEqual(1);
            });
            test(key + ' works for mountain time', function(){
                var fx = fx_test_data[key];
			    var newfx = icon_set.addStaticIcons('America/Edmonton', fx);
                expect(newfx.iconSet).toBeDefined();
                expect(newfx.iconSet.length).toBeGreaterThanOrEqual(1);
            });
		});
	});
	describe('static', function(){
		test('off season', function(){
			var fx = fx_test_data.off_season;
			var newfx = icon_set.addStaticIcons('America/Vancouver', fx);
			expect(newfx.iconSet.length).toEqual(1);
			expect(newfx.iconSet[0].iconType).toEqual('OFF_SEASON');
			expect(newfx.iconSet[0].ratings).toBeUndefined();
		});
		test('spring', function(){
			var fx = fx_test_data.spring_conditions;
			var newfx = icon_set.addStaticIcons('America/Vancouver', fx);
			expect(newfx.iconSet[0].iconType).toEqual('SPRING');
			expect(newfx.iconSet[0].ratings).toBeUndefined();
		});
		test('early season', function(){
			var fx = fx_test_data.early_season;
			var newfx = icon_set.addStaticIcons('America/Vancouver', fx);
			expect(newfx.iconSet[0].iconType).toEqual('EARLY_SEASON');
			expect(newfx.iconSet[0].ratings).toBeUndefined();
		});
		test('regular season', function(){
			var fx = fx_test_data.regular_season;
			var newfx = icon_set.addStaticIcons('America/Vancouver', fx);
			expect(newfx.iconSet.length).toEqual(1);
			expect(newfx.iconSet[0].iconType).toEqual('RATINGS');
            expect(newfx.iconSet[0].ratings).toBeDefined();
		});
	});
	describe('moving', function(){
		test('off season', function(){
			var fx = fx_test_data.off_season;
			var newfx = icon_set.addMovingIcons('America/Vancouver', fx);
			expect(newfx.iconSet.length).toEqual(1);
			expect(newfx.iconSet[0].iconType).toEqual('OFF_SEASON');
			expect(newfx.iconSet[0].ratings).toBeUndefined();
		});
		test('spring', function(){
			var fx = fx_test_data.spring_conditions;
			var newfx = icon_set.addMovingIcons('America/Vancouver', fx);
			expect(newfx.iconSet[0].iconType).toEqual('SPRING');
			expect(newfx.iconSet[0].ratings).toBeUndefined();
		});
		test('early season', function(){
			var fx = fx_test_data.early_season;
			var newfx = icon_set.addMovingIcons('America/Vancouver', fx);
			expect(newfx.iconSet[0].iconType).toEqual('EARLY_SEASON');
			expect(newfx.iconSet[0].ratings).toBeUndefined();
		});
		test('regular season', function(){
			var fx = fx_test_data.regular_season;
			var newfx = icon_set.addMovingIcons('America/Vancouver', fx);
			expect(newfx.iconSet.length).toEqual(3);
			newfx.iconSet.forEach(function(rr){
				expect(rr.iconType).toEqual('RATINGS');
                expect(rr.ratings).toBeDefined();
			});
		});
	});
});
