import { useEffect, useRef } from "react";
import useGetMessages from "../../../hooks/useGetMessages";
import MessageSkeleton from "../../skeletons/MessageSkeleton";
import Message from "./Message";
import useConversation from "../../../store/useConversation";

const Messages = () => {
  const { messages, isLoading } = useGetMessages();
  const { selectedConversation } = useConversation();
  const lastMessageRef = useRef(null);
  useEffect(()=>{
    setTimeout(() => {
      lastMessageRef?.current?.scrollIntoView({behavior:"smooth"})
    }, 100);
  },[lastMessageRef,selectedConversation,messages])
  return (
    <div className="px-4 flex-1 overflow-auto">
      {isLoading &&
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!isLoading && messages?.length === 0 ? (
        <p className="text-center text-gray-400">
          Send a message to start the conversation
        </p>
      ) : (
        messages?.map((message) => (
          <div key={message?._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;
