
export function set(key: string, value: string): void {
    localStorage.setItem(key, value);
}

export function get(key: string): string | null {
    return localStorage.getItem(key);
}

export function remove(key: string): void {
    localStorage.removeItem(key);
}

export function getAllKeys(): string[] {
    return Object.keys(localStorage);
}

export function getAll<T>(prefix: string): T[] {
    const items: T[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
            const value = localStorage.getItem(key);
            if (value) {
                try {
                    items.push(JSON.parse(value));
                } catch (e) {
                    console.error(`Failed to parse item with key ${key}:`, e);
                }
            }
        }
    }
    return items;
}