import { useEffect } from 'react';
import { useAddBackButtonListener, useRemoveBackButtonListener, useTelegramWebApp } from '../context/TelegramWebAppContext';
import React from 'react';

interface BackButtonProps {
  onClick: () => void;
}

const WebAppBackButton = ({ onClick }: BackButtonProps) => {

	// access the Telegram Web App instance
	const addBackButtonListener = useAddBackButtonListener();
	const removeBackButtonListener = useRemoveBackButtonListener();

	useEffect(() => {

		addBackButtonListener(onClick);

		return () => {
			removeBackButtonListener(onClick);
		}

	}, []);

	return null;
};

export default WebAppBackButton;
