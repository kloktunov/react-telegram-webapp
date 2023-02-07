import { useCallback } from 'react';
import { useTelegramWebApp } from '../context/TelegramWebAppContext';

export const useWebAppShowConfirm = () => {

    // Получаем объект с методом showPopup из другого хука
    const webpApp = useTelegramWebApp();

    // Возвращаем обернутую в useCallback функцию
    return useCallback((message: string) => {

        return new Promise<boolean>((resolve, reject) => {

            // Пытаемся вызвать метод showPopup
            try {
                
                // Если вызов прошел успешно, то вызываем resolve с идентификатором нажатой кнопки
                webpApp?.showConfirm(message, (result: boolean) => resolve(result));

            } catch (e) {

                // В случае ошибки вызываем reject с ошибкой
                reject(e);

            }

        });
            
    }, []);

}
