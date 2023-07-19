import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../src/component/login';
import Register from '../src/component/register';
import Detail from '../src/component/ProductDetail';
import Product from '../src/component/product';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='' element={<Login />}/>
        <Route exact path='/register' element={<Register />}/>
        <Route exact path='/Detail' element={<Detail />}/>
        <Route exact path='/product' element={<Product />}/>
      </Routes>
    </Router>
  );
}

export default App;























