// src/irys.d.ts (or just irys.d.ts at the root)
declare module '@irys/web-upload' {
  export default class WebUploader {
    constructor(options: any);
    irys: any;
    upload(data: string | Buffer, opts?: { tags: { name: string; value: string } }): Promise<any>;
    uploadFile(file: File, opts?: { tags: { name: string; value: string } }): Promise<any>;
    ready(): Promise<void>;
  }
}