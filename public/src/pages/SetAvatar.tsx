import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import loader from "../assets/loader.gif"
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Buffer } from "buffer";
import styled from "styled-components";
import { setAvatarRoute } from "../utils/APIRoutes";

const SetAvatar = () => {
  const api = "https://api.multiavatar.com/4645646";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState<string[]>([]);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [selectedAvatar, setSelectedAvatar] = useState<number>();

  const toastOption: ToastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }); 


  const setProfilePicture = async () => {
    if(selectedAvatar === undefined){
      toast.error("Please select an avatar",toastOption)
    }else {
      
      const userString = localStorage.getItem("chat-app-user");
      const user = userString !== null ? JSON.parse(userString) : null;
      const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
        image:avatars[selectedAvatar]
      })

      
      if(data.isSet){
        user.isAvatarImageSet=true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user",JSON.stringify(user))
        navigate("/")
      }else {
        toast.error("Error setting avatar , please try again")
      }
    }
  };
  useEffect(() => {
    const handleAvatar = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
  
    };
    handleAvatar();
  },[]);

  return (
    <>{
      loading ? <Container>
        <img src={loader} alt="loader"  className="loader"/>
      </Container> :
  
      <Container>
        <div className="title-container">
          <h1>Pick an avatar as your profile picture</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar,index) => {
            return (
              <div className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                <img src={`data:image/svg+xml;base64,${avatar}`} alt={avatar} 
                onClick={() => setSelectedAvatar(index)}/>
              </div>
            )
          })}
        </div>
          <button className="submit-btn" onClick={setProfilePicture}>Set as  Profile Picture</button>
      </Container>
    }
      <ToastContainer />
    </>
  );
};

const Container=styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color: #131324;
height: 100vh;
width: 100vw;

.loader {
  max-inline-size: 100%;
}

.title-container {
  h1 {
    color: white;
  }
}
.avatars {
  display: flex;
  gap: 2rem;

  .avatar {
    border: 0.4rem solid transparent;
    padding: 0.4rem;
    border-radius: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
    img {
      height: 6rem;
      transition: 0.5s ease-in-out;
    }
  }
  .selected {
    border: 0.4rem solid #4e0eff;
  }
}
.submit-btn {
  background-color: #4e0eff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: #4e0eff;
  }
}

`
export default SetAvatar;
