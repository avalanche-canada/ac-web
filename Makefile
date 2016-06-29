HEAD   := $(shell git log | head -n1 | cut -d' ' -f2)
BRANCH := $(shell git branch | grep -e '^\*' | cut -d' ' -f2 | sed s@/@_@g)
DATE   := $(shell date +'%Y-%m-%d-%H-%M-%S')


LABEL   :=ac-web.custom.$(BRANCH).$(HEAD).$(DATE)
ZIPNAME :=$(LABEL).zip

S3_BUCKET := codeship-builds

DIST=dist


build: webpack server-copy

prod:
	cd dist && PORT=9000 npm --production start

clean:
	- rm -rf dist
	- rm ac-web.custom.*.zip

webpack:
	NODE_ENV=production webpack --config ./webpack.config.production.js --progress --profile --colors

zip: build
	cd dist && zip -r ../$(ZIPNAME) *
	cd dist && zip -r ../$(ZIPNAME) .ebextensions

push-dev: zip
	aws s3 cp $(ZIPNAME) s3://$(S3_BUCKET)/$(ZIPNAME)

	aws elasticbeanstalk create-application-version \
	  --profile $(AWS_PROFILE) \
	  --region us-west-2 \
	  --application-name avalanche-canada \
	  --version-label $(LABEL) \
	  --source-bundle S3Bucket=$(S3_BUCKET),S3Key=$(ZIPNAME) \
	  --description 'custom git build'

	aws elasticbeanstalk update-environment \
	  --profile $(AWS_PROFILE) \
	  --region us-west-2 \
	  --environment-name avalanche-canada-dev \
	  --version-label "$(LABEL)"

	echo pushed to http://avalanche-canada-dev.elasticbeanstalk.com/


server-copy:
	cp client/.htaccess $(DIST)/public
	cp package.json $(DIST)
	cp -R server $(DIST)
	cp -R .ebextensions $(DIST)


.PHONY: build prod webpack clean zip clean push-dev server-copy
