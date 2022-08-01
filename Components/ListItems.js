import React, {useState, useCallback} from "react";
import { useFocusEffect } from '@react-navigation/native';
import {View, StyleSheet} from 'react-native';
import { ListItem, Avatar } from '@rneui/themed';
import { auth, db } from "../Components/config";
import { collection, doc, orderBy, getDocs, query  } from "firebase/firestore"; 

const Items = ({id, ChatName, enterChat}) => {

    const [lastMsg, setLastMsg] = useState(null);

    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            //   console.log('auto focued called')
        
            const getAllMessages = async () => {
                // getting the perticular chat id within chats collection
                const docRef = doc(db, "chats", id);
                const q = query(collection(docRef, "messages"), orderBy("timestamp"));
                
                const querySnapshot = await getDocs(q);
                let temp = []
                querySnapshot.forEach((doc) => {
                    temp = [...temp, { id: doc.id, data: doc.data() } ]
                });
        
                if(temp.length != 0){
                    setLastMsg(temp[temp.length - 1])
                }
            }
            
            getAllMessages();
        
            return () => {
                isActive = false;
            };

        }, [])
    );

    return (
        <ListItem key={id} bottomDivider onPress={() => enterChat(id, ChatName)}>
            <Avatar rounded
                source={{uri: "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"}} 
            />
            <ListItem.Content>
                <ListItem.Title style={styles.nameText}> {ChatName} </ListItem.Title>
                <ListItem.Subtitle style={styles.subText}
                    numberOfLines={1}
                    ellipsizeMode="tail"> 
                        {lastMsg?.data?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
}

const styles = StyleSheet.create({
    nameText: {
        fontWeight: "700",
    },
    subText: {
        color: '#888888'
    }
});

export default Items;

