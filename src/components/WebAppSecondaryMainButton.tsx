import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAddMainButton, useAddSecondaryMainButton, useRemoveMainButton, useRemoveSecondaryMainButton, useTelegramWebApp } from '../context/TelegramWebAppContext';
import React from 'react';
import { MainButtonProps } from './WebAppMainButton';

// Define the props for the MainButton component
export interface SecondaryMainButtonProps extends MainButtonProps {
	position?: "top" | "left" | "bottom" | "right";
}
// Renders the MainButton component in a React application
const WebAppSecondaryMainButton = (props: SecondaryMainButtonProps) => {

	const addSecondaryMainButton = useAddSecondaryMainButton();
	const removeSecondaryMainButton = useRemoveSecondaryMainButton();

	const onClickRef = useRef(props.onClick);

	useEffect(() => {
		onClickRef.current = props.onClick;
	}, [props.onClick]);

	useEffect(() => {
		const buttonProps = {
			...props,
			onClick: () => onClickRef.current && onClickRef.current(),
		};
		addSecondaryMainButton(buttonProps);

		return () => {
			removeSecondaryMainButton(buttonProps);
		};
	}, [props.text, props.progress, props.disable, props.color, props.textColor, props.hasShineEffect, props.position]);

	return null;
};


export default WebAppSecondaryMainButton;
