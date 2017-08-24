import { CursorDirection } from '../../serviceFactory/utils/GetOptions';
export declare const toCursor: (data: object) => string;
export declare const fromCursor: (cursor: string) => object | null;
export declare const cursorToFilter: ({cursor, sort, direction}: {
    readonly cursor?: string | undefined;
    readonly sort: object;
    readonly direction: CursorDirection;
}) => object;
export declare const modelToCursor: ({model, sort}: {
    readonly model: object;
    readonly sort: object;
}) => string;
