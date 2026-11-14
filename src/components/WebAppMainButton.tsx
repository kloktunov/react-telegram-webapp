import { useContext, useEffect, useMemo, useRef } from 'react';
import { TelegramWebAppContext } from '../context/TelegramWebAppContext';

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
	// Custom emoji shown before the text (Bot API 9.5+, ignored on older clients)
	iconCustomEmojiId?: string;
}
// Renders the MainButton component in a React application
const WebAppMainButton = (props: MainButtonProps) => {

	const { registerMainButton, updateMainButton, unregisterMainButton } = useContext(TelegramWebAppContext);

	const onClickRef = useRef(props.onClick);
	onClickRef.current = props.onClick;

	const buttonProps = useMemo<MainButtonProps>(() => ({
		...props,
		onClick: () => onClickRef.current && onClickRef.current(),
	}), [props.text, props.progress, props.disable, props.color, props.textColor, props.hasShineEffect, props.iconCustomEmojiId]);

	const idRef = useRef<number | null>(null);

	// Register once: props changes update the button in place instead of moving it to the top
	useEffect(() => {
		const id = registerMainButton(buttonProps);
		idRef.current = id;

		return () => {
			idRef.current = null;
			unregisterMainButton(id);
		};
	}, []);

	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		if (idRef.current !== null) {
			updateMainButton(idRef.current, buttonProps);
		}
	}, [buttonProps]);

	return null;
};


export default WebAppMainButton;
