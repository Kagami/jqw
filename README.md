# jqw

[JQ](https://jqlang.github.io/jq/) compiled to WebAssembly.

See [bench](bench/index.ts) for usage example.

## Install

```bash
npm i jqw
```

## Goals

- Browser Web Worker environment
- Fastest run time on ~1M JSON file
- Don't need to modify input JSON often, it's basically read-only
- Smallest possible build size, as long as peformance isn't hurt

## Demo

- [net.kpop.re](https://net.kpop.re/?jq=)

## License

- [JQ/COPYING](https://github.com/jqlang/jq/blob/master/COPYING)
- [JQW/COPYING](https://github.com/Kagami/jqw/blob/master/COPYING)
