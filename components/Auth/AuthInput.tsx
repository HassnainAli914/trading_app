import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Eye, EyeOff, LucideIcon } from 'lucide-react-native';
import { useThemeStore } from '../../store/useThemeStore';

interface AuthInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  textContentType?: 'none' | 'username' | 'password' | 'emailAddress' | 'name' | 'givenName' | 'familyName' | 'location' | 'fullStreetAddress' | 'addressCity' | 'addressState' | 'postalCode' | 'telephoneNumber' | 'creditCardNumber' | 'newPassword' | 'oneTimeCode';
  autoComplete?: 'email' | 'username' | 'password' | 'name' | 'tel' | 'street-address' | 'new-password' | 'off';
  icon?: LucideIcon;
  error?: string;
  className?: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType = 'default',
  textContentType = 'none',
  autoComplete = 'off',
  icon: Icon,
  error,
  className = '',
}) => {
  const { isDarkMode } = useThemeStore();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getBorderColor = () => {
    if (error) return 'border-red-500';
    if (isFocused) return 'border-[#22C55E]';
    return isDarkMode ? 'border-white/10' : 'border-black/5';
  };

  const getBgColor = () => {
    if (isFocused) return isDarkMode ? 'bg-white/[0.05]' : 'bg-black/[0.03]';
    return isDarkMode ? 'bg-[#121212]' : 'bg-gray-50';
  };

  return (
    <View className={`w-full mb-5 ${className}`}>
      <Text className={`text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
        {label}
      </Text>
      
      <View 
        className={`flex-row items-center h-14 px-4 rounded-2xl border-[1.5px] transition-all duration-300 ${getBorderColor()} ${getBgColor()}`}
        style={isFocused ? {
          shadowColor: '#22C55E',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: isDarkMode ? 0.2 : 0.1,
          shadowRadius: 10,
          elevation: isDarkMode ? 4 : 2,
        } : {}}
      >
        {Icon && (
          <Icon 
            size={20} 
            color={isFocused ? '#22C55E' : (isDarkMode ? '#888888' : '#A0A0A0')} 
            strokeWidth={2}
            className="mr-3"
          />
        )}
        
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selectionColor="#22C55E"
          textContentType={textContentType}
          autoComplete={autoComplete}
          importantForAutofill="yes"
          className={`flex-1 h-full text-base font-semibold ${isDarkMode ? 'text-white bg-transparent' : 'text-black bg-transparent'}`}
          style={Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : {}}
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-2">
            {showPassword ? (
              <EyeOff size={20} color={isDarkMode ? '#888888' : '#A0A0A0'} />
            ) : (
              <Eye size={20} color={isDarkMode ? '#888888' : '#A0A0A0'} />
            )}
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text className="text-red-500 text-[10px] font-bold mt-1 ml-1">{error}</Text>}
    </View>
  );
};
