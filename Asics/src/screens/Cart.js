import React, { useState } from "react";
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, Modal, TextInput, SafeAreaView, StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Delete from '../assets/delete.png'
import { decrementQuantity, incrementQuantity, removeFromCart } from "../../CartReducer";
import Close from '../assets/close.png';
import List from '../assets/listIcon.png';
import { LinearGradient } from 'expo-linear-gradient';


const Cart = ({ navigation }) => {
  const cart = useSelector((state) => state.cart.cart);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);


  const dispatch = useDispatch();

  const removeItemFromCart = (item) => {
    dispatch(removeFromCart(item))
  }

  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  }
  const decreaseQuantity = (item) => {
    if (item.selectedUnity === 1) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(decrementQuantity(item));
    }
  };

  const calculateTotal = () => {
    let total = 0;
    for (const item of cart) {
      total += item.sneakerPrice * item.selectedUnity;
    }
    return total;
  }
  const abrirSite = () => {
    const url = 'https://buscacepinter.correios.com.br/app/endereco/index.php?t';
    Linking.openURL(url);
  };

  return (<SafeAreaView style={styles.containerMain}>
    <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
    <ScrollView style={{
      backgroundColor: "white", flex: 1,
      marginBottom: 200,
    }}>
      <View>
        {cart.map((item, index) => (
          <View key={index} style={styles.containerBox}>
            <View style={styles.imageContainer}>
              <Image source={item.sneakerImage} style={{ height: 90, width: 150 }} />
            </View>
            <View style={styles.containerInfos}>
              <Text style={{ color: "#001e62", fontWeight: "bold", fontSize: 17 }}>
                {item.sneakerName}
              </Text>
              <Text style={{ color: "#001e62" }}>Tamanho: {item.selectedSize}</Text>


              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, borderColor: "#001e62", width: 93, borderWidth: 1, borderRadius: 40, alignContent: "center" }}>
                <TouchableOpacity onPress={() => decreaseQuantity(item)}>
                  <Text style={{ fontSize: 25, color: "#001e62", paddingHorizontal: 10 }}>-</Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 20, color: "#001e62", paddingHorizontal: 10 }}>
                  {item.selectedUnity}
                </Text>

                <TouchableOpacity onPress={() => increaseQuantity(item)}>
                  <Text style={{ fontSize: 20, color: "#001e62", paddingHorizontal: 10 }}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 28, position: "absolute", top: 50, right: 50 }} onPress={() => removeItemFromCart(item)}>
                <Image
                  source={Delete} />
              </TouchableOpacity>
              <Text style={{ color: "#001e62", fontWeight: "bold", fontSize: 20 }}>
                R${item.sneakerPrice}
              </Text>
            </View>

          </View>
        ))}
      </View>
    </ScrollView>
    <View style={styles.containerEndCart}>
      <View style={styles.ContainerTotal}>
        <Text style={{ color: "#001e62", fontWeight: 500, fontSize: 17 }}>Subtotal: </Text>
        <Text style={{ color: "#001e62", fontWeight: 500, fontSize: 17 }}>Descontos: </Text>
        <Text style={{ color: "#001e62", fontWeight: 500, fontSize: 17 }}>Entrega: </Text>
        <Text style={{ color: "#001e62", fontWeight: 500, fontSize: 17 }}>Total: </Text>
      </View>
      <View style={styles.ContainerResult}>
        <Text style={{ color: "#001e62", fontWeight: 500, fontSize: 17 }}>R${calculateTotal().toFixed(2)}</Text>
        <Text style={{ color: "#001e62", fontWeight: 500, fontSize: 17 }}>R$0,00</Text>
        <Text style={{ color: "#001e62", fontWeight: 500, fontSize: 17 }}>A calcular</Text>
        <Text style={{ color: "#001e62", fontWeight: 500, fontSize: 17 }}>R${calculateTotal().toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={{ backgroundColor: "#001e62", alignItems: "center", width: 350, height: 50, borderRadius: 50, justifyContent: "center", top: 10 }} onPress={() => setModalVisible(!modalVisible)}>
        <Text style={{ color: "#F0F0F0", fontWeight: "800", fontSize: 17 }}>FINALIZAR COMPRA</Text>
      </TouchableOpacity>
    </View>

    <Modal animationType="slide" visible={modalVisible} transparent={false}>
      <View style={styles.containerMainCheckout}>
        <LinearGradient colors={['#001e62', '#001e62']} style={styles.grad}>
          <TouchableOpacity style={{ height: 35, width: 35, alignItems:"center", position:"absolute", top: 10, right: 10}} onPress={() => setModalVisible(!modalVisible)}>
            <Image source={Close} style={{ height: 35, width: 35, }} />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 30, fontWeight: "300" }}>Checkout</Text>
        </LinearGradient>
        <TouchableOpacity style={styles.openButton} onPress={() => setModalVisible2(!modalVisible2)}>
          <Image source={List} style={{ height: 30, width: 30, }} />
        </TouchableOpacity>
        <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
          <View>

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
              <TouchableOpacity onPress={abrirSite} style={{ bottom: 55, right: 95 }}>
                <Text style={{ color: '#001e62', textDecorationLine: 'underline', fontWeight: "300" }}>
                  Não sabe o CEP?
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>

      </View>
    </Modal>

    <Modal animationType="fade" visible={modalVisible2} transparent={true}>

      <View style={styles.modalContainer2}>

        <ScrollView style={styles.containerItemsCheckout}>
          <View>
            <TouchableOpacity style={styles.container2Button} onPress={() => setModalVisible2(!modalVisible2)}>
              <Image source={Close} style={{ height: 35, width: 35, }} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>

  </SafeAreaView>

  );
}
const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",

  },
  containerBox: {
    flex: 1,
    borderColor: "#001e62",
    borderWidth: 1,
    width: 350,
    height: 200,
    alignSelf: "center",
    marginTop: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 20


  },
  containerInfos: {
    flex: 1
  },
  containerEndCart: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
  },

  ContainerTotal: {
    alignSelf: "flex-start"
  },
  ContainerResult: {
    position: "absolute",
    alignSelf: "flex-end",

  },
  containerMainCheckout: {
    flex: 1,
    flexDirection: "column",
    //backgroundColor: "black",
    //bottom: 50




  },
  containerBoxCheckout: {
    borderColor: "#001e62",
    borderWidth: 1,
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
    borderRadius: 20,
    padding: 5,
    width: 300,

    bottom: 15,

    transform: [{ scale: 0.9 }],
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
    bottom: 8.5,
    left: 30
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
    height: 150,
    borderWidth: 2,
    borderColor: "black",
    marginTop: 65,
    width: "100%",
    position: "relative",
    // backgroundColor: "red"
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


  },
  modalContainer2: {
    alignSelf: "center",
    width: 350,
    height: 600,
    //borderWidth: 2,
    borderColor: "red",
    backgroundColor: "green",
    //top: 75
    bottom: 65


  },
  container2Button: {
    width: 35,
    height: 35,
    //top: 40,
  },
  openButton: {
    height: 30,
    width: 30,
    alignSelf: "flex-end"

  },
  grad: {
    width: '100%',
    height: 150,
    alignItems: "center",
    justifyContent: "center"
  }

})
export default Cart;