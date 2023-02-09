import { useCallback } from 'react';
import { useTelegramWebApp } from '../context/TelegramWebAppContext';
import { TelegramWebApps } from '../telegram-webapps';

export const useWebAppShowPopup = () => {

    const webApp = useTelegramWebApp();

    return useCallback((params: TelegramWebApps.PopupParams) => {

        return new Promise<string | undefined>((resolve, reject) => {

            try {
                
                webApp?.showPopup(params, (buttonId?: string) => resolve(buttonId));

            } catch (e) {

                reject(e);

            }

        });
            
    }, [webApp]);

}
