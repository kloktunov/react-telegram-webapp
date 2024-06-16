import { FC, useEffect, useMemo } from 'react';
import { useAddBackButtonListener, useRemoveBackButtonListener, useTelegramWebApp } from '../context/TelegramWebAppContext';
import React from 'react';

interface BackButtonProps {
  onClick: () => void;
}

const WebAppBackButton = ({ onClick }: BackButtonProps) => {

	console.log("[BACKBUTTON] i'm rerender");

	// access the Telegram Web App instance
	const addBackButtonListener = useAddBackButtonListener();
	const removeBackButtonListener = useRemoveBackButtonListener();

	useEffect(() => {

		addBackButtonListener(onClick);

		return () => {
			removeBackButtonListener(onClick);
		}

	}, []);

	return <></>;
};

export default WebAppBackButton;
