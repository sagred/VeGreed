import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        // saving error
    }
};

export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
};


const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "tokenURI",
                "type": "string"
            }
        ],
        "name": "createToken",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "tokenCounter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "tokenURIs",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]


export const productsData = [
    {
        "companyName": "LuxeCraft Inc.",
        "product": {
            "productName": "Monarch Leather Tote",
            "productID": "LC001",
            "description": "Exquisite hand-stitched leather tote featuring a butterfly emblem.",
            "price": "$1,900",
            "origin": {
                "country": "France",
                "city": "Paris",
                "factory": "LuxeCraft Atelier"
            },
            "manufacturingProcedure": [
                { "step": 1, "description": "Design and sketching." },
                { "step": 2, "description": "Select premium calf leather." },
                { "step": 3, "description": "Precision cutting of leather." },
                { "step": 4, "description": "Hand-stitching and emblem integration." },
                { "step": 5, "description": "Quality assurance and final inspection." }
            ],
            "rawMaterials": [
                { "material": "Calf Leather", "source": "Sustainable ranches in Spain." },
                { "material": "Gold (for emblem)", "source": "Ethical mines in Brazil." }
            ],
            "preOwner": {
                "name": "Marina Fortunato",
                "ownershipDuration": "8 months",
                "condition": "Excellent, used thrice."
            },
            "imageURL": "https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1682013603/443497_AABZC_6832_001_063_0000_Light-GG-Marmont-small-shoulder-bag.jpg"
        }
    },
    {
        "companyName": "Celestial Timepieces",
        "product": {
            "productName": "Lunar Phase Watch",
            "productID": "CT002",
            "description": "Elegant watch with moon-phase tracking and sapphire crystal.",
            "price": "$4,700",
            "origin": {
                "country": "Switzerland",
                "city": "Geneva",
                "factory": "Celestial Watch Hub"
            },
            "manufacturingProcedure": [
                { "step": 1, "description": "Blueprint design." },
                { "step": 2, "description": "Craft stainless steel casing." },
                { "step": 3, "description": "Set sapphire crystal face." },
                { "step": 4, "description": "Install lunar cycle mechanism." },
                { "step": 5, "description": "Final assembly and quality assurance." }
            ],
            "rawMaterials": [
                { "material": "Stainless Steel", "source": "Steel mills in Sweden." },
                { "material": "Sapphire Crystal", "source": "Mines in Madagascar." }
            ],
            "preOwner": {
                "name": "Emma Stone",
                "ownershipDuration": "1 year",
                "condition": "Mint, used for an award show."
            },
            "imageURL": "https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1679917519/750462_ICAA0_8512_001_100_0000_Light-G-Timeless-watch-with-bees-38-mm.jpg"
        }
    },
    {
        "companyName": "Milano Elegante",
        "product": {
            "productName": "Duchess Silk Gown",
            "productID": "ME003",
            "description": "Flowy gown with silver embroidery and velvet lining.",
            "price": "$5,500",
            "origin": {
                "country": "Italy",
                "city": "Milan",
                "factory": "Milano Elegante House"
            },
            "manufacturingProcedure": [
                { "step": 1, "description": "Gown design sketching." },
                { "step": 2, "description": "Select fine silk." },
                { "step": 3, "description": "Precision cut fabric." },
                { "step": 4, "description": "Embroidery and detailing." },
                { "step": 5, "description": "Final fitting and stitch." }
            ],
            "rawMaterials": [
                { "material": "Silk", "source": "Organic farms in China." },
                { "material": "Silver", "source": "Mines in Peru." }
            ],
            "preOwner": {
                "name": "Emma Stone",
                "ownershipDuration": "1 year",
                "condition": "Mint, used for an award show."
            },
            "imageURL": "https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1687365248/759918_C9D00_9022_001_100_0000_Light-Womens-Gucci-Jordaan-loafer.jpg"
        }
    },
    {
        "companyName": "Pieds Élégants",
        "product": {
            "productName": "Serpentine Stilettos",
            "productID": "PE004",
            "description": "High-heels made from snake leather with gold buckle.",
            "price": "$7,250",
            "origin": {
                "country": "Italy",
                "city": "Florence",
                "factory": "Pieds Élégants Atelier"
            },
            "manufacturingProcedure": [
                { "step": 1, "description": "Select high-quality snake leather." },
                { "step": 2, "description": "Precision cutting for shoe pattern." },
                { "step": 3, "description": "Stitching and sole fitting." },
                { "step": 4, "description": "Attach gold buckle and detailing." },
                { "step": 5, "description": "Final inspection and polish." }
            ],
            "rawMaterials": [
                { "material": "Snake Leather", "source": "Ethical farms in Indonesia." },
                { "material": "Gold", "source": "Fair-trade mines in South Africa." }
            ],
            "preOwner": {
                "name": "Bernhard Kronfellner",
                "ownershipDuration": "1 month",
                "condition": "New, Never used"
            },
            "imageURL": "https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1677541666/747045_J1692_1059_001_100_0000_Light-Mask-frame-GG-sunglasses.jpg"
        }
    },
    {
        "companyName": "Regal Adornments",
        "product": {
            "productName": "Emerald Teardrop Necklace",
            "productID": "RA005",
            "description": "14-carat gold necklace with a teardrop emerald pendant.",
            "price": "$3,200",
            "origin": {
                "country": "USA",
                "city": "Los Angeles",
                "factory": "Regal Gem Workshop"
            },
            "manufacturingProcedure": [
                { "step": 1, "description": "Sketch pendant design." },
                { "step": 2, "description": "Craft gold chain and pendant setting." },
                { "step": 3, "description": "Set emerald in pendant." },
                { "step": 4, "description": "Attach pendant to chain." },
                { "step": 5, "description": "Final quality check and polish." }
            ],
            "rawMaterials": [
                { "material": "Gold", "source": "Ethical mines in Canada." },
                { "material": "Emerald", "source": "Gem farms in Colombia." }
            ],
            "preOwner": {
                "name": "Beyonce Knowles",
                "ownershipDuration": "6 months",
                "condition": "Pristine, worn for a music video."
            },
            "imageURL": "https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1678158108/740428_ZAMQP_9791_001_100_0000_Light-Gingham-tweed-jacket.jpg"
        }
    },
    {
        "companyName": "Dapper Gentlemen",
        "product": {
            "productName": "Royal Silk Bow Tie",
            "productID": "DG006",
            "description": "Handcrafted silk bow tie with a paisley design.",
            "price": "$250",
            "origin": {
                "country": "England",
                "city": "London",
                "factory": "Dapper Stitch Workshop"
            },
            "manufacturingProcedure": [
                { "step": 1, "description": "Select premium silk." },
                { "step": 2, "description": "Cut fabric to bow tie pattern." },
                { "step": 3, "description": "Stitch and assemble." },
                { "step": 4, "description": "Add paisley design detailing." },
                { "step": 5, "description": "Final quality assurance." }
            ],
            "rawMaterials": [
                { "material": "Silk", "source": "Organic farms in India." }
            ],
            "preOwner": null,
            "imageURL": "https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1677108603/741095_ZAM2F_7707_001_100_0000_Light-Retro-tweed-jacket-with-embroidery.jpg"
        }
    },
    {
        "companyName": "Lustrous Silks",
        "product": {
            "productName": "Aurora Silk Scarf",
            "productID": "LS007",
            "description": "Smooth silk scarf depicting the ethereal beauty of Northern Lights.",
            "price": "$750",
            "origin": {
                "country": "India",
                "city": "Varanasi",
                "factory": "Silken Weaves Hub"
            },
            "manufacturingProcedure": [
                { "step": 1, "description": "Design Northern Lights pattern." },
                { "step": 2, "description": "Select fine quality silk." },
                { "step": 3, "description": "Dye silk to desired colors." },
                { "step": 4, "description": "Print Northern Lights design." },
                { "step": 5, "description": "Quality check and finish." }
            ],
            "rawMaterials": [
                { "material": "Silk", "source": "Ethical silk farms in China." }
            ],
            "preOwner": null,
            "imageURL": "https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1591204505/626620_G1760_9666_001_100_0000_Light-Childrens-Screener-sneaker.jpg"
        }
    },
    {
        "companyName": "Crystal Vessels",
        "product": {
            "productName": "Bordeaux Wine Decanter",
            "productID": "CV008",
            "description": "Hand-blown crystal wine decanter, perfect for aerating fine wines.",
            "price": "$1,200",
            "origin": {
                "country": "Austria",
                "city": "Vienna",
                "factory": "Crystal Artisans Workshop"
            },
            "manufacturingProcedure": [
                { "step": 1, "description": "Sketch decanter design." },
                { "step": 2, "description": "Select fine crystal." },
                { "step": 3, "description": "Melt and blow into desired shape." },
                { "step": 4, "description": "Cut and polish." },
                { "step": 5, "description": "Final quality check." }
            ],
            "rawMaterials": [
                { "material": "Crystal", "source": "Crystal mines in Czech Republic." }
            ],
            "preOwner": null,
            "imageURL": "https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1589363106/624470_99999_0099_002_100_0000_Light-The-Alchemists-Garden-A-Chant-for-the-Nymph-100ml-eau-de-parfum.jpg"
        }
    },
    {
        "companyName": "Bespoke Furnishings",
        "product": {
            "productName": "Mahogany Baron Desk",
            "productID": "BF009",
            "description": "Handcrafted writing desk with intricate carvings and a polished finish.",
            "price": "$8,000",
            "origin": {
                "country": "USA",
                "city": "Nashville",
                "factory": "Artisan Furniture Makers"
            },
            "manufacturingProcedure": [
                { "step": 1, "description": "Select mahogany wood." },
                { "step": 2, "description": "Precision cutting of wood." },
                { "step": 3, "description": "Assemble and hand-carve designs." },
                { "step": 4, "description": "Polishing and finishing." },
                { "step": 5, "description": "Final quality inspection." }
            ],
            "rawMaterials": [
                { "material": "Mahogany Wood", "source": "Sustainable forests in Brazil." }
            ],
            "preOwner": null,
            "imageURL": "https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1650061809/678842_U3ZDT_9982_003_100_0000_Light-Gucci-Diana-medium-tote-bag.jpg"
        }
    }
];

