import apiSlice from './apiSlice';

export const adminDetailsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAdminDetail: builder.query({
            query: () => 'admin/getAdminDetails',
        }),

        // getCategoryById: builder.query({
        //     query: (id) => `category/getCategoryById/${id}`
        // }),

        // getUserBooking: builder.query({
        //     query: ()=>`bookingTable/getUserBooking`
        // }),

        addAdminDetail: builder.mutation({
            query: (adminDetail) => ({
                url: 'admin/addAdminDetails',
                method: 'POST',
                body: adminDetail,
            }),
        }),

        
        // updateStatus: builder.mutation({
        //     query: ({ id, status }) => ({
        //         url: `bookingTable/updateStatus/${id}`,  // URL with category ID
        //         method: 'PUT',
        //         body:  {status},  // Send the name in the body as an object
        //     }),
        // }),

        // deleteBooking: builder.mutation({
        //     query: (id) => ({
        //         url: `bookingTable/deleteBooking/${id}`, // Make sure this URL is correct
        //         method: 'DELETE',
        //     }),
        // }),
    }),
});

export const {
  useAddAdminDetailMutation,
  useGetAdminDetailQuery
} = adminDetailsSlice;
