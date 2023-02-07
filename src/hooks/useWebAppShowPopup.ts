import { useCallback } from 'react';
import { useTelegramWebApp } from '../context/TelegramWebAppContext';
import { TelegramWebApps } from '../telegram-webapps';

export const useWebAppShowPopup = () => {

    // Получаем объект с методом showPopup из другого хука
    const webpApp = useTelegramWebApp();

    // Возвращаем обернутую в useCallback функцию
    return useCallback((params: TelegramWebApps.PopupParams) => {

        return new Promise<string | undefined>((resolve, reject) => {

            // Пытаемся вызвать метод showPopup
            try {
                
                // Если вызов прошел успешно, то вызываем resolve с идентификатором нажатой кнопки
                webpApp?.showPopup(params, (buttonId?: string) => resolve(buttonId));

            } catch (e) {

                // В случае ошибки вызываем reject с ошибкой
                reject(e);

            }

        });
            
    }, []);

}
