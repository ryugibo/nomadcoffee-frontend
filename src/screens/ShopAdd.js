import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import routes from "../routes";
import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;

const Input = styled.input``;
const Button = styled.input``;

const CREATE_COFFEE_SHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $categories: [String]
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      categories: $categories
    ) {
      ok
      error
    }
  }
`;

function ShopAdd() {
  const navigate = useNavigate();
  const { register, handleSubmit, getValues } = useForm();

  const onCompleted = (data) => {
    const { name } = getValues();
    const {
      createCoffeeShop: { ok },
    } = data;

    console.log(data);

    if (!ok) {
      return;
    }

    navigate(routes.home, {
      state: { coffeeShop: name, message: "Coffee shop created." },
    });
  };
  const [createCoffeeShop] = useMutation(CREATE_COFFEE_SHOP_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data) => {
    console.log({
      name: data.name,
      longitude: data.longitude,
      latitude: data.latitude,
      categories: data.categories.split(","),
    });
    createCoffeeShop({
      variables: {
        name: data.name,
        longitude: data.longitude,
        latitude: data.latitude,
        categories: data.categories.split(","),
      },
    });
    console.log(data);
  };

  return (
    <Container>
      <Title>Add Shop</Title>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <Input
          {...register("name", { required: true })}
          type="text"
          placeholder="Name"
        />
        <Input
          {...register("latitude", { required: true })}
          type="text"
          placeholder="Latidude"
        />
        <Input
          {...register("longitude", { required: true })}
          type="text"
          placeholder="longitude"
        />
        <Input
          {...register("categories")}
          type="text"
          placeholder="categories"
        />
        <Button type="submit" value="Add" />
      </form>
      <Link to={routes.home}>Log in</Link>
    </Container>
  );
}

export default ShopAdd;
