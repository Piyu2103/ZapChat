import useConversation from "../../../hooks/useGetConversation";
import { getRandomEmoji } from "../../../utils/emoji";
import Spinner from "../../spinner/Spinner";
import Conversation from "./Conversation";

const Conversations = () => {
  const { isLoading, conversations } = useConversation();
  return (
    <div className="flex flex-col overflow-auto">
      {isLoading ? <Spinner /> : null}
      {conversations?.map((conversation, index) => (
        <Conversation
          key={conversation?._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={index === conversations.length - 1}
        />
      ))}
    </div>
  );
};

export default Conversations;
