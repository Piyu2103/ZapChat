import toast from "react-hot-toast"
function handleInputErrors(fullName,userName,password,confirmPassword,gender){
    if(fullName===""||userName===""||password===""||confirmPassword===""||gender===""){
        toast.error("Please fill in all fields!");
        return true;
    }
    if(password!==confirmPassword){
        toast.error("Password and Confirm Password should match!");
        return true;
    }
    if(password.length<6){
        toast.error("Password length should be greater than 6!");
        return true;
    }
    return false;
}

export default handleInputErrors