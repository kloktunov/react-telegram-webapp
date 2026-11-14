import { useContext, useEffect, useRef } from 'react';
import { TelegramWebAppContext } from '../context/TelegramWebAppContext';

interface SettingsButtonProps {
  onClick: () => void;
}

// Shows the «Settings» item in the Mini App menu while mounted (Bot API 7.0+)
const WebAppSettingsButton = ({ onClick }: SettingsButtonProps) => {

	const { addSettingsButtonListener, removeSettingsButtonListener } = useContext(TelegramWebAppContext);

	const onClickRef = useRef(onClick);
	onClickRef.current = onClick;

	useEffect(() => {

		const listener = () => onClickRef.current();

		addSettingsButtonListener(listener);

		return () => {
			removeSettingsButtonListener(listener);
		}

	}, []);

	return null;
};

export default WebAppSettingsButton;
