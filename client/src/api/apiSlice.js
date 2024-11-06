import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BackendLiveUrl = import.meta.env.VITE_BACKEND_BASE_URL

console.log(BackendLiveUrl)

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BackendLiveUrl}/`,
    prepareHeaders: (headers, { getState }) => {
      console.log('prepareHeaders is called')
      // const token = getState().auth.token; // Fetch the token from state
      // console.log(getState())

      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      console.log('Authorization Header:', headers.get('Authorization'));

      return headers;
    },
  }),

  endpoints: (builder) => ({}),
});

export default apiSlice;
