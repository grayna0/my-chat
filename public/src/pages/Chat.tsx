/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { useEffect, useState ,useRef} from "react"
import { useNavigate } from "react-router-dom"
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
    <div className="wapped-container">
      <div className="container">
        <Contacts testcontacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
        {currentChat === undefined ?
          <Welcome currentUser={currentUser}/> :(

            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
          )

        }
      </div>
    </div>
  )
}

export default Chat