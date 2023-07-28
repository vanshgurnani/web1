import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../src/component/login';
import Register from '../src/component/register';
import Home from '../src/component/home';
import Cart from '../src/component/cart';
import Details from './component/productdetail';
import PaymentSuccessful from './component/paymentsuccess';
import Checkout from '../src/component/checkout';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('pk_test_51NXpjiSIvjMQJZ8zzxuRt2WXLLHh3Dfn3HfarE2NJ4JeVLpnFXP7ocOtlRHwGck0tAh6zJbF0gIvehCJNJKbrWZI00sq2MdQfe');
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='' element={<Home />}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/register' element={<Register />}/>
        {/* <Route exact path='/paymentsuccessful' element={<PaymentSuccessful />} /> */}
          {/* Uncomment the above line to make the use of it when the payment gateway is successfully deployed! */}
        <Route exact path='/cart' element={<Cart />}/>
        {/* <Route exact path='/detail' element={<Details />}/> */}
        <Route exact path="/detail/:productId" element={<Details/>}/>
        <Route exact path='/checkout' element={
          <Elements stripe={stripePromise}>
            <Checkout />
          </Elements>
        }/>
      </Routes>
    </Router>
  );
}

export default App;























