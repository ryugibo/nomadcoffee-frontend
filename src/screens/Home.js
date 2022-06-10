import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { logUserOut } from "../apollo";
import routes from "../routes";

const COFFEE_SHOP_QUERY = gql`
  query seeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
      ...CoffeeShopFragment
    }
  }
  fragment CoffeeShopFragment on CoffeeShop {
    id
    name
    latitude
    longitude
  }
`;

function Home() {
  const { data } = useQuery(COFFEE_SHOP_QUERY, { variables: { page: 1 } });
  console.log(data?.seeCoffeeShops);

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
