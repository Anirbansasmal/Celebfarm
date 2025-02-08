import React from 'react';
import {Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MyStatusBar from '../utils/MyStatusBar';

import {Icons, Colors, Fonts} from '../themes/Themes';
import normalise from '../utils/helpers/dimen';

// Tab Pages
import Home from '../Screens/main/Home/Home';
import Barter from '../Screens/main/Barter/Barter';
import Collaboration from '../Screens/main/Collaboration/Collaboration';
import ContentLab from '../Screens/main/Profile settings/Content Lab';
import Messages from '../Screens/main/Message/Chat';
import {Text} from 'react-native-animatable';
import {getSelectRequest} from '../redux/reducers/HomeUserReducer';
import {useDispatch, useSelector} from 'react-redux';
import Chat from '../Screens/main/Message/Chat';
import Profile from '../Screens/main/Profile settings/Profile';
export default function TabNavigator(props) {
  const Tab = createBottomTabNavigator();

  const dispatch = useDispatch();
  const HomeReducer = useSelector(state => state.HomeReducer);
  return (
    <SafeAreaProvider>
      <MyStatusBar backgroundColor={Colors.black} barStyle={'dark-content'} />
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarHideOnKeyboard: true,
          unmountOnBlur: true,
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: Colors.black,
            paddingTop: normalise(3),
            height: Platform.OS == 'ios' ? normalise(65) : normalise(50),
            width: '100%',
            borderColor: Colors.borderColor,
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 0,
            shadowColor: Colors.steel_l,
            shadowOffset: {width: 0, height: 6},
            shadowOpacity: 0.5,
            shadowRadius: 6,
            elevation: 10,
          },
        }}
        initialRouteName={'Home'}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Image
                  source={focused ? Icons.home_fill : Icons.home}
                  resizeMode="contain"
                  style={{
                    width: focused ? normalise(19) : normalise(19),
                    height: focused ? normalise(19) : normalise(19),
                  }}
                />
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalise(10),
                    fontFamily: Fonts.Inter_Light,
                    marginTop: normalise(3),
                  }}>
                  Home
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Barter"
          component={Barter}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center'}}>
                <Image
                  source={focused ? Icons.Productsoffers_fill : Icons.barter}
                  resizeMode="contain"
                  style={{
                    width: focused ? normalise(19) : normalise(18),
                    height: focused ? normalise(19) : normalise(18),
                  }}
                />
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalise(10),
                    fontFamily: Fonts.Inter_Medium,
                    marginTop: normalise(3),
                  }}>
                  Barter
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Collaboration"
          component={Collaboration}
          options={{
            tabBarIcon: ({focused}) => (
              dispatch(getSelectRequest(HomeReducer?.collabSelectResponse)), //=== "" || "Active" || HomeReducer?.collabSelectResponse=="" ? "Active":HomeReducer?.collabSelectResponse
              (
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={focused ? Icons.MyCollabs_fill : Icons.collab}
                    resizeMode="contain"
                    style={{
                      width: focused ? normalise(19) : normalise(19),
                      height: focused ? normalise(19) : normalise(19),
                    }}
                  />
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalise(10),
                      fontFamily: Fonts.Inter_Light,
                      marginTop: normalise(3),
                    }}>
                    My Collabs
                  </Text>
                </View>
              )
            ),
          }}
        />
        <Tab.Screen
          name="ContentLab"
          component={ContentLab}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center'}}>
                <Image
                  source={focused ? Icons.home_fill : Icons.home}
                  resizeMode="contain"
                  style={{
                    width: normalise(20),
                    height: normalise(20),
                  }}
                />
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalise(10),
                    fontFamily: Fonts.Inter_Light,
                    marginTop: normalise(3),
                  }}>
                  Content Lab
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Proifle"
          component={Profile}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center'}}>
                <Image
                  source={focused ? Icons.Profile_fill : Icons.profile}
                  resizeMode="contain"
                  style={{
                    width: focused ? normalise(19) : normalise(18),
                    height: focused ? normalise(19) : normalise(18),
                  }}
                />
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalise(10),
                    fontFamily: Fonts.Inter_Light,
                    marginTop: normalise(3),
                  }}>
                  Profile
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}

const style = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
    height: normalise(40),
    width: normalise(40),
    borderRadius: normalise(40),
  },
  sub: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
