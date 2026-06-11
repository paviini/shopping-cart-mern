import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        item => item._id === product._id
      );

      if (existingItem) {
        return currentCart.map(item =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1
        }
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter(item => item._id !== id)
    );
  };

  const updateCartQuantity = (id, quantity) => {
    const nextQuantity = Number(quantity);

    if (Number.isNaN(nextQuantity) || nextQuantity < 1) {
      return;
    }

    setCart((currentCart) =>
      currentCart.map(item =>
        item._id === id
          ? {
              ...item,
              quantity: nextQuantity
            }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};