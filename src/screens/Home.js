import { useNavigate } from "react-router-dom";
import { logUserOut } from "../apollo";
import routes from "../routes";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => logUserOut()}>Logout</button>
      <button onClick={() => navigate(routes.add)}>Add Coffee Shop</button>
    </div>
  );
}

export default Home;
