import { useEffect, useState } from 'react';
import { useTelegramWebApp } from '../context/TelegramWebAppContext';
import { TelegramWebApps } from '../telegram-webapps';

export const useWebAppTheme = () => {

    const webApp = useTelegramWebApp();

    const [colorScheme, setColorScheme] = useState<TelegramWebApps.WebApp['colorScheme']>(webApp?.colorScheme || 'light');

    const [themeParams, setThemeParams] = useState<TelegramWebApps.ThemeParams>(webApp?.themeParams || {} as TelegramWebApps.ThemeParams);

    useEffect(() => {

        const handleChange = () => {
            setColorScheme(webApp?.colorScheme || 'light');
            // Telegram may mutate the same object — copy it so React sees the change
            setThemeParams({ ...(webApp?.themeParams || {}) } as TelegramWebApps.ThemeParams);
        };

        handleChange();

        webApp?.onEvent('themeChanged', handleChange);

        return () => webApp?.offEvent('themeChanged', handleChange);

    }, [webApp]);

    return { colorScheme, themeParams };

};
