import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useUserStore } from '../store/useUserStore'
import { RootStackParamList } from '../types'
import MainTabNavigator from './MainTabNavigator'
import TrackSelectScreen from '../screens/TrackSelectScreen'
import OnboardingScreen from '../screens/OnboardingScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootNavigator() {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated)
  const progress = useUserStore((s) => s.progress)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : !progress ? (
          <Stack.Screen name="TrackSelect" component={TrackSelectScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}