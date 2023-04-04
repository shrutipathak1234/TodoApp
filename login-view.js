import React, {useState} from 'react';
import {
    StyleSheet, Text,
    TextInput, TouchableOpacity,
    View, Alert
} from 'react-native';

const LoginView = ({navigation}) => {
    const [textInput, setTextInput] = useState('');
    const [errorMessage, setErrorMessage] = useState("");

    const checkTextInput = () => {
        if (textInput.length == 0 && textInput.length >10 && textInput.length <10) {
            Alert.alert('Please Enter Details');
            return;
        }

    }

    const checkInputTextSize=()=>{
        if(textInput.length >10 && textInput.length <10 ){
            Alert.alert('Please enter valid number');
        }
    }

    return (
        <View style={styles.container}>
            <TextInput  maxLength={10} style={styles.input} placeholderTextColor={'black'} onChangeText={
            checkInputTextSize} placeholder={"Phone Number"} keyboardType="numeric"></TextInput>
            <TextInput maxLength={6} style={styles.input} placeholderTextColor={'black'} placeholder={"Password"}
                       secureTextEntry></TextInput>
            <Text style={{color: 'black'}}>Remember me</Text>
            <TouchableOpacity style={styles.userButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.btnText} onPress={checkTextInput}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userButton} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.btnText}>SignUp</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        fontSize: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },

    input: {
        width: 300,
        height: 50,
        backgroundColor: 'lightgrey',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 16,
        margin: 5,
        color: 'black'
    },
    userButton: {
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 110,
        paddingRight: 110,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#00BCD4',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'

    },
    btnText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
    }

});

export default LoginView;