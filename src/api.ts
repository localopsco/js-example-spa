import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Meta, Todo } from './types';

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    meta: builder.query<Meta, void>({
      query: () => `/v1/meta`,
      providesTags: ['Todos'],
    }),
    todos: builder.query<Todo[], void>({
      query: () => `/v1/tasks`,
      providesTags: ['Todos'],
    }),
    setTodoComplete: builder.mutation<Todo, { id: Todo['id']; checked: Todo['is_completed'] }>({
      query: ({ id, checked }) => ({
        url: `/v1/tasks/${id}`,
        method: 'PATCH',
        body: { is_completed: checked },
      }),
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: builder.mutation<void, Todo['id']>({
      query: (id) => ({
        url: `/v1/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos'],
    }),
    addTodo: builder.mutation<Todo, { title: string; description: string }>({
      query: (data) => ({
        url: `/v1/tasks`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Todos'],
    }),
    uploadFile: builder.mutation<Todo, { id: number; file: File }>({
      query: ({ id, file }) => {
        const formData = new FormData();
        formData.append('id', id.toString());
        formData.append('file', file);

        return {
          url: `/v1/tasks/${id}/attach`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Todos'],
    }),
    deleteFile: builder.mutation<Todo, number>({
      query: (id) => {
        return {
          url: `/v1/tasks/${id}/attach`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Todos'],
    }),
  }),
});

export default api;
