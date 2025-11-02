import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
      this.delimiter = delimiter ?? DEFAULT_DELIMITER;
      this.name = source;
      this.noComponents = source === "" ? 0 : source.split(this.delimiter).length;
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.name.split(this.delimiter).join(delimiter);
    }

    public asDataString(): string {
        return `"${this.name}"`;
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
        const parts = this.name.split(this.delimiter);
        if (x < 0 || x >= parts.length) throw new Error("Index out of bounds");
        return parts[x];
    }

    public setComponent(n: number, c: string): void {
        const parts = this.name.split(this.delimiter);
        if (n < 0 || n >= parts.length) throw new Error("Index out of bounds");
        parts[n] = c;
        this.name = parts.join(this.delimiter);
    }

    public insert(n: number, c: string): void {
        const parts = this.name === "" ? [] : this.name.split(this.delimiter);
        if (n < 0 || n > parts.length) throw new Error("Index out of bounds");
        parts.splice(n, 0, c);
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;
    }

    public append(c: string): void {
        const parts = this.name === "" ? [] : this.name.split(this.delimiter);
        parts.push(c);
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;
    }

    public remove(n: number): void {
        const parts = this.name.split(this.delimiter);
        if (n < 0 || n >= parts.length) throw new Error("Index out of bounds");
        parts.splice(n, 1);
        this.name = parts.join(this.delimiter);
        this.noComponents = parts.length;
    }

    public concat(other: Name): void {
        const otherParts: string[] = [];
        for (let i = 0; i < other.getNoComponents(); i++) {
          otherParts.push(other.getComponent(i));
        }
        const allParts = (this.name === "" ? [] : this.name.split(this.delimiter)).concat(otherParts);
        this.name = allParts.join(this.delimiter);
        this.noComponents = allParts.length;

    }

}