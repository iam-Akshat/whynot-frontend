import "./Auth.css";
import { useSignIn } from "../api/signin";
import { AxiosError } from "axios";
import { useContext, useState } from "react";
import { AuthContext, AuthContextType } from "../AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
  const { isLoading, isError, mutate } = useSignIn();
  const [errorData, setErrorData] = useState<any>(null);

  const authCtx = useContext<AuthContextType>(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const dataa = Object.fromEntries(formData) as any;

    mutate(dataa, {
      onError(err) {
        if (err instanceof AxiosError) {
          setErrorData(err.response?.data.error || "An error occurred");
        }
      },
      onSuccess(data) {
        authCtx.login(data.user, data.authToken);
        navigate("/home");
      },
    });
  };

  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Login
      </h1>
      <form id="login-form" className="login-form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>

        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        {isError && <p className="error">{errorData}</p>}
        <button type="submit" disabled={isLoading}>
          Login
        </button>
      </form>
      <p style={{
        textAlign: "center",
      }}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
