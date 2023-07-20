import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../src/component/login';
import Register from '../src/component/register';
import Home from '../src/component/home';
import Cart from '../src/component/cart';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='' element={<Login />}/>
        <Route exact path='/register' element={<Register />}/>
        <Route exact path='/home' element={<Home />}/>
        <Route exact path='/cart' element={<Cart />}/>
      </Routes>
    </Router>
  );
}

export default App;























