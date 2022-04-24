import React from "react";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { UseFetching } from "../context/ProductsFetching";
import { useHistory } from "react-router-dom";
function Header() {
  const { adding, email, user } = UseFetching();

  const history = useHistory();
  return (
    <header>
      {/* top */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <img
            src="https://links.papareact.com/f90"
            alt="amazon
          logo"
            onClick={() => {
              history.push("/");
            }}
            width={120}
            height={20}
            objectfit="contain"
            className="cursor-pointer m-2"
          />
        </div>
        {/* search */}
        <div className="bg-yellow-400 hover:bg-yellow-500 md:flex sm:hidden items-center h-10 rounded-md flex-grow cursor-pointer ">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4 "
            type="text"
          />
          <SearchIcon className="p-4 h-12" />
        </div>
        {/* right */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div className="cursor-pointer hover:underline">
            {user ? (
              <p className="line-clamp-3">{user?.email}</p>
            ) : (
              <p
                className="line-clamp-2"
                onClick={() => {
                  history.push("/login");
                }}
              >
                Singin
              </p>
            )}

            <p className=" font-extrabold sm:text-sm">account & lists</p>
          </div>
          <div className="cursor-pointer hover:underline">
            <p>Returns</p>
            <p className=" font-extrabold sm:text-sm">&orders</p>
          </div>
          <div
            className="cursor-pointer hover:underline relative flex items-center "
            onClick={() => {
              history.push("/checkout");
            }}
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold ">
              {adding}
            </span>
            <ShoppingCartIcon className="h-8 " />
            <p className=" font-extrabold sm:text-sm sm:hidden md:inline mt-2 ">
              basket
            </p>
          </div>
        </div>
      </div>
      {/* buttom */}
      <div className="flex items-center bg-amazon_blue-light text-white text-sm space-x-3 p-2 pl-6">
        <p className="link flex items-center ">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link ">Prime Video</p>
        <p className="link ">Amazon business</p>
        <p className="link ">Today's Deals</p>
        <p className="link sm:hidden md:inline-flex">Electonics </p>
        <p className="link sm:hidden md:inline-flex">Food & Grocery </p>
        <p className="link sm:hidden md:inline-flex"> Prime </p>
        <p className="link sm:hidden md:inline-flex"> Buy Again </p>
        <p className="link sm:hidden md:inline-flex">Toys & Games </p>
        <p className="link sm:hidden md:inline-flex">Shopper Toolkit </p>
        <p className="link sm:hidden md:inline-flex">Health & Personal Care </p>
      </div>
    </header>
  );
}

export default Header;
