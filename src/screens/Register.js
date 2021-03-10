import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
  
export default class Register extends React.Component{
        //constructor
        constructor(props){
            super(props)
            
            this.state = {
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        }

        logInUser = async (name, email, password, navigate) => {
            try{ 
                await firebase.auth().signInWithEmailAndPassword(email, password).then(async (user) => {
                await firebase.auth().currentUser.updateProfile({displayName: name});
                    console.log(user);
                    alert('Log in successful!');
                    navigate('Dashboard');
                })
            } catch(error) {
                console.log(error);
            }
        };

        signUpUser = async (name, email, password, confirmPassword, navigate) => {
            try{
                if(this.state.name.length < 1){
                    alert('Please enter an username!')
                }
                else if(this.state.email.length < 1 ){
                    alert('Please enter a valid Email!');
                    return;
                } else if(password != confirmPassword){
                    alert('Password doesn\'t match.');
                } else if(this.state.password.length < 6){
                    alert('Passwrd should be of atleast 6 characters.');
                } else {
                    await firebase.auth().createUserWithEmailAndPassword(email, password);
                    alert('Registration Successful!');
                    this.logInUser(name, email, password, navigate);
                } 
            } catch(error) {
                console.log(error.toString());
            }
        };
    
    render(){

        const {navigate} = this.props.navigation
        
        return (
            <View style={styles.container}>
            <View style={styles.intro}>
                <Image source={require('../images/icon.png')} style={styles.logo} />
            </View>
            <View style={styles.inputContainer}>
            <View style={styles.inputField}>
                <TextInput style={styles.input} placeholder= {'Name'} placeholderTextColor={'#00716f'} onChangeText={name => this.setState({name})} />
            </View>
            <View style={styles.inputField}>
                <TextInput style={styles.input} placeholder= {'Email'} placeholderTextColor={'#00716f'} onChangeText={email => this.setState({email})} />
            </View>
            <View style={styles.inputField}>             
                <TextInput style={styles.input} placeholder= {'Password'} placeholderTextColor={'#00716f'} secureTextEntry={true} onChangeText={password => this.setState({password})} />
            </View>
            <View style={styles.inputField}>                
                <TextInput style={styles.input} placeholder= {'Confirm Password' } placeholderTextColor={'#00716f'} secureTextEntry={true} onChangeText={confirmPassword => this.setState({confirmPassword})} />
            </View>
            <View style={styles.button}>
            <Text style={styles.buttonText} onPress={() => this.signUpUser(this.state.name, this.state.email, this.state.password, this.state.confirmPassword, navigate)}>Register</Text>
            </View>
            <Text style={styles.logIn} onPress={() => navigate('Login')}>Log in</Text>
            </View>
            </View>
            )
        }
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#fff",
            height: "100%"
        },
        intro: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        logo: {
            width: "80%",
            height: "42%"
        },
        inputContainer: {
            flex: 1,
            borderTopWidth: 5,
            borderStartWidth: 1,
            borderTopLeftRadius: 40,
            borderRightWidth: 1,
            borderTopRightRadius: 40,
            borderColor:  '#00716f'
        },
        inputField: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 2,
            marginTop: '5%',
            marginHorizontal: '10%',
            paddingHorizontal: '2%',
            borderColor: '#00716f',
            borderRadius: 23
        },
        input: {
            paddingHorizontal: 10
        },
        button: {
            alignItems: 'center',
            justifyContent: 'center', 
            borderWidth: 2, 
            marginTop: '8%',
            marginHorizontal: '10%',
            borderColor: '#00716f',
            borderRadius: 23,
            backgroundColor: '#00716f',
            paddingVertical: 5
        },
        buttonText: {
            fontFamily: 'Roboto',
            fontSize: 15,
            color: '#fff'
        },
        logIn: {
            alignItems: 'center',
            color: '#00716f',
            fontFamily: 'Roboto',
            textAlign: 'center',
            marginTop: '2%',
            opacity: 0.8
        }
      });