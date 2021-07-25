import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGooglePlusG,
} from "react-icons/fa";

import Style from "../../../public/assets/css/footer.module.css";
import { useSelector } from "react-redux";

function Footer() {
  const { auth } = useSelector((state) => state);
  return (
    <footer className={Style.footer}>
      <div className="container">
        <div className="row justify-content-center align-items-center py-4">
          <div className="col-md-9 col-12">
            <div className="row">
              <ul className={Style.listMenu + " col-lg-3 col-6"}>
                <label> CLOTHES </label>
                <li>
                  <Link href="/clothes/women">women&apos;s</Link>
                </li>
                <li>
                  <Link href="/clothes/men">men&apos;s</Link>
                </li>
                <li>
                  <Link href="/clothes/girls">girl&apos;s</Link>
                </li>
                <li>
                  <Link href="/clothes/boys">boy&apos;s</Link>
                </li>
              </ul>
              <ul className={Style.listMenu + " col-lg-3 col-6"}>
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
              <ul className={Style.listMenu + " col-lg-3 col-6"}>
                <label> MOBILE PHONE </label>
                <li>
                  <Link href="/laptops-and-mobiles/mobiles/apple">apple</Link>
                </li>
                <li>
                  <Link href="/laptops-and-mobiles/mobiles/samsung">
                    samsung
                  </Link>
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
              {!auth.isAdmin ? (
                <ul className={Style.listMenu + " col-lg-3 col-6"}>
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
          </div>
          <div className={Style.listSocialMedia + " col-md-3 col-12"}>
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
            <small className="text-center">
              thank you Bruno :) for Next.js Course on YouTube
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
