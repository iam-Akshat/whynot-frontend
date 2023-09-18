import "./Auth.css";
import { AxiosError } from "axios";
import { useContext, useState } from "react";
import { AuthContext, AuthContextType } from "../AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp } from "../api/signup";

export default function Signup() {
    const { isLoading, isError, mutate } = useSignUp();
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
                Signup
            </h1>
            <form id="login-form" className="login-form" onSubmit={handleSubmit}>
                <label>
                    Full Name:
                    <input type="text" name="fullName" required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" required />
                </label>
                <label>
                    Phone Number:
                    <input type="number" name="phone" required />
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
                Already have an account? <Link to="/signin">Sign in</Link>
            </p>
        </div>
    );
}
