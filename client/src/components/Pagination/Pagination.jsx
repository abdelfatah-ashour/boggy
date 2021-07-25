import React from "react";
import Link from "next/link";
import Style from "./Pagination.module.css";

export function PaginationComponent({ total, path }) {
  // get total of all products
  const TotalOfPages = Math.ceil(total / 16);

  // create array to mapping new array of pagination btn
  let PaginationList = [];

  // looping to create list of pagination btn
  for (let i = 1; i <= TotalOfPages; i++) {
    PaginationList.push(i);
  }

  return (
    <div className={Style.pagination}>
      <ul>
        {PaginationList.map((item, i) => {
          return (
            <li key={i}>
              <Link href={`${path}?page=${item}`}>{`${item}`}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
