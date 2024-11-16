import apiSlice from './apiSlice';

export const tableSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllTable: builder.query({
            query: () => 'table/getAllTable',
        }),

        // getCategoryById: builder.query({
        //     query: (id) => `category/getCategoryById/${id}`
        // }),

        // getUserBooking: builder.query({
        //     query: ()=>`bookingTable/getUserBooking`
        // }),

        addTable: builder.mutation({
            query: (table) => ({
                url: 'table/add',
                method: 'POST',
                body: table,
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
  useAddTableMutation,
  useGetAllTableQuery
} = tableSlice;
