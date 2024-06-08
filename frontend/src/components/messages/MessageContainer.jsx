import Header from "./components/Header";
import MessageInput from "./components/MessageInput";
import Messages from "./components/Messages";
import NoChatSelected from "./components/NoChatSelected";

const MessageContainer = () => {
  const noChatSelected = true;
  return (
    <div className="md:min-w-[450px] flex flex-col">
        {noChatSelected ? (
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
