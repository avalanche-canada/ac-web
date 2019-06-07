import json
import os
import sys
import itertools
import random
from urllib.request import urlopen

BASE_URL = os.environ.get('BASE_URL', 'http://localhost:9000')

region_ids = ['little-yoho', 'banff-yoho-kootenay', 'northwest-coastal',
        'northwest-inland', 'sea-to-sky', 'south-coast-inland', 'south-coast',
        'cariboos', 'north-columbia', 'south-columbia', 'purcells',
        'kootenay-boundary', 'south-rockies', 'lizard-range', 'jasper', 
        'kananaskis', 'waterton', 'glacier']

region_fmts = ['json', 'xml', 'html', 'rss']
ob_fmts = ['json', 'html']

avalx_dates_old = ['2015-05-01', '2014-12-25']
avalx_dates_new = ['2019-01-01', '2016-10-01']

def main():
    print("SMOKE TEST: " + BASE_URL)
    tester = APITest(BASE_URL)
    #
    #server/api/features/routes.js
    tester.get_assert_2xx('/api/features/metadata')

    #server/api/docs/index.js
    tester.get_assert_2xx('/api/docs/')
    tester.get_assert_2xx('/api/docs/view')
    tester.get_assert_2xx('/api/docs/swagger.json')

    #server/api/observations/index.js
    tester.get_assert_2xx('/api/min/submissions')

    subs_r = tester.get_assert_2xx('/api/min/submissions?last=100:days')
    obs_r  = tester.get_assert_2xx('/api/min/observations?last=100:days')
    subs = random.sample(json.loads(subs_r), 15)
    obs  = random.sample(json.loads(obs_r),  15)

    for sub in subs:
        tester.get_assert_2xx(f'/api/min/submissions/{sub["subid"]}')

    for ob in obs:
        for fmt in ob_fmts:
            tester.get_assert_2xx(f'/api/min/observations/{ob["obid"]}.{fmt}')



    #tester.get_assert_2xx('/api/min/uploads/:year/:month/:day/:uploadid')
    #for sub in subs:
    #    for u in sub['uploads']:
    #        tester.get_assert_2xx('/api/min/uploads/' + u);
    #for ob in obs:
    #    for u in ob['uploads']:
    #        tester.get_assert_2xx('/api/min/uploads/' + u);

    #server/api/forecasts/index.js
    tester.get_assert_2xx('/api/forecasts/')
    tester.get_assert_2xx('/api/forecasts/ALL.json')

    for reg in region_ids:
        for fmt in region_fmts:
            tester.get_assert_2xx(f'/api/forecasts/{reg}.{fmt}')
        tester.get_assert_2xx(f'/api/forecasts/{reg}/nowcast.svg')
        tester.get_assert_2xx(f'/api/forecasts/{reg}/danger-rating-icon.svg')

    for (alp, tln, btl) in itertools.product('012345', repeat=3):
        tester.get_assert_2xx(f'/api/forecasts/graphics/{alp}/{tln}/{btl}/danger-rating-icon.svg')

    #server/api/mcr/index.js
    mcr_raw = tester.get_assert_2xx('/api/mcr/')
    mcrs = json.loads(mcr_raw)
    for m in mcrs:
        tester.get_assert_2xx(f"/api/mcr/{m['id']}")

    #server/mobile/index.js
    tester.get_assert_2xx('/basic-html/')

    #server/api/bulletin_archive/index.js
    for dt in avalx_dates_new + avalx_dates_old:
        for reg in region_ids:
            tester.get_assert_2xx(f'/{dt}/{reg}.json')
            tester.get_assert_2xx(f'/{dt}/{reg}.html')

    print("============================================================")
    print("  TESTS: ", tester.tests)
    print("     OK: ", tester.oks)
    print("   FAIL: ", tester.fails)
    print("============================================================")


class APITest(object):
    def __init__(self, base):
        self.base = base
        self.tests = 0
        self.oks   = 0
        self.fails = 0

    def get_assert_2xx(self, path, qs=None):
        self.tests += 1
        fullpath = self.base + path
        try:
            with urlopen(fullpath) as url:
                data = url.read()
            print(' OK  ' + fullpath)
            self.oks += 1
            return data
        except Exception as e:
            print('FAIL ' + fullpath)
            print('     ' + repr(e))
            self.fails += 1


if __name__ == '__main__':
    main()
