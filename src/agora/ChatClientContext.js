import { createContext, useContext, useEffect, useRef } from "react";
import AgoraChat from "agora-chat/Agora-chat";

const ChatClientContext = createContext(null);

export const ChatClientProvider = ({ children }) => {
    const chatClient = useRef(null);
    const appKey = "411341302#1546139"

    useEffect(() => {
        chatClient.current = new AgoraChat.connection({
            appKey: appKey
        });
        console.log("set current client")
        return () => {
            if (chatClient.current) {
                chatClient.current.close()
            }
        }
    }, [])

    return (
        <ChatClientContext.Provider value={chatClient}>
          {children}
        </ChatClientContext.Provider>
      );
};

export const useChatClient = () => useContext(ChatClientContext);