export class HeaderKeysRegistry {
    static #instance: HeaderKeysRegistry;

    private keys: string[] = [];

    private constructor() { }

    public static get instance(): HeaderKeysRegistry {
        if (!HeaderKeysRegistry.#instance) {
            HeaderKeysRegistry.#instance = new HeaderKeysRegistry();
        }

        return HeaderKeysRegistry.#instance;
    }

    public setKeys(keys: string[]) {
        this.keys = keys
    }

    public getKeys(): string[] {
        return this.keys
    }

    public flushKeys() {
        this.keys = []
    }
}