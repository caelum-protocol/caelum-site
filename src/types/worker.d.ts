// src/types/worker.d.ts
declare module 'worker-loader!*' {
  class WebpackWorker extends Worker {
    constructor();
  }
  export default WebpackWorker;
}
