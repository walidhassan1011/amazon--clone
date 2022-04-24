import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Error from "./components/Error";

import { UseFetching } from "./context/ProductsFetching";
function Register() {
  const { setEmail, setPassword, handelRequest, error, setError } =
    UseFetching();

  return (
    <div className="h-screen flex-col items-center justify-center bg-white">
      <div className="flex items-center  justify-center  ">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="amazon logo"
          className="h-10  m-4"
        />
      </div>
      <div className="flex items-center justify-center w-auto ">
        {error && <Error>Something Happened in register</Error>}
      </div>
      <div
        className="outline outline-2 outline-gray-200 mt-5
      shadow-md  md:h-96 mx-auto md:w-96 sm:w-80 sm:h-96 bg-white rounded-sm flex-col items-center justify-center"
      >
        <div className=" h-auto p-2 ">
          <h1 className="font-bold text-3xl ml-2   ">Create An account</h1>
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
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-3 flex-col items-center justify-center  ">
            <p className="mb-2">Password</p>
            <input
              type="password"
              className="w-full p-1 outline-gray-400 outline-2  outline "
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-center  p-4     ">
          <button
            className=" bg-yellow-400 p-1
      w-full outline outline-2 outline-gray-400 text-lg  hover:bg-yellow-500"
            onClick={handelRequest}
          >
            Continue
          </button>
        </div>
        <div class="grid grid-cols-1 divide-y-2 p-4 ">
          <div></div>
          <div></div>
        </div>
        <p className="ml-4 inline sm:text-sm">You already have an Account?</p>
        <Link
          to={"/login"}
          className="ml-1 hover:underline hover:text-blue-800 sm:text-sm"
        >
          sign in
        </Link>
      </div>
    </div>
  );
}

export default Register;
