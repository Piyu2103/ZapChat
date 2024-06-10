import { BiLogOut } from "react-icons/bi";
import useLogout from "../../../hooks/useLogout";
import Spinner from "../../spinner/Spinner";
const LogoutButton = () => {
  const { isLoading, logout } = useLogout();
  return (
    <>
      {isLoading ? <Spinner /> : null}
      <div className="mt-auto">
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer mt-1"
          onClick={() => logout()}
        />
      </div>
    </>
  );
};

export default LogoutButton;
