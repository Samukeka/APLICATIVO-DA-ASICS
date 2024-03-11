import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView, FlatList } from 'react-native';
import { Image } from 'react-native';
import Menu from '../assets/hambu.png';
import Logo from '../assets/asicslogo.png';
import { shoesCasual } from '../database/sneakers.js';
import { shoesSport } from '../database/sneakers.js';
import New from '../assets/news.png';
import Swiper from "react-native-swiper";
import BannerBia from '../assets/bannerbia.webp'
import BannerNimbus from '../assets/bannernimbus.webp'
import BannerNovaBlast from '../assets/bannernovablast.webp'


const Home = ({ navigation }) => {

    const [selectCategory, setCategory] = useState(shoesCasual);

    const selectSport = () => {
        if (selectCategory != shoesSport){
            setCategory(shoesSport)
        }
    }
    const selectCasual= () => {
        if (selectCategory != shoesCasual){
            setCategory(shoesCasual)
        }
        
    }
    function navigateToReview(screenName, productId) {
        const selectedProduct = selectCategory.find(product => product.id === productId);
    
        if (selectedProduct) {
            navigation.navigate(screenName, {
                sneakerId: selectedProduct.id,
                sneakerImage: selectedProduct.image,
                sneakerName: selectedProduct.name,
                sneakerPrice: selectedProduct.price,
                sneakerDescription: selectedProduct.description,
                sneakerSize: selectedProduct.sizes,
            });
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={Menu} style={styles.hamburguer} />
                    <Image source={Logo} style={styles.logo} />
                </View>
                <Search />
                <Swiper style={styles.cardNew} showsButtons={false} loop={true} autoplay autoplayTimeout={30}>
                    <TouchableOpacity onPress={() => navigateToReview('Review', 13)}>
                        <Image source={BannerNimbus} style={styles.carouselImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToReview('Review', 11)}>
                        <Image source={BannerBia} style={styles.carouselImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToReview('Review', 8)}>
                        <Image source={BannerNovaBlast} style={styles.carouselImage} />
                    </TouchableOpacity>
                </Swiper>


                <View style={styles.categoryContainer}>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.buttonRunning} onPress={selectSport}>
                            <Text style={styles.textCategory}>Sport</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCasual} onPress={selectCasual}>
                            <Text style={styles.textCategory}>Casual</Text>
                        </TouchableOpacity>
                        
                    </View>
                    <View style={styles.categoryLine}>
                        
                    </View>
                </View>
            <View>
                <View style={styles.card}>
                    <FlatList
                        data={selectCategory}
                        horizontal
                        pagingEnabled
                        renderItem={({ item }) => (
                            <SneakersCasual
                                id={item.id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                description={item.description}
                                sizes={item.sizes}
                                navigation={navigation}
                                category={item.category}

                            />
                        )}
                    />
                </View>

                <View style={styles.card}>
                    <FlatList
                        data={selectCategory}
                        horizontal
                        pagingEnabled
                        renderItem={({ item }) => (
                            <SneakersCasual
                                id={item.id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                description={item.description}
                                sizes={item.sizes}
                                navigation={navigation}
                                category={item.category}
                            />
                        )}
                    />
                </View>
                <View style={styles.card}>
                    <FlatList
                        data={selectCategory}
                        horizontal
                        pagingEnabled
                        renderItem={({ item }) => (
                            <SneakersCasual
                                id={item.id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                description={item.description}
                                sizes={item.sizes}
                                navigation={navigation}
                                category={item.category}
                            />
                        )}
                    />
                </View>
                
            </View>
            </View>
            
        </ScrollView>
    )
}
const Search = () => {
    return (
        <View>

            <TextInput style={styles.input}
                editable
                multiline
                numberOfLines={4}
                maxLength={20}
                onChangeText={text => onChangeText(text)}
            >
            </TextInput>
        </View>
    )
}
const SneakersCasual = (props) => {
    const { navigation, id,image, name, price, description, sizes,category  } = props;
    const trimmedName = name.length > 20 ? name.substring(0, 25) + "..." : name;

    return (
        <TouchableOpacity
            style={styles.buttonSneaker}
            onPress={() =>
                navigation.navigate('Review', {
                    sneakerId: id,
                    sneakerImage: image,
                    sneakerName: name,
                    sneakerPrice: price,
                    sneakerDescription: description,
                    sneakerSize: sizes,
                })
            }>
            <View>
                <View>
                    <Image source={image} style={styles.sneakerImage} />
                    <Text style={styles.sneakerText}>{trimmedName}</Text>
                    <Text style={{fontWeight: "700", color: "#001e62", alignSelf:"flex-end", fontSize: 15.5, marginTop: 5}}> R${price}</Text>

                </View>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor:"white"
    },
    header: {
        alignSelf: "center",
        flexDirection: "row",

        alignItems: "center",
        justifyContent: "space-between",
        width: 350,
        height: 40,
        marginTop: 30,
    },
    hamburguer: {
        width: 40,
        height: 40
    },
    input: {
        backgroundColor: "#D9D9D9",
        width: 350,
        alignSelf: "center",
        height: 40,
        borderRadius: 25,
        marginTop: 13,
    },
    categoryContainer: {
        flex: 1,
        justifyContent: "center",
        marginTop: 20,
        width: "auto",
        height: 50,
       
    },
    textCategory:{
        color: "#949494",
        fontSize: 20,
        fontWeight:"300"
        
    },
    categoryLine:{
        alignSelf: "center",
        width: 340,
        backgroundColor: "#C7C7C7",
        height: 3,
        top: 15,
        borderRadius: 50,
        
        
    },
    buttonsContainer:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        top: 13,
        marginRight: 150
        
    },
    buttonCategory:{
        position:"absolute",
        top: 26,
        left: 50
    },
     cardNew: {
        height: 200,
        marginTop: 25,
        alignSelf:"center"
    },
    carouselImage: {
        height: 200,
        width: 400,
        alignSelf:"center"

    },
    card: {
        justifyContent: "flex-end",
        marginTop: 15,
        alignSelf: "center",
        flexDirection: "row",
        height: 150, 
        //marginLeft: 50,
        
       
    },
    sneakerImage: {
        resizeMode: "cover",
        width: 150,
        height: 100,
    },
    sneakerText: {
        right: 0,
        left: 0,
        fontWeight: "400",
        color: "#001e62",
        

    },
    buttonSneaker: {
        marginRight: 20,
       
    },



})

export default Home;