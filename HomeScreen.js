import React from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: ''
        };
    }
        componentDidMount() {
            this.listenForMessages();
        }
    
        listenForMessages = () => {
            firebase.database().ref('messages').on('value', (snapshot) => {
                const messages = [];
                snapshot.forEach((child) => {
                    messages.push({ text: child.val().text, key: child.key });
                });
                this.setState({ messages });
            });
        };
    
        sendMessage = () => {
            if (this.state.newMessage.trim() !== '') {
                firebase.database().ref('messages').push({ text: this.state.newMessage });
                this.setState({ newMessage: '' });
            }
        };
    
        render() {
            return (
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message"
                        value={this.state.newMessage}
                        onChangeText={(text) => this.setState({ newMessage: text })}
                    />
                    <Button title="Send" color={'black'}  onPress={this.sendMessage} />
                    <Text style={styles.title}>Chat Logs: </Text>
                    <View style={styles.chatLogs}>
                        <FlatList
                            data={this.state.messages}
                            renderItem={({ item }) => <Text style={styles.chatText}>{item.text}</Text>}
                        />
                    </View>
                </View>
            );
        }
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#A7C7E7'
        },
        chatLogs: {
            flex: .9,
            borderTopWidth: 1
        },
        input: {
            height: 40,
            width: '80%',
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            padding: 10
        },
        chatText: {
            lineHeight: 30
        },
        title: {
            fontSize: 18,
            fontWeight: '400',
            lineHeight: 50
        },
    });