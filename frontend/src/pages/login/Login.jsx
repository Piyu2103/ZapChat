import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { useState } from "react";
import Spinner from "../../components/spinner/Spinner";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, login } = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();
    await login(userName, password);
  }
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-opacity-0 bg-clip-padding backdrop-filter backdrop-blur-lg">
          {isLoading ? (
            <Spinner />
          ) : null}
            <>
              {" "}
              <h1 className="text-3xl font-semibold text-center text-gray-400">
                Login <span className="text-gray-900">ZapChat</span>
              </h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="label p-2">
                    <span className="text-base label-text text-gray-300">
                      UserName
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter UserName"
                    className="w-full input input-bordered h-10"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text text-gray-300">
                      Password
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="w-full input input-bordered h-10"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <Link
                  to="/signup"
                  className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block text-gray-300 "
                >
                  {"Don't"} have an account?
                </Link>
                <div>
                  <button className="btn btn-block btn-sm mt-2 border border-slate-700 text-gray-300">
                    Login
                  </button>
                </div>
              </form>
            </>
          
        </div>
      </div>
    </>
  );
};

export default Login;
