import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
	// Whether the button has a shine effect
	hasShineEffect?: boolean;
}
// Renders the MainButton component in a React application
const WebAppMainButton = (props: MainButtonProps) => {

	const addMainButton = useAddMainButton();
	const removeMainButton = useRemoveMainButton();

	const onClickRef = useRef(props.onClick);

	useEffect(() => {
		onClickRef.current = props.onClick;
	}, [props.onClick]);

	useEffect(() => {
		const buttonProps = {
			...props,
			onClick: () => onClickRef.current && onClickRef.current(),
		};
		addMainButton(buttonProps);

		return () => {
			removeMainButton(buttonProps);
		};
	}, [props.text, props.progress, props.disable, props.color, props.textColor, props.hasShineEffect]);

	return null;
};


export default WebAppMainButton;
