import { useCallback } from 'react';
import { useTelegramWebApp } from '../context/TelegramWebAppContext';

export const useWebAppShowConfirm = () => {

    const webApp = useTelegramWebApp();

    return useCallback((message: string) => {

        return new Promise<boolean>((resolve, reject) => {

            try {
                
                webApp?.showConfirm(message, (result: boolean) => resolve(result));

            } catch (e) {

                reject(e);

            }

        });
            
    }, [webApp]);

}
