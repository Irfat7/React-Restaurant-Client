import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';

const CheckoutForm = ({ cart, price }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [clientSecret, setClientSecret] = useState("");
    const [axiosInstance] = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const [error, setError] = useState('')
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        axiosInstance.post('/create-payment-intent', { price })
            .then(res => {
                setClientSecret(res.data.clientSecret)
            })
    }, [price, axiosInstance]);

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        setProcessing(true)

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'unknown',
                        email: user?.email || 'anonymous',
                    },
                },
            },
        );

        setProcessing(false)

        if (confirmError) {
            setError(confirmError.message)
        }
        else {
            if (paymentIntent.status === 'succeeded') {
                const payment = {
                    email: user?.email,
                    transactionID: paymentIntent.id,
                    price,
                    date: new Date(),
                    quantity: cart.length,
                    cartItems: cart.map(item => item._id),
                    menuItems: cart.map(item => item.cartId),
                    status: 'Service Pending'
                }

                axiosInstance.post('/payments', payment)
                    .then(({ data }) => {
                        if (data.insertedResult.insertedId && data.deleteResult.deletedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `Payment of $${price} successful with transaction id ${paymentIntent.id}`,
                                showConfirmButton: false,
                                showCancelButton: true
                            });
                        }
                    })
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className='text-warning'>{error}</p>}
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe || !clientSecret || processing}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;