import React, { useEffect, useState } from "react";
import Head from "next/head";
import Style from "../../public/assets/css/order.module.css";
import { getTokenUser } from "../utils/getToken";
import API from "../utils/API";
import { toast } from "react-toastify";

function index() {
  const [Order, setOrder] = useState(null);
  async function fetchOrders() {
    await API.get(`/order/getAllOrders`)
      .then(({ data }) => {
        setOrder(data.payload);
      })
      .catch((error) => {
        if (!error.response) {
          toast.warn(error.message);
        } else if (error.request) {
          toast.warn("server down...try again soon♥");
        } else {
          toast.error(error.response.data.message);
        }
      });
  }
  // handle Get All order from db
  useEffect(() => {
    fetchOrders();
    return () => {
      setOrder(null);
    };
  }, [Order]);

  return (
    <>
      <Head>
        <title>My Order</title>
      </Head>
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
              {Order
                ? Order[0].items.map((item, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{item.Name}</td>
                        <td>{item.Total / item.Qty}</td>
                        <td>{item.Qty}</td>
                        <td>{item.Total}</td>
                        {Order.map((state, i) => {
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
  return {
    props: {},
  };
}
