import React from "react";
import Link from "next/link";

export const DropDownList = ({ list, title, category }) => {
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        id={title}
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        {category}
      </a>

      <ul className="dropdown-menu" aria-labelledby={title}>
        {list.map((item, index) => {
          return (
            <li key={index}>
              <Link href={`${item.path}`}>
                <a className="dropdown-item">{item.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
};
