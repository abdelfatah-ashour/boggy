import React, { useEffect } from "react";
import { FiLogIn } from "react-icons/fi";
import { GrLogout } from "react-icons/gr";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGooglePlusG,
  FaOpencart,
} from "react-icons/fa";

import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import Style from "./Bar.module.css";
import Cookie from "js-cookie";
import Axios from "../../utilities/Axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { allInCart } from "../../redux/slices/Cart";
import { LOGOUT } from "../../redux/slices/auth";

export function Bar() {
  const dispatch = useDispatch();
  const { cart, auth } = useSelector((state) => state);

  const Router = useRouter();

  const handleLogout = async () => {
    await Axios.get(`/auth/logout`)
      .then(() => {
        Cookie.remove("c_user");
        Cookie.remove("userInfo");
        Cookie.remove("c_admin");
        Cookie.remove("adminInfo");
        toast.success("😊 See You Later");

        dispatch(
          LOGOUT({
            isLogin: false,
            role: false,
            userId: false,
            isUser: false,
            isAdmin: false,
            email: false,
            displayName: false,
          })
        );

        dispatch(allInCart([]));

        setTimeout(() => {
          Router.push("/");
        }, 1500);
      })
      .catch((error) => {
        if (!error.response) {
          toast.success(error.message);
        } else {
          toast.warn(error.response.data.message);
        }
      });
  };

  useEffect(() => {
    const fetchAllInCardLength = async () => {
      if (auth.isUser) {
        await Axios.get(`/cart/getAllInCart`)
          .then(({ data }) => {
            if (data.message[0]) {
              dispatch(allInCart(data.message[0].itemsId));
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    };
    fetchAllInCardLength();
    return () => {
      return;
    };
  }, [auth.isLogin]);

  return (
    <div className={`${Style.Bar}`}>
      <div className={`${Style.subBar}`}>
        <ToastContainer />
        <ul className={`${Style.socialMedia}`}>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: "##0066FF" }}>
            <FaFacebookF />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#20a4f3" }}>
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#DD387A" }}>
            <FaInstagram />
          </a>
          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#941c2f" }}>
            <FaGooglePlusG />
          </a>
        </ul>
        <ul className={`${Style.listBar}`}>
          Hi, <span>{auth.isLogin ? <b>{auth.displayName}</b> : null}</span>
          {auth.isLogin ? (
            <>
              {auth.isLogin ? (
                <li className={`${Style.cartIcon}`}>
                  <Link href="/upload-product">
                    <a>
                      <AiOutlineCloudUpload />
                    </a>
                  </Link>
                </li>
              ) : null}
              {auth.isLogin ? (
                <li className={`${Style.cartIcon}`}>
                  <Link href="/cart">
                    <a>
                      <FaOpencart />{" "}
                      <span>{cart.length > 0 ? cart.length : 0}</span>
                    </a>
                  </Link>
                </li>
              ) : null}
              <li onClick={handleLogout} className={Style.logout}>
                <GrLogout />
              </li>
            </>
          ) : null}
          {!auth.isLogin ? (
            <li>
              <Link href="/login">
                <a>
                  <FiLogIn />
                </a>
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
