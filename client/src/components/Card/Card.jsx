import React, { useContext } from 'react';
import Link from 'next/link';
import { cardCountContext } from '../../Context_API/CardCount';
import { FaCartPlus } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Cookie from 'js-cookie';
import AXIOS from '../../utils/API';
import Style from './Card.module.css';
import { API } from '../../utils/KEYS.json';
export const Card = ({ product }) => {
    const Router = useRouter();
    const { setCardCount } = useContext(cardCountContext);
    const { Name, Price, ImageProduct, Section, Brand, _id, Category } =
        product;

    const handleAddToCart = async id => {
        // check if not use return to login page
        if (!Cookie.getJSON('userInfo')) {
            Router.push('/login');
        }

        await AXIOS.post(`/cart/addToCart`, {
            itemId: id,
            qty: 1,
        })
            .then(({ data }) => {
                toast.success(data.payload);
            })
            .catch(({ response }) => {
                toast.warning(response.data);
            });

        await AXIOS.get(`/cart/getAllInCart`).then(({ data }) => {
            if (data.payload[0]) {
                setCardCount(data.payload[0].itemsId.length);
            }
        });
    };

    return (
        <div className={Style.oneCard}>
            <div className="overlay"></div>
            <div className={Style.contentImage}>
                <img src={API + '/' + ImageProduct} />
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
