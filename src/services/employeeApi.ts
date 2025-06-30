import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Post {
  id: string;
  title: string;
  content: string;
}

// Create an API service
export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }), // API base URL
  endpoints: (builder) => ({
    // Define a "getPosts" endpoint to fetch posts
    getEmployees: builder.query<Post[], void>({
      query: () => 'posts', // URL endpoint to fetch posts
    }),
    // Define an "addPost" endpoint to create a new post
    addEmployee: builder.mutation<Post, Partial<Post>>({
      query: (newPost) => ({
        url: 'posts',
        method: 'POST',
        body: newPost,
      }),
    }),
  }),
});

export const { useGetEmployeesQuery, useAddEmployeeMutation } = employeeApi;