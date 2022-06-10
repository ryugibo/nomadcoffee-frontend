import styled from "styled-components";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import routes from "../routes";
import Container from "../components/Container";

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;

const Input = styled.input``;
const Button = styled.input``;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $password: String!
    $name: String
    $location: String
    $githubUsername: String
  ) {
    createAccount(
      username: $username
      email: $email
      password: $password
      name: $name
      location: $location
      githubUsername: $githubUsername
    ) {
      ok
      error
    }
  }
`;
function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit, getValues } = useForm();

  const onCompleted = (data) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      console.log(error);
      return;
    }

    navigate(routes.home, {
      state: { username, password, message: "Account created. Please log in." },
    });
  };

  const [createAccount] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data) => {
    createAccount({ variables: { ...data } });
    console.log(data);
  };

  return (
    <Container>
      <Title>Sign Up</Title>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <Input
          {...register("username", { required: true })}
          type="text"
          placeholder="Username"
        />
        <Input
          {...register("email", { required: true })}
          type="text"
          placeholder="Email"
        />
        <Input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
        />
        <Input {...register("name")} type="text" placeholder="Name" />
        <Input {...register("location")} type="text" placeholder="Location" />
        <Input
          {...register("githubUsername")}
          type="text"
          placeholder="GithubUsername"
        />
        <Button type="submit" value="Sign up" />
      </form>
      <Link to={routes.home}>Log in</Link>
    </Container>
  );
}

export default SignUp;
