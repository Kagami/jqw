JQW_CFLAGS = -DNDEBUG -O3
JQW_LDFLAGS = $(JQW_CFLAGS) \
	--closure 1 \
	--pre-js pre.js \
	-s WASMFS=1 \
	-s INVOKE_RUN=0 \
	-s EXPORTED_RUNTIME_METHODS=["FS","FS_unlink"] \
	-s ENVIRONMENT="worker"

all: jq.js jq-re.js
	ls -lh jq*.js jq*.wasm

jq/configure:
	cd jq    && autoreconf -i
jq-re/configure:
	cd jq-re && autoreconf -i

jq/Makefile: jq/configure
	cd jq    && emconfigure ./configure --host=x86-none-linux --with-oniguruma=no
jq-re/Makefile: jq-re/configure
	cd jq-re && emconfigure ./configure --host=x86-none-linux --with-oniguruma=builtin

jq/.libs/libjq.a: jq/Makefile
	cd jq    && emmake make CFLAGS="$(JQW_CFLAGS)" -j
jq-re/.libs/libjq.a: jq-re/Makefile
	cd jq-re && emmake make CFLAGS="$(JQW_CFLAGS)" -j

jq.js: jq/.libs/libjq.a jq/src/main.c
	emcc $^ -Ijq $(JQW_LDFLAGS) -o $@
jq-re.js: jq-re/.libs/libjq.a jq-re/modules/oniguruma/src/.libs/libonig.a jq-re/src/main.c
	emcc $^ -Ijq-re $(JQW_LDFLAGS) -o $@

clean-js:
	rm -f jq*.js jq*.wasm

clean: clean-js
	cd jq    && make clean
	cd jq-re && make clean

distclean: clean-js
	cd jq && git clean -xdf
	cd jq-re && git clean -xdf
	cd jq-re/modules/oniguruma && git clean -xdf
