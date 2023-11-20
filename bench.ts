import profiles from "kpopnet.json";
import moduleUrl from "./jq.js?url";
import wasmUrl from "./jq.wasm?url";

function addInfo(type: string, time: string) {
  const div = document.createElement("div");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  span1.textContent = type || "\xa0";
  span2.textContent = time;
  div.appendChild(span1);
  div.appendChild(span2);
  document.body.appendChild(div);
}

function addBr() {
  document.body.appendChild(document.createElement("br"));
}

function logTimes(startTime: number, ...times: (string | number)[]) {
  const formatTime = (t2: number, t1: number) =>
    t2 === t1 ? "" : (t2 - t1).toFixed(3);

  let prevTime = startTime;
  let time = 0;
  for (let i = 0; i < times.length; i += 2) {
    const name = times[i] as string;
    time = times[i + 1] as number;
    addInfo(name, formatTime(time, prevTime));
    prevTime = time;
  }
  const endTime = time;
  addInfo("", "");
  addInfo("total", formatTime(endTime, startTime));
}

async function bench() {
  const path = "data.json";
  const tStart = performance.now();

  const data = JSON.stringify(profiles);
  const tStr = performance.now();

  const loadJQ = (await import("./index")).default;
  const tMainLoaded = performance.now();

  const jq = await loadJQ({ moduleUrl, wasmUrl, path, data });
  const tWorkerLoaded = performance.now();

  const qSimple = await jq.run(".idols[0].name", path);
  const tSimple = performance.now();

  const qSimple2 = await jq.run(".idols[0].name", path);
  const tSimple2 = performance.now();

  const qAvg = await jq.run(
    "[.idols[].height | select(. != null)] | add/length",
    path
  );
  const tAvg = performance.now();

  const qComplex = await jq.run(
    '.groups | group_by(.debut_date[:4]) | sort_by(-length)[] | "\\(.[0].debut_date[:4]): \\(length)"',
    "-r",
    path
  );
  const tComplex = performance.now();

  for (let i = 0; i < 100; i++) {
    await jq.run(".idols[0].name", path);
  }
  const t100 = performance.now();

  logTimes(
    tStart,
    "stringify",
    tStr,
    "main module",
    tMainLoaded,
    "worker module",
    tWorkerLoaded,
    "",
    tWorkerLoaded,
    "simple query",
    tSimple,
    "simple again",
    tSimple2,
    "average query",
    tAvg,
    "complex query",
    tComplex,
    "100 times",
    t100
  );

  addBr();
  addInfo("simple", qSimple);
  addInfo("simple2", qSimple2);
  addInfo("average", qAvg);
  addInfo("complex", qComplex);
}

document.addEventListener("DOMContentLoaded", () => {
  bench().catch((err) => {
    console.error(err);
    addInfo("error", err.toString());
  });
});
