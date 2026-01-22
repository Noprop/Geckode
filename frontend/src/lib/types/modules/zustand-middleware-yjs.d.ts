declare module 'zustand-middleware-yjs' {
    import { StateCreator } from 'zustand';
    import * as Y from 'yjs';

    export interface YjsOptions {
        /** The key to use in the Y.Map. Defaults to 'zustand' */
        key?: string;
    }

    export type YjsMiddleware = <T>(
        yDoc: Y.Doc,
        map: string,
        config: StateCreator<T, [], []>
    ) => StateCreator<T, [], []>;

    const yjs: YjsMiddleware;

    export default yjs;
}