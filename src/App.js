import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/home";
import Login from "./screens/login";
import NotFound from "./screens/NotFound";

function App() {
  const isLoggedIn = false;
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={isLoggedIn ? <Home /> : <Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
