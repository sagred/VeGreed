import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { List, Avatar } from 'react-native-paper';
import { Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';

export default function NetworkScreen() {
    const networks = [
        { id: '1', name: 'VechainThor Main Net', icon: 'database' },
        { id: '2', name: 'VechainThor Test Net', icon: 'database-check' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.list}>

                <FlatList
                    data={networks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <List.Item
                            style={[
                                { marginHorizontal: 5, marginVertical: 5, borderRadius: 15, paddingHorizontal: 10 },
                                item.name === "VechainThor Test Net" && { backgroundColor: "#e8edf8" }
                            ]}
                            title={item.name}
                            left={() => (
                                <Avatar.Icon style={{ backgroundColor: "black" }} size={32} icon={() => <Fontisto name="world-o" size={24} color="white" />} />
                            )}
                        />
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6e6e9',
        paddingTop: 0,
        paddingHorizontal: 15,
    },
    list: {
        backgroundColor: 'white',
        borderRadius: 20
    }
});
