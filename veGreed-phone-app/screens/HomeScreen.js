// screens/HomeScreen.js
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Fontisto, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import io from "socket.io-client";
import { useProductStore, useQRStore } from '../store/useQRstore';
import { getData, storeData } from '../utils';
import { ScrollView } from 'react-native-gesture-handler';
import ProductDetails from '../components/Product';
import { AntDesign, MaterialIcons } from '@expo/vector-icons/build/Icons';
import LottieView from 'lottie-react-native';
import { productsData as PD } from "../utils"


let socket


export default function HomeScreen({ navigation }) {

    const qrData = useQRStore(state => state.qrData)
    const setQRData = useQRStore(state => state.setQRData)

    const [appData, setAppData] = useState(null)

    const [productsData, setProductsData] = useState([])

    const [isProofBeingCreated, setIsProofBeingCreated] = useState(false)
    const [status, setStatus] = useState("")
    const [newName, setNewName] = useState("")
    const [description, setDescription] = useState("")

    const setProduct = useProductStore(state => state.setProduct)


    const [account, setAccount] = useState(null)

    useEffect(() => {
        getData("key-pairs").then((data) => {
            if (data) {
                setAccount(data)
            }
        })
    }, [])

    useEffect(() => {
        getData("my-products").then((data) => {
            setProductsData(data)
            if (data === null) {
            }
            storeData("my-products", PD);
        })
    }, [])

    useEffect(() => {
        socket = io("https://0c1f-104-28-235-246.ngrok-free.app");

        socket.on("publicKeyFromUser", (data) => {
            console.log(data);
            setIsProofBeingCreated(true)
        });

        socket.on("status", (data) => {
            console.log(data);
            setStatus(data)
        });

        return () => socket.disconnect();
    }, []);

    useEffect(() => {
        socket.on("proofToUser", (data) => {
            setStatus("")

            // const proofToStore = {
            //     name: newName,
            //     description: description,
            //     proof: JSON.stringify(data),
            //     timestamp: new Date().toISOString()
            // }

            // const updatedAppData = [...appData, proofToStore];


            // console.log("Proof", updatedAppData)

            // setAppData(updatedAppData);
            // storeData("credentials", updatedAppData)

            setQRData(null)
            setIsProofBeingCreated(false)
        });

        socket.emit("createCredentials", { id: "some-id" }, (data) => {
            console.log(data);
            console.log('Received address:', data.address);
            console.log('Received private key:', data.privateKey);

            const keyPairs = {
                publicKey: data.address,
                privateKey: data.privateKey
            }

            getData("key-pairs").then((data) => {
                if (data === null) {
                    storeData("key-pairs", keyPairs)
                }
            })

        });

    }, [newName, description, qrData])

    useEffect(() => {
        if (qrData !== null) {
            console.log(qrData)
            const parsedData2 = JSON.parse(qrData)
            setNewName(parsedData2?.product?.productName)
            const txnId = 2

            if (parsedData2.tokenId === null) {
                setProduct(parsedData2)
                navigation.navigate('Product')
            } else {
                setProductsData([parsedData2, ...productsData])

                const from = "0x3c897d3b12a828A33CD0467a131459DB9b5548A1"

                setIsProofBeingCreated(true)

                socket.emit('publicKeyFromUser', { publicKey: "02351235125125", id: parsedData2?.socketId })
            }



            // socket.emit("Transfer", { from: from, to: account?.publicKey, tokenId: 4 })
        }
    }, [qrData])

    const selectTypeAndOperate = (parsedData) => {
        if (parsedData.type === 'publicKeyFromUser') {

            // socket = io(parsedData.socketURL)
            // console.log(socket);
            setIsProofBeingCreated(true)
            socket.emit('publicKeyFromUser', { publicKey: "02351235125125", id: parsedData.socketId })
            setQRData(null)
        }
    }


    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: '#ffffff',
        }}>
            <View style={styles.container}>
                <StatusBar style='auto' />


                <View
                    style={styles.topCard}
                >
                    <View style={{ justifyContent: "space-between" }}>
                        <Text style={styles.topCardtitle}>Claim Your Products</Text>
                        <View style={{ marginTop: 10 }}>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Scan')}>
                                <Text style={styles.buttonText}>Scan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <MaterialCommunityIcons name="shield-key-outline" size={84} color="#a9a9a9" />
                    </View>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", width: "100%", paddingHorizontal: 20, marginTop: 20 }}>
                    <Text style={{ fontSize: 32, fontWeight: "500", alignSelf: "flex-start", fontFamily: "PixelifySans" }}> Your Products </Text>
                </View>

                {isProofBeingCreated ? <View
                    style={styles.card}
                >
                    <View style={{ padding: 20 }}>
                        <Text style={styles.cardtitle}>{newName.toUpperCase()}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <ActivityIndicator style={{ alignSelf: "flex-start", marginTop: 10 }} size="large" color="#000000" />
                            <Text style={{ fontSize: 18, color: '#000000', marginLeft: 20, fontWeight: 500 }}>{status}</Text>
                        </View>

                    </View>
                    <View style={{ marginBottom: 50 }}>

                        <LottieView

                            source={require('../assets/pacakageAnimation.json')}
                            autoPlay
                            loop
                            style={{ width: "100%" }}
                        />
                    </View>
                </View> :
                    <>

                        {
                            productsData.map((productData, index) => {
                                return (
                                    <View style={styles.card} key={index}>
                                        <Image
                                            source={{ uri: productData.product.imageURL }}
                                            style={{ width: '100%', aspectRatio: 1, borderTopLeftRadius: 23, borderTopRightRadius: 23 }} // Assuming the image is square
                                            resizeMode="contain"
                                        />

                                        <View style={{ padding: 20, flexDirection: "column", justifyContent: 'space-between' }}>
                                            <Text style={styles.cardtitle}>{productData.product.productName.toUpperCase()}</Text>
                                            {/* <Text style={{
                                    fontSize: 18,
                                    fontWeight: '400',
                                    marginBottom: 10,
                                    color: '#000000',
                                }}>PRODUCT DETAILS</Text> */}
                                            <View style={{ marginBottom: 10 }}>
                                                <Text style={{ fontSize: 16, fontWeight: 300, color: '#5d5f63' }}>
                                                    {productData.product.description}
                                                </Text>
                                                <Text style={{ fontSize: 16, marginTop: 10, color: '#b5bbca', fontWeight: '400' }}>Saved today </Text>
                                            </View>
                                            <TouchableOpacity onPress={() => {

                                                console.log(productData)
                                                setProduct(productData)
                                                navigation.navigate('Product')
                                            }} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#000", maxWidth: 120, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 999 }}>
                                                <Text style={{ fontWeight: 300, fontSize: 16, alignSelf: "flex-end", marginRight: 5, color: "#fff", }}>More Details</Text>
                                                <AntDesign name="arrowright" size={16} color="#ffffff" />
                                            </TouchableOpacity>

                                        </View>

                                    </View>
                                )
                            })
                        }
                    </>
                }


            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
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
        width: "auto",
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
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    buttonText: {
        color: '#000000',
        fontWeight: '500',
        fontSize: 16,
    },
    card: {
        flexDirection: 'column',
        borderRadius: 25,
        padding: 0,
        borderColor: "#e6e6e9",
        borderWidth: 2,
        margin: 15,
        width: '90%',
        backgroundColor: '#fff',
    },
    cardtitle: {
        fontSize: 24,
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
        height: 150,
        backgroundColor: '#000000',
    },
    topCardtitle: {
        fontSize: 24,
        fontFamily: "Poppins-Regular",
        marginBottom: 10,
        color: '#ffffff',
    },
    divider: {
        height: 18,
        backgroundColor: '#000', // change to desired color
        width: '100%'
    },
});
