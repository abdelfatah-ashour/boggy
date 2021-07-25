import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { InputFormRegister } from "../utilities/InputRegisterCTRL";
import { getTokenUser, getTokenAdmin } from "../utilities/getToken";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import Axios from "../utilities/Axios";
import { loginUser, loginAdmin } from "../redux/slices/auth";
import { useDispatch } from "react-redux";
import Style from "../../public/assets/css/login.module.css";

export default function login() {
  const dispatch = useDispatch();
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
    await Axios.post(`/auth/login`, { email, password })
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

          dispatch(
            loginAdmin({
              isLogin: true,
              role: resp.data.message.role,
              userId: resp.data.message.adminId,
              isUser: false,
              isAdmin: true,
              email: resp.data.message.email,
              displayName: resp.data.message.displayName,
            })
          );
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
          dispatch(
            loginUser({
              isLogin: true,
              role: resp.data.message.role,
              userId: resp.data.message.userId,
              isUser: true,
              isAdmin: false,
              email: resp.data.message.email,
              displayName: resp.data.message.displayName,
            })
          );
        }

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
        <div
          className="row justify-content-center align-items-center"
          style={{ minHeight: "500px" }}>
          <div
            className={Style.form + " col-md-4 col-10 p-3 my-5"}
            style={{ borderRadius: ".5rem" }}>
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
              <br />
              {"  "}
              <small>
                don&apos;t have Account ? <Link href="/register">Register</Link>
              </small>
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
          </div>
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
