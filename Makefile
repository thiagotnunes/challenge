TESTS = test/lib/*.js
FUNCTIONAL_TESTS = test/functional/*.js
REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require test/lib/test_helper \
		--reporter $(REPORTER) \
		--timeout 100 \
		--growl \
		$(TESTS)

functional:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--timeout 100 \
		--growl \
		$(FUNCTIONAL_TESTS)

.PHONY: test functional
