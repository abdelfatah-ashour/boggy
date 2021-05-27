import React, { useContext, useState } from 'react';
import Head from 'next/head';
import { PaypalBtn } from '../../../../utils/paymentGetaway';
import API from '../../../../utils/API';
import Style from '../../../../../public/assets/css/productDetails.module.css';
import { AuthContext } from '../../../../Context_API/AuthUser';
import { toast } from 'react-toastify';
export default function details({ products }) {
    const [checkout, setCheckout] = useState(null);
    const { AuthUser } = useContext(AuthContext);
    const {
        Color,
        Size,
        SDMemory,
        SDHard,
        MemoryRamMobiles,
        MemoryRamLaptops,
        Name,
        Title,
        Category,
        Section,
        Brand,
        Price,
        ImageProduct,
    } = products;

    const handleCheckout = () => {
        if (AuthUser.isUser) {
            setCheckout(true);
        } else {
            window.location.href = '/login';
        }
    };

    //  TODO: handle Order if success payment getaway
    const handleOrder = items => {
        const itemsData = items.map(item => {
            return {
                Name: item.Name,
                Qty: item.qty,
                Total: item.qty * Price,
            };
        });
        return itemsData;
    };

    // TODO: handleCheckout
    const checkedOut = async () => {
        await API.post(`/order/checkout`, {
            items: handleOrder(products),
        });
    };

    //  TODO: handleDeleteAll
    const handleDeleteAll = async () => {
        const { data, response } = await API.delete(`/cart/deleteCart`);
        if (data) {
            toast.success(data.message);
            setTimeout(() => {
                window.location.href = 'cart';
            }, 1500);
        }

        if (response) {
            toast.warning(response.data);
        }
    };

    return (
        <>
            <Head>
                <title>{Name}</title>
            </Head>
            <div className={Style.productsDetails}>
                <div className="container">
                    <div className="row my-5">
                        <div className="col-md-6 col-sm-12 text-center">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className={Style.contentImage}>
                                    <img
                                        src={`https://boggy-backend.herokuapp.com/${ImageProduct}`}
                                        alt={Name}
                                    />
                                </div>
                            </div>
                            <span className={Style.titleImage + ' my-3'}>
                                {Name}
                            </span>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className={Style.infoProduct}>
                                <div>
                                    name : <b>{Name}</b>
                                </div>
                                <div>
                                    section :<b> {Title}</b>
                                </div>
                                <div>
                                    Brand : <b> {Brand}</b>
                                </div>
                                <div>
                                    Price : $<b>{Price}</b>
                                </div>
                                {
                                    // generate Color lists options
                                    <div className={Style.colorItem}>
                                        <span className="py-2">Color</span> :
                                        {Color.map((color, i) => {
                                            return (
                                                <React.Fragment key={i}>
                                                    <span
                                                        className={
                                                            Style.color +
                                                            ' mx-2'
                                                        }
                                                        style={{
                                                            backgroundColor:
                                                                color,
                                                        }}></span>
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>
                                }

                                {Category === 'clothes' ? (
                                    <div>
                                        Size :
                                        {Size.map((size, i) => {
                                            return (
                                                <React.Fragment key={i}>
                                                    <span className="mx-2">
                                                        {size}
                                                    </span>
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>
                                ) : null}
                                {Section === 'laptops' ? (
                                    <>
                                        <div>
                                            <span>RAM Memory</span> :<br />{' '}
                                            {'  '}
                                            {MemoryRamLaptops.map((ram, i) => {
                                                return (
                                                    <React.Fragment key={i}>
                                                        <span
                                                            className={
                                                                Style.options +
                                                                ' mx-2'
                                                            }>
                                                            {ram} G
                                                        </span>
                                                    </React.Fragment>
                                                );
                                            })}
                                        </div>
                                        <div>
                                            <span>Hard SD</span> : <br /> {'  '}
                                            {SDHard.map((sd, i) => {
                                                return (
                                                    <React.Fragment key={i}>
                                                        <span
                                                            className={
                                                                Style.options +
                                                                ' mx-2'
                                                            }>
                                                            {sd} G
                                                        </span>
                                                    </React.Fragment>
                                                );
                                            })}
                                        </div>
                                    </>
                                ) : null}
                                {Section === 'mobiles' ? (
                                    <>
                                        <li>
                                            MEMORY Ram : <br /> {'  '}
                                            {MemoryRamMobiles.map((ram, i) => {
                                                return (
                                                    <React.Fragment key={i}>
                                                        <span
                                                            className={
                                                                Style.options +
                                                                ' mx-2'
                                                            }>
                                                            {ram}G
                                                        </span>
                                                    </React.Fragment>
                                                );
                                            })}
                                        </li>
                                        <li>
                                            MEMORY internal :<br /> {'  '}
                                            {SDMemory.map((memory, i) => {
                                                return (
                                                    <React.Fragment key={i}>
                                                        <span
                                                            className={
                                                                Style.options +
                                                                ' mx-2'
                                                            }>
                                                            {memory}G
                                                        </span>
                                                    </React.Fragment>
                                                );
                                            })}
                                        </li>
                                    </>
                                ) : null}
                            </div>
                            <div className={Style.checkout}>
                                {checkout ? (
                                    <PaypalBtn
                                        amount={Price}
                                        checkout={checkedOut}
                                        endCheckout={handleDeleteAll}
                                    />
                                ) : (
                                    <div
                                        className="btn"
                                        onClick={handleCheckout}>
                                        Checkout
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps({ params }) {
    const { categories, sections, brands, details } = params;

    return await API.get(
        `/products/get/${categories}/${sections}/${brands}/${details}`
    )
        .then(({ data }) => {
            return {
                // will be passed to the page component as props
                props: {
                    success: data.success,
                    products: data.message.products,
                },
            };
        })
        .catch(() => {
            return {
                props: {
                    success: false,
                    products: null,
                },
            };
        });
}
