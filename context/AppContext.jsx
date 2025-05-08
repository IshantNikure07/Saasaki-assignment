'use client'
import { productsDummyData, userDummyData } from "@/assets/assets";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()

    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState(false)
    const [isSeller, setIsSeller] = useState(true)
    const [cartItems, setCartItems] = useState({})
    const [productById, setProductById] = useState([])
    const [filteredData , setFilteredData] = useState([])
    const [dark , setDark] = useState(false)
    const [cart, setCart] = useState([])
    const [wishlistIds, setWishlistIds] = useState([])
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const storedTheme = sessionStorage.getItem("dark");
        if (storedTheme !== null) {
          setDark(storedTheme === "true");
        }
      }, []);

      useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      
        const storedWishlist = localStorage.getItem("wishlist");
        if (storedWishlist) {
          setWishlistIds(JSON.parse(storedWishlist));
        }
      
        const storedOrders = localStorage.getItem("orders");
        if (storedOrders) {
          setOrders(JSON.parse(storedOrders));
        }
      }, []);

      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log("cart" , cart)
      }, [cart]);
      
      useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlistIds));
        console.log("wish" , wishlistIds)
      }, [wishlistIds]);
      
      useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
        console.log("orders" , orders)
      }, [orders]);
      

    const fetchProductData = async () => {
        // setProducts(productsDummyData)
        try {
            const res = await axios.get("https://fakestoreapi.com/products")
            setProducts(res.data)
            setFilteredData(res.data)
            console.log("responce", res.data)
        } catch (error) {
            console.log(error)
        }

    }
    const fetchProductDataById = async (id) => {
        let product = await products.find(item => item.id === Number(id));
        if (product) {
            setProductById(product);
            console.log("product By id", product); // ✅ correct

        } else {
            console.log("not getting by id")

        }

    }

    const fetchUserData = async () => {
        setUserData(userDummyData)
    }

    const addToCart = async (data) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === data.id);

            if (existingItem) {
                // Increase quantity if item exists
                return prevCart.map(item =>
                    item.id === data.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Add new item with quantity = 1
                return [...prevCart, { ...data, quantity: 1 }];
            }
        });
    };
    const placeOrder = async (data) => {
        setOrders(prevOrders => {
             return [...prevOrders , data]
        });
    };

    const toggleWishlist = (id) => {
        setWishlistIds(prev => {
            return prev.includes(id)
                ? prev.filter(wid => wid !== id)
                : [...prev, id];
        });
    };


    const reduceCartQuantity = (id) => {
        setCart(prevCart => {
          const existingItem = prevCart.find(item => item.id === id);
      
          if (existingItem && existingItem.quantity > 1) {
            // Decrease quantity by 1
            return prevCart.map(item =>
              item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );
          } 
        });
      };
    const updateCartQuantity = (id , value) => {
        setCart(prevCart => {
         if (true) {
            return prevCart.map(item =>
                item.id === id
                  ? { ...item, quantity: value }
                  : item
              );
         }
           
          } 
        );
      };

    const removeCartItem = (id)=>{
        setCart(prevCart => {
            if (true) {
               return  prevCart.filter(item => item.id !== id);
                
            }
        })
    }
      

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.price * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    // useEffect(() => {
    //     fetchProductData()
    // }, [])

    useEffect(() => {
        fetchUserData()
    }, [])

    const value = {
        dark, setDark,
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, setProducts,
        fetchProductData,
        fetchProductDataById,
        cart, setCart,
        wishlistIds, setWishlistIds,
        toggleWishlist,
        removeCartItem,updateCartQuantity,
        cartItems, setCartItems,
        addToCart, reduceCartQuantity,
        getCartCount, getCartAmount,
        placeOrder, orders, setOrders ,
        filteredData , setFilteredData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}