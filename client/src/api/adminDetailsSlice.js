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

        
        updateAdminDetail: builder.mutation({
            query: (data) => ({
                url: `admin/updateAdminDetails`,
                method: 'PUT',
                body:  data,
            }),
        }),

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
  useGetAdminDetailQuery,
  useUpdateAdminDetailMutation
} = adminDetailsSlice;
