import { useEffect, useState } from "react";
import { useWebAppInitDataUnsafe } from "./useWebAppInitDataUnsafe";

export const useWebAppChat = () => {

    const initData = useWebAppInitDataUnsafe();
    const [chat, setChat] = useState(initData?.chat)

    useEffect(() => {
        
        setChat(initData?.chat);

    }, [initData]);

    return chat;
    
};
