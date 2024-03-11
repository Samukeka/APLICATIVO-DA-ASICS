import { createSlice } from "@reduxjs/toolkit";



export const cartSlice = createSlice({
    name: "cart",
    initialState:{
        cart:[],
    },
    
    reducers:{
        addToCart: (state, action) => {
            const { sneakerId, selectedSize, selectedUnity  } = action.payload;
            
            const itemInCart = state.cart.find((item) => item.sneakerId === sneakerId && item.selectedSize === selectedSize);
          
            if (itemInCart) {
              itemInCart.selectedUnity ++;
            } else {
              state.cart.push({ ...action.payload, selectedUnity : selectedUnity });
            }
            

          },
          
          
          removeFromCart: (state, action) => {
            const { sneakerId, selectedSize } = action.payload;
            const updatedCart = state.cart.filter((item) => !(item.sneakerId === sneakerId && item.selectedSize === selectedSize));
            state.cart = updatedCart;

          },
        incrementQuantity: (state, action) => {
          const { sneakerId, selectedSize, selectedUnity  } = action.payload;

            const itemInCart = state.cart.find((item) => item.sneakerId == sneakerId && item.selectedSize === selectedSize);
            itemInCart.selectedUnity ++;

        },
        decrementQuantity: (state, action) => {
            console.log('Decrementing quantity:', action.payload);
            const itemInCart = state.cart.find((item) => item.sneakerId === action.payload.sneakerId);
            if (itemInCart.selectedUnity  === 1) {
              console.log('Removing item:', action.payload);
              state.cart = state.cart.filter((item) => item.sneakerId !== action.payload.sneakerId);

            } else {
              itemInCart.selectedUnity --;
              state.cartCount -= 1;

            }
          },
    },
});
export const {addToCart, removeFromCart, incrementQuantity, decrementQuantity} = cartSlice.actions;

export default cartSlice.reducer;