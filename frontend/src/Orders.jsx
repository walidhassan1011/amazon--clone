import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Order from "./components/Order";
import { UseFetching } from "./context/ProductsFetching";

function Orders() {
  const { user } = UseFetching();

  const [ordersItems, setordersItems] = useState([]);
  const body = JSON.stringify({
    email: user?.email,
  });

  useEffect(() => {
    fetch("https://amazon--clonee.herokuapp.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setordersItems([...data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

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
