import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar } from "../Bar/Bar";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Cookie from "js-cookie";
import { loginUser, loginAdmin } from "../../redux/slices/auth";

export const Layout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  // handle scroll
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const scrolling = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    padding: ".25rem",
  };

  useEffect(() => {
    // generate user info to permission in ui client
    const infoUser = Cookie.getJSON("userInfo");
    const infoAdmin = Cookie.getJSON("adminInfo");

    if (infoUser) {
      const { userId, email, displayName, role } = infoUser;
      dispatch(
        loginUser({
          ...auth,
          isLogin: true,
          userId: userId,
          role,
          isUser: true,
          isAdmin: false,
          email: email,
          displayName: displayName,
        })
      );
    }

    if (infoAdmin) {
      const { adminId, email, displayName, role } = infoAdmin;
      dispatch(
        loginAdmin({
          ...auth,
          isLogin: true,
          userId: adminId,
          role,
          isUser: false,
          isAdmin: true,
          email: email,
          displayName: displayName,
        })
      );
    }
  }, []);

  useEffect(() => {
    // invoke fun to scroll animation
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="heading">
        <Bar />
        <Navbar style={scrolled ? scrolling : null} />
      </div>
      {children}
      <Footer />
    </>
  );
};
