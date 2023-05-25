import {
    STORAGE_TYPE_LOCAL,
    STORAGE_TYPE_SESSION,
    StorageProvider,
} from 'Services/storage/StorageProvider';
import { Storage } from 'Services/storage/Storage';

describe('storageProvider tests', () => {
    it('should provide a local Storage instance properly', () => {
        expect.assertions(4);

        const localStorage = window.localStorage;

        Object.defineProperty(window, 'localStorage', {
            value: { data: 1 },
        });

        let storage = StorageProvider.storage(STORAGE_TYPE_LOCAL);

        expect(storage).toBeInstanceOf(Storage);
        expect(storage.storage).toStrictEqual({ data: 1 });

        Object.defineProperty(window, 'localStorage', {
            value: { data: 2 },
        });

        storage = StorageProvider.localStorage();

        expect(storage).toBeInstanceOf(Storage);
        expect(storage.storage).toStrictEqual({ data: 1 });

        Object.defineProperty(window, 'localStorage', {
            value: localStorage,
        });
    });

    it('should provide a session Storage instance properly', () => {
        expect.assertions(4);

        const sessionStorage = window.sessionStorage;

        Object.defineProperty(window, 'sessionStorage', {
            value: { sessionData: 1 },
        });

        let storage = StorageProvider.storage(STORAGE_TYPE_SESSION);

        expect(storage).toBeInstanceOf(Storage);
        expect(storage.storage).toStrictEqual({ sessionData: 1 });

        storage = StorageProvider.sessionStorage();

        expect(storage).toBeInstanceOf(Storage);
        expect(storage.storage).toStrictEqual({ sessionData: 1 });

        Object.defineProperty(window, 'sessionStorage', {
            value: sessionStorage,
        });
    });
});
