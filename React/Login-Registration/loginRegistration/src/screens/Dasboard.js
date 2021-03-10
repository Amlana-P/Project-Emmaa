import { Button } from 'native-base';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Image, Platform } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Avatar, Title, Caption } from 'react-native-paper';
import * as firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';

const preferenceOptions = require('./Preference.json');


class HomeScreen extends React.Component {
  
    uploadImage = async (uri, imageUID) => {
      const response = await fetch(uri);
      const blob = await response.blob();

      var ref = firebase.storage().ref().child('images/' + imageUID)
      return ref.put(blob);
    }
    saveImage = async () => {
      let result = await ImagePicker.launchCameraAsync();
      var user = firebase.auth().currentUser;
      

      if(!result.cancelled) {
        this.uploadImage(result.uri, user.uid).then(() => {
          alert('Image uploaded successfully!');
        }).catch((error) => {
          alert('Failed to upload image.');
          console.log('error' + error);});
      }
    }

    render() {
      return(
      <SafeAreaView style={styles.container} >
       <Button full style={{borderRadius: 24, paddingHorizontal: '2%', marginTop: '150%'}} onPress={() => {this.saveImage()}} color="#ff5c5c" ><Text style={{color: '#fff'}}>Upload Image</Text></Button>
      </SafeAreaView>
      )
    }
    
    
  }
  
  class ProfileScreen extends React.Component {
    
    logOutUser = async (navigate) => {
      try{
        await firebase.auth().signOut();
        alert('Logged out successfully!');
        navigate('Login');
        
      } catch(error) {
        console.log(error);
      }
    };

    render() {
      var user = firebase.auth().currentUser;
      
      const {navigate} = this.props.navigation
      console.log(user);
      
      return (
        <SafeAreaView style={styles.container}>
        <View style={styles.userInfoSection}>
        <Avatar.Image source={require('../images/user_icon.png')} size={80} />
        <View style={{marginLeft: 10, marginTop: 15}}>
        <Title style={styles.title} >{user.displayName}</Title>
        <Caption style={styles.caption} >@amlana_p</Caption>
        </View>
        </View>
        <View style={styles.userInfoSection}>
        <View style={styles.row}>
        <Icon name='location-outline' color='#777777' size={20} />
        <Text style={styles.rowText}>Odisha, India</Text>
        </View>
        </View>
        <View style={styles.userInfoSection}>
        <View style={styles.row}>
        <Icon name='call-outline' color='#777777' size={20} />
        <Text style={styles.rowText}>{user.phoneNumber}</Text>
        </View>
        </View>
        <View style={styles.userInfoSection}>
        <View style={styles.row}>
        <Icon name='mail-outline' color='#777777' size={20} />
        <Text style={styles.rowText}>{user.email}</Text>
        </View>
        </View>
        <View style={styles.menuWrapper}>
        <TouchableOpacity onPress={() => {}}>
        <View style={styles.menuItem}>
        <Icon name="heart-outline" color="#FF6347" size={25}/>
        <Text style={styles.menuItemText}>Anime</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
        <View style={styles.menuItem}>
        <Icon name='musical-notes-outline' color="#FF6347" size={25}/>
        <Text style={styles.menuItemText}>Music</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
        <View style={styles.menuItem}>
        <Icon name="book-outline" color="#FF6347" size={25}/>
        <Text style={styles.menuItemText}>Books</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
        <View style={styles.menuItem}>
        <Icon name="cash-outline" color="#FF6347" size={25}/>
        <Text style={styles.menuItemText}>Money</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
        <View style={styles.menuItem}>
        <Icon name="chatbubbles-outline" color="#FF6347" size={25}/>
        <Text style={styles.menuItemText}>Gossips</Text>
        </View>
        </TouchableOpacity>
        </View>
        <Text style={styles.signOutText} onPress={() => this.logOutUser(navigate)} >Sign out</Text>
        </SafeAreaView>
        )
      }
    }
    
    class PreferenceScreen extends React.Component {
      
      constructor(props){
        super(props);
        this.state = {
          data:preferenceOptions,
          selectedPreferences: []
        };
      }
      
      onChecked(id){
        const data = this.state.data
        const index = data.findIndex(x => x.id === id);
        data[index].checked = !data[index].checked
        this.setState(data)
      }
      
      renderPreferences() {
        return this.state.data.map((item, key)=>{
          return(
            <TouchableOpacity key={key} style={styles.options} onPress={()=> {this.onChecked(item.id)}} >
            <CheckBox value={item.checked} onValueChange={() => {this.onChecked(item.id)}} />
            <Text style={styles.key}>{item.key}</Text>
            </TouchableOpacity>
            )
          })
        }
        
        
        writePreferences() {
          var user = firebase.auth().currentUser;
          var user_id = user.uid;
          var user_mail = user.email;
          
          //const {navigation} = this.props
          var keys = this.state.data.map((t) => t.key)
          var checks = this.state.data.map((t) => t.checked)
          //const userMail = navigation.getParam('userMail', 'NO-Mail');  
          let selected = []
          let preference = ''
          for(let i=0; i<checks.length;i++){
            if(checks[i] == true){
              selected.push(keys[i])
              preference = preference + keys[i] + ', '
            }
          }
          
          firebase.database().ref('users/'+user_id).update({
            user_email: user_mail,
            user_preference: preference
          })
          
          
          alert(selected + ' have been saved!')
          
        }
        
        render() {
          return (
            <SafeAreaView style={styles.container}>
            {this.renderPreferences()}
            <Button full style={{borderRadius: 24, paddingHorizontal: '2%', marginTop: 20}} onPress={() => {this.writePreferences()}} color="#ff5c5c" ><Text style={{color: '#fff'}}>Save Preferences</Text></Button>
            </SafeAreaView>
            )
          }
        }
        
        
        const styles = StyleSheet.create({
          container: {
            flex: 1,
            marginTop:StatusBar.currentHeight,
            paddingHorizontal: '10%'
          },
          signOutText: {
            fontFamily: 'Roboto',
            fontSize: 15,
            color: '#000',
          },
          options: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5
          },
          key: {
            marginHorizontal: 20
          },
          row: {
            flexDirection: 'row'
          },
          rowText: {
            marginLeft: 10,
            color:'#777777'
          },
          userInfoSection: {
            flexDirection: 'row',
            paddingHorizontal: 10,
            marginBottom: 25,
          },
          title: {
            fontSize: 24,
            fontWeight: '600',
          },
          caption: {
            fontSize: 14,
            lineHeight: 14,
            fontWeight: '500',
          },
          menuWrapper: {
            marginVertical: 10,
          },
          menuItem: {
            flexDirection: 'row',
            paddingVertical: 5
          },
          menuItemText: {
            color: '#777777',
            marginLeft: 20,
            fontWeight: '600',
            fontSize: 16,
            lineHeight: 26,
          }
        });
        
        const TabNavigator = createMaterialBottomTabNavigator(
          {
            Home: {screen: HomeScreen, navigationOptions: {
              tabBarIcon: ({ tintColor }) => ( <Icon name="home" color={tintColor} size={25} />  )
            }},
            Profile: {screen: ProfileScreen, navigationOptions: {
              tabBarIcon: ({ tintColor }) => ( <Icon name="person" color={tintColor} size={25} />  )
            }},
            PreferenceScreen: {screen: PreferenceScreen, navigationOptions: {
              tabBarLabel: 'Preference',
              tabBarIcon: ({ tintColor }) => ( <Icon name="timer" color={tintColor} size={25} />  )
            }},
          },
          {
            showLabel: false,
            initialRouteName: 'Home',
            activeColor: '#f0edf6',
            inactiveColor: '#E0E0E0',
            barStyle: { backgroundColor: '#00716f' }, 
          }
          );
          
          export default createAppContainer(TabNavigator);