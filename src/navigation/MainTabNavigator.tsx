import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { MainTabParamList } from '../types'
import HomeScreen from '../screens/HomeScreen'
import LearnScreen from '../screens/LearnScreen'
import ProgressScreen from '../screens/ProgressScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { Text } from 'react-native'

const Tab = createBottomTabNavigator<MainTabParamList>()

const icon = (name: string) => (
  <Text style={{ fontSize: 20 }}>{name}</Text>
)

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0.5,
          borderTopColor: '#E0E0E0',
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarActiveTintColor: '#534AB7',
        tabBarInactiveTintColor: '#888780',
        tabBarLabelStyle: { fontSize: 10 },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => icon('⌂') }} />
      <Tab.Screen name="Learn" component={LearnScreen} options={{ tabBarIcon: () => icon('◈') }} />
      <Tab.Screen name="Progress" component={ProgressScreen} options={{ tabBarIcon: () => icon('◎') }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: () => icon('◯') }} />
    </Tab.Navigator>
  )
}