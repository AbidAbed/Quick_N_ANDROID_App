import {
  Image,
  Keyboard,
  PermissionsAndroid,
  Platform,
  Text,
  View,
} from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import Welcome from '../Pages/Welcome';
import Conversations from '../Pages/Conversations';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Announcements from '../Pages/Announcements';
import Profile from '../Pages/Profile';
import Logout from '../Pages/Logout';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Button from './Button';
import style from '../AppStyling';
import logoImg from '../Assets/logo.png';
import {changeIsLoggedIn, changePath} from '../Store/StoreInterface';
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
import ThreeDotsIcon from 'react-native-vector-icons/Entypo';
import {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import Search from '../Pages/Search';
import Input from './Input';
import BackIcon from 'react-native-vector-icons/Ionicons';

function Root() {
  ///////////////////// CONFIGS //////////////////////////////////

  const navigationRef = useNavigationContainerRef();
  const dispatch = useDispatch();
  const animatedValue = new Animated.Value(0);

  /////////////////////// USESELECTERS ///////////////////////////
  const {path, isLoggedIn} = useSelector(state => state.config);
  const {selectedConversationId} = useSelector(state => state.config);

  ///////////////////////////// STATES //////////////////////////////
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchPressed, setIsSearchPressed] = useState(false);
  const [prevSearchTerm, setPrevSearchTerm] = useState('');
  /////////////////////// HOOKS ///////////////////////////
  function navigateToPath(path) {
    dispatch(changePath(path));
  }

  async function reqPerm() {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    );
  }

  function handleSearch() {
    setIsSearchPressed(true);
    setPrevSearchTerm(searchTerm);
  }
  //////////////////////// USEEFFECTS ////////////////////////////////

  useEffect(() => {
    if (Platform.OS === 'android') reqPerm();
    animatedValue.addListener(value => {
      // Do something with the animated value when it updates
      console.log('Animated value updated:', value);
    });

    // Clean up the listener when the component unmounts
    return () => {
      animatedValue.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (path === 'Search') {
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setIsSearchFocused(false);
        },
      );

      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setIsSearchFocused(true);
        },
      );

      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    } else {
      setPrevSearchTerm('');
    }
  }, [path]);
  ////////////////////// RETURNED COMPONENTS //////////////////////

  return (
    <View style={{backgroundColor: 'white'}}>
      {/**BANNER IF USER IS LOGGEDIN */}
      {isLoggedIn && selectedConversationId === null ? (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            backgroundColor: '#058095',
            height: isSearchFocused ? '15%' : '10%',
          }}>
          {path !== 'Search' ? (
            <>
              <View
                style={{
                  backgroundColor: '#058095',
                  // paddingLeft: '4%',
                  // paddingTop: '2%',
                  width: '50%',
                  height: '100%',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    width: '50%',
                    height: '41%',
                    alignSelf: 'center',
                  }}>
                  <Image
                    source={logoImg}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#058095',
                  justifyContent: 'flex-end',
                  width: '50%',
                  paddingRight: '2%',
                  paddingTop: '2%',
                }}>
                <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                  {/**TODO SEARCH */}
                  <Button
                    icon={<SearchIcon name="search1" size={20} color="white" />}
                    onPress={() => navigateToPath('Search')}
                  />
                  <Menu>
                    <MenuTrigger>
                      <View
                        style={{
                          justifyContent: 'center',
                        }}>
                        <ThreeDotsIcon
                          name="dots-three-vertical"
                          size={20}
                          color="white"
                        />
                      </View>
                    </MenuTrigger>

                    <MenuOptions
                      optionsContainerStyle={{
                        marginTop: '4%',
                        borderRadius: 7,
                        alignItems: 'flex-start',
                        backgroundColor: 'red',
                        marginRight: '4%',
                        position: 'relative',
                      }}
                      style={{
                        backgroundColor: 'white',
                        flexDirection: 'column',
                        borderRadius: 7,
                        flex: 1,
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        marginRight: '5%',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                      }}>
                      <MenuOption
                        // style={{backgroundColor: 'red'}}
                        onSelect={() => {
                          navigateToPath('Profile');
                        }}>
                        <Text
                          style={{
                            fontSize: 10,
                            color: 'black',
                          }}>
                          Profile
                        </Text>
                      </MenuOption>
                      <MenuOption
                        onSelect={() => {
                          navigateToPath('Logout');
                        }}>
                        <Text
                          style={{
                            fontSize: 10,
                            color: 'black',
                          }}>
                          Logout
                        </Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              </View>
            </>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                gap: 5,
                paddingRight: '2%',
                paddingLeft: '2%',
              }}>
              <Button
                icon={
                  <BackIcon name="arrow-back-outline" size={20} color="white" />
                }
                onPress={() => navigateToPath('Conversations')}
              />
              <Input
                value={searchTerm}
                onChange={setSearchTerm}
                style={[style.inputForm, {flex: 1}]}
                placeHolder={'Serach'}
              />
              {searchTerm !== '' && (
                <Button
                  text="search"
                  onPress={handleSearch}
                  styleButton={[style.submitFormButton]}
                  styleText={[
                    style.submitFormButtonText,
                    {
                      color: 'white',
                      opacity: prevSearchTerm === searchTerm ? 0.5 : 1,
                    },
                  ]}
                  disabled={prevSearchTerm === searchTerm}
                />
              )}
            </View>
          )}
        </View>
      ) : (
        false
      )}

      <View style={{width: '100%', height: '100%'}}>
        <NavigationContainer ref={navigationRef}>
          <Tab.Navigator
            initialRouteName={isLoggedIn ? 'Conversations' : 'Welcome'}
            backBehavior="history"
            screenOptions={{
              tabBarStyle: {
                backgroundColor: '#058095',
              },
              tabBarActiveTintColor: 'white',
              // tabBarInactiveTintColor: 'white',
              tabBarIndicatorStyle: {
                backgroundColor: '#0e6e82',
                borderBottomWidth: 5,
                borderBottomColor: 'white',
              },
              tabBarIndicatorContainerStyle: {
                backgroundColor: '#058095',
              },
              tabBarItemStyle: {
                // backgroundColor: '#0e6e82',
              },
            }}>
            <Tab.Screen name="Conversations" options={{title: 'Conversations'}}>
              {() => (
                <Stack.Navigator
                  backBehavior="history"
                  initialRouteName="Conversations-child"
                  screenOptions={{
                    // animationEnabled: false,
                    tabBarStyle: {
                      backgroundColor: '#058095',
                    },
                    // tabBarItemStyle: {
                    //   // backgroundColor: '#0e6e82',
                    // },
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: 'white',
                    tabBarIndicatorStyle: {
                      backgroundColor: '#058095',

                      borderBottomWidth: 5,
                      borderBottomColor: 'white',
                    },
                  }}>
                  {!isLoggedIn && (
                    <Stack.Screen
                      component={Welcome}
                      name="Welcome"
                      options={{headerShown: false, title: 'Welcome'}}
                    />
                  )}

                  {isLoggedIn && (
                    <Tab.Screen
                      name="Conversations-child"
                      component={Conversations}
                      options={{
                        headerShown: false,
                        title: 'Conversations-child',
                      }}
                    />
                  )}

                  {isLoggedIn && (
                    <Tab.Screen
                      name="Profile"
                      component={Profile}
                      options={{headerShown: false, title: 'Profile'}}
                    />
                  )}
                  {isLoggedIn && (
                    <Tab.Screen
                      name="Logout"
                      component={Logout}
                      options={{headerShown: false, title: 'Logout'}}
                    />
                  )}

                  {isLoggedIn && (
                    <Tab.Screen
                      name="Search"
                      options={{
                        headerShown: false,
                        title: 'Search',
                      }}>
                      {() => (
                        <Search
                          searchTermParent={searchTerm}
                          isSearchPressed={isSearchPressed}
                          setIsSearchPressed={setIsSearchPressed}
                        />
                      )}
                    </Tab.Screen>
                  )}
                </Stack.Navigator>
              )}
            </Tab.Screen>
            {/** options for placing icons */}

            {/* {!isLoggedIn && <Tab.Screen name="Welcome" component={Welcome} options={{ title: "Welcome" }} />} */}

            {/**HIDDEN ROUTES , CAN BE ACCESSED ONLY FROM THE MENU*/}

            {/**DISABLE NAVIGATION TO ANNOUNCEMENTS IF USER OPENED A CHAT */}

            {selectedConversationId === null &&
            path !== 'Profile' &&
            path !== 'Logout' &&
            path !== 'Search' &&
            isLoggedIn ? (
              <Tab.Screen
                name="Announcements"
                component={Announcements}
                options={{title: 'Announcements'}}
              />
            ) : (
              false
            )}

            {!isLoggedIn && (
              <Tab.Screen
                name="Login"
                component={Login}
                options={{title: 'Login'}}
              />
            )}
            {!isLoggedIn && (
              <Tab.Screen
                name="Signup"
                component={Signup}
                options={{title: 'Signup'}}
              />
            )}
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}
export default Root;
