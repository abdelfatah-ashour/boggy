import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { InputFormRegister } from "../utils/InputRegisterCTRL";
import { getTokenUser, getTokenAdmin } from "../utils/getToken";
import { toast } from "react-toastify";
import Style from "../../public/assets/css/login.module.css";
import Cookie from "js-cookie";
import API from "../utils/API";
import { useRouter } from "next/router";

export default function login() {
  const Router = useRouter();
  const [UserData, setUserData] = useState({
    email: null,
    password: null,
  });
  const [logged, setLogged] = useState(null);

  const handleLogin = (e) => {
    setUserData({
      ...UserData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = UserData;
    await API.post(`/auth/login`, { email, password })
      .then((resp) => {
        // response is success
        setUserData({
          email: null,
          password: null,
        });

        // set cookie if admin
        if (resp.data.message.role > 0) {
          Cookie.set("c_admin", resp.headers.authorization, {
            secure: true,
            sameSite: "strict",
            expires: 1 / 48, //  30 min ,
          });
          Cookie.set("adminInfo", resp.data.message, {
            secure: true,
            sameSite: "strict",
            expires: 1 / 48, //  30 min ,
          });
        }
        // set cookie if user
        if (resp.data.message.role === 0) {
          Cookie.set("c_user", resp.headers.authorization, {
            secure: true,
            sameSite: "strict",
            expires: 1, // 1 day
          });
          Cookie.set("userInfo", resp.data.message, {
            secure: true,
            sameSite: "strict",
            expires: 1, // 1 day
          });
        }

        setLogged(true);
        toast.success(`login success 💝`);
        setTimeout(() => {
          Router.back();
        }, 3000);
      })
      .catch((error) => {
        if (!error.response) {
          setUserData({
            ...UserData,
          });
          setLogged(false);
          toast.warn(error.message);
        } else if (error.request) {
          setUserData({
            ...UserData,
          });
          setLogged(false);
          toast.warn("server down..try again soon ♥");
        } else {
          setUserData({
            ...UserData,
          });
          setLogged(false);
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={Style.login}>
        <div className="row">
          <form className="form col-md-5 col-sm-7 col-xs-9 mx-auto px-4 my-5">
            <InputFormRegister
              name="email"
              type="email"
              value={UserData.email}
              title="Email Address"
              placeholder="Email Address"
              handleForm={handleLogin}
            />
            <InputFormRegister
              name="password"
              type="password"
              title="Password"
              value={UserData.password}
              placeholder="Password"
              handleForm={handleLogin}
            />

            <div className="w-75 ml-auto">
              <button type="submit" className="btn" onClick={handleSubmit}>
                Login
              </button>
              <span>
                {"    "}
                don&apos;t have Account ? <Link href="/register">Register</Link>
              </span>
            </div>

            {logged ? (
              <div
                className={Style.alert + " mt-2 p-4"}
                style={{
                  backgroundColor: "var(main-color)",
                  color: "var(sec-color)",
                  textAlign: "center",
                }}>
                please wait :) redirect automatically ...
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps({ req }) {
  const user = getTokenUser(req);
  const admin = getTokenAdmin(req);
  if (user || admin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
