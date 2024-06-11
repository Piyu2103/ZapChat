import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../src/context/AuthContext.jsx";
const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login=async(userName,password)=>{
    if(userName===""||password===""){
        toast.error("Please enter in fields!")
        return;
    }
    if(password.length<6){
        toast.error("Password length should be greater than 6!")
        return;
    }
    setIsLoading(true)
    try {
        const res=await fetch("/api/auth/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({userName,password})
        })
        const data=await res.json();
        if(data.error){
            throw new Error(data.message)
        }
        localStorage.setItem("chat-user",JSON.stringify(data));
        setAuthUser(data);
        setIsLoading(false)
    } catch (error) {
        setIsLoading(false)
        setTimeout(() => {
            toast.error(error.message)
        }, 200);
        return;
    }
  }
  return {isLoading,login};
};

export default useLogin;
