import { useContext, useEffect, useRef } from 'react';
import { TelegramWebAppContext } from '../context/TelegramWebAppContext';

interface BackButtonProps {
  onClick: () => void;
}

const WebAppBackButton = ({ onClick }: BackButtonProps) => {

	const { addBackButtonListener, removeBackButtonListener } = useContext(TelegramWebAppContext);

	// Always call the latest onClick, not the one from the first render
	const onClickRef = useRef(onClick);
	onClickRef.current = onClick;

	useEffect(() => {

		const listener = () => onClickRef.current();

		addBackButtonListener(listener);

		return () => {
			removeBackButtonListener(listener);
		}

	}, []);

	return null;
};

export default WebAppBackButton;
