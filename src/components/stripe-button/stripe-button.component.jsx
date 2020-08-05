import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publicKey = "pk_test_51HCb9NDbAcfB8K3IItZBLv54pZGhNJL8IQCqdJRHzvQ6wZHv4yFFPagLQz4Iw4zasRScoUCeceRgFiSiq0YZB48b00Vno7EZsJ";

    const onToken = token => {
        console.log(token);
        alert("Payment Successful!")
    };


    return (
        <StripeCheckout label="Pay Now"
                        name="Funky Clothing Co."
                        billingAddress
                        shippingAddress
                        image="https://svgshare.com/i/CUz.svg"
                        description={`Your total is $${price}`}
                        amount={priceForStripe}
                        panelLabel="Pay Now"
                        token={onToken}
                        stripeKey={publicKey}/>
    )
};

export default StripeCheckoutButton;