import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { UseFetching } from "../context/ProductsFetching";
import { toast, ToastContainer } from "react-toastify";

function Product({ id, title, category, image, price, description }) {
  const { setadding, adding, items } = UseFetching();
  const [rating] = useState(Math.floor(Math.random() * (5 - 1)) + 1);
  const [hasPrime] = useState(Math.random() < 0.5);
  const item = {
    id,
    title,
    category,
    image,
    price,
    description,
    hasPrime,
    rating,
  };

  const addtocart = () => {
    setadding(adding + 1);
    items.push(item);
    toast.success("Added to cart", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const currencyFormat = (num) => {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10  ">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <div className="md:h-1/2  flex items-center justify-center md:mb-4">
        <img src={image} alt="image" height={200} width={200} />
      </div>
      <h4 className="my-3">{title}</h4>
      <div className="flex ">
        {Array(rating)
          ?.fill()
          ?.map((_, i) => (
            <StarIcon className="text-yellow-500 w-5" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2 ">{description}</p>
      <div className="mb-5">{currencyFormat(price)}</div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}
      <button className="mt-auto button" onClick={addtocart}>
        Add to Cart
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
    </div>
  );
}

export default Product;
