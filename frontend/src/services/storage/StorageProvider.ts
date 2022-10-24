import { Storage } from './Storage';
import { StorageInterface } from './Storage.interface';
import { StorageType } from './types';

const STORAGE_TYPE_LOCAL = 'local' as const;
const STORAGE_TYPE_SESSION = 'session' as const;

class StorageProvider {
    static localStorage(): StorageInterface {
        return new Storage(STORAGE_TYPE_LOCAL);
    }

    static sessionStorage(): StorageInterface {
        return new Storage(STORAGE_TYPE_SESSION);
    }

    static storage(storageType?: StorageType): StorageInterface {
        return new Storage(storageType);
    }
}

export { StorageProvider, STORAGE_TYPE_LOCAL, STORAGE_TYPE_SESSION };
