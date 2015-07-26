MOCHA_OPTS= --check-leaks
REPORTER = spec

check: test

test: test-unit

test-unit:
	mocha \
		--reporter $(REPORTER) \
		$(MOCHA_OPTS)

.PHONY: test test-unit
