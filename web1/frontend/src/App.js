import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../src/component/login';
import Register from '../src/component/register';
import Home from '../src/component/home';
import Cart from '../src/component/cart';
import Details from './component/productdetail';
import Checkout from '../src/component/checkout';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='' element={<Home />}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/register' element={<Register />}/>
        <Route exact path='/cart' element={<Cart />}/>
        {/* <Route exact path='/detail' element={<Details />}/> */}
        <Route exact path="/detail/:productId" element={<Details/>}/>
        <Route exact path='/checkout' element={<Checkout />}/>
      </Routes>
    </Router>
  );
}

export default App;























