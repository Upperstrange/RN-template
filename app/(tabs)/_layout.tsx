import TabBar from '@/components/TabBar';
import { Tabs } from 'expo-router';

export default function TabLayout() {

  return (
    <Tabs tabBar={(props) => <TabBar {...props} activeColor="#FFF" inactiveColor="#222" />}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false
        }}
      />
    </Tabs>
  );
}
