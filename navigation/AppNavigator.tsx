import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { HomeScreen } from '../screens/HomeScreen';
import { CoursesScreen } from '../screens/CoursesScreen';
import { ChatListScreen } from '../screens/ChatListScreen';
import { ConversationScreen } from '../screens/ConversationScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ToolsScreen } from '../screens/ToolsScreen';
import { SubscriptionScreen } from '../screens/SubscriptionScreen';
import { MaterialScreen } from '../screens/MaterialScreen';
import CourseDetails from '../screens/CourseDetails';
import LessonPlayer from '../screens/LessonPlayer';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { ChartScreen } from '../screens/ChartScreen';
import { CustomDrawerContent } from '../components/CustomDrawerContent';
import { CustomTabBar } from '../components/CustomTabBar';
import { useThemeStore } from '../store/useThemeStore';
import { useAuthStore } from '../store/useAuthStore';
import { darkTheme, lightTheme } from '../theme/colors';

// Auth Screens
import { WelcomeScreen } from '../screens/Auth/WelcomeScreen';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { SignupScreen } from '../screens/Auth/SignupScreen';

const Tab = createBottomTabNavigator();
const ChatStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const ChatStackNavigator = () => {
  const { isDarkMode } = useThemeStore();
  
  return (
    <ChatStack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: isDarkMode ? darkTheme.secondary : lightTheme.secondary,
        },
        headerTintColor: isDarkMode ? darkTheme.text : lightTheme.text,
        headerShadowVisible: false,
      }}
    >
      <ChatStack.Screen 
        name="ChatList" 
        component={ChatListScreen} 
        options={{ title: 'Community Chat' }} 
      />
      <ChatStack.Screen 
        name="Conversation" 
        component={ConversationScreen} 
        options={({ route }: any) => ({ title: route.params?.name || 'Chat' })} 
      />
    </ChatStack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="ChatTab" component={ChatStackNavigator} options={{ tabBarLabel: 'Chat' }} />
      <Tab.Screen name="Tools" component={ToolsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
};

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="Tabs" component={TabNavigator} />
      <RootStack.Screen name="CourseDetails" component={CourseDetails} />
      <RootStack.Screen name="LessonPlayer" component={LessonPlayer} />
      <RootStack.Screen name="Notifications" component={NotificationsScreen} />
      <RootStack.Screen name="Chart" component={ChartScreen} />
      <RootStack.Screen name="Subscription" component={SubscriptionScreen} />
      <RootStack.Screen name="Material" component={MaterialScreen} />
    </RootStack.Navigator>
  );
};

export const AppNavigator = () => {
  const { isDarkMode } = useThemeStore();
  const { isAuthenticated } = useAuthStore();

  const navigationTheme = {
    ... (isDarkMode ? DarkTheme : DefaultTheme),
    colors: {
      ... (isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
      background: '#0A0A0A', // FORCED DARK BACKGROUND TO PREVENT LEAKS
      card: isDarkMode ? darkTheme.secondary : lightTheme.secondary,
      text: isDarkMode ? darkTheme.text : lightTheme.text,
      primary: isDarkMode ? darkTheme.accent : lightTheme.accent,
      border: isDarkMode ? darkTheme.secondary : '#121212', // FORCED DARK BORDER
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      {!isAuthenticated ? (
        <AuthStackNavigator />
      ) : (
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerShown: false,
            drawerType: 'slide',
            drawerStyle: {
              width: '80%',
              backgroundColor: '#121212', // FORCED DARK SIDÉBAR
            },
            overlayColor: 'rgba(0,0,0,0.7)', // FORCED DARK OVERLAY
          }}
        >
          <Drawer.Screen name="Main" component={RootStackNavigator} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
};
