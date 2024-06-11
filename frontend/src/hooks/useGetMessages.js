import { useEffect, useState } from "react";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { selectedConversation, setMessages, messages } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/messages/${selectedConversation?._id}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.message);
        }
        setMessages(data);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  return { isLoading, messages };
};

export default useGetMessages;
