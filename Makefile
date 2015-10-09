

HINT=  "./node_modules/grunt-contrib-jshint/node_modules/.bin/jshint"



check-client:
	@$(HINT)                      \
	  --config ./client/.jshintrc \
	  --reporter unix             \
	  client/

#	  --exclude './client/bower_components/**/*'    \
#	  --exclude 'client/assets/js/geojson-utils.js' \

check-server:
	@$(HINT) \
	  --config ./server/.jshintrc \
	  --reporter unix \
	  server/**/*.js

check: check-client check-server


HEAD=$(shell git log | head -n1 | cut -d' ' -f2)
BRANCH=$(shell git branch | grep -e '^\*' | cut -d' ' -f2)
DATE:=$(shell date +'%Y-%m-%d-%H-%M-%S')

zip:
	- rm -rf dist
	- rm ac-web.custom.*.zip
	grunt build
	cp -R .ebextensions dist/
	cd dist && zip -r ../ac-web.custom.$(BRANCH).$(HEAD).$(DATE).zip *
	cd dist && zip -r ../ac-web.custom.$(BRANCH).$(HEAD).$(DATE).zip .ebextensions

.PHONY: check check-client check-server zip d

