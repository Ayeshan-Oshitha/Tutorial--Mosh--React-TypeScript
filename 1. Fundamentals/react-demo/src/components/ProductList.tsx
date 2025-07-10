import React, { useEffect, useState } from "react";

const ProductList = ({ category }: { category: string }) => {
  useEffect(() => {
    console.log("Fetching Products", category);
  }, [category]);
  return <div>{category}</div>;
};

export default ProductList;
