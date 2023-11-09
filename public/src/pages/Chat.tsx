/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { useEffect, useState ,useRef} from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { allUsersRoute ,host} from "../utils/APIRoutes"
import Contacts from "../components/Contacts"
import Welcome from "../components/Welcome"
import ChatContainer from "../components/ChatContainer"

import {io} from "socket.io-client"

const Chat = () => {
  const socket = useRef<any>()
  const navigate =useNavigate()
  const [contacts,setContacts] =useState([])
  const [ currentUser,setCurrentUser] = useState<any>(undefined)
  const [currentChat, setCurrentChat] = useState(undefined);

useEffect(() =>{
  if(currentUser){
    socket.current = io(host)
    socket.current.emit("add-user", currentUser._id);
  }
})

  useEffect(  () => {
    const handleGetUser = async () => {
   

      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      }else {
        const user = localStorage.getItem("chat-app-user")
        setCurrentUser(user ? await JSON.parse(user) : null)

      }
    }
    handleGetUser()
  },[]);

  useEffect(() => {
    
    const fecthUsers = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);

        } else {
          navigate("/setAvatar");
        }
      }
    }
    fecthUsers()
  },[currentUser])

  const handleChatChange =  (chat:any) => {
    setCurrentChat(chat);

  }
  return (
    <Container>
      <div className="container">
        <Contacts testcontacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
        {currentChat === undefined ?
          <Welcome currentUser={currentUser}/> :(

            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
          )

        }
      </div>
    </Container>
  )
}
const Container=  styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.container {
  height: 85vh;
  width: 85vw;
  background-color: #00000076;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: 35% 65%;
  }
}`
export default Chat