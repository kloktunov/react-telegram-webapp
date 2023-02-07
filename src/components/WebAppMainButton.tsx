import { FC, useEffect } from 'react';
import { useTelegramWebApp } from '../context/TelegramWebAppContext';

interface MainButtonProps {
    text?: string;
    progress?: boolean;
    disable?: boolean;
    onClick?: () => void;
    color?: string;
    textColor?: string;
}

const WebAppMainButton: FC<MainButtonProps> = ({
    
    text = 'CONTINUE',
    progress = false,
    disable = false,
    color,
    textColor,
    onClick,

}): null => {

    const webApp = useTelegramWebApp();
    const webAppMainButton = webApp?.MainButton;

    if (!webAppMainButton || !webApp) return null;

    useEffect(() => {
        
        webAppMainButton.setParams({
            color: color || webApp.themeParams.button_color
        });

    }, [color]);

    useEffect(() => {
        
        webAppMainButton.setParams({
            text_color: textColor || webApp.themeParams.button_text_color
        });

    }, [textColor]);

    useEffect(() => {

        webAppMainButton.setText(text);

    }, [text]);

    useEffect(() => {
        if (webAppMainButton.isActive && disable) {
            webAppMainButton.disable();
        } else if (!webAppMainButton.isActive && !disable) {
            webAppMainButton.enable();
        }
    }, [disable]);

    useEffect(() => {
        
        if (!webAppMainButton.isProgressVisible && progress) {
            webAppMainButton.showProgress(false);
        } else if (webAppMainButton.isProgressVisible && !progress) {
            webAppMainButton.hideProgress();
        }

    }, [progress]);

    useEffect(() => {

        if (!onClick) {
            return;
        }

        webAppMainButton.onClick(onClick);

        return () => {
            webAppMainButton.offClick(onClick);
        };

    }, [onClick]);

    useEffect(() => {

        webAppMainButton.show();

        return () => {

            webAppMainButton.hide();

        };

    }, []);

    return null;

};

export default WebAppMainButton;
