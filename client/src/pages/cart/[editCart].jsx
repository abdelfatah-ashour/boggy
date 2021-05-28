import React, { useEffect, useReducer, useState } from 'react';
import Head from 'next/head';
import Style from '../../../public/assets/css/editCart.module.css';
import { toast, ToastContainer } from 'react-toastify';
import { getTokenUser } from '../../utils/getToken';
import AXIOS from '../../utils/API';
import { useRouter } from 'next/router';
import { API } from '../../utils/KEYS.json';

function EditOrder() {
    const [item, setItem] = useState(null);
    const { query } = useRouter();
    const Router = useRouter();

    const reducerQty = (state, action) => {
        switch (action.type) {
            case 'INC':
                return { qty: state.qty + 1 };
            case 'DEC':
                return { qty: state.qty - 1 };
            default:
                throw new Error();
        }
    };
    const [state, dispatch] = useReducer(reducerQty, {
        qty: 1,
    });
    // qty, userId
    const handleConfirmQty = async id => {
        await AXIOS.put(`/cart/getOneItemAndUpdate`, {
            qty: state.qty,
            objId: id._id,
        })
            .then(({ data }) => {
                toast.success(data.message);
                setTimeout(() => {
                    Router.push('/');
                }, 1500);
            })
            .catch(error => {
                if (!error.message) {
                    toast.warning(error.message);
                } else {
                    toast.error(error.response.data.message);
                }
            });
    };

    useEffect(() => {
        const fetchOneItemInCart = async () => {
            await AXIOS.get(`/cart/getAllInCart`)
                .then(({ data }) => {
                    const item = data.message[0].itemsId.filter(item => {
                        return item.item._id == query.editCart;
                    });
                    setItem(item);
                })
                .catch(error => {
                    if (!error.message) {
                        toast.warning(error.message);
                    } else {
                        toast.error(error.response.data.message);
                    }
                });
        };
        fetchOneItemInCart();
    }, []);

    return (
        <>
            <Head>
                <title>Edit Order</title>
            </Head>
            <ToastContainer />
            <div className={Style.EditOrder}>
                <div className="container">
                    {item ? (
                        item.map((item, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6">
                                            <div
                                                className={
                                                    Style.ContentImgItem
                                                }>
                                                <img
                                                    src={
                                                        API +
                                                        '/' +
                                                        item.item.ImageProduct
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6">
                                            <div
                                                className={
                                                    Style.contentInfoItem
                                                }>
                                                <ul>
                                                    <li>
                                                        <b>Name : </b>
                                                        {item.item.Name}
                                                    </li>
                                                    <li>
                                                        <b>Brand : </b>
                                                        {item.item.Brand}
                                                    </li>
                                                    <li>
                                                        <b>Color : </b>
                                                        {item.item.Color.map(
                                                            (color, i) => {
                                                                return (
                                                                    <React.Fragment
                                                                        key={i}>
                                                                        <span>
                                                                            {
                                                                                color
                                                                            }
                                                                        </span>{' '}
                                                                        {'  '}
                                                                    </React.Fragment>
                                                                );
                                                            }
                                                        )}
                                                    </li>
                                                    <li>
                                                        <b>Price</b> :{' '}
                                                        {item.item.Price}
                                                    </li>
                                                    <li>
                                                        <b>Total</b> :{' '}
                                                        {item.item.Price *
                                                            state.qty}
                                                    </li>
                                                </ul>
                                                <div
                                                    className={
                                                        Style.BtnEditQty
                                                    }>
                                                    <b>QTY</b> :
                                                    <button
                                                        className="btn"
                                                        disabled={
                                                            state.qty === 1
                                                                ? true
                                                                : false
                                                        }
                                                        onClick={() =>
                                                            dispatch({
                                                                type: 'DEC',
                                                            })
                                                        }>
                                                        -
                                                    </button>
                                                    <div
                                                        style={{
                                                            fontSize: '2rem',
                                                            margin: '0 1rem',
                                                        }}>
                                                        {state.qty}{' '}
                                                    </div>
                                                    <button
                                                        className="btn"
                                                        onClick={() =>
                                                            dispatch({
                                                                type: 'INC',
                                                            })
                                                        }>
                                                        +
                                                    </button>
                                                </div>
                                                <div
                                                    className={Style.confirmBtn}
                                                    onClick={() =>
                                                        handleConfirmQty(item)
                                                    }>
                                                    confirm
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })
                    ) : (
                        <p className="w-50 mx-auto py-3">loading...</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default EditOrder;

export async function getServerSideProps({ req }) {
    const user = getTokenUser(req);
    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    } else {
        return {
            props: {},
        };
    }
}
