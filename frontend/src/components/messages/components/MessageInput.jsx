import { BsSend } from "react-icons/bs";
import useSendMessage from "../../../hooks/useSendMessage";
import { useState } from "react";
const MessageInput = () => {
  const {isLoading,sendMessage}=useSendMessage();
  const [message,setMessage]=useState("")

  async function handleSubmit(e){
    e.preventDefault();
    await sendMessage(message);
    setMessage("");
  }

  return (
    <form className="px-4 py-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
         {isLoading?null:<BsSend />} 
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
