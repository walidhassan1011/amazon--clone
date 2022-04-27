import React, { useState } from "react";

import CheckoutProduct from "./components/CheckoutProduct";
import Header from "./components/Header";
import { UseFetching } from "./context/ProductsFetching";
import { loadStripe } from "@stripe/stripe-js";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
const stripePromise = loadStripe(`${process.env.PUBLISH_KEY}`);
function Checkout() {
  const history = useHistory();
  const { items, setitems, setadding, adding, user, total } = UseFetching();
  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      items: items,
      email: user.email,
      total: sumTotal,
    });
    fetch("https://amazon---backend.herokuapp.com/payment", {
      method: "POST",
      headers,
      body,
    })
      .then((res) => {
        return res.json();
      })
      .then((session) => {
        window.location = session.url;
      })
      .then((result) => {
        if (result.error) {
          console.log(result.error.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const removeitem = (id) => {
    setadding(adding - 1);

    const index = items.findIndex((item) => item.id === id);

    const newbase = [...items];
    if (index >= 0) {
      newbase.splice(index, 1);
    }

    setitems(newbase);
    toast.success("Item removed from cart", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const addmore = ({
    id,
    title,
    price,
    image,
    description,
    category,
    rating,
    hasPrime,
  }) => {
    setitems([
      ...items,
      {
        id,
        title,
        price,
        image,
        description,
        category,
        rating,
        hasPrime,
      },
    ]);
    setadding(adding + 1);
  };
  const sumTotal = total();
  return (
    <div className="bg-slate-100 ">
      <Header />

      <main className="max-w-screen-lg  mx-auto ">
        {/* left */}
        <div className="flex-grow m-5 shadow-sm ">
          <img
            src="https://links.papareact.com/ikj"
            alt="ad"
            className="w-full h-auto"
            width={1020}
            height={250}
            objectfit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white ">
            <h1 className="text-3xl border-b pb-4 ">
              {items?.length === 0 ? "Your cart is empty" : "shooping items"}
            </h1>

            {items?.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                description={item.description}
                category={item.description}
                image={item.image}
                hasPrime={item.hasPrime}
                addmore={addmore}
                removeitem={removeitem}
              />
            ))}
          </div>
        </div>
        {/* rigth */}

        <div className="flex flex-col bg-white p-10 shadow-md   ">
          {items?.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items?.length} items):
                <span className="font-bold">{`$ ${sumTotal}`}</span>
              </h2>
              <button
                onClick={createCheckoutSession}
                role="link"
                disabled={!user}
                className={`button mt-2 ${
                  !user &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed button mt-2"
                }`}
              >
                {!user ? "sign in to checkout" : "Process to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
