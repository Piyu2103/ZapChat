import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../../src/context/AuthContext.jsx";

const useLogout = () => {
  const [isLoading,setIsLoading]=useState(false);
  const {setAuthUser}=useAuthContext()

  const logout=async()=>{
    setIsLoading(true);
    try {
        const res=await fetch("/api/auth/logout",{
            method:"POST",
            headers:{"Content-Type":"application/json"}
        });
        const data=await res.json();
        if(data.error){
          throw new Error(data.message);
        }
        localStorage.removeItem("chat-user")
        setAuthUser(null)
        setIsLoading(false) 
    } catch (error) {
        setIsLoading(false);
        setTimeout(() => {
          toast.error(error.message)
        }, 200);
        return;
    }
  }
  return {isLoading,logout}
}

export default useLogout