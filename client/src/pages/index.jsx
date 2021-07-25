import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Header } from "../components/Header/Header";
import { content } from "../utilities/globalStatement";
import { CgAdidas } from "react-icons/cg";
import { AiFillApple } from "react-icons/ai";
import { SiDell, SiHuawei } from "react-icons/si";
import { GiCutDiamond } from "react-icons/gi";
import { IoIosSend } from "react-icons/io";
import { BiRepost } from "react-icons/bi";
import { FaRocket } from "react-icons/fa";

import Style from "../../public/assets/css/home.module.css";

function index() {
  const features = [
    {
      icon: <GiCutDiamond />,
      head: "special offers",
      text: "shop big save big",
    },
    {
      icon: <IoIosSend />,
      head: "free delivery",
      text: "on order above $99",
    },
    {
      icon: <BiRepost />,
      head: "30 days return",
      text: "policy we offers",
    },
    {
      icon: <FaRocket />,
      head: "fasting shipping",
      text: "2 days express",
    },
  ];
  return (
    <>
      <Head>
        <title>BOGGY - official page</title>
      </Head>
      <Header />
      <div className={Style.features}>
        <div className="container">
          <div className="row">
            {features.map((feat, i) => {
              return (
                <div
                  className="col-md-3 col-6 d-flex flex-column align-items-center"
                  key={i}>
                  <span
                    className="text-uppercase my-2"
                    style={{ fontSize: "calc(16px * 2)" }}>
                    {feat.icon}
                  </span>
                  <h6 className="text-uppercase">{feat.head}</h6>
                  <small className="text-uppercase">{feat.text}</small>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-evenly">
          {content.map((section, i) => {
            return (
              <section className={Style.section + " col-md-5 col-12"} key={i}>
                <div className={Style.ContainerImage}>
                  <img src={section.image} alt={section.content} />
                </div>
                <div className={Style.containerOfExplore}>
                  <h3>{section.content}</h3>
                  <div className="btn">
                    <Link href={section.url}>Explore</Link>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
      <div className={Style.subscribe}>
        <div className="container h-100">
          <div className="row h-100">
            <div className="h-100 d-flex flex-column justify-content-center align-items-start col-md-6 col-12 my-3">
              <h3 className="my-2 text-uppercase">get out special discount</h3>
              <small className="my-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </small>
              <div className={Style.miniForm + " my-2"}>
                <input type="text" name="" id="" placeholder="Email Address" />
                <button className="btn p-2">get coupon now</button>
              </div>
            </div>
            <ul className={Style.listBrands + " col-md-6 col-12 my-3"}>
              <li>
                <CgAdidas />
              </li>
              <li>
                <AiFillApple />
              </li>
              <li>
                <SiDell />
              </li>
              <li>
                <SiHuawei />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
