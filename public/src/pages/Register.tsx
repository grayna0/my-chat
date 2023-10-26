import { Link } from "react-router-dom";
import styled from "styled-components";

const Register = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("form submission");
  };
const handleChange = (e) => {
  alert("e submission");
}
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="bran">
            <img src="" alt="" />
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
            name="confirm password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create user</button>
          <span>Already have a account ? <Link to="/login">Login</Link></span>
        </form>
      </FormContainer>
    </>
  );
};

const FormContainer = styled.div``;

export default Register;
