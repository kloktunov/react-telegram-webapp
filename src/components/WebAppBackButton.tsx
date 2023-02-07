import { FC, useEffect } from 'react';
import { useTelegramWebApp } from '../context/TelegramWebAppContext';
// Тип пропсов для компонента BackButton
interface BackButtonProps {
  // Обработчик события нажатия кнопки назад
  onClick: () => void;
}

// Рендерит компонент BackButton в приложении React
const WebAppBackButton: FC<BackButtonProps> = ({ onClick }) => {

    const webApp = useTelegramWebApp();

    // Получение экземпляра BackButton из Telegram Web App
    const backButton = webApp?.BackButton;

    // Если BackButton недоступен, компонент не отрендерится
    if (!backButton) return null;

    // Отображение BackButton и подписка на событие onClick
    useEffect(() => {

        if(onClick){
            backButton.onClick(onClick);
        }

        backButton.show();

        return () => {
            backButton.hide();
            
            if(onClick){
                backButton.offClick(onClick);
            }
            
        };

    }, [onClick]);

    return null;
};

export default WebAppBackButton;
