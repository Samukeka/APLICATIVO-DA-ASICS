import React, { useState } from "react";
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, TextInput, Linking} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Delete from '../assets/delete.png'
import { decrementQuantity, incrementQuantity, removeFromCart } from "../../CartReducer";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const removeItemFromCart = (item) => {
    dispatch(removeFromCart(item))
  }

  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  }
  const decreaseQuantity = (item) => {
    if (item.quantity === 1) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(decrementQuantity(item));
    }
  };

  const calculateTotal = () => {
    let total = 0;
    for (const item of cart) {
      total += item.sneakerPrice * item.quantity;
    }
    return total;
  }

  const abrirSite = () => {
    const url = 'https://buscacepinter.correios.com.br/app/endereco/index.php?t';
    Linking.openURL(url);
  };


  return (
    <View style={styles.containerMainCheckout}>
    <ScrollView style={{ backgroundColor: "white", flex: 1}}>
      <View>
        <ScrollView style={styles.containerItemsCheckout}>
          <View>
            {cart.map((item, index) => (
              <View key={index} style={styles.containerBoxCheckout}>
                <View style={styles.imageContainerCheckout}>
                  <Image source={item.sneakerImage} style={styles.imageCheckout} />
                </View>
                <View style={styles.containerInfosCheckout}>
                  <Text style={styles.sneakerNameCheckout}>{item.sneakerName}</Text>
                  <Text style={{ color: "#001e62" }}>Tamanho: {item.selectedSize}</Text>

                  <View style={styles.quantityContainerCheckout}>
                    <TouchableOpacity onPress={() => decreaseQuantity(item)}>
                      <Text style={styles.quantityTextCheckout}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantityTextCheckout}>{item.quantity}</Text>

                    <TouchableOpacity onPress={() => increaseQuantity(item)}>
                      <Text style={styles.quantityTextCheckout}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.deleteButtonCheckout}
                    onPress={() => removeItemFromCart(item)}
                  >
                    <Image source={Delete} />
                  </TouchableOpacity>
                  <Text style={styles.sneakerPriceCheckout}>R${item.sneakerPrice}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        
        <View style={styles.containerCardCheckout}>
          <Text style={{ fontWeight: 500, color: "#001e62", fontSize: 17, alignSelf: "flex-start", marginLeft: 20, marginTop: 10 }}>
            Adicionar Cupom de Desconto
          </Text>

          <TextInput style={styles.containerInputCheckout} placeholder="Insira aqui" />
          <TouchableOpacity style={{ borderRadius: 32, width: 100, alignItems: "center", height: 45, justifyContent: "center", bottom: 61, left: 50, backgroundColor: "#e4e5f3" }}>
            <Text style={{ color: "#001e62", fontWeight: "700" }}>Aplicar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerCardCheckout}>
          <Text style={{ fontWeight: 500, color: "#001e62", fontSize: 17, alignSelf: "flex-start", marginLeft: 20, marginTop: 10 }}>
            Entrega
          </Text>
          <TextInput style={styles.containerInputCheckout} placeholder="Insira aqui" />
          <TouchableOpacity style={{ borderRadius: 32, width: 100, alignItems: "center", height: 45, justifyContent: "center", bottom: 61, left: 50, backgroundColor: "#e4e5f3" }}>
            <Text style={{ color: "#001e62", fontWeight: "700" }}>Aplicar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={abrirSite} style={{bottom: 55, right: 95}}>
            <Text style={{ color: '#001e62', textDecorationLine: 'underline', fontWeight: "300" }}>
              Não sabe o CEP?
            </Text>
          </TouchableOpacity>
        </View>
         
      </View>
    </ScrollView>
    
    </View>

  );

}

const styles = StyleSheet.create({
  containerMainCheckout: {
    flex: 1,
    flexDirection: "column",
  },
  containerBoxCheckout: {
    borderColor: "#001e62",
    borderWidth: 1,
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
    borderRadius: 20,
    padding: 5,
    width: 350,
    bottom: 15


  },
  imageContainerCheckout: {
    flex: 1,
    marginRight: 10,
  },
  imageCheckout: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
    borderRadius: 10,
  },
  containerInfosCheckout: {
    flex: 2,
  },
  sneakerNameCheckout: {
    color: "#001e62",
    fontWeight: "bold",
    fontSize: 17,
  },
  quantityContainerCheckout: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderColor: "#001e62",
    borderWidth: 1,
    borderRadius: 40,
    alignContent: "center",
    padding: 5,
    width: 100
  },
  quantityTextCheckout: {
    fontSize: 20,
    color: "#001e62",
    paddingHorizontal: 10,
  },
  deleteButtonCheckout: {
    alignSelf: "flex-end",
    marginTop: 60,
    position: "absolute",
    top: 0,
    right: 0,
    marginRight: 70
  },
  sneakerPriceCheckout: {
    color: "#001e62",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  containerItemsCheckout: {
    flex: 1,
    alignSelf: "center",
    backgroundColor: "white",
    height: 350,
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 20,
    marginTop: 35,
    width: "100%",
    position: "relative"
  },
  containerCardCheckout: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#001e62",
    borderRadius: 15,
    paddingBottom: 37,
    height: 150,
    backgroundColor: "white",
    marginTop: 16,
    marginRight: 16,
    marginBottom: 16,
    marginLeft: 16,
    width: 350,
  },
  containerInputCheckout: {
    borderWidth: 1.5,
    width: 150,
    alignSelf: "flex-start",
    borderRadius: 8,
    height: 45,
    padding: 10, fontWeight: "500",
    borderColor: "#001e62",
    justifyContent: "center",
    fontSize: 15,
    color: "#001e62",
    marginTop: 16,
    marginRight: 16,
    marginBottom: 16,
    marginLeft: 16,
  },
  containerEndCartCheckout: {
    backgroundColor: "white",
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 150
  },

  ContainerTotalCheckout: {
    alignSelf: "flex-start"
  },
  ContainerResultCheckout: {
    position: "absolute",
    alignSelf: "flex-end",

  }


})

export default Checkout;