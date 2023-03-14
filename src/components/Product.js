import styles from "./Product.module.scss";
import React from "react";

const Product = ({ onRemove, id, img, name, price }) => {
  const remove = () => {
    onRemove(id);
  };

  return (
    <div className={styles.product}>
      <div className={styles.img}>
        <img src={img} />
      </div>

      <div className={styles.body}>
        <h1 className={styles.title}>{name}</h1>
        <div className={styles.price}>{price}</div>
      </div>
      <button onClick={remove} type="button">
        Remove
      </button>
    </div>
  );
};

export default Product;
