import React, {useLayoutEffect, useState} from 'react';
import { Button, Text, Input, Icon } from '@rneui/themed';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from './config';


const AddChat = ({navigation}) => {

    const [name, setName] = useState('');

    useLayoutEffect( () => {
        navigation.setOptions({
            title: "Add Chats",
            headerTitleStyle: {color: "#fff"},
            headerTitleAlign: 'center',
            
        });
    }, [navigation]);


    const createChat = async () => {
        try {
            const docRef = await addDoc(collection(db, "chats"), {
                ChatName: name,
            });
            console.log("Document created ", docRef.id);
            navigation.goBack();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <View style={styles.container}>
            <Input
                value={name}
                onChangeText={setName}
                placeholder='Search Name'
                type='text'
                leftIcon={{ type: 'entypo', name: 'chat', color: '#494F55', size: 20 }}
                inputStyle={{
                    fontSize: 17
                }}
                onSubmitEditing={createChat}
            />

            <Button title="Create Chat" onPress={createChat} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        margin: 30
    }
});

export default AddChat;
