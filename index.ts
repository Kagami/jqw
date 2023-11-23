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

export interface JQRunOpts {
  path?: string /** path to the file in virtual FS */;
  data?: string /** data of the file */;
  args: string[] /** arguments to run JQ with */;
}

class JQHandler {
  private worker: Worker;
  private running: Promise<any>[];

  constructor(worker: Worker) {
    this.worker = worker;
    this.running = [];
  }

  /** Put file on virtual FS */
  async write({ path, data }: { path: string; data: string }): Promise<void> {
    while (this.running.length) {
      const p = this.running[0];
      await p;
      this.running = this.running.filter((x) => x !== p);
    }
    const p = new Promise<void>((resolve, reject) => {
      this.worker.onmessage = (e) => {
        this.worker.onmessage = null; // wait for single msg only
        const msg = e.data;
        if (msg.type === "set") {
          resolve();
        } else {
          reject(Error(msg.data));
        }
      };
      this.worker.postMessage({ type: "set", path, data });
    });
    this.running.push(p);
    return p;
  }

  /** Run JQ with optional file data written beforehand */
  async run(opts: JQRunOpts | string[]): Promise<string> {
    if (Array.isArray(opts)) {
      opts = { args: opts };
    }
    const { path, data, args } = opts;

    // console.log("@@@ wait", this.running.length);
    while (this.running.length) {
      const p = this.running[0];
      await p;
      this.running = this.running.filter((x) => x !== p);
    }
    // console.log("@@@ done waiting");

    // console.log("@@@ starting req");
    const p = new Promise<string>((resolve, reject) => {
      this.worker.onmessage = (e) => {
        this.worker.onmessage = null; // wait for single msg only
        const msg = e.data;
        if (msg.type === "done") {
          // console.log("@@@ run done");
          resolve(msg.data);
        } else {
          reject(Error(msg.data));
        }
      };
      this.worker.postMessage({ type: "run", path, data, args });
    });
    // console.log("@@@ pushed promise");
    this.running.push(p);
    return p;
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
