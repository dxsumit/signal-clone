import React, {useLayoutEffect, useState, useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { Text, Avatar } from '@rneui/base';
import { Icon } from '@rneui/themed';
import Items from '../Components/ListItems';
import { auth, db } from "../Components/config";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";



const Home = ({navigation}) => {

    const [chats, setChats] = useState([]);

    useFocusEffect(
        useCallback(() => {
          let isActive = true;
        //   console.log('auto focued called')
      
          const getAllChats = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "chats"));
                let temp = []
                querySnapshot.forEach((doc) => {
                    temp = [...temp, { id: doc.id, data: doc.data() } ]
                })
                setChats(temp)
              
            } catch (e) {
              alert(e.message);
            }
          };
          getAllChats();
      
          return () => {
            isActive = false;
          };

        }, [])
    );




    const logOut = () => {
        signOut(auth).then( () =>{
            console.log("Signed out!")
            navigation.replace("Login");
            
        }).catch( (err) => {
            alert(err.message)
        });
        
    }


    // used to style the navigation haeder of perticular page
    useLayoutEffect( ()=> {
        navigation.setOptions({
            title: "Signal",
            headerTitleStyle: {color: "#404040"},
            headerStyle: {backgroundColor: '#fff'},
            headerTintColor: "#000000",
            headerTitleAlign: 'center',
            headerLeft: () => (
                <TouchableOpacity onPress={logOut}>
                    <View style={{marginLeft: 10}}>
                        <Avatar rounded 
                            source={{ uri: auth?.currentUser?.photoURL}}    
                        />
                    </View>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity style={{marginRight: 20}}>
                        <Icon
                            name='camera'
                            type='feather'
                            color='#282C35'
                            size={25}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginRight: 20}} onPress={() => navigation.navigate('AddChatScreen')}>
                        <Icon
                            name='pencil'
                            type='foundation'
                            color='#282C35'
                            size={25}
                        />
                    </TouchableOpacity>
                </View>
            ),
        })
    }, [navigation])


    const enterChat = (id, ChatName) => {
        navigation.navigate('ChatScreen', {
            id,
            ChatName, 
        });
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {
                    chats.map( ({id, data: {ChatName} }) => (
                        <Items key={id} id={id} ChatName={ChatName}
                            enterChat={enterChat} />
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
    }
});

export default Home;
