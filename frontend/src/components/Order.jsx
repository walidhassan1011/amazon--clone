import React from "react";
import moment from "moment";

function Order({ id, amount, amount_shipping, items, timestamp, images }) {
  const currencyFormat = (num) => {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  return (
    <div className="relative border rounded-md ">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div>
          <p className="font-bold text-xs">ORDER PLACED</p>

          <p>{moment.unix(timestamp._seconds).format("DD MM YYYY")}</p>
        </div>
        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            {currencyFormat(amount)} -Next Day Delivery {""}
            {currencyFormat(amount_shipping)}
          </p>
        </div>
        <p></p>
      </div>
    </div>
  );
}

export default Order;
