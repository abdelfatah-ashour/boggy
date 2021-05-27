import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { LayoutCard } from '../../components/LayoutCards/LayoutCard';
import { PaginationComponent } from '../../components/Pagination/Pagination';
import { Filter } from '../../components/Filtering/Filtering';
import { validCategoriesUrl } from '../../utils/validURL';
import { fetchProducts } from '../../utils/fetchProducts';

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

    return await fetchProducts(url, query)
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
