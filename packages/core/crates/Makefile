# Append here when new Rust WASM crate is added (the list is space separated)
PACKAGES = core-crypto core-misc core-mixer core-network core-strategy core-types
##########################################

PKG_DIRS = $(addsuffix /pkg, $(PACKAGES))
JS_FILES = $(foreach package,$(PACKAGES),$(package)/pkg/$(subst -,_,$(package)).js)

.PHONY := all clean test install

all: $(JS_FILES)

test: $(JS_FILES)
	$(foreach pkg,$(PACKAGES),cargo test -p $(pkg) && wasm-pack test --node `pwd`/$(pkg) && ) true

$(JS_FILES):
	mkdir -p $(@D)
	wasm-pack build --target=bundler `pwd`/$(@D)/..

install:
ifneq ($(PACKAGES),)
	@mkdir -p ../lib
	install $(foreach pkg, $(PKG_DIRS), $(pkg)/*.js) ../lib/
	install $(foreach pkg, $(PKG_DIRS), $(pkg)/*.ts) ../lib/
	install $(foreach pkg, $(PKG_DIRS), $(pkg)/*.wasm) ../lib/
endif

clean:
ifneq ($(PACKAGES),)
	rm -rf $(PKG_DIRS)
endif
