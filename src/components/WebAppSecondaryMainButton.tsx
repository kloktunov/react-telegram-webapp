import { useContext, useEffect, useMemo, useRef } from 'react';
import { TelegramWebAppContext } from '../context/TelegramWebAppContext';
import { MainButtonProps } from './WebAppMainButton';

// Define the props for the MainButton component
export interface SecondaryMainButtonProps extends MainButtonProps {
	position?: "top" | "left" | "bottom" | "right";
}
// Renders the MainButton component in a React application
const WebAppSecondaryMainButton = (props: SecondaryMainButtonProps) => {

	const { registerSecondaryMainButton, updateSecondaryMainButton, unregisterSecondaryMainButton } = useContext(TelegramWebAppContext);

	const onClickRef = useRef(props.onClick);
	onClickRef.current = props.onClick;

	const buttonProps = useMemo<SecondaryMainButtonProps>(() => ({
		...props,
		onClick: () => onClickRef.current && onClickRef.current(),
	}), [props.text, props.progress, props.disable, props.color, props.textColor, props.hasShineEffect, props.iconCustomEmojiId, props.position]);

	const idRef = useRef<number | null>(null);

	// Register once: props changes update the button in place instead of moving it to the top
	useEffect(() => {
		const id = registerSecondaryMainButton(buttonProps);
		idRef.current = id;

		return () => {
			idRef.current = null;
			unregisterSecondaryMainButton(id);
		};
	}, []);

	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		if (idRef.current !== null) {
			updateSecondaryMainButton(idRef.current, buttonProps);
		}
	}, [buttonProps]);

	return null;
};


export default WebAppSecondaryMainButton;
