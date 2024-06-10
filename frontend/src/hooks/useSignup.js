import { useState } from "react"
import handleInputErrors from "./handleInputErrors.js"
import toast from "react-hot-toast";
import { useAuthContext } from "../../src/context/AuthContext.jsx";

const useSignup=()=>{
    const [isLoading,setIsLoading]=useState(false);
    const {setAuthUser}=useAuthContext()

    const signup=async({fullName,userName,password,confirmPassword,gender})=>{
        const bool=handleInputErrors(fullName,userName,password,confirmPassword,gender);
        if(bool){
            return ;
        }
        setIsLoading(true);
        try {
            const res= await fetch("/api/auth/signup",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({fullName,userName,password,confirmPassword,gender})
            })
            const data=await res.json();
            setIsLoading(false);
            if(data.error){
                throw new Error(data.message);
            }
            localStorage.setItem("chat-user",JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            setIsLoading(false)
            setTimeout(() => {
                toast.error(error.message)
            }, 200);
            return;
        }
    }
    return {isLoading,signup}

}

export default useSignup