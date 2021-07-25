import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { LayoutCard } from "../../components/LayoutCards/LayoutCard";
import { PaginationComponent } from "../../components/Pagination/Pagination";
import { Filter } from "../../components/Filtering/Filtering";
import { validCategoriesUrl } from "../../utilities/validURL";
import Axios from "../../utilities/Axios";
import Error from "next/error";

function index({ products, total, title, error }) {
  const { categories } = useRouter().query;

  return (
    <>
      {error && (
        <Error title={"server down..try again soon ♥ "} statusCode={500} />
      )}
      {products && (
        <>
          <Head>
            <title>{title}</title>
          </Head>
          <div className="container">
            <>
              <Filter url={`/${categories}`} />
              <LayoutCard products={products} />
              <PaginationComponent
                total={total}
                path={`https://backend-boggy.herokuapp.com/${categories}`}
              />
            </>
          </div>
        </>
      )}
    </>
  );
}
export default index;

export async function getServerSideProps({ params, query }) {
  const { categories } = params;
  const { page, color, price, date } = query;

  // check if url path valid
  if (!validCategoriesUrl(categories)) {
    return {
      notFound: true,
      props: {
        message: "no page is there ya pro",
      },
    };
  }

  const url = `/products/get/${categories}`;

  // check if any query is available
  if (page || color || price || date) {
    // initial  queries
    const defaultUrlQuery = `?page=${page ? page : "1"}&price=${
      price ? price : "All"
    }&color=${color ? color : "All"}&date=${date ? date : "newest"}`;

    // fetch data
    return await Axios.get(`${url}?${defaultUrlQuery}`)
      .then(({ data }) => {
        return {
          props: {
            success: data.success,
            products: data.message.products,
            total: data.message.total,
            title: String(categories).toUpperCase(),
            error: null,
          },
        };
      })
      .catch(() => {
        return {
          props: {
            success: false,
            products: [],
            total: 0,
            title: String(categories).toUpperCase(),
            error: true,
          },
        };
      });
  } else {
    return await Axios.get(url)
      .then(({ data }) => {
        return {
          props: {
            success: data.success,
            products: data.message.products,
            total: data.message.total,
            title: String(categories).toUpperCase(),
            error: null,
          },
        };
      })
      .catch(() => {
        return {
          props: {
            success: false,
            products: null,
            total: null,
            title: String(categories).toUpperCase(),
            error: true,
          },
        };
      });
  }
}
