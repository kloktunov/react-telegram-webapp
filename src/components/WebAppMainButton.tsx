import { useEffect, useState } from 'react';
import { useAddMainButton, useRemoveMainButton, useTelegramWebApp } from '../context/TelegramWebAppContext';
import React from 'react';

// Define the props for the MainButton component
export interface MainButtonProps {
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
const WebAppMainButton = (props: MainButtonProps)  => {

	const addMainButton = useAddMainButton();
	const removeMainButton = useRemoveMainButton();

	// Show the button and clean up when the component is unmounted
	useEffect(() => {
		addMainButton(props);

		return () => {
			removeMainButton(props);
		};
	}, []);

	return null;

	
};


export default WebAppMainButton;
