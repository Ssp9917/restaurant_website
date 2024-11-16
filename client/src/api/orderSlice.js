import apiSlice from './apiSlice';

export const orderSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => 'order/getAllOrders',
        }),

        getSingleOrderDetails: builder.query({
            query: (id) => `order/getSingelOrder/${id}`
        }),

        getAdminOrders: builder.query({
            query: () => 'order/getAdminOrder/orders'
        }),

        updateStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `order/updateStatus/${id}`,
                method: 'PUT',
                body: { status },
            }),
        }),
    }),
});

export const { useGetAllOrdersQuery, useGetAdminOrdersQuery, useGetSingleOrderDetailsQuery,useUpdateStatusMutation } = orderSlice;
