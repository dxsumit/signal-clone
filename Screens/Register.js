import React, {useState} from "react";
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import { Button, Text, Input, Icon } from '@rneui/themed';
import { auth } from "../Components/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";



const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPassword] = useState("");
    const [imgUrl, setImgUrl] = useState(null);


    const register = () => {
        createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {

            updateProfile(userCredential.user, {
                displayName: name, 
                photoURL: imgUrl
            }).then(() => {
                console.log("profile Updated");

              }).catch((err) => {
                console.log("Could Not update user");
                console.log(err.message);
              });

        })
        .catch( (error => {
            alert(error.message);
        }))

        console.log('regstered');
    }

    
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}> 
            
            <Text h4 style={styles.header}> Create your Signal Account </Text>

            <View style={styles.input}>  
                <Input
                    value={name}
                    onChangeText={setName}
                    placeholder='Full Name'
                    type='text'
                    leftIcon={{ type: 'material-community', name: 'rename-box', color: '#494F55', size: 20 }}
                    inputStyle={{
                        fontSize: 17
                    }}
                />

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
                    value={pass}
                    onChangeText={setPassword}
                    placeholder='Password'
                    type='password'
                    leftIcon={{ type: 'material-community', name: 'onepassword', color: '#494F55', size: 20 }}
                    inputStyle={{
                        fontSize: 17
                    }}
                />

                <Input
                    value={imgUrl}
                    onChangeText={setImgUrl}
                    placeholder='Profile Picture'
                    leftIcon={{ type: 'material', name: 'photo-library', color: '#494F55', size: 20 }}
                    inputStyle={{
                        fontSize: 17
                    }}
                    onSubmitEditing={register}
                />

            </View>
            
            <Button title="Register" containerStyle={styles.btn} onPress={register}/>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    btn: {
        width: 200,
        margin: 3
    },  
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },  
    input: {
        paddingVertical: 30,
        width: 330,
    }
}); 

export default Register;
