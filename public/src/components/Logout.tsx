import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

const LogOut = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  return (
    <button className="btn" onClick={handleClick}>
      <BiPowerOff />
    </button>
  );
};

export default LogOut;
