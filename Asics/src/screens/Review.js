import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import Remove from '../assets/remove.png';
import Add from '../assets/add.png';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../CartReducer";




const Review = ({ route, navigation }) => {
    const { sneakerId, sneakerImage, sneakerName, sneakerPrice, sneakerDescription, sneakerSize } = route.params;
    const [selectSize, setSelectSize] = useState();
    const [count, setAcount] = useState(1);

    const cart = useSelector((state) => state.cart.cart);

    console.log(cart);

    const dispatch = useDispatch();

    const [buttonColors, setButtonColors] = useState(
        Array(sneakerSize.length).fill('white')
      );
      const [textColors, setTextColors] = useState(
        Array(sneakerSize.length).fill('#03008E')
      );


    const increment = () => {
        if (count < 3) {
            setAcount(count + 1);
        }
    }

    const decrement = () => {
        if (count > 1) {
            setAcount(count - 1);
        }
    }
    const handleSizeClick = (size, index) => {
    const newButtonColors = Array(sneakerSize.length).fill('white');
    const newTextColors = Array(sneakerSize.length).fill('#03008E');

    if (selectSize === size) {
      setSelectSize(null);
    } else {
      newButtonColors[index] = '#03008E';
      newTextColors[index] = 'white';
      setSelectSize(size);
    }

    setButtonColors(newButtonColors);
    setTextColors(newTextColors);
  };

    const addItemToCart = () => {
        const newItem = {
            sneakerId,
            sneakerImage,
            sneakerName,
            sneakerPrice,
            selectedSize: selectSize,
            selectedUnity: count,
        };
        dispatch(addToCart(newItem));
    };
    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            <View style={styles.container}>
                <Image source={sneakerImage} style={{ width: 320, height: 320, alignSelf: "center" }} />
                <Text style={styles.name}>{sneakerName}</Text>
                <Text style={styles.priceText}>R${sneakerPrice}</Text>
                <Text style={{ color: "#03008E", fontWeight: "700", marginLeft: 10, }}>Tamanho Selecionado: {selectSize}</Text>
                <View style={styles.sizesContainer}>
                    {sneakerSize.map((size, index) => (
                <TouchableOpacity
                    key={index}
                    style={{
                        flexBasis: '20%',
                        borderColor: '#03008E',
                        borderWidth: 2,
                        borderRadius: 100,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 2,
                        backgroundColor: buttonColors[index],
                    }}
                    onPress={() => handleSizeClick(size, index)}
                >
                    <Text style={{ fontSize: 15, color: textColors[index] }}>{size}</Text>
                </TouchableOpacity>
            ))}
        </View>


                
                <View style={styles.buyContainer}>


                    <View style={styles.unitBuy}>
                        <Text style={styles.unitText}>{count}</Text>
                        <TouchableOpacity style={styles.unitDecrement} onPress={decrement}>
                            <Image source={Remove} style={{ width: '100%', height: '100%', resizeMode: 'contain' }}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.unitIncrement} onPress={increment}>
                            <Image source={Add} style={{ width: '100%', height: '100%', resizeMode: 'contain' }}></Image>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.buyButton}
                        onPress={addItemToCart}
                    >
                        <Text style={styles.buyText}>Comprar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.Description}>
                    <View style={styles.DescriptionStyle}>
                        <Text style={styles.DscText}>CONHEÇA SEU NOVO ASICS</Text>
                    </View>
                    <Text style={styles.TextDescription}>{sneakerDescription}</Text>

                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",

    },
    name: {
        fontSize: 30,
        fontWeight: "bold",
        maxWidth: '100%',
        marginLeft: 10

    },
    DescriptionStyle: {
        backgroundColor: '#D9D9D9',
        justifyContent: "center",
        height: 40
    },
    DscText: {
        marginLeft: 10,
        marginRight: 10,
        fontWeight: "bold",
        color: "#03008E"
    },
    TextDescription: {
        marginLeft: 10,
        marginRight: 10,
        fontWeight: "300",
        color: "#03008E",
        fontSize: 15,
        flex: 1,
    },
    priceText: {
        fontSize: 20,
        fontWeight: "500",
        marginLeft: 10
    },
    Description: {
        flex: 1,
        marginTop: 50,
    },
    sizesContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap",

    },

    buyButton: {
        backgroundColor: "#03008E",
        borderRadius: 25,
        width: 250,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 20,
    },
    buyContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        top: 30
    },
    buyText: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold"
    },
    unitBuy: {
        marginLeft: 10,
        width: 100,
        height: 50,
        borderCurve: "circular",
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#03008E',
        justifyContent: "center",
    },
    unitText: {
        position: "absolute",
        fontSize: 20,
        textAlign: "center",
        alignSelf: "center"

    },
    unitDecrement: {
        justifyContent: "center",
        position: "absolute",
        marginLeft: 12,
        width: 20,
        height: 20
    },
    unitIncrement: {
        position: "absolute",
        marginLeft: 65,
        width: 20,
        height: 20
    },

})

export default Review;