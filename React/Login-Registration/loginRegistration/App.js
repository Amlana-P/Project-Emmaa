import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './src/navigations/Navigator'
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as firebase from 'firebase';
import { firebaseConfig } from './src/server/firebaseConfig'

export default class App extends React.Component {
  //constructor
  constructor(props){
    super(props)

// Initialize firebase
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
}

  // login status
  state = {
    isFontLoaded: false
  }
  
  async componentDidMount() {
    await Font.loadAsync({
      'CaviarDreams': require('./src/fonts/CaviarDreams.ttf'),
      'Roboto': require('./src/fonts/Roboto-Black.ttf'),
      'Garamond': require('./src/fonts/Garamond.ttf'),
    });
    this.setState({isFontLoaded: true})
  }

  // render method
  render() {
    return (
      this.state.isFontLoaded === true ? <AppNavigator /> : <AppLoading />
      )
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  