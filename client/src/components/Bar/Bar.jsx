import React, { useEffect, useContext } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { GrLogout } from 'react-icons/gr';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaGooglePlusG,
    FaOpencart,
} from 'react-icons/fa';

import { AiOutlineCloudUpload } from 'react-icons/ai';
import { AuthContext } from '../../Context_API/AuthUser';
import { cardCountContext } from '../../Context_API/CardCount';
import { toast, ToastContainer } from 'react-toastify';
import Link from 'next/link';
import Style from './Bar.module.css';
import Cookie from 'js-cookie';
import API from '../../utils/API';
import { useRouter } from 'next/router';

export function Bar() {
    const { AuthUser, setAuthUser } = useContext(AuthContext);
    const { cardCount, setCardCount } = useContext(cardCountContext);
    const { isLogin, isUser, displayName } = AuthUser;
    const Router = useRouter();

    const handleLogout = async () => {
        await API.get(`/auth/logout`)
            .then(() => {
                Cookie.remove('c_user');
                Cookie.remove('userInfo');
                Cookie.remove('c_admin');
                Cookie.remove('adminInfo');

                setAuthUser({
                    isLogin: null,
                    role: null,
                    userId: null,
                    isUser: null,
                    isAdmin: null,
                    email: null,
                    displayName: null,
                });

                toast.success('See You Later 😊');

                setTimeout(() => {
                    Router.push('/');
                }, 1500);
            })
            .catch(error => {
                if (!error.response) {
                    toast.success(error.message);
                } else {
                    toast.warn(error.response.data.message);
                }
            });
    };

    useEffect(() => {
        const fetchAllInCardLength = async () => {
            if (isUser) {
                await API.get(`/cart/getAllInCart`).then(({ data }) => {
                    if (data.payload[0]) {
                        setCardCount(data.payload[0].itemsId.length);
                    }
                });
            }
        };
        fetchAllInCardLength();
        return () => {
            return;
        };
    }, [AuthUser]);

    return (
        <div className={`${Style.Bar}`}>
            <div className={`${Style.subBar}`}>
                <ToastContainer />
                <ul className={`${Style.socialMedia}`}>
                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '##0066FF' }}>
                        <FaFacebookF />
                    </a>
                    <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#20a4f3' }}>
                        <FaTwitter />
                    </a>
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#DD387A' }}>
                        <FaInstagram />
                    </a>
                    <a
                        href="https://mail.google.com"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#941c2f' }}>
                        <FaGooglePlusG />
                    </a>
                </ul>
                <ul className={`${Style.listBar}`}>
                    Hi, <span>{isLogin ? <b>{displayName}</b> : null}</span>
                    {isLogin ? (
                        <>
                            {isLogin ? (
                                <li className={`${Style.cartIcon}`}>
                                    <Link href="/upload-product">
                                        <a>
                                            <AiOutlineCloudUpload />
                                        </a>
                                    </Link>
                                </li>
                            ) : null}
                            {isUser ? (
                                <li className={`${Style.cartIcon}`}>
                                    <Link href="/cart">
                                        <a>
                                            <FaOpencart />{' '}
                                            <span>{cardCount}</span>
                                        </a>
                                    </Link>
                                </li>
                            ) : null}
                            <li onClick={handleLogout} className={Style.logout}>
                                <GrLogout />
                            </li>
                        </>
                    ) : null}
                    {!isLogin ? (
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
