import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { colors } from '@/constants/colors';
import TabIcon from '@/components/ui/TabIcon';
import { icons } from '@/constants';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors['light'].tint,
        tabBarInactiveTintColor: colors['light'].icon,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
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
        name="majors/index"
        options={{
          title: 'Major',
          tabBarIcon: ({ color, focused }) => <TabIcon
            icon={icons.major}
            color={color}
            name="Major"
            focused={focused}
          />,
        }}
      />
      <Tabs.Screen
        name="groups/index"
        options={{
          title: 'Your Group',
          tabBarIcon: ({ color, focused }) => <TabIcon
            icon={icons.group}
            color={color}
            name="Your Group"
            focused={focused}
          />,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => <TabIcon
            icon={icons.profile}
            color={color}
            name="Profile"
            focused={focused}
          />,
        }}
      />
      <Tabs.Screen
        name="applications/index"
        options={{
          title: 'Application',
          tabBarIcon: ({ color, focused }) => <TabIcon
            icon={icons.application}
            color={color}
            name="Application"
            focused={focused}
          />,
        }}
      />
    </Tabs>
  );
}
