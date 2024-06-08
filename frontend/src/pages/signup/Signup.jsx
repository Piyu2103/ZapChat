import GenderCheckbox from "./components/GenderCheckbox";

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          SignUp <span className="text-gray-900">ZapChat</span>
        </h1>
        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">
                FullName
                <input
                  type="text"
                  placeholder="Enter FullName"
                  className="w-full input input-bordered h-10 mt-1"
                />
              </span>
            </label>
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">
                UserName
                <input
                  type="text"
                  placeholder="Enter UserName"
                  className="w-full input input-bordered h-10 mt-1"
                />
              </span>
            </label>
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">
                Password
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full input input-bordered h-10 mt-1"
                />
              </span>
            </label>
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">
                Confirm Password
                <input
                  type="password"
                  placeholder="Enter Confirm Password"
                  className="w-full input input-bordered h-10 mt-1"
                />
              </span>
            </label>
          </div>
          <GenderCheckbox />
        </form>
      </div>
    </div>
  );
};

export default Signup;
