import React, { useEffect } from 'react'
import {useAppStore} from "@/store";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Chats = () => {

  const {userInfo} = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if(!userInfo.profileSetup) {
      toast.error("Please complete your profile setup");
      navigate("/profile");
    }
  }
  , [userInfo, navigate]);

  return (
    <div>Chats</div>
  )
}

export default Chats