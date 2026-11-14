import { useMemo } from "react";
import { useTelegramWebApp } from "../context/TelegramWebAppContext";
import { isVersionAtLeast } from "../utils/webapp";

// Promise wrappers over Telegram.WebApp.CloudStorage (Bot API 6.9+)
export const useWebAppCloudStorage = () => {

    const webApp = useTelegramWebApp();
    const isSupported = isVersionAtLeast(webApp, '6.9');

    return useMemo(() => {

        const storage = () => {
            if (!isSupported || !webApp?.CloudStorage) {
                throw new Error('CloudStorage is not supported');
            }
            return webApp.CloudStorage;
        };

        const call = <T,>(run: (callback: (error: string | null, result?: T) => void) => void) => {
            return new Promise<T | undefined>((resolve, reject) => {
                try {
                    run((error, result) => (error ? reject(new Error(error)) : resolve(result)));
                } catch (e) {
                    reject(e);
                }
            });
        };

        return {
            isSupported,
            setItem: (key: string, value: string) => call<boolean>((cb) => storage().setItem(key, value, cb)),
            getItem: (key: string) => call<string>((cb) => storage().getItem(key, cb)),
            getItems: (keys: string[]) => call<Record<string, string>>((cb) => storage().getItems(keys, cb)),
            removeItem: (key: string) => call<boolean>((cb) => storage().removeItem(key, cb)),
            removeItems: (keys: string[]) => call<boolean>((cb) => storage().removeItems(keys, cb)),
            getKeys: () => call<string[]>((cb) => storage().getKeys(cb)),
        };

    }, [webApp, isSupported]);

};
