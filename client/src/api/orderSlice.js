import apiSlice from './apiSlice';

export const orderSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => 'order/getAllOrders',
        }),

        getSingleOrderDetails:builder.query({
            query:(id)=>`order/getSingelOrder/${id}`
        }),

        getAdminOrders : builder.query({
            query: () => 'order/getAdminOrder/orders'
        }),

        editOrderStatus : builder.mutation({
            
        })
    }),
});

export const {useGetAllOrdersQuery,useGetAdminOrdersQuery,useGetSingleOrderDetailsQuery} = orderSlice;
