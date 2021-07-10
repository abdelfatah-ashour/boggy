import React from "react";
import Head from "next/head";
import { validSectionsUrl } from "../../../utils/validURL";
import { Filter } from "../../../components/Filtering/Filtering";
import { LayoutCard } from "../../../components/LayoutCards/LayoutCard";
import { PaginationComponent } from "../../../components/Pagination/Pagination";
import { useRouter } from "next/router";
import API from "../../../utils/API";
import Error from "next/error";

function index({ products, title, total, error }) {
  const { categories, sections } = useRouter().query;

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
          <Filter url={`/${categories}/${sections}`} />
          <LayoutCard products={products} />
          <PaginationComponent
            total={total}
            path={`/${categories}/${sections}`}
          />
        </>
      )}
    </>
  );
}

export default index;

export async function getServerSideProps({ params, query }) {
  const { categories, sections } = params;
  const { page, color, price, date } = query;

  if (!validSectionsUrl(categories, sections)) {
    return {
      notFound: true,
      props: {
        message: "no page is there ya pro",
      },
    };
  }

  const url = `/products/get/${categories}/${sections}`;

  // check if any query is available
  if (page || color || price || date) {
    // initial  queries
    const defaultUrlQuery = `?page=${page ? page : "1"}&price=${
      price ? price : "All"
    }&color=${color ? color : "All"}&date=${date ? date : "newest"}`;

    // fetch data
    return await API.get(`${url}?${defaultUrlQuery}`)
      .then(({ data }) => {
        return {
          props: {
            success: data.success,
            products: data.message.products,
            total: data.message.total,
            title: String(categories).toUpperCase(),
            error : null
          },
        };
      })
      .catch(() => {
        return {
          props: {
            success: false,
            products: null,
            total: 0,
            title: String(categories).toUpperCase(),
            error : true
          },
        };
      });
  } else {
    return await API.get(url)
      .then(({ data }) => {
        return {
          props: {
            success: data.success,
            products: data.message.products,
            total: data.message.total,
            title: String(categories).toUpperCase(),
            error: false,
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
