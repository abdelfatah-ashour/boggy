import React from "react";
import Style from "./header.module.css";
export const Header = () => {
  return (
    <header className={Style.header}>
      <video
        autoPlay={true}
        muted={true}
        loop={true}
        controls={false}
        className={Style.video}>
        <source src="/image/Header.mp4" type="video/mp4" />
      </video>
    </header>
  );
};
