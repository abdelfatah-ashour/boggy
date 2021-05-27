import React from 'react';
import Head from 'next/head';
import { validBrandsUrl } from '../../../../utils/validURL';
import { useRouter } from 'next/router';
import { LayoutCard } from '../../../../components/LayoutCards/LayoutCard';
import { PaginationComponent } from '../../../../components/Pagination/Pagination';
import { Filter } from '../../../../components/Filtering/Filtering';
import { fetchProducts } from '../../../../utils/fetchProducts';

function index({ products, title, total }) {
    const { categories, sections, brands } = useRouter().query;

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Filter url={`/${categories}/${sections}/${brands}`} />
            <LayoutCard products={products} />
            <PaginationComponent
                total={total}
                path={`/${categories}/${sections}`}
            />
        </>
    );
}

export default index;

export async function getServerSideProps({ params, query }) {
    const { categories, sections, brands } = params;

    if (!validBrandsUrl(categories, sections, brands)) {
        return {
            notFound: true,
            props: {
                message: 'no page is there ya pro',
            },
        };
    }

    const url = `/products/get/${categories}/${sections}/${brands}`;

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
