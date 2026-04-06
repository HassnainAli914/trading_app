import React from 'react';
import { View, ViewProps, SafeAreaView } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
  safeArea?: boolean;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, safeArea, className = '', ...props }) => {
  const { isDarkMode } = useThemeStore();
  const bgClass = isDarkMode ? 'bg-dark-primary' : 'bg-light-secondary';

  const Comp = safeArea ? SafeAreaView : View;

  return (
    <Comp className={`flex-1 ${bgClass} ${className}`} {...props}>
      {children}
    </Comp>
  );
};
