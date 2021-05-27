import React from 'react';
import Head from 'next/head';
import { validSectionsUrl } from '../../../utils/validURL';
import { Filter } from '../../../components/Filtering/Filtering';
import { LayoutCard } from '../../../components/LayoutCards/LayoutCard';
import { PaginationComponent } from '../../../components/Pagination/Pagination';
import { fetchProducts } from '../../../utils/fetchProducts';
import { useRouter } from 'next/router';

function index({ products, title, total }) {
    const { categories, sections } = useRouter().query;

    return (
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
    );
}

export default index;

export async function getServerSideProps({ params, query }) {
    const { categories, sections } = params;

    if (!validSectionsUrl(categories, sections)) {
        return {
            notFound: true,
            props: {
                message: 'no page is there ya pro',
            },
        };
    }

    const url = `/products/get/${categories}/${sections}`;

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
