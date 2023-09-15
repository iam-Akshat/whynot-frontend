import "./Auth.css";
import { useSignIn } from "../api/signin";

export default function Signin() {
  const { isLoading, isError, error, mutate } = useSignIn();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    mutate(data as any);
  };
  console.log(isLoading, isError, error);
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

        <button type="submit" disabled={isLoading}>
          Login
        </button>
      </form>
    </div>
  );
}
