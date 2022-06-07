import { darkModeVar, isLoggedInVar, logUserIn } from "../apollo";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { Link, useLocation } from "react-router-dom";
import routes from "../routes";

const Container = styled.div``;

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;

const Input = styled.input``;

const Button = styled.input``;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;
function Login() {
  const location = useLocation();

  const { register, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });

  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    console.log(data);
    if (!ok) {
      return;
    }
    console.log(data);
    if (token) {
      logUserIn(token);
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted });

  const onSubmitValid = (data) => {
    login({ variables: { ...data } });
    console.log(data);
  };

  return (
    <Container>
      <Title>Login</Title>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <Input
          {...register("username", { required: true })}
          type="text"
          placeholder="Username"
        />
        <Input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
        />
        <Button type="submit" value="Log in" />
      </form>
      <Link to={routes.signUp}>Sign Up</Link>
    </Container>
  );
}

export default Login;
