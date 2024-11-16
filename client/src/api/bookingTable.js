import apiSlice from './apiSlice';

export const bookingTableSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllBooking: builder.query({
            query: () => 'bookingTable/bookings',
        }),

        // getCategoryById: builder.query({
        //     query: (id) => `category/getCategoryById/${id}`
        // }),

        getUserBooking: builder.query({
            query: ()=>`bookingTable/getUserBooking`
        }),

        addBooking: builder.mutation({
            query: (booking) => ({
                url: 'bookingTable/book',
                method: 'POST',
                body: booking,
            }),
        }),

        
        updateStatusForTable: builder.mutation({
            query: ({ id, status }) => ({
                url: `bookingTable/updateStatus/${id}`,  // URL with category ID
                method: 'PUT',
                body:  {status},  // Send the name in the body as an object
            }),
        }),

        deleteBooking: builder.mutation({
            query: (id) => ({
                url: `bookingTable/deleteBooking/${id}`, // Make sure this URL is correct
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
   useGetAllBookingQuery,
   useAddBookingMutation,
   useDeleteBookingMutation,
   useUpdateStatusForTableMutation,
   useGetUserBookingQuery
} = bookingTableSlice;
