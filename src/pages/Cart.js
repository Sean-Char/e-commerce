import React, { useContext, useState } from 'react';
import { Context } from '../Context';
import CartItem from '../components/CartItem';

const Cart = () => {
    const [buttonText, setButtonText] = useState("Place Order");
    const { cartItems, emptyCart } = useContext(Context);
    const  totalCost = cartItems.length * 5.99
    const totalCostDisplay = totalCost.toLocaleString("en-US", {style: "currency", currency: "USD"})

    const cartItemElements = cartItems.map(item => (
        <CartItem key={item.id} item={item} />
    ));

    const placeOrder = () => {
        setButtonText("Ordering...")
        setTimeout(() => {
            console.log("Order placed!")
            setButtonText("Place Order")
            emptyCart()
        }, 3000)
    }
    
    return (
        <main className="cart-page">
            <h1>Check out</h1>
            {cartItemElements}
            <p className="total-cost">Total: {totalCostDisplay}</p>
            {
                cartItems.length > 0 ?
                <div className="order-button">
                    <button onClick={placeOrder}>{buttonText}</button>
                </div> : 
                <p>You have no Items in your cart.</p>
            }
        </main>
    )
}

export default Cart