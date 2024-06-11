import { useState } from "react"
import toast from "react-hot-toast";
import useConversation from "../store/useConversation";

const useSendMessage =() => {
  const [isLoading,setIsLoading]=useState(false);
  const {selectedConversation,setMessages,messages} = useConversation();

  const sendMessage=async(message)=>{
    try {
        if(message===""){
            toast.error("Please enter the message!")
            return;
        }
        setIsLoading(true);
        const res=await fetch(`/api/messages/send/${selectedConversation?._id}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({message})
        })
        const data=await res.json();
        if(data.error){
            throw new Error(data.message)
        }
        setMessages([...messages,data])
        setIsLoading(false)
    } catch (error) {
        toast.error(error.message);
    }
  }
  return {isLoading,sendMessage}
}

export default useSendMessage