import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../src/component/login';
import Register from '../src/component/register';
import Home from '../src/component/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='' element={<Login />}/>
        <Route exact path='/register' element={<Register />}/>
        <Route exact path='/home' element={<Home />}/>
      </Routes>
    </Router>
  );
}

export default App;























