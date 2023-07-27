import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe or Elements not initialized yet, do not proceed with the payment
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      // Handle the error (e.g., display error message to the user)
      console.error('Stripe Error:', error.message);
    } else {
      // Process the payment with the token on your backend
      console.log('Stripe Token:', token);
      // Call a function to send the token and other checkout form data to your backend
      handlePayment(token);
    }
  };

  // The rest of your component code remains the same

  return (
    // ... Your existing JSX code ...

    <div className="column-50">
      <h3>Payment</h3>
      {/* Stripe CardElement component for card details input */}
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
    </div>
    // ... Your existing JSX code ...
  );
};
