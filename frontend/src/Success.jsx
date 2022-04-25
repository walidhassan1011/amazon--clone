import { CheckCircleIcon } from "@heroicons/react/solid";
import React from "react";
import { useHistory } from "react-router-dom";
import Header from "./components/Header";

function Success() {
  const history = useHistory();
  return (
    <div className="bg-gray-100 h-screen">
      <Header />

      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10 " />
            <h1 className="text-3xl">
              Thank you, your order has been confirmed
            </h1>
          </div>
          <p>
            thank you for shopping with us.we will send a confirmation once your
            order has been shipped.if you like to check your order status,please
            press the button below.
          </p>
          <button
            onClick={() => {
              history.push("/orders");
            }}
            className="button mt-8"
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
}

export default Success;
