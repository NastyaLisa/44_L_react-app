import React, { useState } from "react";
import Add from "./components/Add";
import Product from "./components/Product";
import "./scss/style.scss";

const App = () => {
  const productsList = [
    {
      name: "Iphone",
      price: 800,
      id: 1,
      image: require("../src/assets/iphone.jpg").default,
    },
    {
      name: "Watch",
      price: 100,
      id: 2,
      image: require("../src/assets/watch.jpg").default,
    },
  ];

  const [products, setProducts] = useState(productsList);

  const addProducts = (
    setNewProducts,
    newProducts,
    isValidateName,
    isValidatePrice
  ) => {
    if (newProducts.name == "" || newProducts.price == "") {
      return;
    }
    if (isValidateName && isValidatePrice) {
      let key = Math.random();
      setNewProducts((prev) => ({ ...prev, id: key }));
      setProducts((prev) => [...prev, newProducts]);
      setNewProducts((prev) => ({
        ...prev,
        name: "",
        price: "",
        image: require("../src/assets/no-foto.jpg").default,
      }));
    }
  };

  const removeProduct = (id) => {
    const newList = products.filter((product) => product.id !== id);
    setProducts(newList);
  };

  return (
    <div className="wrapper">
      <Add onAddProduct={addProducts} />
      <div className="list">
        {products.map((product) => (
          <Product
            onRemove={removeProduct}
            key={product.id}
            id={product.id}
            name={product.name}
            price={`${product.price} $`}
            img={product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
