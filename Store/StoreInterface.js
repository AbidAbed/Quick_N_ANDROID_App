import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query/react';
import {userSlice, fetchUserData, updateUserData} from './Slices/UserSlice';
import {
  changeIsLoggedIn,
  configSlice,
  changeLastAnnouncementUpdateTime,
  changeSelectedConversationId,
  changeSearchedMessageId,
  changePath,
} from './Slices/ConfigSlice';
import {
  userAPI,
  usePostLoginMutation,
  usePostSignupMutation,
  useGetUsersQuery,
  usePutUpdateUserMutation,
  useGetUserByTokenMutation,
} from './APIS/UserAPI';

import {
  userConversations,
  fetchUserConversations,
  addUserConversation,
  updateConversationMembers,
  deleteConversation,
  updateConversation,
  updateLeatestMessage,
  updateConversationNotificationById,
} from './Slices/UserConversations';

import {
  usersSlice,
  fetchUsersData,
  updateOnlineUserStatus,
} from './Slices/UsersSlice';
import {
  conversationsAPI,
  useGetUserConversationsQuery,
  useCreateConversationMutation,
  useGetConversationByIdMutation,
} from './APIS/ConversationsAPI';

import {
  groupSlice,
  addGroup,
  updateGroup,
  updateGroupMembersByConversationId,
  deleteGroupByConversationId,
} from './Slices/GroupSlice';
import {
  groupAPI,
  useGetGroupByConversationIdMutation,
  usePostCreateGroupMutation,
  usePutUpdateGroupMutation,
  useDeleteMemberFromGroupMutation,
} from './APIS/GroupAPI';
import {
  messagesAPI,
  usePostMessageMutation,
  useGetConversationMessagesMutation,
  useGetFileBinaryMutation,
  useGetFileObjectQuery,
  useDeleteMessageMutation,
  usePutMessageMutation,
  usePostForwardMessageMutation,
  usePatchRemoveFavouriteMessageMutation,
  usePatchFavouriteMessageMutation,
  usePutHideMessageMutation,
  usePutHideMessageFromAllMutation,
  usePutUnHideMessageFromAllMutation,
  useGetSearchMutation,
} from './APIS/MessagesAPI';
import {
  announcementsSlice,
  updateAnnouncement,
  fetchAnnouncements,
  addAnnouncement,
} from './Slices/AnnouncementsSlice';

import {
  announcementsAPI,
  useGetAnnouncementsQuery,
  usePutAnnouncementSingMutation,
  usePostAddAnnouncementMutation,
  usePostGeneratePdfMutation,
} from './APIS/AnnouncementsAPI';

import {
  userContactsSlice,
  fetchUserContacts,
  removeContact,
  addContact,
} from './Slices/UserContacts';
import {
  contactsAPI,
  useGetUserContactsQuery,
  usePostAddUserContactMutation,
  usePatchRemoveUserContactMutation,
} from './APIS/ContactsAPI';
const Store = configureStore({
  reducer: {
    user: userSlice.reducer,
    config: configSlice.reducer,
    conversations: userConversations.reducer,
    groups: groupSlice.reducer,
    users: usersSlice.reducer,
    contacts: userContactsSlice.reducer,
    announcements: announcementsSlice.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [conversationsAPI.reducerPath]: conversationsAPI.reducer,
    [groupAPI.reducerPath]: groupAPI.reducer,
    [messagesAPI.reducerPath]: messagesAPI.reducer,
    [announcementsAPI.reducerPath]: announcementsAPI.reducer,
    [contactsAPI.reducerPath]: contactsAPI.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(userAPI.middleware)
      .concat(conversationsAPI.middleware)
      .concat(groupAPI.middleware)
      .concat(messagesAPI.middleware)
      .concat(announcementsAPI.middleware)
      .concat(contactsAPI.middleware)
});
setupListeners(Store.dispatch);

export {
  Store,
  addAnnouncement,
  updateUserData,
  fetchUserData,
  changeLastAnnouncementUpdateTime,
  updateAnnouncement,
  changeSelectedConversationId,
  changeIsLoggedIn,
  updateConversation,
  fetchAnnouncements,
  updateOnlineUserStatus,
  changeSearchedMessageId,
  addGroup,
  deleteGroupByConversationId,
  updateGroup,
  addUserConversation,
  fetchUsersData,
  usePostLoginMutation,
  usePostSignupMutation,
  fetchUserConversations,
  useGetUserConversationsQuery,
  useGetGroupByConversationIdMutation,
  useGetUsersQuery,
  useGetConversationMessagesMutation,
  usePostMessageMutation,
  useGetFileBinaryMutation,
  useGetFileObjectQuery,
  useCreateConversationMutation,
  useGetConversationByIdMutation,
  usePostCreateGroupMutation,
  usePutUpdateGroupMutation,
  updateGroupMembersByConversationId,
  useDeleteMemberFromGroupMutation,
  updateConversationMembers,
  deleteConversation,
  useGetAnnouncementsQuery,
  usePutAnnouncementSingMutation,
  usePostAddAnnouncementMutation,
  usePutUpdateUserMutation,
  usePostGeneratePdfMutation,
  useGetUserByTokenMutation,
  useDeleteMessageMutation,
  usePutMessageMutation,
  usePostForwardMessageMutation,
  usePatchRemoveFavouriteMessageMutation,
  usePatchFavouriteMessageMutation,
  usePutHideMessageMutation,
  usePutHideMessageFromAllMutation,
  usePutUnHideMessageFromAllMutation,
  changePath,
  updateLeatestMessage,
  updateConversationNotificationById,
  useGetUserContactsQuery,
  fetchUserContacts,
  removeContact,
  addContact,
  usePostAddUserContactMutation,
  usePatchRemoveUserContactMutation,
  useGetSearchMutation,
};
