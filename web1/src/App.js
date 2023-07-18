import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../src/component/login';
import Register from '../src/component/register';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='' element={<Login />}/>
        <Route exact path='register' element={<Register />}/>
      </Routes>
    </Router>
  );
}

export default App;























