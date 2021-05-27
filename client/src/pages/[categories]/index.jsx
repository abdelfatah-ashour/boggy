import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { LayoutCard } from '../../components/LayoutCards/LayoutCard';
import { PaginationComponent } from '../../components/Pagination/Pagination';
import { Filter } from '../../components/Filtering/Filtering';
import { validCategoriesUrl } from '../../utils/validURL';
import API from '../../utils/API';

function index({ products, total, title }) {
    const { categories } = useRouter().query;

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="container">
                {products ? (
                    <>
                        <Filter url={`/${categories}`} />
                        <LayoutCard products={products} />
                        <PaginationComponent
                            total={total}
                            path={`https://backend-boggy.herokuapp.com/${categories}`}
                        />
                    </>
                ) : (
                    <div className="alert">loading...</div>
                )}
            </div>
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
                message: 'no page is there ya pro',
            },
        };
    }

    const url = `/products/get/${categories}`;

    // check if any query is available
    if (page || color || price || date) {
        // initial  queries
        const defaultUrlQuery = `?page=${page ? page : '1'}&price=${
            price ? price : 'All'
        }&color=${color ? color : 'All'}&date=${date ? date : 'newest'}`;

        // fetch data
        return await API.get(`${url}?${defaultUrlQuery}`)
            .then(({ data }) => {
                return {
                    props: {
                        success: data.success,
                        products: data.message.products,
                        total: data.message.total,
                        title: String(categories).toUpperCase(),
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
                    },
                };
            });
    }
}
