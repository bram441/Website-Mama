import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Navigatiebalk from "../components/Navigatiebalk";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useLogin, useSession } from "../context/UserProvider";
import { Alert } from "@mui/material";

const validationRules = {
  email: {
    required: { value: true, message: "email is required" },
  },
  password: {
    required: { value: true, message: "password is required" },
    minLenght: { value: 5, message: "Min lenght is 5" },
  },
};

export default function Login() {
  const login = useLogin();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { loading, isAuthed } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleCancel = () => {
    history.replace("/");
  };

  const handleLogin = useCallback(
    async ({ email, password }) => {
      const succes = await login(email, password);
      if (succes) {
        history.push({
          pathname: "/NotificationScreen",
          state: { type: "success", message: "Login Succes" },
        });
      } else {
        setOpen(true);
        reset();
      }
    },
    [login, reset, history]
  );
  if (isAuthed) {
    history.push("/");
  }
  return (
    <>
      <Navigatiebalk />
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="active">Log in</h2>
          <h2 className="inactive underlineHover">
            <Link className="links" to="/Register">
              Registreren
            </Link>
          </h2>

          <form onSubmit={handleSubmit(handleLogin)}>
            <div>
              <input
                type="text"
                {...register("email", validationRules.email)}
                className="fadeIn second"
                placeholder="email"
                data-cy="email_input"
              />
              {errors["email"] && (
                <p data-cy="email_input_error" className="red-text">
                  {errors["email"].message}
                </p>
              )}
            </div>
            <div>
              <input
                type="password"
                {...register("password", validationRules.password)}
                className="fadeIn third"
                placeholder="password"
                data-cy="password_input"
              />
              {errors["password"] && (
                <p data-cy="password_input_error" className="red-text">
                  {errors["password"].message}
                </p>
              )}
            </div>
            <input
              type="submit"
              disabled={loading}
              className="fadeIn fourth"
              value="Log In"
              data-cy="submit_login"
            />
          </form>

          <div id="formFooter">
            <button className="underlineHover">Forgot Password?</button>
            <p></p>
            <button className="underlineHover" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
        {open === true && (
          <Alert data-cy="login_incorrect" severity="error">
            Login incorrect
          </Alert>
        )}
      </div>
    </>
  );
}
