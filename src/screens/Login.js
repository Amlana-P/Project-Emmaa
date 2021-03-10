import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from 'firebase';

export default class Login extends React.Component{    
    //constructor
    constructor(props){
        super(props)
        
        this.state = {
            email: '',
            password: ''
        }
    }
    
    
    logInUser = (email, password, navigate) => {
        try{
            if(this.state.email.length < 1 ){
                alert('Please enter a valid Email!');
                return;
            } else if(this.state.password.length < 6){
                alert(' Password should be of atleast 6 characters.');
            }  else{
                firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
                    // console.log(user);
                    alert('Log in successful!');
                    navigate('Dashboard', {  
                        userMail: this.state.email,
                        userPassword: this.state.password
                    });
                })
            }
        } catch(error) {
            console.log(error);
        }
    };
    
    render(){
        const {navigate} = this.props.navigation
        
        return (
            <View style={styles.container}>
            <View style={styles.intro}>
            <Image source={require('../images/icon.png')} style={styles.logo} />
            <Text style={styles.textHeading}>Project Emmaa</Text>
            <Text style={styles.tagLine}>Mirrors Redefined
            </Text>
            </View>
            <View style={styles.inputContainer}>
            <Icon name="mail" color="#00716F" size={24} />
            <TextInput style={styles.input} placeholder={'Email'} onChangeText={email => this.setState({email})} />
            </View>
            <View style={styles.inputContainer}>
            <Icon name="lock" color="#00716F" size={24} />
            <TextInput style={styles.input} secureTextEntry={true} placeholder={'Password'} onChangeText={password => this.setState({password})} />
            </View>
            <View style={styles.button}>
            <Text style={styles.buttonText} onPress={() => this.logInUser(this.state.email, this.state.password, navigate)} >Login</Text>
            </View>
            <Text style={styles.newUser} onPress={() => navigate('Register')}>New User</Text>
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
            height: "45%"
        },
        textHeading: {
            fontSize: 30,
            fontFamily:'CaviarDreams',
            alignSelf:'center',
            paddingTop: '5%'
        },
        tagLine: {
            fontFamily: 'Roboto',
            marginHorizontal: '5%',
            textAlign: 'center',
            justifyContent: 'center',
            opacity: 0.6
        },
        inputContainer: {
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
            marginTop: '5%',
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
        newUser: {
            alignItems: 'center',
            color: '#00716f',
            fontFamily: 'Roboto',
            textAlign: 'center',
            marginTop: '2%',
            opacity: 0.8
        }
    });