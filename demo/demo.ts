import { AnsiUp } from "ansi_up";

import loadJQ, { type JQ } from "../index";
import moduleUrl from "../jq.js?url";
import wasmUrl from "../jq.wasm?url";
import sampleData from "./sample.json?raw";

const doc: any = document;
let jq: JQ;

async function runJQ() {
  const path = "data.json";
  const data = doc.getElementById("input-json").value;
  const query = doc.getElementById("filter").value;
  const monochromeOutput = doc.getElementById("mono-output").checked;
  const compactOutput = doc.getElementById("compact-output").checked;
  const sortKeys = doc.getElementById("sort-keys").checked;
  const rawInput = doc.getElementById("raw-input").checked;
  const rawOutput = doc.getElementById("raw-output").checked;
  const slurp = doc.getElementById("slurp").checked;

  const args = monochromeOutput ? ["--monochrome-output"] : ["--color-output"];
  if (compactOutput) {
    args.push("--compact-output");
  }
  if (sortKeys) {
    args.push("--sort-keys");
  }
  if (rawInput) {
    args.push("--raw-input");
  }
  if (rawOutput) {
    args.push("--raw-output");
  }
  if (slurp) {
    args.push("--slurp");
  }
  args.push(query);
  args.push(path);

  // Update url query params with current query
  const url = new URL(location.href);
  url.searchParams.set("query", query);
  history.replaceState("", "", url);

  const start = performance.now();
  const output = await jq.run({ path, data, args });
  const end = performance.now();
  const elapsed = (end - start).toFixed(3);
  doc.getElementById("output-label").textContent = `Result (${elapsed}ms)`;

  if (monochromeOutput) {
    doc.getElementById("output-json").textContent = output;
  } else {
    const ansi_up = new AnsiUp();
    const html = ansi_up.ansi_to_html(output);
    doc.getElementById("output-json").innerHTML = html;
  }
}

// buffer and call the callback only after no activity for "interval": aka debounce
// This reduces load on the browser by avoiding jq evaluation while the user is typing
function debounce(cb: Function, interval: number) {
  let debounceTimeoutId: ReturnType<typeof setTimeout>;
  return function (...args: any[]) {
    clearTimeout(debounceTimeoutId);
    debounceTimeoutId = setTimeout(() => cb(...args), interval);
  };
}

function putSample() {
  doc.getElementById("filter").value = ".[].sha";
  doc.getElementById("input-json").value = sampleData;
  runJQ();
}

async function setup() {
  // Populate the form from the url parameters
  const params = new URL(location.href).searchParams;
  const query = params.get("query");
  if (query) {
    doc.getElementById("filter").value = query;
  }

  jq = await loadJQ({ moduleUrl, wasmUrl });
  const delayedJq = debounce(runJQ, 400);

  document.getElementById("filter")!.addEventListener("input", delayedJq);
  document.getElementById("input-json")!.addEventListener("input", delayedJq);
  document.getElementById("mono-output")!.addEventListener("input", runJQ);
  document.getElementById("compact-output")!.addEventListener("input", runJQ);
  document.getElementById("sort-keys")!.addEventListener("input", runJQ);
  document.getElementById("raw-input")!.addEventListener("input", runJQ);
  document.getElementById("raw-output")!.addEventListener("input", runJQ);
  document.getElementById("slurp")!.addEventListener("input", runJQ);
  document.getElementById("input-sample")!.addEventListener("click", putSample);
}

setup();
