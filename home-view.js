import React, {useState} from 'react';
import {
    Alert,
    FlatList, Image,
    StyleSheet, Text,
    TextInput, TouchableOpacity,
    View
} from 'react-native';

const initialNoteState = {
    text: '',
    timestamp: '',
    id: '',
    isChecked: false
}
const initialEditingId = -1;
const initialText = '';
const completed = 'Completed';
const notCompleted = 'Not Completed';

const HomeView = () => {
    const [text, setText] = useState(initialText);
    const [notes, setNotes] = useState([]);
    const [editingId, setEditingId] = useState(initialEditingId);

    const addNote = () => {
        if (!text) {
            return Alert.alert('Please Enter valid Note')
        }
        const noteTimestamp = new Date().toLocaleString()
        const newNote = {
            ...initialNoteState,
            id: noteTimestamp,
            timestamp: noteTimestamp,
            text
        }
        const newNotesList = [...notes, newNote];
        setNotes(newNotesList);
        setText(initialText);
    }

    const startEditingNote = (note) => {
        setEditingId(note.id);
        setText(note.text);
    }

    const editNote = () => {
        if (!text) {
            return Alert.alert('Please Enter valid Note')
        }
        const editingNotePos = notes.findIndex((note) => note.id === editingId);
        if (editingNotePos === -1) {
            return
        }
        const editedNote = {...notes[editingNotePos], text, timestamp: new Date().toLocaleString()};
        const updatedNotes = [...notes];
        updatedNotes[editingNotePos] = editedNote;
        setNotes(updatedNotes);
        setEditingId(initialEditingId);
        setText(initialText);
    }

    const onDeleteNote = (id) => {
        const filteredNotes = notes.filter((note) => note.id !== id)
        setNotes(filteredNotes)
    }

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
        <View style={styles.container}>
            <TextInput maxLength={15} placeholderTextColor={'black'} placeholder={'Enter your task'}
                       textAlign={"center"} value={text}
                       onChangeText={setText} style={{
                backgroundColor: '#bdc3c7',
                padding: 10,
                margin: 5,
                width: "70%",
                verticalAlign: 'top',
                color: 'black',
                borderRadius: 5,
                borderWidth: 1,
            }}/>
            <TouchableOpacity onPress={editingId !== initialEditingId ? editNote : addNote} style={styles.userButton}><Text
                style={styles.btnText}>{editingId !== initialEditingId ? 'Update' : 'Add'} Task</Text></TouchableOpacity>
            {
                (notes.length == 0) ? <Text style={{
                        fontWeight: 'bold',
                        color: 'black',
                        fontSize: 18,
                        textAlign: 'center',
                        margin: 5,
                    }}>No Task Added</Text> :
                    <FlatList
                        data={notes}
                        renderItem={({item}) => {
                            return <View style={styles.listView}>
                                {/*<View style={{height:20, width:30,left:40 , borderRadius:5}}>*/}
                                {/*    <TouchableOpacity><Text style={{fontWeight:'bold',textAlign:'center',borderWidth:2,borderColor:'black',backgroundColor:'lightgrey', color:'black', padding:1,paddingLeft:1, paddingRight:2}}>↑</Text></TouchableOpacity>*/}
                                {/*    <TouchableOpacity><Text style={{fontWeight:'bold',borderWidth:2,textAlign:'center',  top:-19,left:40,backgroundColor:'lightgrey', color:'black'}}>↓</Text></TouchableOpacity>*/}
                                {/*</View>*/}
                                {/*<View style={{height:20, width:75,right:20,top:-85, backgroundColor:'lightgrey' , borderRadius:5}}>*/}
                                {/*    <Text style={{textAlign:'center', color:'black', top:-75}}>Sort by Date:</Text>*/}
                                {/*</View>*/}
                                <TouchableOpacity style={{width: 40, height: 40, position: 'absolute', zIndex: 100,}}
                                                  onPress={() => startEditingNote(item)}>
                                    <Image style={{height: '50%', width: '50%', top: -45, right: -270}}
                                           source={require('../assests/edit.png')}></Image>
                                </TouchableOpacity>

                                <View>
                                    <Text style={styles.text}>Task : {item.text}</Text>
                                    <Text style={styles.text}>Created At : {item.timestamp}</Text>
                                    <Text style={styles.text}>Status : {item.isChecked ? 'Done' : 'Not Done'}</Text>
                                </View>
                                <TouchableOpacity style={{width: 15, height: 15, flexDirection: 'column'}}
                                                  onPress={() => onDeleteNote(item.id)}>
                                    <Image style={{width: 15, height: 15, right: -15}}
                                           source={require('../assests/delete.png')}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onCheckedItem(item.id)}
                                                  style={{
                                                      width: 18,
                                                      height: 18,
                                                      borderRadius: 10,
                                                      backgroundColor: 'black',
                                                      top: 50,
                                                      right: 2
                                                  }}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 15,
                                        top: -2
                                    }}> {item.isChecked ? '✓' : ''} </Text>
                                </TouchableOpacity>

                            </View>
                        }}
                    />
            }
        </View>)
};

const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: 'white',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
        },
        listView: {
            elevation: 5,
            shadowColor: 'black',
            borderRadius: 5,
            flexDirection: 'row',
            borderWidth: 1,
            padding: 2,
            margin: 7,
            backgroundColor: '#bdc3c7',
            alignItems: 'center',
            flex: 1,
            width: 300
        },
        input: {
            width: 300,
            height: 50,
            backgroundColor: '#BDB5D5',
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
            paddingLeft: 80,
            paddingRight: 80,
            marginLeft: 30,
            marginRight: 30,
            backgroundColor: '#2c3e50',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#fff'
        },

        btnText: {
            borderRadius: 10,
            fontWeight: 'bold',
            color: 'white',
            fontSize: 18,
            textAlign: 'center',

        },
        text: {
            marginVertical: 2,
            alignItems: 'center',
            flexWrap: 'wrap',
            borderRadius: 15,
            fontWeight: 'bold',
            color: 'white',
            fontSize: 17,
            textAlign: 'center',
            backgroundColor: '#2c3e50',
            padding: 10,
            margin: 3,
            borderWidth: 1,
            width: 250,
        },
    }
);

export default HomeView;
