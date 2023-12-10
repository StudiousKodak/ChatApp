import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    // Method for handling the login process
    handleLogin = () => {
        const { email, password } = this.state; 
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.navigate('Home');
            })
            .catch(error => {
                console.log(error);
            });
    };

    handleSignUp = () => {
        const { email, password } = this.state; 
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.navigate('Home');
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                />
                <Button title="Login" color={'black'} onPress={this.handleLogin} />
                <Button title="Sign Up" color={'black'} onPress={this.handleSignUp} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#A7C7E7'
    },
    input: {
        height: 40,
        marginBottom: 10,
        borderWidth: 1,
        padding: 10
    }
});
