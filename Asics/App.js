import React from 'react';
import { Text } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Svg, Path, G } from 'react-native-svg';
import { Provider } from 'react-redux';
import store from './src/screens/store';
import Home from './src/screens/Home';
import Review from './src/screens/Review';
import Cart from './src/screens/Cart';
import Checkout from './src/screens/Checkout';
import Check from './src/screens/Check';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeIcon = () => (
  <Svg width="25" height="25" viewBox="0 0 24 24" fill="none">
    <Path d="M6 19H9V13H15V19H18V10L12 5.5L6 10V19ZM4 21V9L12 3L20 9V21H13V15H11V21H4Z" fill="#001E62"/>
  </Svg>
);


const CartIcon = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="25" height="25" viewBox="0 0 105.000000 105.000000" preserveAspectRatio="xMidYMid meet">
<G transform="translate(0.000000,105.000000) scale(0.100000,-0.100000)" fill="#001E62" stroke="none">
<Path d="M26 1024 c-9 -8 -16 -24 -16 -34 0 -41 25 -50 139 -50 l107 0 53 -312 c29 -172 61 -328 70 -347 32 -64 60 -71 286 -71 181 0 203 2 232 20 18 10 38 29 46 42 18 28 97 407 97 462 0 31 -7 46 -39 77 l-39 39 -210 0 c-207 0 -211 0 -226 -22 -20 -29 -20 -34 4 -58 19 -19 33 -20 210 -20 148 0 192 -3 196 -13 6 -18 -73 -396 -87 -413 -16 -19 -362 -20 -376 -1 -5 6 -31 138 -57 292 -62 362 -71 406 -88 416 -7 5 -75 9 -150 9 -111 0 -140 -3 -152 -16z"/>
<Path d="M572 654 c-12 -8 -22 -26 -22 -39 0 -41 34 -55 137 -55 80 0 96 3 113 20 11 11 20 27 20 35 0 8 -9 24 -20 35 -17 17 -33 20 -113 20 -68 0 -99 -4 -115 -16z"/>
<Path d="M586 484 c-19 -18 -21 -55 -4 -72 7 -7 43 -12 90 -12 72 0 79 2 94 25 15 23 15 27 0 50 -15 23 -23 25 -91 25 -54 0 -78 -4 -89 -16z"/>
<Path d="M477 130 c-14 -11 -29 -29 -32 -40 -9 -28 21 -79 51 -86 82 -21 129 92 54 131 -37 19 -42 19 -73 -5z"/>
<Path d="M790 143 c-43 -16 -66 -74 -42 -109 10 -15 47 -34 67 -34 24 0 65 46 65 73 0 44 -51 84 -90 70z"/>
</G>
</Svg>
);




const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen"
    screenOptions={{
       animation:'slide_from_bottom',
    }}>
      <Stack.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Review" component={Review} options={{ headerShown: false }} />
      <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
      <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
      <Stack.Screen name="Check" component={Check} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            
            tabBarIcon: ({ color, size }) => (
              route.name === 'Home'
                ? <HomeIcon width={size} height={size} color={color} />
                : <CartIcon width={size} height={size} color={color} />
            ),
            tabBarLabel: ({ focused, color }) => {
              let labelColor = focused ? '#001e62' : 'gray';
              return <Text style={{ color: labelColor }}>{route.name}</Text>;
            },
           
            
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
          <Tab.Screen name="Check" component={Check} options={{ headerShown: false }} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
