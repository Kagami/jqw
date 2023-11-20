export interface JQLoadOpts {
  moduleUrl?: string /** path to the jq.js module */;
  wasmUrl?: string /** path to the jq.wasm */;
  path?: string /** preloaded path */;
  data?: string /** preloaded data */;
}

export const defaultOpts: JQLoadOpts = {
  moduleUrl: "/static/jq.js",
  wasmUrl: "/static/jq.wasm",
};

class JQHandler {
  private worker: Worker;
  private running: boolean = false;

  constructor(worker: Worker) {
    this.worker = worker;
  }

  writeFile(path: string, data: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.running) throw Error("already running");
      this.running = true;
      this.worker.onmessage = (e) => {
        this.worker.onmessage = null; // wait for single msg only
        this.running = false;
        const msg = e.data;
        if (msg.type === "set") {
          resolve();
        } else {
          reject(Error(msg.data));
        }
      };
      this.worker.postMessage({ type: "set", path, data });
    });
  }

  run(...args: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.running) throw Error("already running");
      this.running = true;
      this.worker.onmessage = (e) => {
        this.worker.onmessage = null; // wait for single msg only
        this.running = false;
        const msg = e.data;
        if (msg.type === "done") {
          resolve(msg.data);
        } else {
          reject(Error(msg.data));
        }
      };
      this.worker.postMessage({ type: "run", data: args });
    });
  }
}

export type JQ = JQHandler;

export default function loadJQ(opts: JQLoadOpts = {}): Promise<JQ> {
  opts = Object.assign({}, defaultOpts, opts);
  return new Promise((resolve, reject) => {
    const worker = new Worker(opts.moduleUrl!);
    worker.onerror = (e) => {
      reject(e);
    };
    worker.onmessage = (e) => {
      worker.onmessage = null; // wait for single msg only
      const msg = e.data;
      if (msg.type === "ready") {
        resolve(new JQHandler(worker));
      } else {
        reject(Error("internal error"));
      }
    };
    worker.postMessage({
      type: "load",
      url: opts.wasmUrl,
      path: opts.path,
      data: opts.path && new TextEncoder().encode(opts.data),
    });
  });
}
