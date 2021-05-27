import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { InputFormRegister } from '../utils/InputRegisterCTRL';
import { useRouter } from 'next/router';
import Style from '../../public/assets/css/register.module.css';
import { getTokenUser, getTokenAdmin } from '../utils/getToken';
import API from '../utils/API';

function index() {
    const Router = useRouter();
    const [UserInfo, setUSerInfo] = useState({
        firstName: null,
        lastName: null,
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
    });
    const [file, setFile] = useState(null);

    const [success, setSuccess] = useState(null);
    const [message, setMessage] = useState(null);

    const handleForm = e => {
        setUSerInfo({
            ...UserInfo,
            [e.target.name]: e.target.value,
        });
    };
    const { firstName, lastName, username, email, password, confirmPassword } =
        UserInfo;
    const submitForm = async e => {
        e.preventDefault();
        let Data = new FormData();
        Data.append('firstName', firstName);
        Data.append('lastName', lastName);
        Data.append('username', username);
        Data.append('email', email);
        Data.append('password', password);
        Data.append('confirmPassword', confirmPassword);
        Data.append('imageProfile', file);
        await API.post(`/auth/register`, Data)
            .then(({ data }) => {
                if (data) {
                    setUSerInfo({
                        firstName: null,
                        lastName: null,
                        username: null,
                        email: null,
                        password: null,
                        confirmPassword: null,
                    });
                    setSuccess(data.success);
                    setMessage(data.payload);
                    setTimeout(() => {
                        Router.push('/login');
                    }, 1000);
                }
            })
            .catch(error => {
                if (!error.response) {
                    setSuccess(error.message);
                } else {
                    setMessage(error.response.data.payload);
                }
            });
    };

    return (
        <>
            <Head>
                <title>Register</title>
            </Head>

            <div className="container">
                <form className={'col-6 ' + Style.register}>
                    <InputFormRegister
                        name="firstName"
                        type="text"
                        title="first name"
                        handleForm={handleForm}
                        placeholder="first name"
                    />
                    <InputFormRegister
                        name="lastName"
                        type="text"
                        title="last names"
                        handleForm={handleForm}
                        placeholder="last name"
                    />
                    <InputFormRegister
                        name="username"
                        type="text"
                        title="username"
                        handleForm={handleForm}
                        placeholder="username"
                    />
                    <InputFormRegister
                        name="email"
                        type="email"
                        title="email address"
                        handleForm={handleForm}
                        placeholder="Email Address"
                    />
                    <InputFormRegister
                        name="password"
                        type="password"
                        title="password"
                        handleForm={handleForm}
                        placeholder="password"
                    />
                    <InputFormRegister
                        name="confirmPassword"
                        type="password"
                        title="confirm password"
                        handleForm={handleForm}
                        placeholder="confirm password"
                    />
                    <div
                        className="mb-3"
                        onChange={e => {
                            setFile(e.target.files[0]);
                        }}>
                        <label htmlFor="formFile" className="form-label">
                            select image profile
                        </label>
                        <input
                            className="form-control"
                            type="file"
                            id="formFile"
                            name="imageProfile"
                        />
                    </div>
                    <button className="btn" onClick={submitForm}>
                        Submit
                    </button>{' '}
                    have already account ? <Link href="/login">Login</Link>
                    {success ? (
                        <div className="alert alert-success mt-3 p2 text-capitalize">
                            {message}
                        </div>
                    ) : null}
                    {success === false ? (
                        <div className="alert alert-danger mt-3 p2 text-capitalize">
                            {message}
                        </div>
                    ) : null}
                </form>
            </div>
        </>
    );
}

export default index;

export async function getServerSideProps({ req, res }) {
    let user = getTokenUser(req);
    let admin = getTokenAdmin(req);

    if (user || admin) {
        res.writeHead(302, { Location: '/' });
        res.end();
    }

    return {
        props: {},
    };
}
