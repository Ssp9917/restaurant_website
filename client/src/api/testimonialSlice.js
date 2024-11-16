import apiSlice from './apiSlice';

export const testimonialSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllTestimonial: builder.query({
            query: () => 'testimonial/getAllTestimonial',
        }),

        // addBanners: builder.mutation({
        //     query: (banner) => ({
        //         url: 'banner/addBanners', // Make sure this URL is correct
        //         method: 'POST',
        //         body: banner,
        //     }),
        // }),

        getSingleTestimonial: builder.query({
            query: (id) => `testimonial/getTestimonial/${id}`, // Adjust path as needed
        }),

        // editBanner: builder.mutation({
        //     query: ({ id, banner }) => ({
        //         url: `banner/editBanners/${id}`,
        //         method: 'PUT',
        //         body: banner,
        //     }),
        // }),

        // Delete a banner by ID
        deleteTestimonial: builder.mutation({
            query: (id) => ({
                url: `testimonial/deleteTestimonials/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetAllTestimonialQuery, useDeleteTestimonialMutation,useGetSingleTestimonialQuery } = testimonialSlice;
