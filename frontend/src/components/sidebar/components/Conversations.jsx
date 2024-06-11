import { useEffect, useRef } from "react";
import useGetConversation from "../../../hooks/useGetConversation";
import useConversation from "../../../store/useConversation";
import { getRandomEmoji } from "../../../utils/emoji";
import Spinner from "../../spinner/Spinner";
import Conversation from "./Conversation";

const Conversations = () => {
  const { isLoading, conversations } = useGetConversation();
  const conversationRefs = useRef([]);
  const { selectedConversation } = useConversation();

  useEffect(() => {
    if (selectedConversation) {
      const selectedConversationIndex = conversations.findIndex(
        (conv) => conv._id === selectedConversation?._id
      );
      if (selectedConversationIndex !== -1) {
        conversationRefs.current[selectedConversationIndex]?.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [selectedConversation, conversations]);

  return (
    <div className="flex flex-col overflow-auto">
      {isLoading ? <Spinner /> : null}
      {conversations?.map((conversation, index) => (
        <div
          key={conversation?._id}
          ref={(el) => (conversationRefs.current[index] = el)}
        >
          <Conversation
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={index === conversations.length - 1}
          />
        </div>
      ))}
    </div>
  );
};

export default Conversations;
