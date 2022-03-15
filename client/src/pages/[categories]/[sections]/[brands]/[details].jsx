import React, { useState } from "react";
import Head from "next/head";
import { PaypalBtn } from "../../../../utilities/paymentGetaway";
import { toast } from "react-toastify";
import { API } from "../../../../utilities/KEYS.json";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Axios from "../../../../utilities/Axios";
import Error from "next/error";
import Style from "../../../../../public/assets/css/productDetails.module.css";
export default function details({ products, error }) {
  const [checkout, setCheckout] = useState(null);
  const Router = useRouter();
  const { auth } = useSelector((state) => state);

  const handleCheckout = () => {
    if (auth.isUser) {
      setCheckout(true);
    } else {
      window.location.href = "/login";
    }
  };

  //  TODO: handle Order if success payment getaway
  const handleOrder = (items) => {
    const itemsData = items.map((item) => {
      return {
        Name: item.Name,
        Qty: item.qty,
        Total: item.qty * products?.Price,
      };
    });
    return itemsData;
  };

  // TODO: handleCheckout
  const checkedOut = async () => {
    await Axios.post(`/order/checkout`, {
      items: handleOrder(products),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //  TODO: handleDeleteAll
  const handleDeleteAll = async () => {
    const { data, response } = await Axios.delete(`/cart/deleteCart`);
    if (data) {
      toast.success(data.message);
      setTimeout(() => {
        Router.back();
      }, 1500);
    }

    if (response) {
      toast.warning(response.data);
    }
  };

  return (
    <>
      {error && <Error title={error.toString()} statusCode={500} />}

      {products && (
        <>
          <Head>
            <title>{products?.Name}</title>
          </Head>
          <div className={Style.productsDetails}>
            <div className="container">
              <div className="row my-5">
                <div className="col-md-6 col-sm-12 text-center">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className={Style.contentImage}>
                      <img
                        src={`${API}/${products?.ImageProduct}`}
                        alt={products?.Name}
                      />
                    </div>
                  </div>
                  <span className={Style.titleImage + " my-3"}>
                    {products?.Name}
                  </span>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className={Style.infoProduct}>
                    <div>
                      name : <b>{products?.Name}</b>
                    </div>
                    <div>
                      section :<b> {products?.Title}</b>
                    </div>
                    <div>
                      Brand : <b> {products?.Brand}</b>
                    </div>
                    <div>
                      Price : $<b>{products?.Price}</b>
                    </div>
                    {
                      // generate Color lists options
                      <div className={Style.colorItem}>
                        <span className="py-2">Color</span> :
                        {products?.Color.map((color, i) => {
                          return (
                            <React.Fragment key={i}>
                              <span
                                className={Style.color + " mx-2"}
                                style={{
                                  backgroundColor: color,
                                }}
                              ></span>
                            </React.Fragment>
                          );
                        })}
                      </div>
                    }

                    {products?.Category === "clothes" ? (
                      <div>
                        Size :
                        {products?.Size.map((size, i) => {
                          return (
                            <React.Fragment key={i}>
                              <span className="mx-2">{size}</span>
                            </React.Fragment>
                          );
                        })}
                      </div>
                    ) : null}
                    {products?.Section === "laptops" ? (
                      <>
                        <div>
                          <span>RAM Memory</span> :<br /> {"  "}
                          {products?.MemoryRamLaptops.map((ram, i) => {
                            return (
                              <React.Fragment key={i}>
                                <span className={Style.options + " mx-2"}>
                                  {ram} G
                                </span>
                              </React.Fragment>
                            );
                          })}
                        </div>
                        <div>
                          <span>Hard SD</span> : <br /> {"  "}
                          {products?.SDHard.map((sd, i) => {
                            return (
                              <React.Fragment key={i}>
                                <span className={Style.options + " mx-2"}>
                                  {sd} G
                                </span>
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </>
                    ) : null}
                    {products?.Section === "mobiles" ? (
                      <>
                        <li>
                          MEMORY Ram : <br /> {"  "}
                          {products?.MemoryRamMobiles.map((ram, i) => {
                            return (
                              <React.Fragment key={i}>
                                <span className={Style.options + " mx-2"}>
                                  {ram}G
                                </span>
                              </React.Fragment>
                            );
                          })}
                        </li>
                        <li>
                          MEMORY internal :<br /> {"  "}
                          {products?.SDMemory.map((memory, i) => {
                            return (
                              <React.Fragment key={i}>
                                <span className={Style.options + " mx-2"}>
                                  {memory}G
                                </span>
                              </React.Fragment>
                            );
                          })}
                        </li>
                      </>
                    ) : null}
                  </div>
                  <div className={Style.checkout}>
                    {checkout ? (
                      <PaypalBtn
                        amount={products?.Price}
                        checkout={checkedOut}
                        endCheckout={handleDeleteAll}
                      />
                    ) : (
                      <div className="btn" onClick={handleCheckout}>
                        Checkout
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { categories, sections, brands, details } = params;

  return await Axios.get(
    `/products/get/${categories}/${sections}/${brands}/${details}`
  )
    .then(({ data }) => {
      console.log("Data ", data);
      return {
        // will be passed to the page component as props
        props: {
          success: data.success,
          products: data.message.products,
          error: false,
        },
      };
    })
    .catch((error) => {
      if (error.response) {
        return {
          props: {
            error: "Something went wrong!",
            success: false,
            products: null,
          },
        };
      } else if (error.request) {
        return {
          props: {
            error: error.request,
            success: false,
            products: null,
          },
        };
      } else {
        return {
          props: {
            success: false,
            products: null,
            error: error.message,
          },
        };
      }
    });
}
