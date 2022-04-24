import React from "react";
import Product from "./Product";
import axios from "axios";
import { UseFetching } from "../context/ProductsFetching";

function ProductFeed() {
  const { productslist, loading } = UseFetching();

  return (
    <div className="grid sm:grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {productslist
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
