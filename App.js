import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginView from './src/components/login-view';
import RegisterView from './src/components/register-view';
import HomeView from './src/components/home-view';
import Details from './src/components/Details';
import {MyContext} from './src/components/myContext';
import AddTask from './src/components/AddTask';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AnimationDemo} from './src/components/AnimationDemo';
import {BottomSheetWrapper} from './src/components/BottomSheetDemo';
import {MakeJsiCall} from './src/components/MakeJsiCall';
import {HeaderTabs} from './src/components/HeaderTabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MyTabs} from './src/components/MyTabs';
import { ZustandDemoComponent } from './src/components/DemoZustand';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{presentation: 'card'}}>
    <Stack.Screen name="My Todo List" component={HomeView} />
    <Stack.Screen name="Register" component={RegisterView} />
    <Stack.Screen name="MyApp" component={LoginView} />
    <Stack.Screen name="Details" component={Details} />
    <Stack.Screen name="Add Task" component={AddTask} />
    {/* <Stack.Screen name="BottomSheetDemo" component={BottomSheetDemo} /> */}
  </Stack.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator useNative initialRouteName="My App">
    <Drawer.Screen name="My App" component={HomeStack} />
    <Drawer.Screen name="Animation Demo" component={AnimationDemo} />
    <Drawer.Screen name="BottomSheet Demo" component={BottomSheetWrapper} />
    <Drawer.Screen name="Jsi Call" component={MakeJsiCall} />
    <Drawer.Screen name="Header Tabs" component={HeaderTabs} />
    <Drawer.Screen name="Bottom Tabs" component={MyTabs} />
    <Drawer.Screen name="Zustand Demo" component={ZustandDemoComponent} />
  </Drawer.Navigator>
);

const App = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState();
  const [filterOptions, setFilterOptions] = useState({
    completionStatus: 'all',
    startDate: '',
    endDate: '',
  });

  const onCheckedItem = id => {
    const updatedNotes = notes.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isChecked: !item.isChecked,
        };
      }
      return item;
    });
    setNotes(updatedNotes);
  };

  useEffect(() => {
    setFilteredNotes(
      notes.filter(note => {
        if (note.isChecked && filterOptions.completionStatus === 'inProgress') {
          return false;
        }
        if (!note.isChecked && filterOptions.completionStatus === 'completed') {
          return false;
        }
        if (filterOptions.startDate === '' && filterOptions.endDate === '') {
          return true;
        }
        if (
          note.timestamp < filterOptions.startDate ||
          note.timestamp > filterOptions.endDate
        ) {
          return false;
        }
        return true;
      }),
    );
  }, [notes, filterOptions]);

  return (
    <NavigationContainer>
      <DrawerNavigator />
      <MyContext.Provider
        value={{
          onCheckedItem,
          notes,
          setNotes,
          filteredNotes,
          setFilteredNotes,
          filterOptions,
          setFilterOptions,
        }}
      />
    </NavigationContainer>
  );
};

export default App;
