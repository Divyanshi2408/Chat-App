import { useEffect, useState } from "react";
import { BrowserRouter,Navigate,Route,Routes} from "react-router-dom"
import Auth from "./pages/auth"
import Profile from "./pages/profile"
import Chats from "./pages/chats"
import { useAppStore } from '@/store';
import { GET_USER_INFO } from '@/utils/constants';
import { apiClient } from '@/lib/api-client';

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chats" /> : children;
};


function App() {

  const userInfo = useAppStore(state => state.userInfo);
const setUserInfo = useAppStore(state => state.setUserInfo);



  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try{
        const response = await apiClient.get(GET_USER_INFO, { withCredentials: true });
        if(!response.status === 200 && response.data.id){
          setUserInfo(response.data);
        }
        else {
          setUserInfo(undefined);
        }
        console.log(response)
      }
        catch (error) {
          setUserInfo(undefined);
        }
      finally {
        setLoading(false);
      }
      };
    if (!userInfo) {
      getUserData();
    }
    else {
      setLoading(false);
    }
  },  [userInfo, setUserInfo]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
        <Route path="*" element={<Navigate to="/auth" />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/chats" element={<PrivateRoute><Chats /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
