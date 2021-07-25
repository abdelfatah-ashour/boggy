import API from '../utilities/API';

// HOC fetching data from database
export const fetchProducts = async (basedUrl, queries) => {
    const { page, color, price, date } = queries;

    let result;

    // check if any query is available
    if (page || color || price || date) {
        // initial  queries
        const defaultUrlQuery = `?page=${page ? page : '1'}&price=${
            price ? price : 'All'
        }&color=${color ? color : 'All'}&date=${date ? date : 'newest'}`;

        // fetch data
        const { data, response } = await API.get(
            `${basedUrl}?${defaultUrlQuery}`
        );
        result = { data, response };
    } else {
        const { data, response } = await API.get(basedUrl);
        result = { data, response };
    }
    return result;
};
