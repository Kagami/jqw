# jqw

[JQ](https://jqlang.github.io/jq/) compiled to WebAssembly.

See [bench](bench/bench.ts) and [demo](demo/demo.ts) for usage examples.

## Install

```bash
npm i jqw
```

## Features

- TypeScript type definitions
- Async, runs in Web Worker, doesn't block the main thread
- 5-15ms run time on ~1mb JSON for a typical query (see bench; tested on Chrome@M1)
- <2kb library code, <20kb Web Worker code, <500kb WebAssembly (<1mb with regexp support)

## Goals

- Browser Web Worker environment
- Fastest run time on ~1mb JSON file
- Smallest possible build size, as long as peformance isn't hurt
- Optimized for rarely modified input file, isn't optimized for large output

## Demo

- [kagami.github.io/jqw](https://kagami.github.io/jqw/)
- [net.kpop.re](https://net.kpop.re/?jq=)

## License

- [JQ/COPYING](https://github.com/jqlang/jq/blob/master/COPYING)
- [JQW/COPYING](https://github.com/Kagami/jqw/blob/master/COPYING)
