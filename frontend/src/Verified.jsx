import { CheckCircleIcon } from "@heroicons/react/solid";
import React from "react";
import { useHistory } from "react-router-dom";
import Header from "./components/Header";
import { UseFetching } from "./context/ProductsFetching";

function Verify() {
  const history = useHistory();
  const { Verify, setVerify } = UseFetching();
  return (
    <div className="bg-gray-100 h-screen">
      <Header />

      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10 " />
            <h1 className="text-3xl">
              Thank you, your account has been verified
            </h1>
          </div>

          <button
            onClick={() => {
              setVerify(true);
              history.push("/");
            }}
            className="button mt-8"
          >
            Go to Home
          </button>
        </div>
      </main>
    </div>
  );
}

export default Verify;
