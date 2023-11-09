import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import { FormContainer, LoginAcountDetail } from "./type";
import "react-toastify/dist/ReactToastify.css";

import { registerRoute } from "./../utils/APIRoutes";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const toastOption: ToastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState<LoginAcountDetail>({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });


  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  },[]);

  const handleValidation = () => {
    
           const { password, email, username, confirmPassword } = values;
      if (password !== confirmPassword) {
                 toast.error(
                     "passwords and confirm passwords do not match",
                        toastOption
        );
      } else if (username.length < 3) {
                 toast.error("Username should be greater than 3 character", toastOption);
      } else if (email === "") {
                 toast.error("Email should be a valid email", toastOption);
      }
    
    return true;
  };
  const handleChange = (e:any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (event:any) => {
   event.preventDefault();
    if (handleValidation()) {
            const { password, email, username } = values;
             const { data } = await axios.post(registerRoute, {
                password,
                email,
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
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create user</button>
          <span>
            Already have a account ? <Link to="/login">Login</Link>
          </span>
        </form>
        <ToastContainer />
      </FormContainer>
    </>
  );
};

export default Register;
