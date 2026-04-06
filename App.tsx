import React from 'react';
import './global.css';
import { AppNavigator } from './navigation/AppNavigator';
import { LogoutModal } from './components/Modals/LogoutModal';

export default function App() {
  return (
    <>
      <AppNavigator />
      <LogoutModal />
    </>
  );
}
