
export function set(key: string, value: string): void {
    localStorage.setItem(key, value);
}

export function get(key: string): string | null {
    return localStorage.getItem(key);
}