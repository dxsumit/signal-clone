import React, {useState, useEffect} from "react";
import {View, Image, StyleSheet, KeyboardAvoidingView, LogBox} from 'react-native';
import { Button, Text, Input, Icon } from '@rneui/themed';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Components/config";


LogBox.ignoreLogs([
    'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
  ]);
  


const Login = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [pass, setPassword] = useState("");

    useEffect( ()=> {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                navigation.replace("Home");
            }
        });

        return unsubscribe;
    }, []);


    const signIn = () => {
        signInWithEmailAndPassword(auth, email, pass).catch((err) => alert("cant login"))
        console.log("Logged IN");
    }

    
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}> 
            <Image 
                style={{width: 150, height: 150, resizeMode: 'contain'}}
                progressiveRenderingEnabled={true}
                source={{uri: 'https://pnggrid.com/wp-content/uploads/2021/05/Signal-Logo-1536x1536.png'}}
            />

            <View style={styles.input}>  
                <Input
                    value={email}
                    onChangeText={setEmail}
                    placeholder='Email'
                    type='email'
                    leftIcon={{ type: 'material-community', name: 'email-variant', color: '#494F55', size: 20 }}
                    inputStyle={{
                        fontSize: 17
                    }}
                />

                <Input
                    secureTextEntry
                    value={pass}
                    onChangeText={setPassword}
                    placeholder='Password'
                    type='password'
                    onSubmitEditing={signIn}
                    leftIcon={{ type: 'material-community', name: 'onepassword', color: '#494F55', size: 20 }}
                    inputStyle={{
                        fontSize: 17
                    }}
                    onen
                />
            </View>
            
            <Button title="Login" containerStyle={styles.btn} onPress={signIn}/>
            <Button title="Register" containerStyle={styles.btn} type='outline' onPress={() => navigation.navigate("Register")} />

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    btn: {
        width: 200,
        margin: 3
    },  
    input: {
        paddingVertical: 30,
        width: 330,
    }
}); 

export default Login;
