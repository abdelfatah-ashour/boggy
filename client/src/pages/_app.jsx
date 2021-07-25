import React from "react";
import { Layout } from "../components/Layout/Layout";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "../../public/assets/css/navbar.css";
import "../../public/assets/css/globals.css";
import "../../public/assets/css/filter.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
