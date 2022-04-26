import React from "react";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { UseFetching } from "../context/ProductsFetching";
import { useHistory } from "react-router-dom";
import { auth } from "../Firebase";
import { sendEmailVerification } from "firebase/auth";
function Header() {
  const {
    adding,
    email,
    user,
    searchTerm,
    setSearchTerm,
    logOut,
    verify,
    setVerify,
  } = UseFetching();
  const verfymail = () => {
    sendEmailVerification(auth.currentUser)
      .then((res) => {
       
        

        history.push("/verify");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const history = useHistory();
  return (
    <header>
      {/* top */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2 ">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0 ">
          <img
            src="https://jitsvinger.co.za/wp-content/uploads/2018/04/Amazon-Logo-1024x373.png"
            alt="amazon
          logo"
            onClick={() => {
              history.push("/");
            }}
            width={120}
            height={20}
            objectfit="contain"
            className="cursor-pointer m-2 sm:hidden md:inline"
          />
        </div>
        {/* search */}
        <div className="bg-yellow-400 hover:bg-yellow-500 md:flex sm:hidden items-center h-10 rounded-md flex-grow cursor-pointer ">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4 "
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
          />
          <SearchIcon className="p-4 h-12" />
        </div>
        {/* right */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap sm:space-x-10  truncate mt-2">
          <div className="cursor-pointer hover:underline ">
            {user ? (
              <p className="sm:text-xs truncate ">{user?.email}</p>
            ) : (
              <p
                className="sm:text-xs"
                onClick={() => {
                  history.push("/login");
                }}
              >
                Singin
              </p>
            )}

            <p className=" font-extrabold sm:text-xs">account & lists</p>
            {user && (
              <p
                className="cursor-pointer hover:underline "
                onClick={() => {
                  logOut();
                }}
              >
                Sigin Out
              </p>
            )}
            {verify ? (
              <p className="inline">(Verified)</p>
            ) : (
              <p onClick={verfymail} className="inline">
                (verify)
              </p>
            )}
          </div>
          <div
            onClick={() => {
              history.push("/orders");
            }}
            className="cursor-pointer hover:underline"
          >
            <p>Returns</p>
            <p className=" font-extrabold ">&orders</p>
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
