import React from "react";
import { useHistory } from "react-router-dom";
import { UseFetching } from "./context/ProductsFetching";
import Error from "../src/components/Error";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  let history = useHistory();
  const { setEmail, setPassword, error, setError, logIn, email, password } =
    UseFetching();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);

      toast.success("Logged in successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      history.push("/");
    } catch {
      toast.error("something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  function handleClick() {
    history.push("/signup");
  }

  return (
    <div className="h-screen flex-col items-center justify-center bg-white ">
      <div className="flex items-center  justify-center  ">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="amazon logo"
          className="h-10  m-4"
        />
      </div>

      <div className="outline outline-1 outline-gray-200 mt-5  md:h-96 mx-auto md:w-96 bg-white rounded-sm flex-col items-center justify-center sm:w-80  sm:h-96 shadow-md">
        <div className=" h-auto p-2 ">
          <h1 className="font-bold text-3xl ml-2   ">Sign in</h1>
        </div>
        <div className="flex-col  p-4 items-center justify-center  ">
          <div
            className="
            flex-col items-center justify-center
            
            "
          >
            <p className="mb-2">E-mail</p>
            <input
              type="text"
              className="w-full p-1 outline-gray-400 outline-2  outline "
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-3 flex-col items-center justify-center  ">
            <p className="mb-2">Password</p>
            <input
              type="password"
              className="w-full p-1 outline-gray-400 outline-2  outline "
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-center  p-4   ">
          <button
            className=" bg-yellow-400 p-1
          w-full outline outline-2 outline-gray-400 text-lg  hover:bg-yellow-500"
            onClick={handleSubmit}
          >
            Sign in
          </button>
        </div>
        <p className="ml-3 md:text-sm sm:text-xs">
          By signing in, you agree to Amazon's Conditions of Use and Privacy
          Notice.
        </p>
      </div>
      <div className="mt-5 tracking-wider text-slate-400  text-center">
        <p>New to Amazon?</p>
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handleClick}
          className=" md:w-1/4 p-1 outline outline-2 outline-gray-300 bg-slate-200 hover:bg-slate-300 sm:w-5/6"
        >
          Create Your Amazon Account
        </button>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
