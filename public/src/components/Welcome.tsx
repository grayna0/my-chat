
import loader from "../assets/loader.gif"
const Welcome = ({ currentUser }: { currentUser: any }) => {

  
  return (
    <div className=" loader"  >
      <img src={loader} alt="loader" />
      <h1>
        Welcome, <span>{currentUser?.username}</span>
      </h1>
      <h3>Please select chat</h3>
    </div >
  );
};


export default Welcome;
