import apiSlice from './apiSlice';

export const offerSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOffers: builder.query({
            query: () => 'offer/getAllOffer',
        }),


        getSingleOffer: builder.query({
            query: (id) => `offer/getSingleOffer/${id}`
        }),

        addOffer: builder.mutation({
            query: (offer) => ({
                url: 'offer/addOffer', // Make sure this URL is correct
                method: 'POST',
                body: offer,
            }),
        }),

        editOffer: builder.mutation({
            query: ({id,offer}) => ({
                url: `offer/editOffer/${id}`,
                method: 'PUT',
                body: offer,
            }),
        }),

        // Delete a offer by ID
        deleteOffer: builder.mutation({
            query: (id) => ({
                url: `offer/deleteOffer/${id}`,
                method: 'DELETE',
            }),
        }),

    }),
});

export const { useGetAllOffersQuery, useAddOfferMutation,useDeleteOfferMutation,useEditOfferMutation,useGetSingleOfferQuery} = offerSlice;
