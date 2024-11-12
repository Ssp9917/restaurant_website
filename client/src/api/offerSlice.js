import apiSlice from './apiSlice';

export const offerSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOffers: builder.query({
            query: () => 'offer/getAllOffer',
        }),

        addOffer: builder.mutation({
            query: (offer) => ({
                url: 'offer/addOffer', // Make sure this URL is correct
                method: 'POST',
                body: offer,
            }),
        }),
    }),
});

export const { useGetAllOffersQuery, useAddOfferMutation } = offerSlice;
