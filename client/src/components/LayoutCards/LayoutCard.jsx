import React from "react";
import { Card } from "../Card/Card";
import Style from "./layoutCard.module.css";

export const LayoutCard = ({ products }) => {
  return (
    <>
      <div className={Style.containerLayout + " container"}>
        <div className="row d-flex justify-content-center w-100">
          {products.map((product, index) => {
            return <Card product={product} key={index} />;
          })}
        </div>
      </div>
    </>
  );
};
