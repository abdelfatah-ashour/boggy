import React from "react";
import { Layout } from "../components/Layout/Layout";
import { AuthProvider } from "../Context_API/AuthUser";
import { CardCountProvider } from "../Context_API/CardCount";
import "../../public/assets/css/navbar.css";
import "../../public/assets/css/globals.css";
import "../../public/assets/css/filter.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CardCountProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CardCountProvider>
    </AuthProvider>
  );
}

export default MyApp;
