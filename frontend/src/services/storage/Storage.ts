import { STORAGE_TYPE_LOCAL, STORAGE_TYPE_SESSION } from './StorageProvider';
import { StorageInterface } from './Storage.interface';
import { StorageType } from './types';

class Storage implements StorageInterface {
    storage: WindowLocalStorage['localStorage'] | WindowSessionStorage['sessionStorage'];

    constructor(type?: StorageType) {
        switch (type) {
            case STORAGE_TYPE_SESSION:
                this.storage = window.sessionStorage;
                break;
            case STORAGE_TYPE_LOCAL:
            default:
                this.storage = window.localStorage;
        }
    }

    get<Type>(key: string): null | Type {
        const value = this.storage.getItem(key);
        return value === null ? null : JSON.parse(value);
    }

    set(key: string, value: unknown) {
        this.storage.setItem(key, JSON.stringify(value));
    }

    unset(key: string) {
        if (this.isset(key)) {
            this.storage.removeItem(key);
        }
    }

    clear() {
        this.storage.clear();
    }

    isset(key: string): boolean {
        return this.get(key) !== null;
    }
}

export { Storage };
