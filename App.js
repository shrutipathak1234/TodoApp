import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginView from "./src/components/login-view";
import RegisterView from "./src/components/register-view"
import HomeView from "./src/components/home-view";
import Details from "./src/components/Details";
import {MyContext} from "./src/components/myContext";

const Stack = createNativeStackNavigator();

const App = () => {
    const [notes, setNotes] = useState([]);

    const onCheckedItem = (id) => {
        const updatedNotes = notes.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    isChecked: !item.isChecked
                }
            }
            return item
        })
        setNotes(updatedNotes)
    }

    return (
        <MyContext.Provider value={{ onCheckedItem, notes, setNotes}}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    presentation: 'card'
                }}>
                    <Stack.Screen
                        name="Register"
                        component={RegisterView}
                    />
                    <Stack.Screen
                        name="MyApp"
                        component={LoginView}
                    />
                    <Stack.Screen
                        name="My Todo"
                        component={HomeView}
                        // initialParams={}
                    />
                    <Stack.Screen
                        name="Details"
                        component={Details}
                        // initialParams={}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </MyContext.Provider>
    )

}

export default App;