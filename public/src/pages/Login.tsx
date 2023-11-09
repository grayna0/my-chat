import { ToastContainer, ToastOptions, toast } from "react-toastify";
import { FormContainer } from "./type";
import { Link, useNavigate } from "react-router-dom";
import { loginRoute } from "../utils/APIRoutes";
import axios from "axios";
import { useEffect, useState } from "react";


const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions:ToastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleChange = (e:any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    if (validateForm()) {
      console.log(values);
      
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          "chat-app-user",
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="bran">
            <img src="/logo.jpg" alt="{logo}" />
            <h2>G-ray</h2>
          </div>
          <input
            type="text"
            placeholder="username"
            name="username"
            min="3"
            onChange={(e) => handleChange(e)}
          />
         
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
         
          <button type="submit">Login</button>
          <span>
            Donthave a account ? <Link to="/register">Register</Link>
          </span>
        </form>
        <ToastContainer />
      </FormContainer>
    </>
  );
};

export default Login;
