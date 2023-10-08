import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import QRCode from "react-qr-code";

const ProductDetails = ({ productData }) => {
    const { product } = productData;

    const sampleProof = {
        "scheme": "g16",
        "curve": "bn128",
        "proof": {
            "a": [
                "0x250c7041b1b1f18f8808589de4e9d1f8c2aefcc77d8a3820a2129e4722f78eff",
                "0x21b9ccd30883256b6941ab11fb0f540cb44baea2bbc1d64262abc72d2cea186d"
            ],
            "b": [
                [
                    "0x27bb36a9556e5fcf5fbec86c146255a2bfb18908367f24b9fd7871d9b8976dfc",
                    "0x27deff3eb89cada0fde8ce93b763f659bf0ca1157d6a4589bb8ac44e77d06dab"
                ],
                [
                    "0x0fe4bf5490bf31c33c3b3de3ff910e396b0afcc943e982abf65494bc39ea456a",
                    "0x2c25054bcbe659c14083698905ac5ac6835c0b4c0cbf3aa4b005fce14ce779e7"
                ]
            ],
            "c": [
                "0x1f98506c5f773bcbcf509c1d946b380b3eb2b35b977f12c9e11ca0c5c42fb235",
                "0x2ffe8f6ade290f4791714c4781386a39ed94eb9ec3c63ef8c1414060af2e9100"
            ]
        },
        "inputs": [
            "0x0000000000000000000000000000000037fc5cfabf84df804732916f112cae86",
            "0x000000000000000000000000000000003f67d4b8673ba7e9bf2802b7f1b22c38"
        ]
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>{productData?.companyName}</Text>
            <Text style={styles.productName}>{product?.productName.toUpperCase()}</Text>
            <Text style={{ fontSize: 16, fontWeight: 300, color: '#5d5f63', marginBottom: 20 }}>{product?.description}</Text>
            <Text style={styles.price}>{product?.price}</Text>

            <View style={styles.section}>
                <Text style={styles.subHeader}>Origin</Text>
                <Text>Country: {product?.origin.country}</Text>
                <Text>City: {product?.origin.city}</Text>
                <Text>Factory: {product?.origin.factory}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subHeader}>Manufacturing Procedure</Text>
                {product?.manufacturingProcedure.map((step, index) => (
                    <Text key={index} style={styles.listItem}>• Step {step.step}: {step.description}</Text>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.subHeader}>Raw Materials</Text>
                {product?.rawMaterials.map((material, index) => (
                    <Text key={index} style={styles.listItem}>• {material.material} sourced from {material.source}</Text>
                ))}
            </View>

            {product?.preOwner &&
                <View style={styles.section}>
                    <Text style={styles.subHeader}>Previous Owner</Text>
                    <Text>Name: {product?.preOwner?.name}</Text>
                    <Text>Owned for: {product.preOwner?.ownershipDuration}</Text>
                    <Text>Condition: {product.preOwner?.condition}</Text>
                </View>
            }

            <View style={styles.section}>
                <Text style={styles.subHeader}>ZKP</Text>
                <View style={{ marginTop: 10 }}>
                    <QRCode value={JSON.stringify(sampleProof)} />
                </View>

            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 18,
        backgroundColor: '#FFFFFF'  // White background
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',  // Pure black
        marginBottom: 15
    },
    productName: {
        fontSize: 24,
        fontWeight: '400',
        marginBottom: 10,
        color: '#000000',
    },
    description: {
        color: '#4C4C4C',  // Light gray
        marginBottom: 10
    },
    price: {
        fontSize: 20,
        color: '#6C6C6C',  // Even lighter gray
        marginBottom: 20
    },
    section: {
        marginVertical: 15,
        borderBottomWidth: 0.5,
        paddingBottom: 20,
        borderBottomColor: '#D0D0D0'  // Soft gray for dividing lines
    },
    subHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2C2C2C',
        marginBottom: 5
    },
    listItem: {
        fontSize: 16,
        color: '#4C4C4C',
        marginBottom: 5
    }
});

export default ProductDetails;
