export interface StorageInterface {
    storage: WindowLocalStorage['localStorage'] | WindowSessionStorage['sessionStorage'];
    get<Type>(key: string): Type | null;
    set(key: string, value: unknown): void;
    unset(key: string): void;
    clear(): void;
    isset(key: string): boolean;
}
