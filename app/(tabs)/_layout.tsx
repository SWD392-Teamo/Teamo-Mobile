import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { colors } from '@/constants/colors';
import TabIcon from '@/components/ui/TabIcon';
import { icons } from '@/constants';
import TabHeader from '@/components/TabHeader';

export default function TabLayout() {
  return (
    <>
      <TabHeader />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.light.tint,
          tabBarInactiveTintColor: colors.light.icon,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          sceneStyle: {
            backgroundColor: colors.light.background
          },
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {
              paddingBottom: 10,
              paddingTop: 10,
              height: 60,
              borderTopWidth: 1,
            },
          }),
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => <TabIcon
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />,
          }}
        />
        <Tabs.Screen
          name="groups"
          options={{
            title: 'My Groups',
            tabBarIcon: ({ color, focused }) => <TabIcon
              icon={icons.group}
              color={color}
              name="My Groups"
              focused={focused}
            />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => <TabIcon
              icon={icons.profile}
              color={color}
              name="Profile"
              focused={focused}
            />
          }}
        />
      </Tabs>
    </>
  );
}
