import { StarIcon } from "@heroicons/react/solid";
import React from "react";
import { ToastContainer } from "react-toastify";
import { UseFetching } from "../context/ProductsFetching";

function CheckoutProduct({
  id,
  title,
  price,
  image,
  description,
  category,
  rating,
  hasPrime,
  addmore,
  removeitem,
}) {
  const currencyFormat = (num) => {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  const { items } = UseFetching();
  //   const item = {
  //     id,
  //     title,
  //     price,
  //     image,
  //     description,
  //     category,
  //     rating,
  //     hasPrime,
  //   };
  //   const addmore = () => {
  //     items.push(item);
  //     console.log(items);
  //   };

  return (
    <div
      className="grid grid-cols-5 
  "
    >
      <img src={image} alt="" height={200} width={200} objectFit="contain" />
      <div className="col-span-3 mx-5 ">
        <p>{title}</p>
        <div className="flex ">
          {Array(rating)
            ?.fill()
            ?.map((_, i) => (
              <StarIcon className="text-yellow-500 w-5" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3 ">{description}</p>

        {items && currencyFormat(price)}
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt=""
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery </p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-end ">
        <button
          className="button"
          onClick={() =>
            addmore({
              id,
              title,
              price,
              image,
              description,
              category,
              rating,
              hasPrime,
            })
          }
        >
          Add To Cart
        </button>
        <button
          onClick={() => {
            removeitem(id);
          }}
          className="button"
        >
          Remove From Cart
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
    </div>
  );
}

export default CheckoutProduct;
