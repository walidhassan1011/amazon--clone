import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Order from "./components/Order";
import { UseFetching } from "./context/ProductsFetching";

function Orders() {
  const { user } = UseFetching();
  const [ordersItems, setordersItems] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8282/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setordersItems([...data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {user ? (
          <h2> {ordersItems?.length} order</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}

        <div className="mt-5 space-y-4">
          {ordersItems?.map(
            ({ id, amount, amount_shipping, items, timestamp, images }) => (
              <Order
                key={id}
                id={id}
                amount={amount}
                amount_shipping={amount_shipping}
                items={items}
                timestamp={timestamp}
                images={images}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default Orders;