import apiSlice from './apiSlice';

export const orderSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => 'order/getAllOrders',
        }),
    }),
});

export const {useGetAllOrdersQuery} = orderSlice;
