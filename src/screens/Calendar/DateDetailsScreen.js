import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import DateDetailsHeader from './DateDetailsHeader';
import color from '../../constant/color';
import { useNavigation } from '@react-navigation/native';

const DateDetailsScreen = ({ route }) => {
    const { date } = route.params;
    const [activities, setActivities] = useState([]);
    const [text, setText] = useState('');
    const navigation = useNavigation();

    const addActivity = () => {
        if (text) {
            setActivities([...activities, text]);
            setText('');
        }
    };

    const goBackToCalendar = () => {
        navigation.navigate('Calendar', { selectedDate: date });
    };

    return (
        <View style={styles.container}>
            <DateDetailsHeader onBackPress={goBackToCalendar} />
            <View style={styles.content}>
                <Text style={styles.title}>Activities for {date}</Text>
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                    placeholder="Add new activity"
                />
                <Button title="Add Activity" onPress={addActivity} />
                <FlatList
                    data={activities}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text>{item}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    item: {
        padding: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
});

export default DateDetailsScreen;
