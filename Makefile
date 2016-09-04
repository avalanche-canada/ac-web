

test:
	find server -name '*_test.js' | xargs npm run mocha

.PHONY: test
