import { useEffect, useState } from 'react';
import { useTelegramWebApp } from '../context/TelegramWebAppContext';
import { TelegramWebApps } from '../telegram-webapps';

export const useWebAppTheme = () => {
    
    const webApp = useTelegramWebApp();

    const [colorScheme, setColorScheme] = useState<TelegramWebApps.ColorScheme>(webApp?.colorScheme || 'light');

    const [themeParams, setThemeParams] = useState<TelegramWebApps.ThemeParams>(webApp?.themeParams || {});

    const handleChange = () => {
        setColorScheme(webApp?.colorScheme || 'light');
        setThemeParams(webApp?.themeParams || {});
    };

    useEffect(() => {

        handleChange();

        webApp?.onEvent('themeChanged', handleChange);

        return () => webApp?.offEvent('themeChanged', handleChange);

    }, [webApp]);

    return { colorScheme, themeParams };

};

