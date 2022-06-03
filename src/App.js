import { useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { isLoggedInVar } from "./apollo";
import Home from "./screens/home";
import Login from "./screens/login";
import NotFound from "./screens/NotFound";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
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
