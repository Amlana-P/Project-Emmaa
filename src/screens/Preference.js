import React from 'react';
import {Text, View, StyleSheet} from 'react-native';


export default class Login extends React.Component{

    
    render(){
        const {navigate} = this.props.navigation
        
        return (
            <View style={styles.container}>
                <Text>Anime</Text>
                <Text>Sports</Text>
                <Text>Business</Text>
            </View>
            )
        }
    }
    
    
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#fff",
            height: "100%",
            justifyContent: 'center',
            alignItems: 'center'
        },
    });