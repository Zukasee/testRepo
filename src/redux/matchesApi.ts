import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const matchesApi = createApi({
    reducerPath: 'matchesApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://bet-bot-server-8951b4dabcc5.herokuapp.com/api/v1/competitions'}),
    endpoints: (builder) => ({
        getMatches: builder.query({
            query: () => '',
        })
    })
})

export const { useGetMatchesQuery } = matchesApi