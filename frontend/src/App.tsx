import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Chat from "./pages/Chat"
import NotFound from "./pages/NotFound"

const App = () => {
  return (
    
  <div>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/chats" element={<Chat/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>

  </div>
    
    
  )
}

export default App