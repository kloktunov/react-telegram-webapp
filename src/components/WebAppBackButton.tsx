import { FC, useEffect } from 'react';
import { useTelegramWebApp } from '../context/TelegramWebAppContext';

interface BackButtonProps {
  onClick: () => void;
}

const WebAppBackButton: FC<BackButtonProps> = ({ onClick }) => {

	// access the Telegram Web App instance
	const webApp = useTelegramWebApp();

	// retrieve the BackButton object from the Telegram Web App
	const backButton = webApp?.BackButton;

	// return null if the BackButton is not available
	if (!backButton) return null;

	// show the BackButton and subscribe to the onClick event
	useEffect(() => {

		// attach the onClick event handler
		if(onClick){
			backButton.onClick(onClick);
		}

		// show the BackButton component
		backButton.show();

		// remove the onClick event handler and hide the BackButton component on unmount
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
