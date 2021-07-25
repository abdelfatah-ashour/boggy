import React from "react";
import Head from "next/head";
import { getTokenUser } from "../utilities/getToken";
import Axios from "../utilities/Axios.js";
import Error from "next/error";
import Style from "../../public/assets/css/order.module.css";

function index({ orders, error }) {
  return (
    <>
      <Head>
        <title>My Order</title>
      </Head>
      {orders && orders.length > 0 && (
        <div className={Style.myOrder}>
          <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">NAME</th>
                  <th scope="col">PRICE</th>
                  <th scope="col">QTY</th>
                  <th scope="col">TOTAl</th>
                  <th scope="col">STATE</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  ? orders[0].items.map((item, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>{item.Name}</td>
                          <td>{item.Total / item.Qty}</td>
                          <td>{item.Qty}</td>
                          <td>{item.Total}</td>
                          {orders.map((state, i) => {
                            return (
                              <td key={i}>
                                {state.stateOrder == 0 ? "shipped" : null}
                                {state.stateOrder == 1 ? "delivered" : null}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {orders && orders.length === 0 && (
        <div className="w-100" style={{ height: "400px", fontWeight: "700" }}>
          <div className="alert alert-warning w-100 text-center text-uppercase">
            no order available now
          </div>
        </div>
      )}
      {error && <Error statusCode={500} title="something went wrong!" />}
    </>
  );
}

export default index;

export async function getServerSideProps({ req, res }) {
  const user = getTokenUser(req);
  if (!user) {
    res.writeHead(302, { Location: "/login" });
    res.end();
  }

  return await Axios.get(`/order/getAllOrders`, {
    headers: {
      authorization: req.cookies.c_user,
    },
  })
    .then(({ data }) => {
      return {
        props: {
          orders: data.message,
          error: null,
        },
      };
    })
    .catch(() => {
      return {
        props: {
          orders: null,
          error: true,
        },
      };
    });
}
