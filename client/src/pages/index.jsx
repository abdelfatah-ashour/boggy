import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Header } from "../components/Header/Header";
import { content } from "../utils/globalStatement";
import Style from "../../public/assets/css/home.module.css";

function index() {
  useEffect(() => {
    document.addEventListener("contextmenu", (event) => event.preventDefault());
  }, []);

  return (
    <>
      <Head>
        <title>BOGGY - official page</title>
      </Head>
      <Header />
      <div className="container">
        <main className={Style.main}>
          {content.map((section, i) => {
            return (
              <section
                className={
                  Style.section +
                  " row justify-content-center align-items-center"
                }
                key={i}>
                <div className={Style.ContainerImage + " col-md-6 col-xs-12"}>
                  <div className={Style.ContentImage}>
                    <img src={section.image} alt={section.content} />
                  </div>
                </div>
                <div
                  className={Style.containerOfExplore + " col-md-6 col-xs-12"}>
                  <div className={Style.contentExplore}>
                    <h3>{section.content}</h3>
                    <div className="btn">
                      <Link href={section.url}>Explore</Link>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </main>
      </div>
    </>
  );
}

export default index;
