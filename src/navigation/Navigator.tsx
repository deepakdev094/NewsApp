import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import NewsScreen from '../screens/NewsScreen'

const Stack = createNativeStackNavigator();

const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="splashScreen">
                <Stack.Screen
                    name="splashScreen"
                    component={SplashScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="newsScreen"
                    component={NewsScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;