import {useNavigation} from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {
  changePath,
  changeSelectedConversationId,
  useGetSearchMutation,
} from '../Store/StoreInterface';
import {FlatList} from 'react-native-gesture-handler';
import Button from '../Components/Button';
import style from '../AppStyling';
import ProfilePic from '../Assets/contact-icon-empty.png';
import GroupPic from '../Assets/groupPic.png';
import {BASE_BACKEND_URL} from '@env';

function Search({searchTermParent, isSearchPressed, setIsSearchPressed}) {
  ///////////////////// CONFIGS //////////////////////////////////
  const navigation = useNavigation();
  const dispatch = useDispatch();
  /////////////////////// USESELECTERS ///////////////////////////
  const {isLoggedIn, path, selectedConversationId} = useSelector(
    state => state.config,
  );
  const user = useSelector(state => state.user);
  ///////////////////////////// STATES //////////////////////////////
  const [searchTerm, setSearchTerm] = useState(searchTermParent);
  const [searhList, setSearchList] = useState({
    users: [],
    messages: [],
  });
  const [conversationsPage, setConversationsPage] = useState(1);
  const [usersPage, setUsersPage] = useState(1);
  const [messagesPage, setMessagesPage] = useState(1);
  const [isUsersSearchLoaded, setIsSearchUsersLoaded] = useState(false);
  const [lastSearchResponse, setLastSearchResponse] = useState({
    users: [],
    messages: [],
    numberOfUserConversations: 1,
  });

  const [searchFilter, setSearchFilter] = useState(null);
  ////////////////////////// APIS ///////////////////////////////////

  const [getSearch, getSearchResponse] = useGetSearchMutation();
  //////////////////////// USEEFFECTS ////////////////////////////////
  useEffect(() => {
    navigation.getParent().setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent().setOptions({
        tabBarStyle: undefined,
      });
  }, [isLoggedIn]);

  useEffect(() => {
    setSearchTerm(searchTermParent);
  }, [searchTermParent]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      dispatch(changePath('Conversations'));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (path !== 'Search' && selectedConversationId === null)
      navigation.goBack();
  }, [path]);

  useEffect(() => {
    if (isSearchPressed) {
      setIsSearchPressed(false);
      setConversationsPage(1);
      setMessagesPage(1);
      setUsersPage(1);

      setSearchList({
        users: [],
        messages: [],
      });

      setLastSearchResponse({
        users: [],
        messages: [],
        numberOfUserConversations: 1,
      });

      setIsSearchUsersLoaded(false);

      getSearch({
        query: {
          searchterm: searchTerm,
          conversationPage: 1,
          usersPage: 1,
          messagesPage: 1,
          user_id: user._id,
        },
        isAdmin: user.isAdmin,
        token: user.token,
      });
    }
  }, [isSearchPressed]);

  useEffect(() => {
    if (!getSearchResponse.isUninitialized && !getSearchResponse.isLoading) {
      if (getSearchResponse.isError) {
      } else {
        setSearchList({
          users: [...searhList.users, ...getSearchResponse.data.users],
          messages: [...searhList.messages, ...getSearchResponse.data.messages],
        });

        setLastSearchResponse({...getSearchResponse.data});
        if (searhList.users.length + searhList.messages.length < 10)
          loadNextPage();
      }
    }
  }, [getSearchResponse]);

  useEffect(() => {
    if (path === 'Search')
      navigation.getParent().setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });

    return () =>
      navigation.getParent().setOptions({
        tabBarStyle: undefined,
      });
  }, [path, selectedConversationId]);

  ////////////////////// HOOKS  //////////////////////

  function loadNextPage() {
    if (conversationsPage <= lastSearchResponse.numberOfUserConversations + 1) {
      if (
        lastSearchResponse.users.length === 0 &&
        lastSearchResponse.messages.length === 0
      ) {
        setConversationsPage(conversationsPage + 1);
        setMessagesPage(1);
        setUsersPage(1);

        getSearch({
          query: {
            searchterm: searchTerm,
            conversationPage: conversationsPage + 1,
            usersPage: 1,
            messagesPage: 1,
            user_id: user._id,
          },
          isAdmin: user.isAdmin,
          token: user.token,
        });
      } else {
        setMessagesPage(
          lastSearchResponse.messages.length !== 0
            ? messagesPage + 1
            : messagesPage,
        );
        setUsersPage(
          lastSearchResponse.users.length !== 0 ? usersPage + 1 : usersPage,
        );

        getSearch({
          query: {
            searchterm: searchTerm,
            conversationPage: conversationsPage + 1,
            usersPage:
              lastSearchResponse.users.length !== 0 ? usersPage + 1 : usersPage,
            messagesPage:
              lastSearchResponse.messages.length !== 0
                ? messagesPage + 1
                : messagesPage,
            user_id: user._id,
          },
          isAdmin: user.isAdmin,
          token: user.token,
        });
      }
    }

    if (
      conversationsPage >= lastSearchResponse.numberOfUserConversations &&
      lastSearchResponse.users.length === 0
    )
      setIsSearchUsersLoaded(true);
  }

  function dataViewerAfterFilter() {
    switch (searchFilter) {
      case 'Users':
        return [...searhList.users];
      case 'Messages':
        return [...searhList.messages];
      default:
        if (isUsersSearchLoaded)
          return [...searhList.users, ...searhList.messages];
        else [...searhList.users];
        break;
    }
  }

  function changeFilter(filter) {
    if (searchFilter === filter) setSearchFilter(null);
    else setSearchFilter(filter);
  }

  function messageHandler(message) {}
  function conversationHandler(conversation) {
    dispatch(changeSelectedConversationId(conversation.conversationId));
    dispatch(changePath('Conversations-child'));
  }
  // console.log(conversationsPage, messagesPage, usersPage);
  ////////////////////// RETURNED COMPONENTS //////////////////////
  return (
    <View style={{backgroundColor: 'white', flex: 1, maxHeight: '82%'}}>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          paddingTop: '2%',
          paddingBottom: '2%',
          paddingLeft: '2%',
        }}>
        <Button
          text="Users"
          styleButton={[
            style.submitFormButton,
            searchFilter === 'Users' && {backgroundColor: 'green'},
          ]}
          styleText={style.submitFormButtonText}
          onPress={() => changeFilter('Users')}
        />
        <Button
          text="Messages"
          styleButton={[
            style.submitFormButton,
            searchFilter === 'Messages' && {backgroundColor: 'green'},
          ]}
          styleText={style.submitFormButtonText}
          onPress={() => changeFilter('Messages')}
        />

        {getSearchResponse.isLoading && (
          <ActivityIndicator size="small" color="#058095" />
        )}
      </View>
      {searhList.users.length !== 0 ? (
        <FlatList
          data={dataViewerAfterFilter()}
          style={{flex: 1, maxHeight: '80%'}}
          renderItem={({item}) => {
            if (item.text) {
              /*{"conversation_Id": "6606838d286787b01d5169e7", "groupAvatar": null,
               "groupMembers": null, "groupName": null, "isGroup": false, "members": [],
                "messageCreatedAt": "2024-03-29T09:02:05.380Z",
                 "message_id": "6606838d286787b01d5169eb", 
                 "senderAvatar": "BASE_BACKEND_URL/message/file/binary?fileId=
                 660e8faa88656c00495b9ceb&page=1", "sender_id": "65a9031d5e605be6b53e688a",
                  "sender_username": "admin", "text": "2233hgg ttrgg"}
               */
              return (
                <TouchableOpacity style={{flexDirection: 'row', width: '100%'}}>
                  {item.groupName !== null ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center',
                        paddingLeft: '4%',
                        paddingBottom: '2%',
                      }}>
                      <Image
                        style={{
                          width: 40,
                          height: 40,
                          objectFit: 'contain',
                          resizeMode: 'contain',
                          borderRadius: 40,
                          // marginRight: 10,
                        }}
                        source={
                          item.groupAvatar
                            ? {
                                uri: `${BASE_BACKEND_URL}/message/file/binary?fileId=${item?.groupAvatar}&page=1`,
                              }
                            : GroupPic
                        }
                      />

                      <View
                        style={{
                          paddingLeft: '2%',
                          alignItems: 'flex-start',
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 13,
                            fontWeight: 'bold',
                          }}>
                          {item.groupName}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              color: 'gray',
                              fontSize: 8,
                            }}>
                            {item.sender_username}
                          </Text>
                          <Text
                            style={{
                              color: 'gray',
                              fontSize: 8,
                              paddingLeft: '2%',
                              alignSelf: 'flex-end',
                              textAlign: 'center',
                            }}>
                            {item.text?.length > 20
                              ? `${item.text.substr(0, 20)} ...`
                              : item.text}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center',
                        paddingLeft: '4%',
                        paddingBottom: '2%',
                      }}>
                      <Image
                        style={{
                          width: 40,
                          height: 40,
                          objectFit: 'contain',
                          resizeMode: 'contain',
                          borderRadius: 40,
                          // marginRight: 10,
                        }}
                        source={
                          item.avatar
                            ? {
                                uri: `${BASE_BACKEND_URL}/message/file/binary?fileId=${item?.avatar}&page=1`,
                              }
                            : ProfilePic
                        }
                      />
                      <View
                        style={{
                          paddingLeft: '2%',
                          alignItems: 'flex-start',
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 13,
                            fontWeight: 'bold',
                          }}>
                          {item.sender_username}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              color: 'gray',
                              fontSize: 8,
                            }}>
                            {item.sender_username}
                          </Text>
                          <Text
                            style={{
                              color: 'gray',
                              fontSize: 8,
                              paddingLeft: '2%',
                              alignSelf: 'flex-end',
                              textAlign: 'center',
                            }}>
                            {item.text?.length > 20
                              ? `${item.text.substr(0, 20)} ...`
                              : item.text}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              );
            } else {
              /*{"_id": "65a903435e605be6b53e688d", 
              "avatar": "660bbdc23e34d43b870a219b", "conversationId": 
              "660a6384c3d2b89bc80689f7", "groupName": "testes",
               "members": ["65d5bee2d9036b03dfec8e85",
                "65a903435e605be6b53e688d", "65a9031d5e605be6b53e688a"],
                 "username": "laith078"}*/

              // return <Text style={{color: 'black'}}>{item.username}</Text>;
              // {
              //   console.log(item._id, item.username, item.groupName);
              // }
              return (
                <TouchableOpacity
                  style={{flexDirection: 'row', width: '100%'}}
                  onPress={() => conversationHandler(item)}>
                  {item.groupName !== null ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center',
                        paddingLeft: '4%',
                        paddingBottom: '2%',
                      }}>
                      <Image
                        style={{
                          width: 40,
                          height: 40,
                          objectFit: 'contain',
                          resizeMode: 'contain',
                          borderRadius: 40,
                          // marginRight: 10,
                        }}
                        source={
                          item.avatar
                            ? {
                                uri: `${BASE_BACKEND_URL}/message/file/binary?fileId=${item?.avatar}&page=1`,
                              }
                            : GroupPic
                        }
                      />

                      <View>
                        <Text
                          style={{
                            color: 'gray',
                            fontSize: 10,
                            paddingLeft: '2%',
                          }}>
                          "
                          <Text
                            style={{
                              color: 'black',
                              fontWeight: 'bold',
                              fontSize: 13,
                              paddingLeft: '2%',
                            }}>
                            {item.username}
                          </Text>
                          " shares a group "
                          <Text
                            style={{
                              color: 'black',
                              fontWeight: 'bold',
                              fontSize: 13,
                              paddingLeft: '2%',
                            }}>
                            {item.groupName}
                          </Text>
                          " with you.
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center',
                        paddingLeft: '4%',
                        paddingBottom: '2%',
                      }}>
                      <Image
                        style={{
                          width: 40,
                          height: 40,
                          objectFit: 'contain',
                          resizeMode: 'contain',
                          borderRadius: 40,
                          // marginRight: 10,
                        }}
                        source={
                          item.avatar
                            ? {
                                uri: `${BASE_BACKEND_URL}/message/file/binary?fileId=${item?.avatar}&page=1`,
                              }
                            : ProfilePic
                        }
                      />
                      <Text
                        style={{
                          color: 'black',
                          fontWeight: 'bold',
                          fontSize: 13,
                          paddingLeft: '2%',
                        }}>
                        {item.username}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            }
          }}
          onEndReachedThreshold={0}
          onEndReached={() => {
            loadNextPage();
            console.log(13);
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              justifyContent: 'center',
              color: 'gray',
            }}>
            Couldn't find a match with " {searchTerm}"
          </Text>
        </View>
      )}
    </View>
  );
}
export default Search;
