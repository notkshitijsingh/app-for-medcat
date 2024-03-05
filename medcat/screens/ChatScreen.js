import React, { useState } from "react";
import { View, FlatList, TextInput, TouchableOpacity, Text, StyleSheet, Keyboard } from "react-native";
import axios from "axios";

const ChatBox = ({message}) => {
    return(
        <View style={styles.chatMessage}>
            <Text style={styles.chatSender}>{message.sender}</Text>
            <Text style={styles.chatContent}>{message.content}</Text>
        </View>
    )
};

var idx = 1;

const CHATDATA = [
    {
        index: 0,
        sender: "MedCAT",
        content: "Welcome to MedCAT! I will now be helping you with your queries."
    },
];

const ChatScreen = () => {
    // keyboard stuff
    const [paddingBottom, setPaddingBottom] = useState("15%")
    const keyboardShowListener = Keyboard.addListener( 
        'keyboardDidShow', 
        () => {
            setPaddingBottom("95%");
        } 
    ); 
    const keyboardHideListener = Keyboard.addListener( 
        'keyboardDidHide', 
        () => {
            setPaddingBottom("15%");
        }
    );

    // handling input stuff

    const [updateFlag, setUpdateFlag] = useState(false);
    const [text, setText] = useState("");
    

    function addToChat() {
        const toPush = {
            index: idx,
            sender: "Me",
            content: text,
        };
        idx += 1;
        CHATDATA.push(toPush);
        const prompt = "Explain what does "+text+" mean on a health report as a health information chatbot but limit the information to be only from WebMD and phrase it in a way that is easy to understand and short.";
        setUpdateFlag(!updateFlag);
        setText("");
        talkToMe(prompt);
    }

    // chat data
    const API_KEY = "API-KEY";

    async function talkToMe(prompt) {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: prompt }],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_KEY}`,
                    },
                }
            );
    
            const toAdd = response.data.choices[0]?.message?.content;
            const forPushing = {
                index: idx,
                sender: "MedCAT",
                content: toAdd,
            };
            idx += 1;
            CHATDATA.push(forPushing);
            console.log(CHATDATA);
            setUpdateFlag(!updateFlag);
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    }
    

    return(
        <View style={[styles.container, {paddingBottom}]}>
            <View style={styles.outputBox}>
                <FlatList
                    data={CHATDATA}
                    renderItem={({item}) => <ChatBox message={item}/>}
                    nestedScrollEnabled={true}
                    keyExtractor={item=>item.index}
                    key={updateFlag}
                />
            </View>
            <View style={styles.inputBox}>
                <TextInput
                    placeholder="Enter your query"
                    value={text}
                    style={{textAlign: 'left', width: "80%"}}
                    onChangeText={value => setText(value)}
                />
                <TouchableOpacity onPress={(text)=>addToChat()}>
                    <Text style={{color: "#006ee6"}}>Send</Text>
                </TouchableOpacity>
                    
            </View>
        </View>
    )
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: "5%",
      paddingHorizontal: "3%",
    },
    inputBox: {
        height: 21,
        flexDirection: "row",
    },
    chatMessage: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: 'center',
        marginVertical: 8,
    },
    chatSender: {
        fontWeight: "bold",
        fontSize: 18,
    },
    chatContent: {
        fontSize: 16,
    },
})
