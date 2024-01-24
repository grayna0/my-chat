import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import SetAvatar from "./pages/SetAvatar";
import "./app.scss" ;
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />}/>
        <Route path="/setAvatar" element={<SetAvatar />} />
   
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
