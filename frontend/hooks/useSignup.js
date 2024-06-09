import { useState } from "react"
import handleInputErrors from "./handleInputErrors.js"
import toast from "react-hot-toast";

const useSignup=()=>{
    const [isLoading,setIsLoading]=useState(false);

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
            if(data.error){
                throw new Error(data.error);
            }
        } catch (error) {
            setIsLoading(false)
            toast.error(error.message)
            return;
        }
    }
    return {isLoading,signup}

}

export default useSignup