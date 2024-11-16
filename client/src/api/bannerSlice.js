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

        getSingleBanner: builder.query({
            query: (id) => `banner/getSingleBanner/${id}`, // Adjust path as needed
        }),

        editBanner: builder.mutation({
            query: ({ id, banner }) => ({
                url: `banner/editBanners/${id}`,
                method: 'PUT',
                body: banner,
            }),
        }),

        // Delete a banner by ID
        deleteBanner: builder.mutation({
            query: (id) => ({
                url: `banner/deleteBanner/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetAllBannersQuery, useAddBannersMutation, useGetSingleBannerQuery, useEditBannerMutation,useDeleteBannerMutation } = bannerSlice;
