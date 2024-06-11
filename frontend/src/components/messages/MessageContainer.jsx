import Header from "./components/Header";
import MessageInput from "./components/MessageInput";
import Messages from "./components/Messages";
import NoChatSelected from "./components/NoChatSelected";
import useConversation from "../../store/useConversation";
import { useEffect } from "react";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <Header />
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
