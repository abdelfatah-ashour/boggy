import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaRegCheckCircle } from "react-icons/fa";
import { getTokenAdmin } from "../utilities/getToken";
import { useRouter } from "next/router";
import Head from "next/head";
import Style from "../../public/assets/css/control-panel.module.css";
import Axios from "../utilities/Axios";
export default function controlPanel({ orders }) {
  const [newStateOrder, setNewStateOrder] = useState("0");
  const handleEditStateOrder = (e) => {
    setNewStateOrder(e.target.value);
  };

  const handleUpdateStateOrder = async (id) => {
    await Axios.put(`/order/updateStateOrder`, {
      state: newStateOrder,
      id,
    })
      .then(({ data }) => {
        toast.success(data.message);
        setTimeout(() => {
          useRouter.push("/control-panel");
        }, 1500);
      })
      .catch((error) => {
        if (error.response) {
          toast.warning(error.response.data.message);
        } else if (error.request) {
          toast.warning("server down..try again soon ♥");
        } else {
          toast.warning("something went wrong!");
        }
      });
  };

  return (
    <>
      <Head>
        <title>Control Panel</title>
      </Head>
      <div className={Style.containerPanel}>
        <div className="row">
          <aside className="col-md-3 col-sm-4 col-xs-12">
            <div className={Style.contentProfile}>
              <div>
                <img src="/image/profile/2021-1-31-admin.png.png" alt="" />
              </div>
              <ul>
                <li>
                  admin <b>John</b>
                </li>
                <li>
                  start active:
                  <pre>
                    {new Date().toDateString() +
                      " " +
                      new Date().getHours() +
                      "h " +
                      new Date().getMinutes() +
                      "m"}
                  </pre>
                </li>
              </ul>
            </div>
          </aside>
          <main className={Style.Table + " " + "col-md-9 col-sm-8 col-xs-12"}>
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Total</th>
                  <th scope="col">State Order</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {orders && orders.length > 0
                  ? orders.map((item, i) => {
                      return item.items.map((product) => {
                        return (
                          <tr key={product.Name}>
                            <td scope="row">{++i}</td>
                            <td>{product.Name}</td>
                            <td>{product.Total / product.Qty}</td>
                            <td>{product.Qty}</td>
                            <td>{product.Total}</td>
                            <td>
                              {item.stateOrder == 0 ? "paid out" : null}
                              {item.stateOrder == 1 ? "shipped" : null}
                              {item.stateOrder == 2 ? "delivered" : null}
                            </td>

                            <td className={Style.selectState}>
                              <select
                                defaultValue={"0"}
                                className="form-select"
                                onChange={handleEditStateOrder}>
                                <option value="0" disabled>
                                  Paid out
                                </option>
                                <option value="1">shipped</option>
                                <option value="2">delivered</option>
                              </select>
                              <button
                                className={Style.btnState + " btn"}
                                onClick={() => {
                                  handleUpdateStateOrder(item.userId);
                                }}>
                                <FaRegCheckCircle />
                              </button>
                            </td>
                          </tr>
                        );
                      });
                    })
                  : null}
              </tbody>
            </table>
          </main>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const admin = getTokenAdmin(req);

  if (!admin) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    return await Axios.get(`/order/getAllOrders`)
      .then(({ data }) => {
        return {
          props: { orders: data.message },
        };
      })
      .catch(() => {
        return {
          props: {},
        };
      });
  }
}
