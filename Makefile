JQW_CFLAGS = -DNDEBUG -O3
JQW_LDFLAGS = $(JQW_CFLAGS) \
	--closure 1 \
	--pre-js pre.js \
	-s WASMFS=1 \
	-s INVOKE_RUN=0 \
	-s EXPORTED_RUNTIME_METHODS=["FS","FS_unlink"] \
	-s ENVIRONMENT="worker"

all: jq.js

jq/configure:
	cd jq && autoreconf -i

jq/Makefile: jq/configure
	cd jq && emconfigure ./configure --with-oniguruma=no

jq/.libs/libjq.so: jq/Makefile
	cd jq && emmake make CFLAGS="$(JQW_CFLAGS)" -j
	-cp jq/.libs/libjq.dylib $@

jq.js: jq/.libs/libjq.so jq/src/main.c
	emcc $^ -Ijq $(JQW_LDFLAGS) -o $@
	ls -lh jq.js jq.wasm

clean-js:
	rm -f jq.js

clean: clean-js
	cd jq && make clean

distclean:
	cd jq && git clean -xdf
	cd jq/modules/oniguruma && git clean -xdf
