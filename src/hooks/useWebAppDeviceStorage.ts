import { useMemo } from "react";
import { useTelegramWebApp } from "../context/TelegramWebAppContext";
import { isVersionAtLeast } from "../utils/webapp";

// Promise wrappers over Telegram.WebApp.DeviceStorage — local storage on the device (Bot API 9.0+)
export const useWebAppDeviceStorage = () => {

    const webApp = useTelegramWebApp();
    const isSupported = isVersionAtLeast(webApp, '9.0') && !!webApp?.DeviceStorage;

    return useMemo(() => {

        const storage = () => {
            if (!isSupported || !webApp?.DeviceStorage) {
                throw new Error('DeviceStorage is not supported');
            }
            return webApp.DeviceStorage;
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
            getItem: (key: string) => call<string | null>((cb) => storage().getItem(key, cb)),
            removeItem: (key: string) => call<boolean>((cb) => storage().removeItem(key, cb)),
            clear: () => call<boolean>((cb) => storage().clear(cb)),
        };

    }, [webApp, isSupported]);

};
