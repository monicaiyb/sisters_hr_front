import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const userApi = createApi({
 reducerPath: "userApi",
 baseQuery: fetchBaseQuery({
 baseUrl: "http://127.0.0.1:8000/",
 credentials: "include",
 }),
 endpoints: (builder) => ({
   login: builder.mutation({
      query: (user) => ({
      url: "/admin/login",
      method: "POST",
      body: user,
      }),
    }),
    getUserDetail: builder.query({
      query: ({ id, token}) => ({
      url: `/users/${id}/detail`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    
    }),
    refreshToken: builder.mutation({
      query: (data) => ({
      url: "/auth/refresh",
      method: "POST",
       headers: {
          "Content-type": "application/json",
        },
        body: data,
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          //const { data } =
          await queryFulfilled;
          //console.log(data) 
          // dispatch(logout());
          dispatch(userApi.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
    }),
 }),
});
export const { 
  useLoginMutation, 
  useGetUserDetailQuery, 
  useRefreshTokenMutation,
  useSendLogoutMutation,
} = userApi;