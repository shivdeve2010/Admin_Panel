import React, { useState } from "react";

import ProductsList from "./ProductsList";
import styles from "./Products.module.css";

const Products = () => {
  const [stopCategory, setStopCategory] = useState(true);
  return (
    <div className={styles.container}>
      <ProductsList hideCategory={setStopCategory} />
      
    </div>
  );
};

export default Products;
