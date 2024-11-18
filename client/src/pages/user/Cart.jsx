import React, { useContext } from "react";
import { useSelector } from "react-redux";
import CartProduct from "../../components/CartProduct";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import BackButton from "../../components/BackIcon";

const Cart = () => {
    const productCartItem = useSelector((state) => state.cart.items);
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    const {user} = useContext(AuthContext)

    console.log(user)

    const totalPrice = productCartItem.reduce(
        (acc, curr) => acc + parseInt(curr.price * curr.quantity),
        0
    );

    const totalQty = productCartItem.reduce(
        (acc, curr) => acc + parseInt(curr.quantity),
        0
    );

    const handlePayment = async () => {
        if (user != null) {
            // Load the Stripe instance
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
            
            // Check if Stripe was loaded correctly
            if (!stripe) {
                console.error("Stripe.js failed to load");
                return;
            }
    
            // Create the request body including userId and items
            const bodyData = {
                userId: user._id,
                items: productCartItem,
            };
    
            try {
                const res = await fetch(`${backendUrl}/checkout/create-checkout-session`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bodyData),
                });
    
                if (!res.ok) {
                    console.error("Error creating checkout session:", res.statusText);
                    return;
                }
    
                // Parse the response to get the session ID
                const data = await res.json();
                const sessionId = data.id;
    
                if (!sessionId) {
                    console.error("No sessionId returned from server");
                    return;
                }
    
                toast("Redirecting to payment gateway...");
    
                // Redirect to checkout
                const result = await stripe.redirectToCheckout({ sessionId });
                if (result.error) {
                    console.error("Stripe checkout error:", result.error.message);
                }
            } catch (error) {
                console.error("Error during handlePayment:", error);
            }
        } else {
            toast("You are not logged in!");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }
    };
    

    

    return (
        <div className="p-4 md:p-6 mb-10 md:mb-0">
           <h1 className="md:text-2xl text-xl  md:font-bold font-medium md:mb-6 mb-0"> <span><BackButton/></span>Cart</h1>

            {productCartItem.length > 0 ? (
                <div className="my-4  flex flex-col  md:flex-row gap-4">
                    {/* Display cart items */}
                    <div className="w-full max-w-3xl flex flex-col gap-3">
                        {productCartItem.map((el) => (
                            <CartProduct
                                key={el._id}
                                id={el.id}
                                name={el.name}
                                image={el.image}
                                category={el.category}
                                qty={el.quantity}
                                total={el.quantity * el.price}
                                price={el.price}
                            />
                        ))}
                    </div>

                    {/* Total cart item summary */}
                    <div className="w-full max-w-md ml-auto bg-white rounded-lg shadow-lg p-4">
                        <h2 className="bg-blue-500 text-white p-2 text-lg rounded-lg">
                            Summary
                        </h2>
                        <div className="flex justify-between py-2 text-lg border-b">
                            <p>Total Qty :</p>
                            <p className="font-bold">{totalQty}</p>
                        </div>
                        <div className="flex justify-between py-2 text-lg border-b">
                            <p>Total Price</p>
                            <p className="font-bold">
                                <span className="text-red-500">₹</span> {totalPrice}
                            </p>
                        </div>
                        <button
                            className="bg-red-500 w-full text-lg font-bold py-2 text-white rounded-lg"
                            onClick={handlePayment}
                        >
                            Payment
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex w-full justify-center items-center flex-col">
                    <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
                </div>
            )}
        </div>
    );
};

export default Cart;
