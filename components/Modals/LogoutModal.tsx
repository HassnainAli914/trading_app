import React from 'react';
import { View, Text, TouchableOpacity, Platform, useWindowDimensions } from 'react-native';
import { useThemeStore } from '../../store/useThemeStore';
import { useAuthStore } from '../../store/useAuthStore';
import { LogOut, X } from 'lucide-react-native';

export const LogoutModal = () => {
  const { isDarkMode } = useThemeStore();
  const { isLogoutModalVisible, setLogoutModalVisible, logout } = useAuthStore();
  const { width, height } = useWindowDimensions();

  if (!isLogoutModalVisible) return null;

  const handleLogout = () => {
    logout();
  };

  const handleCancel = () => {
    setLogoutModalVisible(false);
  };

  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const secondaryColor = isDarkMode ? 'text-white/40' : 'text-black/40';

  return (
    <View 
      className="justify-center items-center px-8 bg-black/60"
      style={{
        position: Platform.OS === 'web' ? 'fixed' : 'absolute',
        top: 0,
        left: 0,
        width: Platform.OS === 'web' ? '100vw' : width,
        height: Platform.OS === 'web' ? '100vh' : height,
        zIndex: 10000,
      } as any}
    >
      <View 
        className={`w-full max-w-[340px] p-8 rounded-[32px] border-[1px] items-center ${isDarkMode ? 'bg-[#121212] border-white/10' : 'bg-white border-black/5'}`}
        style={!isDarkMode ? {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 20 },
          shadowOpacity: 0.1,
          shadowRadius: 30,
          elevation: 10
        } : {}}
      >
        {/* Close Icon (Top Right) */}
        <TouchableOpacity 
          onPress={handleCancel}
          className="absolute top-4 right-4 p-2"
        >
          <X size={20} color={isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'} />
        </TouchableOpacity>

        {/* Logout Icon */}
        <View className="w-16 h-16 bg-red-500/10 rounded-2xl items-center justify-center mb-6">
          <LogOut size={32} color="#EF4444" strokeWidth={2.5} />
        </View>

        {/* Content */}
        <Text className={`${textColor} text-2xl font-black mb-2 tracking-tight text-center`}>
          Are you sure?
        </Text>
        <Text className={`${secondaryColor} text-sm font-medium text-center mb-8 leading-5`}>
          You will need to sign in again to access your premium ICT strategies.
        </Text>

        {/* Actions */}
        <View className="w-full gap-3">
          <TouchableOpacity 
            onPress={handleLogout}
            className="bg-red-500 h-14 rounded-2xl items-center justify-center w-full shadow-lg shadow-red-500/30"
            activeOpacity={0.8}
          >
            <Text className="text-white font-black text-base">Logout Now</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleCancel}
            className={`h-14 rounded-2xl items-center justify-center w-full border-[1.5px] ${isDarkMode ? 'border-white/10' : 'border-black/5'}`}
            activeOpacity={0.7}
          >
            <Text className={`${textColor} font-bold text-sm`}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
