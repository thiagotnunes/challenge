TESTS = test/lib/*.js
REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require test/lib/test_helper \
		--reporter $(REPORTER) \
		--timeout 100 \
		--growl \
		$(TESTS)

.PHONY: test
