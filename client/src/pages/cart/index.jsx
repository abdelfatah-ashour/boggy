import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Style from '../../../public/assets/css/cart.module.css';
import { AiFillDelete } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import { PaypalBtn } from '../../utils/paymentGetaway';
import { getTokenUser } from '../../utils/getToken';
import API from '../../utils/API';
import { useRouter } from 'next/router';

export default function cart() {
    const [cart, setCart] = useState([]);
    const [checked, setChecked] = useState(false);
    const Router = useRouter();

    let totalAmount;

    // generate Total of Items
    if (cart && cart.length > 0) {
        let arr = [];
        for (let index = 0; index < cart.length; index++) {
            const element = cart[index].item.Price * cart[index].qty;
            arr.push(element);
        }
        totalAmount = arr.reduce((prev, current) => {
            return prev + current;
        });
    }

    //  TODO: handle Order if success payment getaway
    const handleOrder = items => {
        const itemsData = items.map(item => {
            return {
                Name: item.item.Name,
                Qty: item.qty,
                Total: item.qty * item.item.Price,
            };
        });
        return itemsData;
    };

    // TODO: handleCheckout
    const checkout = async () => {
        await API.post(`/order/checkout`, {
            items: handleOrder(cart),
        })
            .then(resp => {
                toast.success(resp.message);
            })
            .catch(error => {
                if (!error.response) {
                    toast.error(error.message);
                } else {
                    toast.error(error.response.data.message);
                }
            });
    };

    //  TODO: handle delete one item
    const handleDeleteOneItem = async id => {
        await API.get(`/cart/getOneItemAndDelete`, {
            params: {
                id,
            },
        })
            .then(({ data }) => {
                toast.success(data.message);
                setTimeout(() => {
                    Router.push('cart');
                }, 1000);
            })
            .catch(error => {
                if (!error.response) {
                    toast.error(error.message);
                } else {
                    toast.error(error.response.data.message);
                }
            });
    };

    //  TODO: handleDeleteAll
    const handleDeleteAll = async () => {
        await API.delete(`/cart/deleteCart`)
            .then(({ data }) => {
                toast.success(data.message);
                setTimeout(() => {
                    Router.push('cart');
                }, 1000);
            })
            .catch(error => {
                if (!error.response) {
                    toast.warning(error.message);
                } else {
                    toast.warning(error.response.data.message);
                }
            });
    };

    useEffect(async () => {
        const fetchAllInCardLength = async () => {
            await API.get(`/cart/getAllInCart`)
                .then(({ data }) => {
                    if (data && data.message[0]) {
                        setCart(data.message[0].itemsId);
                    }
                })
                .catch(error => {
                    if (!error.response) {
                        toast.warning(error.message);
                    } else {
                        toast.warning(error.response.data.message);
                    }
                });
        };
        fetchAllInCardLength();
    }, []);

    return (
        <>
            <Head>
                {/* title page */}
                <title>Cart</title>
            </Head>
            <main>
                {/* table of orders */}
                <article className={Style.cart}>
                    <ToastContainer />
                    <div className="container">
                        <div className="row">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" className="text-center">
                                            #
                                        </th>
                                        <th scope="col" className="text-center">
                                            Name
                                        </th>
                                        <th scope="col" className="text-center">
                                            Price
                                        </th>
                                        <th scope="col" className="text-center">
                                            QTY
                                        </th>
                                        <th scope="col" className="text-center">
                                            Total
                                        </th>
                                        <th scope="col" className="text-center">
                                            manage
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.length > 0
                                        ? cart.map((item, i) => {
                                              return (
                                                  <tr key={i}>
                                                      <th
                                                          scope="row"
                                                          className="text-center">
                                                          {item.item._id}
                                                      </th>
                                                      <td
                                                          scope="row"
                                                          className="text-center">
                                                          {item.item.Name}
                                                      </td>
                                                      <td
                                                          scope="row"
                                                          className="text-center">
                                                          {item.item.Price}
                                                      </td>
                                                      <td
                                                          scope="row"
                                                          className="text-center">
                                                          {item.qty}
                                                      </td>
                                                      <td
                                                          scope="row"
                                                          className="text-center">
                                                          {item.item.Price *
                                                              item.qty}
                                                      </td>
                                                      <td
                                                          scope="row"
                                                          className="text-center">
                                                          <span
                                                              className={
                                                                  Style.tabDelete
                                                              }>
                                                              <Link
                                                                  href={`/cart/${item.item._id}`}>
                                                                  <a> ✏ </a>
                                                              </Link>
                                                          </span>
                                                          <span
                                                              className={
                                                                  Style.tabDelete
                                                              }
                                                              onClick={() =>
                                                                  handleDeleteOneItem(
                                                                      item.item
                                                                          ._id
                                                                  )
                                                              }>
                                                              <AiFillDelete />
                                                          </span>
                                                      </td>
                                                  </tr>
                                              );
                                          })
                                        : null}
                                </tbody>
                            </table>
                            {!cart || cart.length === 0 ? (
                                <div className="alert alert-warning">
                                    no items on cart available now ...{' '}
                                </div>
                            ) : null}
                            {/* if have order checkout btn and delete all will be available  */}
                            {cart ? (
                                <div className="row">
                                    <div className="col-md-6 col-sm-11 col-xs-12 d-flex p-4 align-items-center justify-content-center">
                                        {cart && cart.length > 0 ? (
                                            <>
                                                <button
                                                    className={
                                                        Style.checkoutBtn +
                                                        ' btn btn-dark ml-auto'
                                                    }
                                                    onClick={() =>
                                                        handleDeleteAll()
                                                    }>
                                                    delete All
                                                </button>
                                            </>
                                        ) : null}
                                    </div>
                                    <div className="col-md-6 col-sm-11 col-xs-12 d-flex p-4 align-items-center justify-content-center">
                                        {cart.length > 0 && !checked ? (
                                            <div
                                                className={
                                                    Style.checkoutBtn +
                                                    ' btn ml-auto'
                                                }
                                                onClick={() => {
                                                    setTimeout(() => {
                                                        setChecked(true);
                                                    }, 1500);
                                                }}>
                                                checkout now
                                            </div>
                                        ) : null}
                                        {checked ? (
                                            <div className="d-flex flex-column justify-content-center">
                                                <span className="p-2">
                                                    ⚠ feel safe 💝, we
                                                    don&apos;t save
                                                    <br /> any information and
                                                    don&apos;t share it 😊
                                                </span>
                                                <div
                                                    className="py-3"
                                                    style={{
                                                        fontSize: '1.25rem',
                                                        fontWeight: '600',
                                                    }}>
                                                    {'  '} Total :{' '}
                                                    <b> {totalAmount} 💵</b>
                                                </div>
                                                <PaypalBtn
                                                    amount={totalAmount}
                                                    checkout={checkout}
                                                    endCheckout={
                                                        handleDeleteAll
                                                    }
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </article>
            </main>
        </>
    );
}

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
