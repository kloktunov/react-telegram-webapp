import { FC, useEffect } from 'react';
import { useTelegramWebApp } from '../context/TelegramWebAppContext';
import React from 'react';

// Define the props for the MainButton component
interface MainButtonProps {
	// The text displayed on the button
	text?: string;
	// Whether to display a loading spinner on the button
	progress?: boolean;
	// Whether to disable the button
	disable?: boolean;
	// The function to call when the button is clicked
	onClick?: () => void;
	// The background color of the button
	color?: string;
	// The text color of the button
	textColor?: string;
}

// Renders the MainButton component in a React application
const WebAppMainButton = ({
	text = 'CONTINUE',
	progress = false,
	disable = false,
	color,
	textColor,
	onClick,
}: MainButtonProps) => {
	
	// Get the instance of MainButton from Telegram Web App
	const webApp = useTelegramWebApp();
	const webAppMainButton = webApp?.MainButton;

	// If MainButton is not available, the component will not be rendered
	if (!webAppMainButton || !webApp) return null;

	// Set the color of the button
	useEffect(() => {
		webAppMainButton.setParams({
			color: color || webApp.themeParams.button_color,
		});
	}, [color]);

	// Set the text color of the button
	useEffect(() => {
		webAppMainButton.setParams({
			text_color: textColor || webApp.themeParams.button_text_color,
		});
	}, [textColor]);

	// Set the text displayed on the button
	useEffect(() => {
		webAppMainButton.setText(text);
	}, [text]);

	// Enable or disable the button based on the "disable" prop
	useEffect(() => {
		if (webAppMainButton.isActive && disable) {
			webAppMainButton.disable();
		} else if (!webAppMainButton.isActive && !disable) {
			webAppMainButton.enable();
		}
	}, [disable]);

	// Show or hide the loading spinner on the button based on the "progress" prop
	useEffect(() => {
		if (!webAppMainButton.isProgressVisible && progress) {
			webAppMainButton.showProgress(false);
		} else if (webAppMainButton.isProgressVisible && !progress) {
			webAppMainButton.hideProgress();
		}
	}, [progress]);

	// Call the "onClick" function when the button is clicked
	useEffect(() => {
		if (!onClick) {
			return;
		}

		webAppMainButton.onClick(onClick);

		return () => {
			webAppMainButton.offClick(onClick);
		};
	}, [onClick]);

	// Show the button and clean up when the component is unmounted
	useEffect(() => {
		webAppMainButton.show();

		return () => {
			webAppMainButton.hide();
		};
	}, []);

	return <></>;

	
};


export default WebAppMainButton;
