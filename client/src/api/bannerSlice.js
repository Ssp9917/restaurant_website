import apiSlice from './apiSlice';

export const bannerSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllBanners: builder.query({
            query: () => 'banner/getAllBanners',
        }),

        addBanners: builder.mutation({
            query: (banner) => ({
                url: 'banner/addBanners', // Make sure this URL is correct
                method: 'POST',
                body: banner,
            }),
        }),
    }),
});

export const { useGetAllBannersQuery,useAddBannersMutation } = bannerSlice;
