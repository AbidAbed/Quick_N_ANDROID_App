import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_BACKEND_URL} from '@env';
const contactsAPI = createApi({
  reducerPath: 'contactsAPI',
  baseQuery: fetchBaseQuery({baseUrl: `${BASE_BACKEND_URL}`}),
  endpoints: builder => ({
    //POST login on backend
    getUserContacts: builder.query({
      query: requestObject => {
        return {
          method: 'GET',
          url: '/auth/get-contact-list',
          params: {userId: requestObject.userId},
          headers: requestObject.isAdmin
            ? {admin_header: `admin ${requestObject.token}`}
            : {token_header: `Bearer ${requestObject.token}`},
        };
      },
    }),
    postAddUserContact: builder.mutation({
      query: requestObject => {
        return {
          method: 'POST',
          url: '/auth/add-contact-user',
          body: {email: requestObject.email, phone: requestObject.phone},
          headers: requestObject.isAdmin
            ? {admin_header: `admin ${requestObject.token}`}
            : {token_header: `Bearer ${requestObject.token}`},
        };
      },
    }),

    patchRemoveUserContact: builder.mutation({
      query: requestObject => {
        return {
          method: 'PATCH',
          url: `/auth/remove-contact/${requestObject.userId}`,
          headers: requestObject.isAdmin
            ? {admin_header: `admin ${requestObject.token}`}
            : {token_header: `Bearer ${requestObject.token}`},
        };
      },
    }),
  }),
});

const {
  useGetUserContactsQuery,
  usePostAddUserContactMutation,
  usePatchRemoveUserContactMutation,
} = contactsAPI;
export {
  contactsAPI,
  useGetUserContactsQuery,
  usePostAddUserContactMutation,
  usePatchRemoveUserContactMutation,
};
