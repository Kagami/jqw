var jqwWasmResolve = null;
var jqwWasmPromise = new Promise(resolve => jqwWasmResolve = resolve);
var jqwLoaded = false;
var jqwRunning = false;
var jqwStdout = "";
var wasmFS$backends; // FIXME(Kagami): closure bug, report

Module = {
  "thisProgram": "jq",
  "print": function (text) { jqwStdout += text + "\n"; },
  "printErr": function (text) { jqwStdout += text + "\n"; },
  "onAbort": function (err) {
    console.error(err); // to be sure errors aren't missed
    self.postMessage({ "type": "error", "data": err.toString() });
  },
  "instantiateWasm": function (imports, cb) {
    jqwWasmPromise.then(wasmURL => {
      var response = fetch(wasmURL, { credentials: "same-origin" });
      return WebAssembly.instantiateStreaming(response, imports);
    }).then(result => cb(result["instance"]), Module["onAbort"]);
    return {}; // no exports yet
  },
  "onRuntimeInitialized": function () { self.postMessage({ "type": "ready" }); },
}

function jqwOnMessage(e) {
  var msg = e.data;

  if (msg["type"] === "load") {
    if (jqwLoaded) return Module["onAbort"]("already loaded");
    jqwLoaded = true;
    if (msg["path"]) FS_createDataFile(".", msg["path"], msg["data"], true, true, false);
    jqwWasmResolve(msg["url"]);
    return;
  }

  if (!jqwLoaded) return Module["onAbort"]("not loaded");
  if (jqwRunning) return Module["onAbort"]("already running");

  if (msg["type"] === "set") {
    FS_unlink(msg["path"]); // FIXME(Kagami): appends instead of overwriting, report
    FS_writeFile(msg["path"], msg["data"]);
    self.postMessage({ "type": "set" });
  } else if (msg["type"] === "run") {
    jqwRunning = true;
    jqwStdout = "";
    Module["callMain"](msg["data"]);
    self.postMessage({ "type": "done", "data": jqwStdout });
    jqwRunning = false;
  } else {
    Module["onAbort"]("unknown command");
  }
};

self.onmessage = function (e) {
  try {
    jqwOnMessage(e);
  } catch (err) {
    Module["onAbort"](err);
  }
};
