import React, { useState, useEffect } from 'react';

const Context = React.createContext();

const ContextProvider = ({ children }) => {
    const [allPhotos, setAllPhotos] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    const url = "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json";

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setAllPhotos(data))
    }, []);

    // console.log(allPhotos);

    const toggleFavorite = (id) => {
        const updatedArr = allPhotos.map(photo => {
            if(photo.id === id) {
                console.log(id)
                console.log(!photo.isFavorite)
                return {...photo, isFavorite: !photo.isFavorite}
            }
            return photo
        })
        setAllPhotos(updatedArr);
    }

    const addToCart = (newItem) => {
        setCartItems(prevItem => [...prevItem, newItem])
    }
    //console.log(cartItems)

    const removeFromCart = (id) => {
        setCartItems(prevItem => prevItem.filter(item => item.id !== id))
    }

    const emptyCart = () => {
        setCartItems([])
    }

    return (
        <Context.Provider value={{ 
            allPhotos, 
            toggleFavorite, 
            addToCart, 
            cartItems, 
            removeFromCart,
            emptyCart
        }}>
            {children}
        </Context.Provider>
    );
}

export { ContextProvider, Context }