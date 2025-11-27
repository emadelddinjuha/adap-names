import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";


// File states

enum FileState {
    OPEN,
    CLOSED,
    DELETED
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {
        // file must be closed before it can be opened
        IllegalArgumentException.assert(
            this.state === FileState.CLOSED,
            "file must be closed before open"
        );

        this.state = FileState.OPEN;
    }

    public read(noBytes: number): Int8Array {
        // file must be open
        IllegalArgumentException.assert(
            this.state === FileState.OPEN,
            "file must be open for read"
        );
        // number of bytes must be non-negative
        IllegalArgumentException.assert(
            Number.isInteger(noBytes) && noBytes >= 0,
            "number of bytes must be non-negative"
        );

        return new Int8Array(noBytes);
    }

    public close(): void {
        // file must be open before it can be closed
        IllegalArgumentException.assert(
            this.state === FileState.OPEN,
            "file must be open before close"
        );

        this.state = FileState.CLOSED;
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

}