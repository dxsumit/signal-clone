import React, {useLayoutEffect, useState, useEffect, useRef} from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    SafeAreaView, 
    KeyboardAvoidingView, 
    ScrollView, 
    TextInput, 
    Keyboard,
    TouchableWithoutFeedback }  from 'react-native';
import { Text } from '@rneui/base';
import { Avatar, Icon } from '@rneui/themed'
import { db, auth } from '../Components/config';
import { collection, doc, addDoc, serverTimestamp, orderBy, getDocs, query, getDoc  } from "firebase/firestore"; 


const ChatScreen = ({navigation, route}) => {

    const [message, setMessage] = useState("");
    const [allChats, setAllChats] = useState([]);
    const [trig, setTrig] = useState(true);

    useLayoutEffect( () => {
        navigation.setOptions({
            title: route.params.ChatName,

            headerTitle: () => (
                <TouchableOpacity>
                    <View style={styles.headerContainer}>
                        <Avatar rounded 
                            source={{ uri: "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"}}    
                        />
                        <Text style={styles.headerText}> {route.params.ChatName} </Text>
                    </View>
                </TouchableOpacity>
            ),

            headerRight: () => (
                <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity style={{marginRight: 20}}>
                        <Icon
                            name='video'
                            type='feather'
                            color='#fff'
                            size={20}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginRight: 20}} >
                        <Icon
                            name='phone-call'
                            type='feather'
                            color='#fff'
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
            ),


        });
    }, [navigation])


    const addNewMessage = async(id) => {
        
        console.log("here")
        const docRef = doc(db, "chats", route.params.id, "messages", id);
        const docSnap = await getDoc(docRef);
        const temp = [...allChats, {id: id, data: docSnap.data()}]
        setAllChats(temp);
    }


    const getAllMessages = async () => {
        // getting the perticular chat id within chats collection
        const docRef = doc(db, "chats", route.params.id);
        const q = query(collection(docRef, "messages"), orderBy("timestamp"));
        
        const querySnapshot = await getDocs(q);
        let temp = []
        querySnapshot.forEach((doc) => {
            temp = [...temp, { id: doc.id, data: doc.data() } ]
        });

        setAllChats(temp);
        console.log('done');
    }

    useLayoutEffect( () => {
        getAllMessages();

    }, [trig, route]);


    const sendMessage = async () => {
        Keyboard.dismiss()

        try{
            // adding another collection messages within that
            const newData = {
                timestamp: serverTimestamp(),
                message: message,
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL,
            }
            setMessage("");
            // getting the perticular chat id within chats collection
            const docRef = doc(db, "chats", route.params.id);
            const newDoc = await addDoc(collection(docRef, "messages"), newData);
            
            // const temp = [...allChats, { id: newDoc.id, data: newData } ]
            // setAllChats(temp);
            setTrig(!trig)

            
        }
        catch (e){
            alert( e.message);
        }
    }


    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView style={styles.container}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <ScrollView contentContainerStyle={{ marginTop: 10, paddingBottom: 25}}> 
                        {allChats?.map(({id, data}) => 
                        data.email === auth.currentUser.email ? (
                            <View key={id} style={styles.sender}> 
                                <Text style={{color: '#fff'}}> {data.message} </Text>
                                <Avatar rounded
                                    containerStyle={{
                                        position: 'absolute',
                                        bottom: -16,
                                        right: -22
                                    }}
                                    source={{uri: data.photoURL}}
                                />
                            </View>
                        ) : (
                            <View key={id} style={styles.receiver}>
                                <Text style={{color: '#000'}} > {data.message} </Text>
                                <Avatar rounded
                                    containerStyle={{
                                        position: 'absolute',
                                        bottom: -15,
                                        left: -22
                                    }}
                                    source={{uri: data.photoURL}}
                                />
                            </View>
                        )

                        )}
                    </ScrollView>
                </TouchableWithoutFeedback>
                <View style={styles.footer}>
                    <TextInput 
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Send message"
                        style={styles.input}
                        onSubmitEditing={sendMessage}
                    />
                    <TouchableOpacity onPress={sendMessage} >
                        <Icon
                            name='send'
                            type='material'
                            color='#4166F5'
                            size={25}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: "100%"
    },

    headerContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
    },  
    headerText: {
        fontSize: 18,
        color: '#fff', 
        fontWeight: '800', 
        marginRight: 5,
    },

    receiver: {
        padding: 10,
        alignSelf: 'flex-start',
        elevation: 3,
        margin: 2,
        marginLeft: 25,
        marginBottom: 16,
        borderRadius: 18,
        flexDirection: 'row',
        backgroundColor: "#D8D8D8"
    },
    sender: {
        padding: 10,
        elevation: 3,
        margin: 2,
        marginRight: 25,
        marginBottom: 16,
        borderRadius: 18,
        // flexDirection: 'row',
        alignSelf: 'flex-end',
        backgroundColor: "#1da1f2"
    },
    input: {
        flex: 1,
        width: "100%",
        padding: 10,
        bottom: 0,
        height: 45,
        backgroundColor: '#E8E8E8',
        borderRadius: 30,
        marginRight: 10,

    },
});

export default ChatScreen;

