import { Button } from "@/components/ui/button"
import { BrowserRouter,Navigate,Route,Routes} from "react-router-dom"
import Auth from "./pages/auth"
import Profile from "./pages/profile"
import Chats from "./pages/chats"

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chats" element={<Chats />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
