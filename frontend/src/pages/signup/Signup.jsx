import { Link } from "react-router-dom";
import GenderCheckbox from "./components/GenderCheckbox";
import { useState } from "react";
import useSignup from "../../../hooks/useSignup";
import { Toaster } from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { fullName, userName, password, confirmPassword, gender } = formData;
  const { isLoading, signup } = useSignup();
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    await signup(formData);
  }
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-opacity-0 bg-clip-padding backdrop-filter backdrop-blur-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-400">
            SignUp <span className="text-gray-900">ZapChat</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-gray-300">
                  FullName
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter FullName"
                className="w-full input input-bordered h-10"
                value={fullName}
                onChange={onChange}
                id="fullName"
              />
            </div>
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
                onChange={onChange}
                id="userName"
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
                onChange={onChange}
                id="password"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text text-gray-300">
                  Confirm Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Enter Confirm Password"
                className="w-full input input-bordered h-10"
                value={confirmPassword}
                onChange={onChange}
                id="confirmPassword"
              />
            </div>
            <GenderCheckbox onChange={onChange} gender={gender} />
            <Link
              to="/login"
              className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block text-gray-300"
            >
              Already have an account?
            </Link>
            <div>
              <button className="btn btn-block btn-sm mt-2 border border-slate-700 text-gray-300">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
