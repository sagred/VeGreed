// screens/HomeScreen.js
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fontisto, } from '@expo/vector-icons';
import { getData } from '../utils';
import LottieView from 'lottie-react-native';

export default function IdentityScreen({ navigation }) {

    const [account, setAccount] = useState(null)

    useEffect(() => {
        getData("key-pairs").then((data) => {
            if (data) {
                setAccount(data)
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar style='auto' />

            <View
                style={styles.card}
            >
                <View>
                    <LottieView
                        source={require('../assets/walletAnimation.json')}
                        autoPlay
                        loop
                        style={{ width: "100%" }}
                    />
                    <Text style={{ fontSize: 32, fontFamily: "PixelifySans", marginTop: 20 }}>EliteEarn Points</Text>
                    <View style={styles.content}>
                        <Text style={{ fontSize: 48, color: '#000000', fontWeight: 900 }}>1086</Text>
                    </View>
                </View>

            </View>
            <View
                style={styles.card}
            >
                <View>
                    <Text style={styles.cardtitle}>Public Address</Text>
                    <View style={styles.content}>
                        <Text style={{ fontSize: 16, color: '#5d5f63' }}>{account?.publicKey}</Text>
                    </View>
                </View>

            </View>

            <TouchableOpacity
                style={styles.option}
                onPress={() => navigation.navigate('Network')}
            >
                <Fontisto name="world-o" size={18} color="black" />
                <Text style={styles.optionTitle} >VechainThor Testnet</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6e6e9',
        alignItems: 'center',
    },
    optionTitle: {
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 5,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        padding: 5,
        marginVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        color: '#000',
        marginBottom: 20,  // Optional: For spacing
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 10,
        backgroundColor: '#000000',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '400',
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 25,
        padding: 25,
        margin: 15,
        width: '90%',
        backgroundColor: '#fff',
    },
    cardtitle: {
        fontSize: 18,
        fontWeight: '400',
        marginBottom: 10,
        color: '#000000',
    },

    topCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 25,
        padding: 25,
        margin: 15,
        width: '90%',
        backgroundColor: '#b5bbca'
    },
    topCardtitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000000',
    },
});
