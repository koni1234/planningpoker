import { STORAGE_TYPE_LOCAL, STORAGE_TYPE_SESSION } from 'Services/storage/StorageProvider';
import { Storage } from 'Services/storage/Storage';

describe('storage tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should provide methods to work with localStorage properly', () => {
        expect.assertions(10);

        const localStorage = window.localStorage;
        const clear = jest.fn();
        const getItem = jest.fn(() => '[]');
        const setItem = jest.fn();
        const removeItem = jest.fn();

        Object.defineProperty(window, 'localStorage', {
            value: {
                data: 1,
                clear,
                getItem,
                setItem,
                removeItem,
            },
        });

        const storage = new Storage(STORAGE_TYPE_LOCAL);

        let result = storage.get('data');
        expect(getItem).toHaveBeenCalledWith('data');
        expect(result).toStrictEqual(JSON.parse('[]'));

        storage.set('data', { data: 1 });
        expect(setItem).toHaveBeenCalledWith('data', JSON.stringify({ data: 1 }));

        jest.spyOn(window.localStorage, 'getItem').mockImplementationOnce(() => null);
        result = storage.isset('data_new');
        expect(getItem).toHaveBeenCalledWith('data_new');
        expect(result).toBeFalsy();

        result = storage.isset('data_new');
        expect(getItem).toHaveBeenCalledWith('data_new');
        expect(result).toBeTruthy();

        jest.spyOn(window.localStorage, 'getItem').mockImplementationOnce(() => null);
        storage.unset('data');
        expect(removeItem).not.toHaveBeenCalled();

        storage.unset('data');
        expect(removeItem).toHaveBeenCalledWith('data');

        storage.clear();
        expect(clear).toHaveBeenCalledWith();

        Object.defineProperty(window, 'localStorage', {
            value: localStorage,
        });
    });

    it('should provide methods to work with sessionStorage properly', () => {
        expect.assertions(10);

        const sessionStorage = window.sessionStorage;
        const clear = jest.fn();
        const getItem = jest.fn(() => '{}');
        const setItem = jest.fn();
        const removeItem = jest.fn();

        Object.defineProperty(window, 'sessionStorage', {
            value: {
                data: 1,
                clear,
                getItem,
                setItem,
                removeItem,
            },
        });

        const storage = new Storage(STORAGE_TYPE_SESSION);

        let result = storage.get('data');
        expect(getItem).toHaveBeenCalledWith('data');
        expect(result).toStrictEqual(JSON.parse('{}'));

        storage.set('data', { data: 1 });
        expect(setItem).toHaveBeenCalledWith('data', JSON.stringify({ data: 1 }));

        jest.spyOn(window.sessionStorage, 'getItem').mockImplementationOnce(() => null);
        result = storage.isset('data_new');
        expect(getItem).toHaveBeenCalledWith('data_new');
        expect(result).toBeFalsy();

        result = storage.isset('data_new');
        expect(getItem).toHaveBeenCalledWith('data_new');
        expect(result).toBeTruthy();

        jest.spyOn(window.sessionStorage, 'getItem').mockImplementationOnce(() => null);
        storage.unset('data');
        expect(removeItem).not.toHaveBeenCalled();

        storage.unset('data');
        expect(removeItem).toHaveBeenCalledWith('data');

        storage.clear();
        expect(clear).toHaveBeenCalledWith();

        Object.defineProperty(window, 'sessionStorage', {
            value: sessionStorage,
        });
    });
});
