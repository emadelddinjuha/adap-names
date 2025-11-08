
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        const defaultDelimiter = delimiter ?? DEFAULT_DELIMITER;
        if (typeof defaultDelimiter !== "string" || defaultDelimiter.length !== 1 || defaultDelimiter === ESCAPE_CHARACTER) {
            throw new Error("Invalid delimiter input");
        }
        this.delimiter = defaultDelimiter;
        this.name = source ?? "";

        if (this.name === "") {
            this.noComponents = 0;
        } else {
            let count = 1;
            for (let i = 0; i < this.name.length; i++) {
                const ch = this.name[i];
                if (ch === ESCAPE_CHARACTER) {
                    i += (i + 1 < this.name.length) ? 1 : 0; 
                } else if (ch === this.delimiter) {
                    count++;
                }
            }
            this.noComponents = count;
        }
    }

    public asString(delimiter: string = this.delimiter): string {
       const defaultDelimiter = delimiter;
        if (typeof defaultDelimiter !== "string" || defaultDelimiter.length !== 1 || defaultDelimiter === ESCAPE_CHARACTER) {
            throw new Error("Invalid delimiter");
        }
        if (this.name === "") return "";

        const parts: string[] = [];
        let cur = "";
        for (let i = 0; i < this.name.length; i++) {
            const ch = this.name[i];
            if (ch === ESCAPE_CHARACTER) {
                if (i + 1 < this.name.length) { cur += this.name[++i]; }
                else { cur += ESCAPE_CHARACTER; }
            } else if (ch === this.delimiter) {
                parts.push(cur); cur = "";
            } else {
                cur += ch;
            }
        }
        parts.push(cur);
        return parts.join(defaultDelimiter);
     }

    public asDataString(): string {
        if (this.name === "") return "";

        const maskedParts: string[] = [];
        let current = "";
        for (let i = 0; i < this.name.length; i++) {
            const ch = this.name[i];
            if (ch === ESCAPE_CHARACTER) {
                if (i + 1 < this.name.length) { current += this.name[++i]; }
                else { current += ESCAPE_CHARACTER; }
            } else if (ch === this.delimiter) {
                maskedParts.push(current); current = "";
            } else {
                current += ch;
            }
        }
        maskedParts.push(current);

        const reMasked = maskedParts.map(masked => {
            let raw = "";
            for (let j = 0; j < masked.length; j++) {
                const ch = masked[j];
                if (ch === ESCAPE_CHARACTER) {
                    if (j + 1 < masked.length) raw += masked[++j];
                    else raw += ESCAPE_CHARACTER;
                } else raw += ch;
            }
            let out = "";
            for (let j = 0; j < raw.length; j++) {
                const ch = raw[j];
                if (ch === ESCAPE_CHARACTER || ch === DEFAULT_DELIMITER) out += ESCAPE_CHARACTER + ch;
                else out += ch;
            }
            return out;
        });

        return reMasked.join(DEFAULT_DELIMITER);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.noComponents === 0;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(x: number): string {
       const parts: string[] = [];
        if (this.name !== "") {
            let current = "";
            for (let i = 0; i < this.name.length; i++) {
                const ch = this.name[i];
                if (ch === ESCAPE_CHARACTER) {
                    if (i + 1 < this.name.length) { current += this.name[++i]; }
                    else { current += ESCAPE_CHARACTER; }
                } else if (ch === this.delimiter) {
                    parts.push(current); current = "";
                } else {
                    current += ch;
                }
            }
            parts.push(current);
        }
        if (!Number.isInteger(x) || x < 0 || x >= parts.length) {
            throw new Error("The index out of bounds");
        }
        return parts[x];
    }

    public setComponent(n: number, c: string): void {
         const parts: string[] = [];
        if (this.name !== "") {
            let current = "";
            for (let i = 0; i < this.name.length; i++) {
                const ch = this.name[i];
                if (ch === ESCAPE_CHARACTER) {
                    if (i + 1 < this.name.length) { current += this.name[++i]; }
                    else { current += ESCAPE_CHARACTER; }
                } else if (ch === this.delimiter) {
                    parts.push(current); current = "";
                } else {
                    current += ch;
                }
            }
            parts.push(current);
        }
        if (!Number.isInteger(n) || n < 0 || n >= parts.length) {
            throw new Error("The index out of bounds");
        }
        parts[n] = c; 
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;
    }

    public insert(n: number, c: string): void {
        const parts: string[] = [];
        if (this.name !== "") {
            let current = "";
            for (let i = 0; i < this.name.length; i++) {
                const ch = this.name[i];
                if (ch === ESCAPE_CHARACTER) {
                    if (i + 1 < this.name.length) { current += this.name[++i]; }
                    else { current += ESCAPE_CHARACTER; }
                } else if (ch === this.delimiter) {
                    parts.push(current); current = "";
                } else {
                    current += ch;
                }
            }
            parts.push(current);
        }
        if (!Number.isInteger(n) || n < 0 || n > parts.length) {
            throw new Error("The index out of bounds");
        }
        parts.splice(n, 0, c);
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;
    }

    public append(c: string): void {
        if (this.name === "") {
            this.name = c;
            this.noComponents = 1;
        } else {
            this.name += this.delimiter + c;
            this.noComponents += 1;
        }
    }

    public remove(n: number): void {
       const parts: string[] = [];
        if (this.name !== "") {
            let cur = "";
            for (let i = 0; i < this.name.length; i++) {
                const ch = this.name[i];
                if (ch === ESCAPE_CHARACTER) {
                    if (i + 1 < this.name.length) { cur += this.name[++i]; }
                    else { cur += ESCAPE_CHARACTER; }
                } else if (ch === this.delimiter) {
                    parts.push(cur); cur = "";
                } else {
                    cur += ch;
                }
            }
            parts.push(cur);
        }
        if (!Number.isInteger(n) || n < 0 || n >= parts.length) {
            throw new Error("The index out of bounds");
        }
        parts.splice(n, 1);
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;
    }

    public concat(other: Name): void {
       const otherD = other.asDataString(); 
        if (otherD === "") return;

        const otherParts: string[] = [];
        {
            let current = "";
            for (let i = 0; i < otherD.length; i++) {
                const ch = otherD[i];
                if (ch === ESCAPE_CHARACTER) {
                    if (i + 1 < otherD.length) { current += otherD[++i]; }
                    else { current += ESCAPE_CHARACTER; }
                } else if (ch === DEFAULT_DELIMITER) {
                    otherParts.push(current); current = "";
                } else {
                    current += ch;
                }
            }
            otherParts.push(current);
        }

        const toAdd = otherParts.map(masked => {
            let raw = "";
            for (let j = 0; j < masked.length; j++) {
                const ch = masked[j];
                if (ch === ESCAPE_CHARACTER) {
                    if (j + 1 < masked.length) raw += masked[++j];
                    else raw += ESCAPE_CHARACTER;
                } else raw += ch;
            }
            let out = "";
            for (let j = 0; j < raw.length; j++) {
                const ch = raw[j];
                if (ch === ESCAPE_CHARACTER || ch === this.delimiter) out += ESCAPE_CHARACTER + ch;
                else out += ch;
            }
            return out;
        });

        if (this.name === "") {
            this.name = toAdd.join(this.delimiter);
            this.noComponents = toAdd.length;
        } else {
            this.name += this.delimiter + toAdd.join(this.delimiter);
            this.noComponents += toAdd.length;
        }

    }

}