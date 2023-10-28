import { ToastContainer, ToastOptions, toast } from "react-toastify";
import { FormContainer } from "./type";
import { Link, useNavigate } from "react-router-dom";
import { loginRoute } from "../utils/APIRoutes";
import axios from "axios";
import { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const toastOption: ToastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    password: "",
  });


  useEffect(() => {
    if(localStorage.getItem("chat-app-user")){
      navigate("/")
}  })
  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("passwords and confirm passwords do not match", toastOption);
    } else if (username === "") {
      toast.error("Email and password is required", toastOption);
    }

    return true;
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        password,

        username,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOption);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
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
