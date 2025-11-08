import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        const defaultDelimiter = delimiter ?? DEFAULT_DELIMITER;   
             if (typeof defaultDelimiter !== "string" || defaultDelimiter.length !== 1 || defaultDelimiter === ESCAPE_CHARACTER) {
                 throw new Error("Invalid delimiter input");
             }
         this.delimiter = defaultDelimiter;
         this.components = [...source];
    }

    public asString(delimiter: string = this.delimiter): string {
        const defaultDelimiter = delimiter;
        if (typeof defaultDelimiter !== "string" || defaultDelimiter.length !== 1 || defaultDelimiter === ESCAPE_CHARACTER) {
            throw new Error("Invalid delimiter input");
        }
        const raw = this.components.map(masked => {
            let output = "";
            for (let i = 0; i < masked.length; i++) {
                const ch = masked[i];
                if (ch === ESCAPE_CHARACTER) {
                    if (i + 1 < masked.length) output += masked[++i];
                    else output += ESCAPE_CHARACTER;
                } else output += ch;
            }
            return output;
        });
        return raw.join(defaultDelimiter);  
      }

    public asDataString(): string {
    const raw = this.components.map(masked => {
            let output = "";
            for (let i = 0; i < masked.length; i++) {
                const ch = masked[i];
                if (ch === ESCAPE_CHARACTER) {
                    if (i + 1 < masked.length) output += masked[++i];
                    else output += ESCAPE_CHARACTER;
                } else output += ch;
            }
            return output;
        });
        const reMasked = raw.map(r => {
            let output = "";
            for (let i = 0; i < r.length; i++) {
                const ch = r[i];
                if (ch === ESCAPE_CHARACTER || ch === DEFAULT_DELIMITER) output += ESCAPE_CHARACTER + ch;
                else output += ch;
            }
            return output;
        });
        return reMasked.join(DEFAULT_DELIMITER);
        }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
       return this.components.length === 0;
    }

    public getNoComponents(): number {
       return this.components.length;
    }

    public getComponent(i: number): string {
         if (!Number.isInteger(i) || i < 0 || i >= this.components.length) {
            throw new Error("The index out of bounds");
        }
        return this.components[i]; 
    }

    public setComponent(i: number, c: string): void {
       if (!Number.isInteger(i) || i < 0 || i >= this.components.length) {
            throw new Error("The inndex out of bounds");
        }
        this.components[i] = c; 
    }

    public insert(i: number, c: string): void {
      if (!Number.isInteger(i) || i < 0 || i > this.components.length) {
            throw new Error("The index out of bounds");
        }
        this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
   if (!Number.isInteger(i) || i < 0 || i >= this.components.length) {
            throw new Error("The index out of bounds");
        }
        this.components.splice(i, 1);
    }

    public concat(other: Name): void {
        const oth = other.asDataString();
        if (oth === "") return;

        const parts: string[] = [];
        {
            let cur = "";
            for (let i = 0; i < oth.length; i++) {
                const ch = oth[i];
                if (ch === ESCAPE_CHARACTER) {
                    if (i + 1 < oth.length) { cur += oth[++i]; }
                    else { cur += ESCAPE_CHARACTER; }
                } else if (ch === DEFAULT_DELIMITER) {
                    parts.push(cur); cur = "";
                } else {
                    cur += ch;
                }
            }
            parts.push(cur);
        }

        for (const masked of parts) {
            let raw = "";
            for (let i = 0; i < masked.length; i++) {
                const ch = masked[i];
                if (ch === ESCAPE_CHARACTER) {
                    if (i + 1 < masked.length) raw += masked[++i];
                    else raw += ESCAPE_CHARACTER;
                } else raw += ch;
            }
            let re = "";
            for (let i = 0; i < raw.length; i++) {
                const ch = raw[i];
                if (ch === ESCAPE_CHARACTER || ch === this.delimiter) re += ESCAPE_CHARACTER + ch;
                else re += ch;
            }
            this.components.push(re);
        }
    }

}