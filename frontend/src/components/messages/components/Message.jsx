/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import useConversation from "../../../store/useConversation";
// eslint-disable-next-line react/prop-types
const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const [classNameStyle, setClassNameStyle] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [bubbleColor, setBubbleColor] = useState("");
  const shakeClass=message.shouldShake?"shake":""
  function formatTimeToHoursAndMinutes(timestamp) {
    const date = new Date(timestamp);

    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const timeString = date.toLocaleTimeString("en-US", options);

    return timeString;
  }
  useEffect(() => {
    if (authUser?._id === message?.receiverId) {
      setClassNameStyle("chat-start");
      setProfilePicture(authUser?.profilePicture);
    } else if (authUser?._id === message?.senderId) {
      setClassNameStyle("chat-end");
      setProfilePicture(selectedConversation?.profilePicture);
      setBubbleColor("bg-blue-500");
    }
  }, [authUser, message, selectedConversation]);
  return (
    <>
      <div className={`chat ${classNameStyle}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={profilePicture}
            />
          </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleColor} ${shakeClass}`}>
          {message?.message}
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center mt-1">
          <time className="text-xs opacity-50 ml-1 text-gray-200 items-center">
            {formatTimeToHoursAndMinutes(message?.createdAt)}
          </time>
        </div>
      </div>
    </>
  );
};

export default Message;
