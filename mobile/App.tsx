import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Nunito_600SemiBold,Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito'
  
import {useFonts} from 'expo-font'

import Routes from './src/routes';

export default function App() {

  const [fonstsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  });

  if(!fonstsLoaded){
    return null
  }
 
  return (
    <Routes/>
  );
}