import { useEffect, useState } from 'react';
import { useTelegramWebApp } from '../context/TelegramWebAppContext';
import { TelegramWebApps } from '../telegram-webapps';

export const useWebAppTheme = () => {
    
    // Используем хук useTelegramWebApp для получения объекта веб-приложения Telegram
    const webApp = useTelegramWebApp();

    // Используем хук useState для хранения текущей схемы цветов
    const [colorScheme, setColorScheme] = useState<TelegramWebApps.ColorScheme>(webApp?.colorScheme || 'light');

    // Используем хук useState для хранения параметров темы
    const [themeParams, setThemeParams] = useState<TelegramWebApps.ThemeParams>(webApp?.themeParams || {});

    // Функция handleChange будет вызываться при изменении темы
    const handleChange = () => {
        setColorScheme(webApp?.colorScheme || 'light');
        setThemeParams(webApp?.themeParams || {});
    };

    // Используем хук useEffect для отслеживания изменения темы
    useEffect(() => {

        handleChange();

        // Подписываемся на событие 'themeChanged' у объекта веб-приложения Telegram
        webApp?.onEvent('themeChanged', handleChange);

        // Возвращаем функцию отписки от события
        return () => webApp?.offEvent('themeChanged', handleChange);

    }, [webApp]);

    // Возвращаем текущую схему цветов и параметры темы
    return { colorScheme, themeParams };

};

