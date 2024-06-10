import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useGetConversation = () => {
    const [isLoading,setIsLoading]=useState(false);
    const [conversations,setConversations]=useState([]);

    useEffect(()=>{
        const getConversations=async()=>{
            setIsLoading(true);
            try {
                const res=await fetch("/api/users");
                const data=await res.json();
                console.log("data",data);
                if(data.error){
                    throw new Error(data.message)
                }
                setConversations(data);
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                setTimeout(() => {
                    toast.error(error.message);
                }, 200);
            }
        }
        getConversations();
    },[])

    return {isLoading,conversations};
}

export default useGetConversation