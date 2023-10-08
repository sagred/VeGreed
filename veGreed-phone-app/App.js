import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TransitionSpecs, createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ScanScreen from './screens/ScanScreen';
import { Ionicons } from '@expo/vector-icons';
import IdentityScreen from './screens/IdentityScreen';
import NetworkScreen from './screens/NetworkScreen';
import ProductScreen from './screens/ProductScreen';
import { useFonts } from "expo-font"


const Stack = createStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'PixelifySans': require('./assets/fonts/PixelifySans-Bold.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <></>
  } else {

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Credentials" screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,  // remove shadow on Android
            shadowOpacity: 0,  // remove shadow on iOS  // Set header background color to black
          },
          headerTintColor: '#000',  // Set header text color to white
          headerTitleStyle: {
            fontWeight: '100',
          },

        }}>
          <Stack.Screen name="Credentials" component={HomeScreen}
            options={({ navigation }) => ({
              transitionSpec: {
                open: TransitionSpecs.TransitionIOSSpec,
                close: TransitionSpecs.TransitionIOSSpec,
              },
              title: 'VeGreed',
              headerTitleStyle: { fontFamily: "PixelifySans", fontSize: 36 },
              style: { fontWeight: '900' },
              headerRight: () => (
                <Ionicons name="ios-wallet" size={32} color="#000"
                  style={{ marginRight: 10, padding: 10 }}
                  onPress={() => navigation.navigate('Wallet')}  // Navigate to ProfileScreen on press
                />
              ),
            })} />
          <Stack.Screen name="Scan" component={ScanScreen} options={{
            transitionSpec: {
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec,
            },
            headerStyle: {
              backgroundColor: '#000',
              elevation: 0,  // remove shadow on Android
              shadowOpacity: 0,  // remove shadow on iOS  // Set header background color to black
            },
            headerTintColor: '#fff',  // Set header text color to white
            headerTitleStyle: {
              fontWeight: '100',
            },
          }} />
          <Stack.Screen name="Wallet" component={IdentityScreen}
            options={({ navigation }) => ({
              headerStyle: {
                backgroundColor: '#e6e6e9',
                elevation: 0,  // remove shadow on Android
                shadowOpacity: 0,  // remove shadow on iOS  // Set header background color to black
              },
              transitionSpec: {
                open: TransitionSpecs.TransitionIOSSpec,
                close: TransitionSpecs.TransitionIOSSpec,
              }
            })} />
          <Stack.Screen name="Network" component={NetworkScreen}
            options={({ navigation }) => ({
              headerStyle: {
                backgroundColor: '#e6e6e9',
                elevation: 0,  // remove shadow on Android
                shadowOpacity: 0,  // remove shadow on iOS  // Set header background color to black
              },
              transitionSpec: {
                open: TransitionSpecs.TransitionIOSSpec,
                close: TransitionSpecs.TransitionIOSSpec,
              }
            })} />

          <Stack.Screen name="Product" component={ProductScreen}
            options={({ navigation }) => ({
              transitionSpec: {
                open: TransitionSpecs.TransitionIOSSpec,
                close: TransitionSpecs.TransitionIOSSpec,
              }
            })} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}