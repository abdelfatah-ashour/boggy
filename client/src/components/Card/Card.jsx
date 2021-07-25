import React from "react";
import Link from "next/link";
import { FaCartPlus } from "react-icons/fa";
import Style from "./Card.module.css";
import { API } from "../../utilities/KEYS.json";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Axios from "../../utilities/Axios";
import { allInCart } from "../../redux/slices/Cart";

export const Card = ({ product }) => {
  const { Name, Price, ImageProduct, Section, Brand, _id, Category } = product;
  const dispatch = useDispatch();

  const handleAddToCart = async (id) => {
    // check if not use return to login page
    if (!Cookies.getJSON("userInfo")) {
      Router.push("/login");
    }

    await Axios.post(`/cart/addToCart`, {
      itemId: id,
      qty: 1,
    })
      .then(({ data }) => {
        toast.success(data.message);
      })
      .catch((error) => {
        toast.warning(error.message);
      });

    await Axios.get(`/cart/getAllInCart`)
      .then(({ data }) => {
        if (data.message[0]) {
          dispatch(allInCart(data.message[0].itemsId));
        }
      })
      .catch(() => {
        dispatch(allInCart([]));
      });
  };

  return (
    <div className={Style.oneCard}>
      <div className="overlay"></div>
      <div className={Style.contentImage}>
        <img src={API + "/" + ImageProduct} />
      </div>
      <div
        className={Style.addCart}
        onClick={() => handleAddToCart(product._id)}>
        <FaCartPlus />
      </div>
      <div className={Style.viewDetails}>
        <Link href={`/${Category}/${Section}/${Brand}/${_id}`}>
          <a>show details</a>
        </Link>
      </div>
      <div className={Style.contentInfo}>
        <h6>{Name}</h6>
        <span>
          $ <b>{Price}</b>
        </span>
      </div>
    </div>
  );
};
