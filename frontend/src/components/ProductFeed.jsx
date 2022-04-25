import React from "react";
import Product from "./Product";

import { UseFetching } from "../context/ProductsFetching";

function ProductFeed() {
  const { productslist, loading, searchTerm, setSearchTerm } = UseFetching();
  console.log(searchTerm);
  return (
    <div className="grid sm:grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {productslist
        ?.filter((val) => {
          if (searchTerm === "") {
            return val;
          } else if (
            val.title.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return val;
          }
        })
        ?.slice(0, 3)
        .map(({ id, title, category, image, price, description }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}
      <img
        className="md:col-span-full"
        src="https://links.papareact.com/dyz"
        alt=""
        srcset=""
      />

      {productslist
        ?.filter((val) => {
          if (searchTerm === "") {
            return val;
          } else if (
            val.title.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return val;
          }
        })
        ?.slice(3, 6)
        .map(({ id, title, category, image, price, description }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}

      {productslist
        ?.filter((val) => {
          if (searchTerm === "") {
            return val;
          } else if (
            val.title.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return val;
          }
        })
        ?.slice(6, productslist.length)
        .map(({ id, title, category, image, price, description }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}
    </div>
  );
}

export default ProductFeed;
