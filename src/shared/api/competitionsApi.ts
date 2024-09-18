import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const competitionsApi = createApi({
    reducerPath: 'competitionsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://bet-bot-server-8951b4dabcc5.herokuapp.com/api/v1/competitions'}),
    endpoints: (builder) => ({
        getCompetitions: builder.query({
            query: () => '',
        }),
        postUserData: builder.mutation({
            query: (initData) => ({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({initData}),
                url: 'https://bet-bot-server-8951b4dabcc5.herokuapp.com/api/v1/users/verify'
            })
        })
    })
})

export const { useGetCompetitionsQuery, usePostUserDataMutation } = competitionsApi