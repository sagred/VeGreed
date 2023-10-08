// screens/HomeScreen.js
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fontisto, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { getData } from '../utils';
import ProductDetails from '../components/Product';
import { useProductStore } from '../store/useQRstore';

export default function ProductScreen({ navigation }) {

    const [account, setAccount] = useState(null)

    const productData = useProductStore(state => state.product)

    useEffect(() => {
        getData("key-pairs").then((data) => {
            if (data) {
                setAccount(data)
            }
        })
    }, [])

    return (
        <ScrollView>
            {productData &&
                <View style={styles.container}>
                    <Image
                        source={{ uri: productData.product.imageURL }}
                        style={{ width: '100%', aspectRatio: 1 }} // Assuming the image is square
                        resizeMode="contain"
                    />

                    <ProductDetails productData={productData} />
                </View>
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        paddingBottom: 100
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
