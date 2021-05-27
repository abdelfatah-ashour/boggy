import React, { useContext } from "react";
import Link from "next/link";
import { DropDownList } from "../../utils/SubMenuNavbar";
import { LIST_OF_CLOTHES, LAPTOP_AND_MOBILES } from "../../utils/paths";
import { RiMenu5Line } from "react-icons/ri";
import { AuthContext } from "../../Context_API/AuthUser";

export const Navbar = ({ style }) => {
  const { AuthUser } = useContext(AuthContext);
  const { isUser, isAdmin } = AuthUser;
  return (
    <nav className="navbar navbar-expand-lg" id="nav" style={style}>
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">BOGGY</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <RiMenu5Line />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link active" aria-current="page">
                  Home
                </a>
              </Link>
            </li>
            <DropDownList
              title="category"
              list={LIST_OF_CLOTHES}
              category="Clothes"
            />
            <DropDownList
              title="laptops & mobiles"
              list={LAPTOP_AND_MOBILES}
              category="laptops-and-mobiles"
            />
            {isUser ? (
              <li className="nav-item">
                <Link href="/order">
                  <a className="nav-link" aria-current="page">
                    my order
                  </a>
                </Link>
              </li>
            ) : null}

            {isAdmin ? (
              <li className="nav-item">
                <Link href="/control-panel">
                  <a className="nav-link" aria-current="page">
                    control panel
                  </a>
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
};
