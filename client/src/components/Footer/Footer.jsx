import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../../Context_API/AuthUser";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGooglePlusG,
} from "react-icons/fa";

import Style from "../../../public/assets/css/footer.module.css";

function Footer() {
  const { AuthUser } = useContext(AuthContext);
  return (
    <footer className={Style.footer}>
      <div className={Style.containerOfFooter}>
        <div className="row justify-content-center align-items-center py-4">
          <div className={Style.menu + " col-md-6 col-xs-12"}>
            <ul>
              <label> CLOTHES </label>
              <li>
                <Link href="/clothes/women">women's</Link>
              </li>
              <li>
                <Link href="/clothes/men">men's</Link>
              </li>
              <li>
                <Link href="/clothes/girls">girl's</Link>
              </li>
              <li>
                <Link href="/clothes/boys">boy's</Link>
              </li>
            </ul>
            <ul>
              <label> LAPTOP </label>
              <li>
                <Link href="/laptops-and-mobiles/laptops/dell">dell</Link>
              </li>
              <li>
                <Link href="/laptops-and-mobiles/laptops/hp">hp</Link>
              </li>
              <li>
                <Link href="/laptops-and-mobiles/laptops/apple">apple</Link>
              </li>
              <li>
                <Link href="/laptops-and-mobiles/laptops/lenovo">lenovo</Link>
              </li>
            </ul>
            <ul>
              <label> MOBILE PHONE </label>
              <li>
                <Link href="/laptops-and-mobiles/mobiles/apple">apple</Link>
              </li>
              <li>
                <Link href="/laptops-and-mobiles/mobiles/samsung">samsung</Link>
              </li>
              <li>
                <Link href="/laptops-and-mobiles/mobiles/huawei">huawei</Link>
              </li>
              <li>
                <Link href="/laptops-and-mobiles/mobiles/lg">lg</Link>
              </li>
              <li>
                <Link href="/laptops-and-mobiles/mobiles/oppo">oppo</Link>
              </li>
            </ul>
            {!AuthUser.isAdmin ? (
              <ul>
                <label> OTHER </label>
                <li>
                  <Link href="/cart">My Cart</Link>
                </li>
                <li>
                  <Link href="/order">My Order</Link>
                </li>
              </ul>
            ) : null}
          </div>
          <div className={Style.socialMedia + " col-md-6 col-xs-12"}>
            <ul>
              <li>
                <a href="https://www.facebook.com">
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com">
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a href="https://mail.google.com">
                  <FaGooglePlusG />
                </a>
              </li>
            </ul>
            <small className="text-center">thank you Bruno :)</small>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
