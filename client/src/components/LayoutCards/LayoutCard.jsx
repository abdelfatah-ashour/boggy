import React from "react";
import { Card } from "../Card/Card";
import Style from "./layoutCard.module.css";

export const LayoutCard = ({ products }) => {
  return (
    <>
      <div className={Style.containerLayout + " container"}>
        {products.map((product, index) => {
          return <Card product={product} key={index} />;
        })}
      </div>
    </>
  );
};
