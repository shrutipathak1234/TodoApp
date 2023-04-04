import React, {useState} from 'react';
import {
    StyleSheet, Text,
    TextInput, TouchableOpacity,
    View
} from 'react-native';


const RegisterView = ({navigation}) => {

   const  [isTextClear, setTextClear]=useState({text:''})

    return (
        <View style={styles.container}>
            <TextInput maxLength={10} style={styles.input} keyboardType={'numeric'} placeholderTextColor={'black'}
                       placeholder={'Phone Number'} />
            <TextInput maxLength={6} style={styles.input} keyboardType={'default'} secureTextEntry placeholderTextColor={'black'}
                       placeholder={'Create Password'}/>
            <TextInput maxLength={6} style={styles.input} keyboardType={'default'} secureTextEntry placeholderTextColor={'black'}
                       placeholder={'Confirm Password'}/>
            <TouchableOpacity style={styles.RegistrationButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.btnText} onPress={()=>clearEntry}>Register</Text>
            </TouchableOpacity>
            <Text style={{color: 'blue', margin: 5}} onPress={() => navigation.navigate('MyApp')}>Already have an
                account? Login here</Text>

        </View>
    );
};

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
    RegistrationButton: {
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 90,
        paddingRight: 90,
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

export default RegisterView;