import { useParams } from "react-router-dom";

function ShopEdit() {
  const { id } = useParams();
  console.log(id);
  return <div>Shop Edit</div>;
}

export default ShopEdit;
