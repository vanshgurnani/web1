import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../src/component/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='' element={<Login />}/>
      </Routes>
    </Router>
  );
}

export default App;























